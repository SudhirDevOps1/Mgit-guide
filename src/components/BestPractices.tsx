import React, { useState } from 'react';
import { Language } from '../types';
import { BEST_PRACTICES_DATA } from '../data/guideData';
import { Award, Star, Zap, BookOpen } from 'lucide-react';

interface BestPracticesProps {
  language: Language;
}

export const BestPractices: React.FC<BestPracticesProps> = ({ language }) => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredPractices = selectedLevel === 'all' 
    ? BEST_PRACTICES_DATA 
    : BEST_PRACTICES_DATA.filter(p => p.level === selectedLevel);

  const getLevelColor = (level: string) => {
    if (level === 'beginner') return 'bg-emerald-500';
    if (level === 'intermediate') return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getLevelLabel = (level: string) => {
    if (level === 'beginner') return language === 'hi' ? 'शुरुआती' : 'Beginner';
    if (level === 'intermediate') return language === 'hi' ? 'मध्यम' : 'Intermediate';
    return language === 'hi' ? 'उन्नत' : 'Advanced';
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-[#161b22] to-[#0d1117] rounded-3xl p-8 border border-[#30363d]">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#3fb950] to-[#2ea043]">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tighter">
              {language === 'hi' ? 'मोबाइल बेस्ट प्रैक्टिसेज' : 'Mobile Best Practices'}
            </h2>
            <p className="text-[#8b949e] text-sm mt-1 max-w-md">
              {language === 'hi' 
                ? 'एंड्रॉइड पर GitHub के साथ प्रोफेशनल तरीके से काम करने के १००% प्रैक्टिकल टिप्स' 
                : 'Production-grade habits for working with GitHub professionally from your Android device'}
            </p>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex gap-2 mb-8 border-b border-[#30363d] pb-6">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all flex items-center gap-2 ${
                selectedLevel === level 
                  ? 'bg-white text-black shadow-lg' 
                  : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]'
              }`}
            >
              {level === 'all' && <BookOpen className="w-4 h-4" />}
              {level === 'beginner' && <Star className="w-4 h-4" />}
              {level === 'intermediate' && <Zap className="w-4 h-4" />}
              {level !== 'all' && getLevelLabel(level)}
              {level === 'all' && (language === 'hi' ? 'सभी' : 'All')}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredPractices.map((practice) => (
            <div key={practice.id} className="group bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] rounded-2xl p-6 transition-all">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
                  {practice.emoji}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-white">
                      {language === 'hi' ? practice.title.hi : practice.title.en}
                    </h3>
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full text-white ${getLevelColor(practice.level)}`}>
                      {getLevelLabel(practice.level)}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-[#c9d1d9] leading-relaxed text-[15px]">
                    {language === 'hi' ? practice.description.hi : practice.description.en}
                  </p>

                  <div className="mt-6">
                    <div className="text-xs uppercase text-[#8b949e] font-medium mb-3 tracking-widest">
                      {language === 'hi' ? 'प्रैक्टिकल टिप्स:' : 'Practical Tips:'}
                    </div>
                    <div className="space-y-3">
                      {practice.tips.map((tip, index) => (
                        <div key={index} className="flex gap-3 text-sm">
                          <div className="text-[#3fb950] font-mono text-xs mt-1.5">↳</div>
                          <div className="text-[#c9d1d9]">{tip}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-[#8b949e] bg-[#161b22] border border-[#30363d] p-6 rounded-2xl">
        💡 {language === 'hi' 
          ? 'ये प्रैक्टिसेज अपनाने से आपका GitHub वर्कफ़्लो 10x बेहतर और प्रोफेशनल हो जाएगा।' 
          : 'Following these practices will make your GitHub workflow 10× cleaner and more professional.'}
      </div>
    </div>
  );
};
