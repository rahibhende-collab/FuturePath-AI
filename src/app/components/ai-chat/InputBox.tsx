import React, { useState } from 'react';
import { Terminal, Mic } from 'lucide-react';

export const InputBox = ({ onSend, disabled }: { onSend: (text: string) => void, disabled: boolean }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-2xl z-0 transition-opacity opacity-50 group-focus-within:opacity-100" />
      
      <div className="relative z-10 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2 flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.1)] focus-within:border-cyan-400/60 transition-all">
        <Terminal className="text-cyan-500 w-5 h-5 ml-2 opacity-70" />
        
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "Processing..." : "Enter command or query, Akib..."}
          className="flex-1 bg-transparent border-none text-slate-200 focus:outline-none font-mono text-sm placeholder:text-slate-600 disabled:opacity-50"
          autoFocus
        />
        
        <button type="button" className="p-2 hover:bg-cyan-900/40 rounded-lg transition-colors">
          <Mic className="text-cyan-500/70 hover:text-cyan-400 w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
