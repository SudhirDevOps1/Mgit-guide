import React from 'react';
import { Language } from '../types';
import { Heart, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-[#30363d] bg-[#010409] text-[#7d8590] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#21262d]">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
              <span className="font-bold text-white text-sm">MGit + GitHub Guide</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              {language === 'hi'
                ? 'यह गाइड एंड्रॉइड डेवलपर्स और कोडिंग के छात्रों को बिना कंप्यूटर के सीधे स्मार्टफोन से GitHub पर कोड पुश करने में मदद करने के लिए बनाया गया है।'
                : 'This production-level guide helps Android developers and programming students securely push code directly from their smartphones without requiring a desktop.'}
            </p>
          </div>

          {/* Col 2: Downloads */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'MGit ऐप डाउनलोड करें' : 'Download MGit App'}
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://play.google.com/store/apps/details?id=com.manichord.mgit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline"
              >
                <span>Google Play Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://f-droid.org/en/packages/com.manichord.mgit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline"
              >
                <span>F-Droid Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/manichord/MGit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#e6edf3] hover:underline"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>MGit GitHub Source</span>
              </a>
            </div>
          </div>

          {/* Col 3: GitHub References */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Important Links'}
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#c9d1d9] hover:underline"
              >
                <span>GitHub Tokens Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#c9d1d9] hover:underline"
              >
                <span>GitHub PAT Official Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#f85149] fill-current animate-pulse" />
            <span>for Mobile Coders everywhere.</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] border border-[#30363d] transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>{language === 'hi' ? 'ऊपर जाएँ' : 'Back to Top'}</span>
          </button>

        </div>

      </div>
    </footer>
  );
};
