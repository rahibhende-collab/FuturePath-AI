import React from 'react';
import { Terminal, Settings, MessageSquare, FolderGit2 } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-16 lg:w-64 border-r border-cyan-900/30 bg-black/40 backdrop-blur-xl flex flex-col py-6 z-10 transition-all text-slate-200">
      <div className="flex items-center justify-center lg:justify-start lg:px-6 mb-8">
        <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)]">
          <Terminal className="text-cyan-400 w-4 h-4" />
        </div>
        <span className="hidden lg:block ml-3 font-mono text-sm text-cyan-400 font-bold tracking-wider">CORE_AI</span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1 px-3">
        <button className="flex items-center gap-3 p-3 text-cyan-400 bg-cyan-500/10 rounded-lg transition-colors group relative">
          <MessageSquare className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block text-sm font-mono">Active Session</span>
        </button>
        <button className="flex items-center gap-3 p-3 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors group relative">
          <FolderGit2 className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block text-sm font-mono">Workspaces</span>
        </button>
        <button className="flex items-center gap-3 p-3 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors group relative mt-auto">
          <Settings className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block text-sm font-mono">Settings</span>
        </button>
      </nav>
    </aside>
  );
};
