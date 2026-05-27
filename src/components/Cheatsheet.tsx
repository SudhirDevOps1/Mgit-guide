import React from 'react';
import { Language } from '../types';
import { CHEATSHEET_DATA } from '../data/guideData';
import { Terminal, Smartphone, ArrowRight } from 'lucide-react';

interface CheatsheetProps {
  language: Language;
}

export const Cheatsheet: React.FC<CheatsheetProps> = ({ language }) => {
  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {language === 'hi' ? 'गिट CLI बनाम MGit चीटशीट' : 'Git CLI vs MGit Cheatsheet'}
          </h3>
          <p className="text-xs text-[#8b949e] mt-0.5">
            {language === 'hi'
              ? 'टर्मिनल गिट कमांड्स को एंड्रॉइड MGit के टच एक्शन्स के साथ सीधे समझें।'
              : 'Directly map standard terminal Git commands to Android MGit touch actions.'}
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          
          <thead>
            <tr className="border-b border-[#30363d] text-[11px] font-bold text-[#8b949e] uppercase tracking-wider bg-[#0d1117]">
              <th className="py-3 px-4 rounded-tl-xl w-1/3">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>{language === 'hi' ? 'गिट कमांड (CLI)' : 'Git Command (CLI)'}</span>
                </div>
              </th>
              
              <th className="py-3 px-4 w-1/3">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#3fb950]" />
                  <span>{language === 'hi' ? 'MGit एक्शन' : 'MGit Action'}</span>
                </div>
              </th>

              <th className="py-3 px-4 rounded-tr-xl w-1/3">
                <span>{language === 'hi' ? 'विवरण' : 'Description'}</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#21262d] text-xs">
            {CHEATSHEET_DATA.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#0d1117]/50 transition-colors">
                
                {/* Git Command */}
                <td className="py-3 px-4 font-mono text-[#58a6ff] font-semibold">
                  <div className="bg-[#010409] inline-block px-2 py-1 rounded border border-[#21262d]">
                    {item.gitCommand}
                  </div>
                </td>

                {/* MGit Action */}
                <td className="py-3 px-4 text-[#e6edf3] font-medium">
                  <div className="flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-[#7d8590] hidden sm:inline" />
                    <span>{language === 'hi' ? item.mgitAction.hi : item.mgitAction.en}</span>
                  </div>
                </td>

                {/* Description */}
                <td className="py-3 px-4 text-[#8b949e] leading-relaxed">
                  {language === 'hi' ? item.description.hi : item.description.en}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pro Hint */}
      <div className="p-3 rounded-xl bg-[#0d1117] text-[11px] text-[#7d8590] text-center border border-[#21262d]">
        {language === 'hi'
          ? '💡 MGit बैकग्राउंड में असली गिट बाइनरीज़ का ही उपयोग करता है, इसलिए आपके कमिट्स पूरी तरह से प्रमाणित (Verified) होते हैं।'
          : '💡 MGit uses authentic compiled Git binaries natively, so your commits are identically structured and fully standard.'}
      </div>

    </div>
  );
};
