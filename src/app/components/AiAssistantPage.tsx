import React from 'react';
import { Sidebar } from './ai-chat/Sidebar';
import { SystemPanel } from './ai-chat/SystemPanel';
import { ChatWindow } from './ai-chat/ChatWindow';

export default function AiAssistantPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#030712] text-slate-200 font-sans overflow-hidden flex relative selection:bg-cyan-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030712] to-[#030712] pointer-events-none" />
      
      <Sidebar />

      <main className="flex-1 flex flex-col relative z-10 bg-black/20 backdrop-blur-sm">
        <ChatWindow />
      </main>

      <SystemPanel />
    </div>
  );
}
