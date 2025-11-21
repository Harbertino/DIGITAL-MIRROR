export enum AppScreen {
  Splash = 'Splash',
  Onboarding = 'Onboarding',
  Login = 'Login',
  Dashboard = 'Dashboard',
  Analyze = 'Analyze',
  Insights = 'Insights',
  Coach = 'Coach',
  Profile = 'Profile'
}

export interface AnalysisScores {
  empathy: number;
  toxicity: number;
  authenticity: number;
  professionalism: number;
  clarity: number;
  consistency: number;
}

export interface AnalysisResult {
  personaName: string;
  scores: AnalysisScores;
  insight: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface UserProfile {
  name: string;
  tier: 'Free' | 'Pro' | 'Executive';
  joinedDate: string;
}
