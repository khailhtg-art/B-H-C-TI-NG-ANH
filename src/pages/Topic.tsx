import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS } from '../data/mockData';
import { Volume2, Play, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

export default function Topic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!topic) return <div>Topic not found</div>;

  const WORDS_PER_SET = 10;
  const totalSets = Math.ceil(topic.words.length / WORDS_PER_SET);
  const currentWords = topic.words.slice(currentSet * WORDS_PER_SET, (currentSet + 1) * WORDS_PER_SET);
  const currentWord = currentWords[currentIndex];

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for kids
    window.speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className={`p-6 ${topic.color} text-white rounded-b-3xl shadow-md relative`}>
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center mt-4">
          <span className="text-4xl mb-2 block drop-shadow-md">{topic.icon}</span>
          <h2 className="text-3xl font-extrabold tracking-tight">{topic.name}</h2>
          <p className="text-sm font-medium opacity-90 uppercase tracking-wider mt-1">
            {topic.vietnameseName}
          </p>
        </div>
      </div>

      {/* Set Selection */}
      <div className="flex justify-center gap-2 p-4 overflow-x-auto">
        {Array.from({ length: totalSets }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSet(idx);
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
              currentSet === idx
                ? `${topic.color} text-white shadow-md`
                : 'bg-white text-slate-400 border border-slate-200'
            }`}
          >
            Set {idx + 1}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentWord && (
            <motion.div
              key={currentWord.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="bg-white w-full max-w-sm aspect-square rounded-[2.5rem] shadow-xl border-4 border-slate-100 flex flex-col items-center justify-center p-8 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 ${topic.color}`} />
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-10 ${topic.color}`} />

              <span className="text-8xl mb-6 drop-shadow-xl filter hover:scale-110 transition-transform cursor-pointer" onClick={() => playAudio(currentWord.english)}>
                {currentWord.emoji}
              </span>
              <h3 className="text-4xl font-black text-slate-800 tracking-tight mb-2 text-center">
                {currentWord.english}
              </h3>
              <p className="text-xl font-bold text-slate-400 uppercase tracking-wider">
                {currentWord.vietnamese}
              </p>

              <button
                onClick={() => playAudio(currentWord.english)}
                className="absolute bottom-6 right-6 bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 hover:scale-110 active:scale-95 transition-all"
              >
                <Volume2 size={28} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-between w-full max-w-sm mt-8 px-4">
          <button
            onClick={prevWord}
            disabled={currentIndex === 0}
            className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={28} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            {currentWords.map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? `w-6 ${topic.color}` : 'w-2.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextWord}
            disabled={currentIndex === currentWords.length - 1}
            className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={28} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Play Games Button */}
      <div className="p-6 pb-24">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/game/${topic.id}`)}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-5 rounded-3xl font-black text-xl shadow-lg border-b-4 border-orange-600 flex items-center justify-center gap-3"
        >
          <Gamepad2 size={28} />
          PLAY GAMES!
        </motion.button>
      </div>
    </div>
  );
}
