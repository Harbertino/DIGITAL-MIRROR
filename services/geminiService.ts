import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize GenAI Client
// Note: In a real production app, one might handle this in a context to ensure fresh keys if changed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    personaName: {
      type: Type.STRING,
      description: "A creative 2-3 word title for the user's digital persona (e.g., 'The Empathetic Leader').",
    },
    scores: {
      type: Type.OBJECT,
      properties: {
        empathy: { type: Type.INTEGER, description: "Score 0-100" },
        toxicity: { type: Type.INTEGER, description: "Score 0-100 (Lower is better, but represent actual level)" },
        authenticity: { type: Type.INTEGER, description: "Score 0-100" },
        professionalism: { type: Type.INTEGER, description: "Score 0-100" },
        clarity: { type: Type.INTEGER, description: "Score 0-100" },
        consistency: { type: Type.INTEGER, description: "Score 0-100" },
      },
      required: ["empathy", "toxicity", "authenticity", "professionalism", "clarity", "consistency"],
    },
    insight: {
      type: Type.STRING,
      description: "A 2-sentence futuristic, calm insight about their digital footprint.",
    },
  },
  required: ["personaName", "scores", "insight"],
};

export const analyzeFootprint = async (text: string, imageBase64?: string, mimeType?: string): Promise<AnalysisResult> => {
  try {
    const parts: any[] = [];

    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      });
    }

    parts.push({
      text: `Analyze the following digital footprint content (text and/or image). 
      Determine the user's digital persona, emotional tone, and professional impact.
      Be critical but constructive.
      
      Content to analyze:
      "${text}"`
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: parts,
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are Digital Mirror, an advanced AI engine analyzing digital human behavior. You provide futuristic, high-level psychological and professional profiling."
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const parsed = JSON.parse(resultText);
    
    return {
      ...parsed,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Analysis Failed", error);
    // Return a fallback for demo purposes if API fails or key is missing
    return {
      personaName: "The Unseen Observer",
      scores: { empathy: 50, toxicity: 10, authenticity: 60, professionalism: 70, clarity: 50, consistency: 40 },
      insight: "We could not fully connect to the neural network. Please check your connection or API key.",
      timestamp: Date.now()
    };
  }
};

export const chatWithCoach = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        systemInstruction: "You are Mirror AI, a futuristic, calm, and intelligent digital identity coach. Your goal is to help users improve their online presence, employability, and communication style. Keep answers concise (under 100 words) and empathetic."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Failed", error);
    return "I am currently realigning my neural pathways. Please try again in a moment.";
  }
};
