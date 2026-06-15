import React from 'react';
import { motion } from 'motion/react';

export const MessageBubble = ({ sender, text }: { sender: 'ai' | 'user', text: string }) => {
  const isUser = sender === 'user';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex flex-col max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
    >
      <span className="text-[10px] font-mono text-cyan-500/60 mb-1 uppercase tracking-wider">
        {isUser ? 'AKIB // USER' : 'CORE // AI'}
      </span>
      <div className={`p-3 rounded-xl backdrop-blur-md border text-sm leading-relaxed font-sans ${
        isUser 
          ? 'bg-blue-900/20 border-blue-500/20 text-slate-200' 
          : 'bg-black/60 border-cyan-500/30 text-cyan-50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
      }`}>
        {text}
      </div>
    </motion.div>
  );
};
