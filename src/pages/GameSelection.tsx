import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TOPICS } from '../data/mockData';
import { ChevronLeft, Image, Headphones, LayoutGrid, Link, Star } from 'lucide-react';

export default function GameSelection() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) return <div>Topic not found</div>;

  const games = [
    { id: 'choose-image', title: 'Choose Image', desc: 'Read & Pick', icon: Image, color: 'bg-pink-400' },
    { id: 'listen-choose', title: 'Listen & Pick', desc: 'Hear & Pick', icon: Headphones, color: 'bg-purple-400' },
    { id: 'memory', title: 'Memory Match', desc: 'Flip & Match', icon: LayoutGrid, color: 'bg-cyan-400' },
    { id: 'match', title: 'Word Match', desc: 'Connect them', icon: Link, color: 'bg-lime-400' },
    { id: 'spelling', title: 'Spelling Master', desc: 'Drag & Spell', icon: Star, color: 'bg-amber-400' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(`/topic/${topicId}`)}
          className="bg-white p-3 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Mini Games 🎮</h2>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{topic.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/game/${topicId}/${game.id}`)}
            className={`${game.color} text-white p-6 rounded-3xl shadow-md border-b-4 border-black/20 flex items-center gap-6 relative overflow-hidden`}
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <game.icon size={32} strokeWidth={2.5} />
            </div>
            <div className="text-left z-10">
              <h3 className="text-2xl font-black tracking-tight mb-1">{game.title}</h3>
              <p className="text-sm font-bold opacity-90 uppercase tracking-wider">{game.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
