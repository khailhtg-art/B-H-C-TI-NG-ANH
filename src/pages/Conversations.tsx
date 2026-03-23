import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONVERSATIONS } from '../data/mockData';
import { Volume2, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<typeof CONVERSATIONS[0] | null>(null);
  const [currentLine, setCurrentLine] = useState(0);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Daily Conversations 💬</h2>
        <p className="text-slate-500 font-medium mt-1">Learn how to speak with friends!</p>
      </div>

      {!selectedConversation ? (
        <div className="grid grid-cols-1 gap-4">
          {CONVERSATIONS.map((conv, index) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedConversation(conv);
                setCurrentLine(0);
              }}
              className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all group"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img src={conv.image} alt={conv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-slate-800">{conv.title}</h3>
                <p className="text-sm font-medium text-slate-500">{conv.vietnameseTitle}</p>
              </div>
              <div className="ml-auto bg-indigo-50 p-2 rounded-full text-indigo-500">
                <Play size={20} fill="currentColor" />
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <button
            onClick={() => setSelectedConversation(null)}
            className="flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to list
          </button>

          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 mb-6">
            <div className="h-48 w-full relative">
              <img src={selectedConversation.image} alt={selectedConversation.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-black text-white tracking-tight">{selectedConversation.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLine}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-black text-indigo-600">
                      {selectedConversation.dialogue[currentLine].speaker[0]}
                    </div>
                    <span className="font-black text-slate-400 uppercase tracking-widest text-xs">
                      {selectedConversation.dialogue[currentLine].speaker}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 relative">
                    <p className="text-2xl font-bold text-slate-800 leading-relaxed mb-2">
                      "{selectedConversation.dialogue[currentLine].text}"
                    </p>
                    <p className="text-lg font-medium text-slate-400 italic">
                      {selectedConversation.dialogue[currentLine].vietnamese}
                    </p>
                    
                    <button
                      onClick={() => playAudio(selectedConversation.dialogue[currentLine].text)}
                      className="absolute -bottom-4 -right-4 bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setCurrentLine(Math.max(0, currentLine - 1))}
                disabled={currentLine === 0}
                className="p-3 rounded-2xl bg-white shadow-sm disabled:opacity-30"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-1">
                {selectedConversation.dialogue.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentLine ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentLine < selectedConversation.dialogue.length - 1) {
                    setCurrentLine(currentLine + 1);
                  } else {
                    setSelectedConversation(null);
                  }
                }}
                className="p-3 rounded-2xl bg-indigo-500 text-white shadow-md"
              >
                {currentLine === selectedConversation.dialogue.length - 1 ? 'Finish' : <ChevronRight size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
