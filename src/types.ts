export type Language = 'hi' | 'en';

export interface StepData {
  id: number;
  emoji: string;
  title: {
    hi: string;
    en: string;
  };
  subtitle: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  codeSteps: {
    hi: string[];
    en: string[];
  };
  tip?: {
    type: 'info' | 'warning' | 'success';
    hi: string;
    en: string;
  };
  cliEquivalent?: string;
  imageSchematicType: 'token' | 'clone' | 'edit' | 'stage' | 'push';
}

export interface TroubleshootingItem {
  id: string;
  error: {
    hi: string;
    en: string;
  };
  cause: {
    hi: string;
    en: string;
  };
  solution: {
    hi: string;
    en: string;
  };
  tags: string[];
}

export interface CheatsheetItem {
  gitCommand: string;
  mgitAction: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
}

export interface ScopeItem {
  id: string;
  name: string;
  description: {
    hi: string;
    en: string;
  };
  requiredFor: string[];
  recommended: boolean;
}

export interface BestPractice {
  id: string;
  emoji: string;
  title: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  tips: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Testimonial {
  id: string;
  name: string;
  role: {
    hi: string;
    en: string;
  };
  quote: {
    hi: string;
    en: string;
  };
  avatarEmoji: string;
  achievement: string;
}
