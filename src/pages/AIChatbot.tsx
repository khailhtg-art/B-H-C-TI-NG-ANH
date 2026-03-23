import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { Send, Image as ImageIcon, Loader2, Bot, User, X } from 'lucide-react';

export default function AIChatbot() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; image?: string }[]>([
    { role: 'model', text: 'Hello! I am Leo the Lion 🦁. Ask me anything or show me a picture!' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage = { role: 'user' as const, text: input, image: selectedImage || undefined };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const parts: any[] = [];
      
      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        const mimeType = selectedImage.split(';')[0].split(':')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      }
      
      if (input.trim()) {
        parts.push({ text: input });
      } else if (selectedImage) {
        parts.push({ text: "What is this? Teach me the vocabulary in English and Vietnamese." });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: "You are Leo the Lion 🦁, a friendly English teacher for 7-year-old Vietnamese kids. Answer their questions simply, using a mix of simple English and Vietnamese. Be encouraging and fun! Use emojis. If they show you an image, tell them what it is in English and Vietnamese. Keep answers short.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        },
      });

      setMessages((prev) => [...prev, { role: 'model', text: response.text || 'Oops, I did not understand that.' }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, I am having trouble thinking right now. 😿' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4">
      <div className="flex items-center gap-3 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-inner">
          🦁
        </div>
        <div>
          <h2 className="font-extrabold text-slate-800 text-lg tracking-tight">Ask Leo</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Your AI Teacher</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-yellow-400 text-2xl'}`}>
              {msg.role === 'user' ? <User size={16} /> : '🦁'}
            </div>
            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
              {msg.image && (
                <img src={msg.image} alt="Uploaded" className="w-full rounded-xl mb-2 object-cover max-h-48" />
              )}
              <p className="whitespace-pre-wrap font-medium leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-2xl shrink-0">🦁</div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center">
              <Loader2 className="animate-spin text-slate-400" size={20} />
              <span className="ml-2 text-slate-500 font-medium text-sm">Leo is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-3 rounded-3xl shadow-md border border-slate-200 flex flex-col gap-2 relative">
        {selectedImage && (
          <div className="relative w-20 h-20 ml-2 mb-2">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover rounded-xl border-2 border-indigo-200" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <ImageIcon size={24} />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Leo something..."
            className="flex-1 bg-slate-50 border-none focus:ring-0 px-4 py-3 rounded-2xl text-slate-700 font-medium placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className="bg-indigo-500 text-white p-3 rounded-full shadow-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
