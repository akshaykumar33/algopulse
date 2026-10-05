import { create } from 'zustand';

export interface Problem {
  id: string;
  name: string;
  file: string;
  rating: number;
  done: boolean;
  tags?: string[];
}

export interface Day {
  date: string;
  dayNumber: number;
  total: number;
  done: number;
}

export type TabType = 'story' | 'walkthrough' | 'diagrams' | 'visualize' | 'code' | 'tests';
export type CodeModeType = 'attempt' | 'reference' | 'diff';
export type CharacterType = 'hamster' | 'bunny';

interface StudioState {
  theme: 'light' | 'dark';
  days: Day[];
  activeDate: string | null;
  problems: Problem[];
  activeFile: string | null;
  activeTab: TabType;
  codeMode: CodeModeType;

  // Mascot & Voice status
  mascot: {
    character: CharacterType;
    mood: string;
    state: 'idle' | 'listening' | 'thinking' | 'doing' | 'error';
    hidden: boolean;
  };
  voice: {
    listening: boolean;
    lang: string;
    speaking: boolean;
  };

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setDays: (days: Day[]) => void;
  setActiveDate: (date: string) => void;
  setProblems: (problems: Problem[]) => void;
  setActiveFile: (file: string) => void;
  setActiveTab: (tab: TabType) => void;
  setCodeMode: (mode: CodeModeType) => void;
  setMascotCharacter: (char: CharacterType) => void;
  setMascotMood: (mood: string) => void;
  setMascotState: (state: 'idle' | 'listening' | 'thinking' | 'doing' | 'error') => void;
  toggleMascotHidden: () => void;
  setVoiceListening: (listening: boolean) => void;
  setVoiceLang: (lang: string) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  theme: (localStorage.getItem('algopulse-theme') as 'light' | 'dark') || 'light',
  days: [],
  activeDate: null,
  problems: [],
  activeFile: null,
  activeTab: 'story',
  codeMode: 'attempt',

  mascot: {
    character: 'hamster',
    mood: '',
    state: 'idle',
    hidden: false,
  },
  voice: {
    listening: false,
    lang: 'en-US',
    speaking: false,
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('algopulse-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return { theme: next };
    }),

  setTheme: (theme) => {
    localStorage.setItem('algopulse-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  setDays: (days) => set({ days }),
  setActiveDate: (activeDate) => set({ activeDate }),
  setProblems: (problems) => set({ problems }),
  setActiveFile: (activeFile) => set({ activeFile }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setCodeMode: (codeMode) => set({ codeMode }),

  setMascotCharacter: (character) =>
    set((state) => ({ mascot: { ...state.mascot, character } })),

  setMascotMood: (mood) =>
    set((state) => ({ mascot: { ...state.mascot, mood } })),

  setMascotState: (mascotState) =>
    set((state) => ({ mascot: { ...state.mascot, state: mascotState } })),

  toggleMascotHidden: () =>
    set((state) => ({ mascot: { ...state.mascot, hidden: !state.mascot.hidden } })),

  setVoiceListening: (listening) =>
    set((state) => ({ voice: { ...state.voice, listening } })),

  setVoiceLang: (lang) =>
    set((state) => ({ voice: { ...state.voice, lang } })),
}));
