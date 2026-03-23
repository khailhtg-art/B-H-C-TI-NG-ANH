import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS, Topic } from '../data/mockData';
import { useStore } from '../store/useStore';
import { Lock, Star, X } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { unlockedTopics, stars, unlockTopic, spendStars } = useStore();
  const [showUnlockModal, setShowUnlockModal] = useState<Topic | null>(null);

  const UNLOCK_COST = 10;

  const handleTopicClick = (topic: Topic) => {
    if (unlockedTopics.includes(topic.id)) {
      navigate(`/topic/${topic.id}`);
    } else {
      setShowUnlockModal(topic);
    }
  };

  const confirmUnlock = () => {
    if (showUnlockModal && spendStars(UNLOCK_COST)) {
      unlockTopic(showUnlockModal.id);
      setShowUnlockModal(null);
    }
  };

  return (
    <div className="p-4 bg-slate-50 min-h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Let's Learn! 🚀
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Pick a topic to start playing
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {TOPICS.map((topic, index) => {
          const isUnlocked = unlockedTopics.includes(topic.id);
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTopicClick(topic)}
              className={`relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-sm border-b-4 transition-all ${
                isUnlocked
                  ? `${topic.color} border-black/20 text-white`
                  : 'bg-slate-200 border-slate-300 text-slate-400'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-700">{UNLOCK_COST}</span>
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <Lock size={12} className="text-slate-500" />
                </div>
              )}
              <span className="text-5xl mb-3 drop-shadow-md">{topic.icon}</span>
              <span className="font-bold text-lg tracking-wide">{topic.name}</span>
              <span className="text-xs font-medium opacity-80 mt-1 uppercase tracking-wider">
                {topic.vietnameseName}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Unlock Modal */}
      <AnimatePresence>
        {showUnlockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowUnlockModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
              <div className="text-6xl mb-4">{showUnlockModal.icon}</div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Unlock {showUnlockModal.name}?</h3>
              <p className="text-slate-500 font-medium mb-6">
                You need <span className="text-yellow-600 font-bold">{UNLOCK_COST} stars</span> to unlock this topic.
              </p>
              
              {stars >= UNLOCK_COST ? (
                <button
                  onClick={confirmUnlock}
                  className="w-full bg-yellow-400 text-yellow-900 py-4 rounded-2xl font-black text-lg shadow-lg border-b-4 border-yellow-600 hover:bg-yellow-500 transition-all active:scale-95"
                >
                  UNLOCK NOW! ⭐
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-100 py-4 rounded-2xl text-slate-400 font-bold">
                    Not enough stars 😿
                  </div>
                  <button
                    onClick={() => setShowUnlockModal(null)}
                    className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg border-b-4 border-indigo-700 hover:bg-indigo-600 transition-all active:scale-95"
                  >
                    GO PLAY GAMES! 🎮
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
