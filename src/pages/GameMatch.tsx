import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TOPICS, Word } from '../data/mockData';
import { useStore } from '../store/useStore';
import { ChevronLeft, Star } from 'lucide-react';

export default function GameMatch() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const { addStars } = useStore();

  const [words, setWords] = useState<Word[]>([]);
  const [images, setImages] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (topic) {
      initializeGame();
    }
  }, [topic]);

  const initializeGame = () => {
    if (!topic) return;
    
    // Pick 4 random words
    const selectedWords = [...topic.words].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    setWords([...selectedWords].sort(() => 0.5 - Math.random()));
    setImages([...selectedWords].sort(() => 0.5 - Math.random()));
    
    setMatchedPairs([]);
    setSelectedWord(null);
    setSelectedImage(null);
    setScore(0);
    setIsGameOver(false);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    
    setSelectedWord(wordId);
    const word = words.find(w => w.id === wordId);
    if (word) playAudio(word.english);

    if (selectedImage) {
      checkMatch(wordId, selectedImage);
    }
  };

  const handleImageClick = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    
    setSelectedImage(wordId);

    if (selectedWord) {
      checkMatch(selectedWord, wordId);
    }
  };

  const checkMatch = (wordId: string, imageId: string) => {
    if (wordId === imageId) {
      // Match
      setTimeout(() => {
        setMatchedPairs([...matchedPairs, wordId]);
        setSelectedWord(null);
        setSelectedImage(null);
        setScore(score + 1);
        playAudio('Match!');
        
        if (matchedPairs.length + 1 === 4) {
          setIsGameOver(true);
          addStars(5);
          playAudio('You win!');
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
          });
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
        playAudio('Oops!');
      }, 800);
    }
  };

  if (!topic) return <div>Topic not found</div>;

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
        <h2 className="text-4xl font-black text-slate-800 mb-4">You Win!</h2>
        <div className="text-6xl mb-6">🏆</div>
        <p className="text-2xl font-bold text-slate-600 mb-2">
          Score: {score}
        </p>
        <p className="text-lg font-bold text-yellow-500 mb-8">
          +5 Stars! ⭐
        </p>
        <div className="flex gap-4">
          <button
            onClick={initializeGame}
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

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(`/game/${topicId}`)}
          className="bg-white p-3 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-full border border-slate-300">
          <span className="font-bold text-slate-600 text-sm uppercase tracking-wider">Score: {score}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-8">
          Word Match
        </h3>
        
        <div className="flex w-full max-w-sm gap-4">
          {/* Words Column */}
          <div className="flex-1 flex flex-col gap-4">
            {words.map((word) => {
              const isMatched = matchedPairs.includes(word.id);
              const isSelected = selectedWord === word.id;
              
              let btnClass = 'bg-white border-slate-200 text-slate-700';
              if (isMatched) btnClass = 'bg-green-100 border-green-400 text-green-700 opacity-50';
              else if (isSelected) btnClass = 'bg-indigo-100 border-indigo-400 text-indigo-700 scale-105';

              return (
                <motion.button
                  key={`word-${word.id}`}
                  onClick={() => handleWordClick(word.id)}
                  disabled={isMatched}
                  whileHover={!isMatched && !isSelected ? { scale: 1.05 } : {}}
                  whileTap={!isMatched && !isSelected ? { scale: 0.95 } : {}}
                  className={`p-4 rounded-2xl border-4 shadow-sm font-black text-xl transition-all ${btnClass}`}
                >
                  {word.english}
                </motion.button>
              );
            })}
          </div>

          {/* Images Column */}
          <div className="flex-1 flex flex-col gap-4">
            {images.map((image) => {
              const isMatched = matchedPairs.includes(image.id);
              const isSelected = selectedImage === image.id;
              
              let btnClass = 'bg-white border-slate-200';
              if (isMatched) btnClass = 'bg-green-100 border-green-400 opacity-50';
              else if (isSelected) btnClass = 'bg-indigo-100 border-indigo-400 scale-105';

              return (
                <motion.button
                  key={`img-${image.id}`}
                  onClick={() => handleImageClick(image.id)}
                  disabled={isMatched}
                  whileHover={!isMatched && !isSelected ? { scale: 1.05 } : {}}
                  whileTap={!isMatched && !isSelected ? { scale: 0.95 } : {}}
                  className={`p-4 rounded-2xl border-4 shadow-sm text-4xl flex items-center justify-center transition-all ${btnClass}`}
                >
                  {image.emoji}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
