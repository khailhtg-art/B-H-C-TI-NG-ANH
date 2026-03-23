import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TOPICS, Word } from '../data/mockData';
import { useStore } from '../store/useStore';
import { ChevronLeft, Star, Volume2 } from 'lucide-react';

export default function GameChooseImage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const { addStars, markWordCorrect, markWordWrong } = useStore();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (topic && !isGameOver) {
      generateOptions();
    }
  }, [currentWordIndex, isGameOver]);

  const generateOptions = () => {
    if (!topic) return;
    const currentWord = topic.words[currentWordIndex];
    const otherWords = topic.words.filter((w) => w.id !== currentWord.id);
    const shuffledOthers = otherWords.sort(() => 0.5 - Math.random()).slice(0, 2);
    const allOptions = [currentWord, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedWord(null);
    setIsCorrect(null);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (word: Word) => {
    if (selectedWord) return; // Prevent multiple clicks

    const currentWord = topic!.words[currentWordIndex];
    const correct = word.id === currentWord.id;

    setSelectedWord(word.id);
    setIsCorrect(correct);

    if (correct) {
      playAudio('Correct!');
      setScore(score + 1);
      markWordCorrect(currentWord.id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#facc15', '#4ade80', '#60a5fa'],
      });
    } else {
      playAudio('Oops, try again!');
      markWordWrong(currentWord.id);
    }

    setTimeout(() => {
      if (currentWordIndex < topic!.words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setIsGameOver(true);
        addStars(score + (correct ? 1 : 0));
        playAudio('Game Over! Good job!');
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
        });
      }
    }, 1500);
  };

  if (!topic) return <div>Topic not found</div>;

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
        <h2 className="text-4xl font-black text-slate-800 mb-4">Game Over!</h2>
        <div className="text-6xl mb-6">🎉</div>
        <p className="text-2xl font-bold text-slate-600 mb-8">
          You scored {score} out of {topic.words.length}!
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
        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-2">
          Find the
        </h3>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-5xl font-black text-slate-800 tracking-tight">
            {currentWord.english}
          </h2>
          <button
            onClick={() => playAudio(currentWord.english)}
            className="bg-indigo-100 text-indigo-600 p-3 rounded-full hover:bg-indigo-200 transition-colors"
          >
            <Volume2 size={28} strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <AnimatePresence mode="popLayout">
            {options.map((option, index) => {
              const isSelected = selectedWord === option.id;
              const isCorrectOption = option.id === currentWord.id;
              let btnClass = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50';

              if (selectedWord) {
                if (isCorrectOption) {
                  btnClass = 'bg-green-100 border-green-400 scale-105';
                } else if (isSelected) {
                  btnClass = 'bg-red-100 border-red-400 scale-95 opacity-50';
                } else {
                  btnClass = 'bg-white border-slate-200 opacity-50';
                }
              }

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={!selectedWord ? { scale: 1.05 } : {}}
                  whileTap={!selectedWord ? { scale: 0.95 } : {}}
                  onClick={() => handleSelect(option)}
                  disabled={!!selectedWord}
                  className={`aspect-square rounded-3xl border-4 shadow-sm flex items-center justify-center text-7xl transition-all duration-300 ${btnClass}`}
                >
                  {option.emoji}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider">
          {currentWordIndex + 1} / {topic.words.length}
        </p>
      </div>
    </div>
  );
}
