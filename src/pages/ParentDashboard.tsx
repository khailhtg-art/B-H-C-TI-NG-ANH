import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { TOPICS } from '../data/mockData';
import { Star, Clock, Target, AlertCircle } from 'lucide-react';

export default function ParentDashboard() {
  const { stars, timeSpent, learnedWords, wrongWords } = useStore();

  const totalWordsLearned = Object.keys(learnedWords).length;
  const totalCorrectAttempts = Object.values(learnedWords).reduce((a, b) => a + b, 0);
  const totalWrongAttempts = Object.values(wrongWords).reduce((a, b) => a + b, 0);
  const totalAttempts = totalCorrectAttempts + totalWrongAttempts;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrectAttempts / totalAttempts) * 100) : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Find words that need practice (high wrong count)
  const wordsToPractice = Object.entries(wrongWords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => {
      const word = TOPICS.flatMap((t) => t.words).find((w) => w.id === id);
      return { word, count };
    })
    .filter((item) => item.word !== undefined);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Parent Dashboard</h2>
        <p className="text-slate-500 font-medium mt-1">Track your child's progress</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-yellow-100 p-3 rounded-full mb-3">
            <Star className="text-yellow-500 fill-yellow-500" size={28} />
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{stars}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Stars</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-indigo-100 p-3 rounded-full mb-3">
            <Target className="text-indigo-500" size={28} />
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{accuracy}%</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Accuracy</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-emerald-100 p-3 rounded-full mb-3">
            <span className="text-2xl">📚</span>
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{totalWordsLearned}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Words Learned</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-sky-100 p-3 rounded-full mb-3">
            <Clock className="text-sky-500" size={28} />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">{formatTime(timeSpent)}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Time Spent</span>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-xl">
            <AlertCircle className="text-red-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Needs Practice</h3>
        </div>

        {wordsToPractice.length > 0 ? (
          <div className="space-y-4">
            {wordsToPractice.map(({ word, count }, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{word?.emoji}</span>
                  <div>
                    <p className="font-bold text-slate-800">{word?.english}</p>
                    <p className="text-sm font-medium text-slate-500">{word?.vietnamese}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-red-500 font-bold text-lg">{count}</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mistakes</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">🌟</span>
            <p className="text-slate-500 font-medium">Great job! No words need extra practice right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
