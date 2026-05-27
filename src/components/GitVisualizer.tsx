import React, { useState } from 'react';
import { Language } from '../types';
import { Smartphone, Layers, Database, Cloud, ArrowRight, RefreshCw } from 'lucide-react';

interface GitVisualizerProps {
  language: Language;
}

type SimState = 'idle' | 'cloned' | 'edited' | 'staged' | 'committed' | 'pushed';

export const GitVisualizer: React.FC<GitVisualizerProps> = ({ language }) => {
  const [simState, setSimState] = useState<SimState>('idle');
  const [animating, setAnimating] = useState(false);
  const [activePacket, setActivePacket] = useState<string | null>(null);

  const triggerAnimation = (nextState: SimState, packetName: string) => {
    if (animating) return;
    setAnimating(true);
    setActivePacket(packetName);

    setTimeout(() => {
      setSimState(nextState);
      setAnimating(false);
      setActivePacket(null);
    }, 1500);
  };

  const handleReset = () => {
    setSimState('idle');
    setAnimating(false);
    setActivePacket(null);
  };

  // Define nodes and their active statuses
  const nodes = [
    {
      id: 'phone',
      title: language === 'hi' ? 'फोन स्टोरेज' : 'Phone Storage',
      subtitle: 'Internal Storage/MGit',
      icon: Smartphone,
      color: 'border-[#2f81f7] text-[#2f81f7]',
      bgColor: 'bg-[#2f81f7]/10',
      activeCondition: ['cloned', 'edited', 'staged', 'committed', 'pushed'].includes(simState),
      hasChanges: simState === 'edited'
    },
    {
      id: 'stage',
      title: language === 'hi' ? 'स्टेजिंग एरिया' : 'Staging Area',
      subtitle: 'git add .',
      icon: Layers,
      color: 'border-[#e3b341] text-[#e3b341]',
      bgColor: 'bg-[#e3b341]/10',
      activeCondition: ['staged', 'committed', 'pushed'].includes(simState),
      hasChanges: simState === 'staged'
    },
    {
      id: 'local',
      title: language === 'hi' ? 'लोकल रिपो' : 'Local Repo',
      subtitle: 'git commit',
      icon: Database,
      color: 'border-[#3fb950] text-[#3fb950]',
      bgColor: 'bg-[#3fb950]/10',
      activeCondition: ['committed', 'pushed'].includes(simState),
      hasChanges: simState === 'committed'
    },
    {
      id: 'remote',
      title: language === 'hi' ? 'गिटहब रिमोट' : 'GitHub Remote',
      subtitle: 'git push',
      icon: Cloud,
      color: 'border-[#bc8cff] text-[#bc8cff]',
      bgColor: 'bg-[#bc8cff]/10',
      activeCondition: simState === 'pushed',
      hasChanges: simState === 'pushed'
    }
  ];

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-4 sm:p-8 overflow-hidden">
      
      {/* Top Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2f81f7]/10 text-[#58a6ff] text-xs font-medium border border-[#2f81f7]/20 mb-2">
            <span>🔬 {language === 'hi' ? 'लाइव सिमुलेशन' : 'Live Simulation'}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {language === 'hi' ? 'गिट आर्किटेक्चर विज़ुअलाइज़र' : 'Git Architecture Visualizer'}
          </h3>
          <p className="text-xs text-[#8b949e]">
            {language === 'hi' 
              ? 'नीचे दिए गए बटनों को क्रम से दबाकर देखें कि गिट में कोड एक जगह से दूसरी जगह कैसे जाता है।' 
              : 'Press the actions sequentially to visualize how code travels through the Git lifecycle.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-xs text-[#c9d1d9] border border-[#30363d] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'सिमुलेशन रीसेट करें' : 'Reset Simulation'}</span>
        </button>
      </div>

      {/* Graphical Node Flow */}
      <div className="relative py-8 my-4">
        
        {/* Connecting Lines */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#21262d] -translate-y-1/2 z-0 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            
            return (
              <div key={node.id} className="flex flex-col items-center">
                
                {/* Node Box */}
                <div className={`w-full max-w-[200px] p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 relative ${
                  node.activeCondition 
                    ? `${node.bgColor} ${node.color} shadow-lg` 
                    : 'bg-[#0d1117] border-[#21262d] text-[#7d8590]'
                }`}>
                  
                  {/* Absolute Badge if currently holding changes */}
                  {node.hasChanges && (
                    <span className="absolute -top-2.5 right-2 bg-[#58a6ff] text-[#010409] text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                      {language === 'hi' ? 'सक्रिय डेटा' : 'Active Data'}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${node.activeCondition ? 'bg-current/10' : 'bg-[#161b22]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold tracking-tight truncate text-white">
                      {node.title}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#8b949e] truncate border-t border-current/10 pt-1.5">
                    {node.subtitle}
                  </div>

                  {/* Node Status Inside */}
                  <div className="mt-2 text-[10px] font-medium flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${node.activeCondition ? 'bg-current' : 'bg-[#30363d]'}`} />
                    <span>
                      {node.activeCondition 
                        ? (language === 'hi' ? 'सिंकड' : 'Synced') 
                        : (language === 'hi' ? 'खाली' : 'Empty')}
                    </span>
                  </div>

                </div>

                {/* Mobile Connector Arrow */}
                {idx < nodes.length - 1 && (
                  <div className="my-2 text-[#30363d] block md:hidden">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Live Animated Transit Packet */}
        {animating && activePacket && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#e3b341] text-[#010409] px-3 py-1 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#010409] animate-ping" />
            <span>{activePacket}</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        )}

      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-6 pt-6 border-t border-[#21262d]">
        <div className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-3 text-center sm:text-left">
          {language === 'hi' ? 'सिमुलेशन ऑपरेशन्स (क्लिक करें):' : 'Simulation Actions (Click to trigger):'}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          
          {/* Action 1: Clone */}
          <button
            disabled={animating || simState !== 'idle'}
            onClick={() => triggerAnimation('cloned', language === 'hi' ? 'क्लोनिंग...' : 'Cloning...')}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
              simState === 'idle'
                ? 'bg-[#2f81f7] text-white border-[#2f81f7] shadow-md hover:bg-[#1f6feb] cursor-pointer'
                : 'bg-[#21262d] text-[#7d8590] border-[#30363d] opacity-50 cursor-not-allowed'
            }`}
          >
            <span>📥 {language === 'hi' ? '1. क्लोन' : '1. Clone'}</span>
            <span className="text-[9px] font-normal opacity-80">GitHub → Phone</span>
          </button>

          {/* Action 2: Edit */}
          <button
            disabled={animating || simState !== 'cloned'}
            onClick={() => triggerAnimation('edited', language === 'hi' ? 'फाइल सेविंग...' : 'Saving files...')}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
              simState === 'cloned'
                ? 'bg-[#238636] text-white border-[#238636] shadow-md hover:bg-[#2ea043] cursor-pointer'
                : 'bg-[#21262d] text-[#7d8590] border-[#30363d] opacity-50 cursor-not-allowed'
            }`}
          >
            <span>✏️ {language === 'hi' ? '2. एडिट' : '2. Edit'}</span>
            <span className="text-[9px] font-normal opacity-80">Modify files</span>
          </button>

          {/* Action 3: Stage */}
          <button
            disabled={animating || simState !== 'edited'}
            onClick={() => triggerAnimation('staged', language === 'hi' ? 'स्टेजिंग...' : 'Staging...')}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
              simState === 'edited'
                ? 'bg-[#e3b341] text-[#010409] border-[#e3b341] shadow-md hover:bg-[#f0883e] cursor-pointer'
                : 'bg-[#21262d] text-[#7d8590] border-[#30363d] opacity-50 cursor-not-allowed'
            }`}
          >
            <span>📌 {language === 'hi' ? '3. स्टेज' : '3. Stage'}</span>
            <span className="text-[9px] font-normal opacity-80">git add .</span>
          </button>

          {/* Action 4: Commit */}
          <button
            disabled={animating || simState !== 'staged'}
            onClick={() => triggerAnimation('committed', language === 'hi' ? 'कमिटिंग...' : 'Committing...')}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
              simState === 'staged'
                ? 'bg-[#3fb950] text-white border-[#3fb950] shadow-md hover:bg-[#2ea043] cursor-pointer'
                : 'bg-[#21262d] text-[#7d8590] border-[#30363d] opacity-50 cursor-not-allowed'
            }`}
          >
            <span>✔️ {language === 'hi' ? '4. कमिट' : '4. Commit'}</span>
            <span className="text-[9px] font-normal opacity-80">Save locally</span>
          </button>

          {/* Action 5: Push */}
          <button
            disabled={animating || simState !== 'committed'}
            onClick={() => triggerAnimation('pushed', language === 'hi' ? 'पुशिंग...' : 'Pushing...')}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
              simState === 'committed'
                ? 'bg-[#bc8cff] text-[#010409] border-[#bc8cff] shadow-md hover:bg-[#d2a8ff] cursor-pointer'
                : 'bg-[#21262d] text-[#7d8590] border-[#30363d] opacity-50 cursor-not-allowed'
            }`}
          >
            <span>🚀 {language === 'hi' ? '5. पुश' : '5. Push'}</span>
            <span className="text-[9px] font-normal opacity-80">Local → Cloud</span>
          </button>

        </div>

        {/* Dynamic Status message */}
        <div className="mt-4 text-center">
          <p className="text-xs text-[#8b949e]">
            {simState === 'idle' && (language === 'hi' ? '💡 शुरू करने के लिए "1. क्लोन" पर क्लिक करें।' : '💡 Click "1. Clone" to begin the simulation.')}
            {simState === 'cloned' && (language === 'hi' ? '📁 रिपॉजिटरी डाउनलोड हो गई। अब कोड में बदलाव करने के लिए "2. एडिट" दबाएँ।' : '📁 Repository downloaded. Click "2. Edit" to make changes.')}
            {simState === 'edited' && (language === 'hi' ? '⚠️ कोड बदल गया है। इसे गिट में जोड़ने के लिए "3. स्टेज" दबाएँ।' : '⚠️ Code modified. Click "3. Stage" to prepare files.')}
            {simState === 'staged' && (language === 'hi' ? '📦 फाइलें स्टेज हो गईं। फोन में पक्का करने के लिए "4. कमिट" दबाएँ।' : '📦 Files staged. Click "4. Commit" to save a local checkpoint.')}
            {simState === 'committed' && (language === 'hi' ? '🔒 कमिट हो गया! अब दुनिया के सामने लाइव करने के लिए "5. पुश" दबाएँ।' : '🔒 Committed! Click "5. Push" to publish to the GitHub cloud.')}
            {simState === 'pushed' && (
              <span className="text-[#3fb950] font-bold">
                🎉 {language === 'hi' ? 'सफलता! आपका कोड GitHub पर अपलोड हो चुका है!' : 'Success! Your code is now live on GitHub!'}
              </span>
            )}
          </p>
        </div>

      </div>

    </div>
  );
};
