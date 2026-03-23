import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TOPICS, Word } from '../data/mockData';
import { useStore } from '../store/useStore';
import { ChevronLeft, Star, Volume2, Check } from 'lucide-react';

export default function GameSpelling() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const { addStars } = useStore();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ char: string; originalIndex: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (topic && !isGameOver) {
      initializeWord();
    }
  }, [currentWordIndex, isGameOver]);

  const initializeWord = () => {
    if (!topic) return;
    const word = topic.words[currentWordIndex].english.toUpperCase();
    const letters = word.split('').map((char, index) => ({ char, index }));
    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    setScrambledLetters(shuffled.map(l => l.char));
    setSelectedLetters([]);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (char: string, index: number) => {
    const newSelected = [...selectedLetters, { char, originalIndex: index }];
    setSelectedLetters(newSelected);
    
    const targetWord = topic!.words[currentWordIndex].english.toUpperCase();
    const currentSpelling = newSelected.map(l => l.char).join('');

    if (currentSpelling === targetWord) {
      // Correct!
      setScore(score + 1);
      playAudio(targetWord);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      
      setTimeout(() => {
        if (currentWordIndex < topic!.words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          setIsGameOver(true);
          addStars(score + 1);
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
          });
        }
      }, 1000);
    } else if (currentSpelling.length === targetWord.length) {
      // Wrong spelling
      playAudio('Try again!');
      setTimeout(() => setSelectedLetters([]), 500);
    }
  };

  if (!topic) return <div>Topic not found</div>;

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
        <h2 className="text-4xl font-black text-slate-800 mb-4">Spelling Master!</h2>
        <div className="text-6xl mb-6">✍️</div>
        <p className="text-2xl font-bold text-slate-600 mb-8">
          You spelled {score} words!
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentWordIndex(0);
              setScore(0);
              setIsGameOver(false);
            }}
            className="bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-600 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate(`/game/${topicId}`)}
            className="bg-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:bg-slate-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const currentWord = topic.words[currentWordIndex];

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(`/game/${topicId}`)}
          className="bg-white p-3 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border border-yellow-300">
          <Star className="text-yellow-500 fill-yellow-500" size={20} />
          <span className="font-bold text-yellow-700 text-lg">{score}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-8">
          Spelling Game
        </h3>
        
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-slate-100 mb-12 flex flex-col items-center">
          <span className="text-8xl mb-4">{currentWord.emoji}</span>
          <p className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{currentWord.vietnamese}</p>
        </div>

        {/* Selected Letters */}
        <div className="flex gap-2 mb-12 min-h-[60px]">
          {currentWord.english.split('').map((_, idx) => (
            <div
              key={idx}
              className={`w-12 h-14 rounded-xl border-b-4 flex items-center justify-center text-2xl font-black transition-all ${
                selectedLetters[idx]
                  ? 'bg-indigo-500 text-white border-indigo-700'
                  : 'bg-slate-100 border-slate-200 text-transparent'
              }`}
            >
              {selectedLetters[idx]?.char}
            </div>
          ))}
        </div>

        {/* Letter Options */}
        <div className="flex flex-wrap justify-center gap-3 max-w-sm">
          {scrambledLetters.map((char, index) => {
            const isUsed = selectedLetters.some(l => l.originalIndex === index);
            return (
              <motion.button
                key={index}
                disabled={isUsed}
                whileHover={!isUsed ? { scale: 1.1 } : {}}
                whileTap={!isUsed ? { scale: 0.9 } : {}}
                onClick={() => handleLetterClick(char, index)}
                className={`w-14 h-14 rounded-2xl border-b-4 flex items-center justify-center text-2xl font-black transition-all ${
                  isUsed
                    ? 'bg-slate-100 border-slate-200 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50'
                }`}
              >
                {char}
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={() => setSelectedLetters([])}
          className="mt-8 text-indigo-500 font-bold uppercase tracking-wider text-sm hover:underline"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
