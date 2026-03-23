import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
  stars: number;
  unlockedTopics: string[];
  learnedWords: Record<string, number>; // wordId -> correct count
  wrongWords: Record<string, number>; // wordId -> wrong count
  timeSpent: number; // in seconds
  addStars: (amount: number) => void;
  spendStars: (amount: number) => boolean;
  unlockTopic: (topicId: string) => void;
  markWordCorrect: (wordId: string) => void;
  markWordWrong: (wordId: string) => void;
  addTimeSpent: (seconds: number) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      stars: 0,
      unlockedTopics: ['animals'], // First topic unlocked by default
      learnedWords: {},
      wrongWords: {},
      timeSpent: 0,
      addStars: (amount) => set((state) => ({ stars: state.stars + amount })),
      spendStars: (amount) => {
        const state = get();
        if (state.stars >= amount) {
          set({ stars: state.stars - amount });
          return true;
        }
        return false;
      },
      unlockTopic: (topicId) =>
        set((state) => ({
          unlockedTopics: state.unlockedTopics.includes(topicId)
            ? state.unlockedTopics
            : [...state.unlockedTopics, topicId],
        })),
      markWordCorrect: (wordId) =>
        set((state) => ({
          learnedWords: {
            ...state.learnedWords,
            [wordId]: (state.learnedWords[wordId] || 0) + 1,
          },
        })),
      markWordWrong: (wordId) =>
        set((state) => ({
          wrongWords: {
            ...state.wrongWords,
            [wordId]: (state.wrongWords[wordId] || 0) + 1,
          },
        })),
      addTimeSpent: (seconds) =>
        set((state) => ({ timeSpent: state.timeSpent + seconds })),
    }),
    {
      name: 'vocab-app-storage',
    }
  )
);
