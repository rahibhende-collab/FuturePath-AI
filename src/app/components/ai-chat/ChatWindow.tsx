import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageBubble } from './MessageBubble';
import { InputBox } from './InputBox';
import { WaveformVisualizer } from './WaveformVisualizer';
import { Activity } from 'lucide-react';

export const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'System initialized. Ready for developer tasks, Akib.' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'I have analyzed the React build logs. The backend API is responding in 220ms. Would you like me to optimize the queries?' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full p-4">
      <header className="flex justify-between items-center pb-4 border-b border-cyan-900/30 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
          <span className="font-mono text-sm text-cyan-400 tracking-wider">CORE_LINK // ACTIVE</span>
        </div>
        <span className="font-mono text-xs text-slate-500">{new Date().toLocaleTimeString()}</span>
      </header>

      <div className="flex-shrink-0 py-2">
        <WaveformVisualizer isThinking={isThinking} />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col space-y-4 pb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} sender={msg.sender as 'user' | 'ai'} text={msg.text} />
        ))}
        
        {isThinking && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="self-start flex flex-col"
          >
            <span className="text-[10px] font-mono text-cyan-500/50 mb-1 uppercase tracking-wider block">CORE // AI</span>
            <div className="flex items-center gap-3 bg-black/60 border border-cyan-500/30 p-3 rounded-xl w-32">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400/70 font-mono text-xs animate-pulse">Processing...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="pt-4 mt-auto">
        <InputBox onSend={handleSendMessage} disabled={isThinking} />
      </div>
    </div>
  );
};
