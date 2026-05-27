import React from 'react';
import { Language } from '../types';
import { ArrowDown, Play, ShieldCheck, WifiOff, Laptop } from 'lucide-react';

interface HeroProps {
  language: Language;
  onStartGuide: () => void;
  onOpenSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onStartGuide,
  onOpenSimulator
}) => {
  return (
    <div className="relative overflow-hidden py-12 md:py-20 border-b border-[#30363d] bg-gradient-to-b from-[#010409] via-[#0d1117] to-[#161b22]">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#2f81f7]/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#238636]/10 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Top Mini Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-[#3fb950] animate-pulse" />
          {language === 'hi' 
            ? 'अपडेटेड 2026 : GitHub Classic & Fine-grained PAT सपोर्ट' 
            : 'Updated 2026 : GitHub Classic & Fine-grained PAT Support'}
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {language === 'hi' ? (
            <>
              स्मार्टफोन से <span className="bg-gradient-to-r from-[#58a6ff] via-[#2f81f7] to-[#bc8cff] bg-clip-text text-transparent">GitHub</span> पर<br />
              कोड अपलोड करें
            </>
          ) : (
            <>
              Upload Code to <span className="bg-gradient-to-r from-[#58a6ff] via-[#2f81f7] to-[#bc8cff] bg-clip-text text-transparent">GitHub</span><br />
              From Your Android
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-[#8b949e] max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'hi' 
            ? 'बिना कंप्यूटर के अपने मोबाइल पर कोडिंग करें। MGit की मदद से लोकल रिपॉजिटरी को क्लोन, एडिट, कमिट और पुश करने की पूरी स्टेप-बाय-स्टेप मास्टर गाइड।'
            : 'Code on the go without a computer. The definitive master guide to clone, edit, commit, and push repositories directly from your Android device using MGit.'}
        </p>

        {/* Key Features Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs text-[#c9d1d9]">
          <div className="flex items-center gap-1.5 bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d]">
            <Laptop className="w-4 h-4 text-[#f0883e]" />
            <span>{language === 'hi' ? 'कंप्यूटर की जरूरत नहीं' : 'No PC Required'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d]">
            <ShieldCheck className="w-4 h-4 text-[#3fb950]" />
            <span>{language === 'hi' ? 'सुरक्षित Token ऑथेंटिकेशन' : 'Secure Token Auth'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d]">
            <WifiOff className="w-4 h-4 text-[#2f81f7]" />
            <span>{language === 'hi' ? '100% ऑफलाइन कोडिंग' : '100% Offline Coding'}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartGuide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm shadow-lg shadow-[#238636]/20 transition-all active:scale-95 cursor-pointer"
          >
            <span>{language === 'hi' ? 'स्टेप-बाय-स्टेप गाइड शुरू करें' : 'Start Step-by-Step Guide'}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenSimulator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-semibold text-sm border border-[#30363d] transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#58a6ff]" />
            <span>{language === 'hi' ? 'गिट वर्कफ़्लो सिम्युलेटर देखें' : 'Try Git Workflow Simulator'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
