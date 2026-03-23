import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { TOPICS, Word } from '../data/mockData';
import { useStore } from '../store/useStore';
import { ChevronLeft, Star } from 'lucide-react';

type Card = {
  id: string;
  wordId: string;
  type: 'text' | 'image';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function GameMemory() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const { addStars } = useStore();

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (topic) {
      initializeGame();
    }
  }, [topic]);

  const initializeGame = () => {
    if (!topic) return;
    
    // Pick 4 random words for a 4x2 grid
    const selectedWords = [...topic.words].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const newCards: Card[] = [];
    selectedWords.forEach((word) => {
      newCards.push({
        id: `${word.id}-text`,
        wordId: word.id,
        type: 'text',
        content: word.english,
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: `${word.id}-image`,
        wordId: word.id,
        type: 'image',
        content: word.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(newCards.sort(() => 0.5 - Math.random()));
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setIsGameOver(false);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newCards[index].type === 'text') {
      playAudio(newCards[index].content);
    }

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (newCards[firstIndex].wordId === newCards[secondIndex].wordId) {
        // Match
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatches(matches + 1);
          playAudio('Match!');
          
          if (matches + 1 === 4) {
            setIsGameOver(true);
            addStars(5);
            playAudio('You win!');
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
            });
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  if (!topic) return <div>Topic not found</div>;

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
        <h2 className="text-4xl font-black text-slate-800 mb-4">You Win!</h2>
        <div className="text-6xl mb-6">🏆</div>
        <p className="text-2xl font-bold text-slate-600 mb-2">
          Moves: {moves}
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
          <span className="font-bold text-slate-600 text-sm uppercase tracking-wider">Moves: {moves}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-wider mb-8">
          Memory Match
        </h3>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative aspect-[4/3] cursor-pointer perspective-1000"
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              >
                {/* Front of card (hidden) */}
                <div className="absolute w-full h-full backface-hidden bg-indigo-500 rounded-2xl shadow-md border-4 border-indigo-600 flex items-center justify-center">
                  <span className="text-4xl opacity-50">❓</span>
                </div>
                
                {/* Back of card (revealed) */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-md border-4 border-slate-200 flex items-center justify-center rotate-y-180">
                  {card.type === 'image' ? (
                    <span className="text-6xl">{card.content}</span>
                  ) : (
                    <span className="text-2xl font-black text-slate-800">{card.content}</span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
