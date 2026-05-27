import React from 'react';
import { Language } from '../types';
import { Globe, ExternalLink, Moon, Sun, Smartphone } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  theme,
  setTheme
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#010409]/80 border-b border-[#30363d] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2f81f7] to-[#1f6feb] text-white shadow-md shadow-[#2f81f7]/20">
            <Smartphone className="w-5 h-5 absolute -translate-x-1" />
            {/* Custom GitHub mini icon */}
            <div className="absolute translate-x-2 translate-y-2 bg-[#010409] rounded-full p-0.5">
              <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-[#c9d1d9] to-[#8b949e] bg-clip-text text-transparent">
                MGit <span className="text-[#2f81f7]">+</span> GitHub
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#238636]/10 text-[#3fb950] border border-[#238636]/30">
                {language === 'hi' ? 'एंड्रॉइड गाइड' : 'Android Guide'}
              </span>
            </div>
            <p className="text-xs text-[#7d8590] hidden sm:block">
              {language === 'hi' 
                ? 'स्मार्टफोन से गिटहब पर कोड अपलोड करें' 
                : 'Upload Code directly from your Smartphone'}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Direct Token Link */}
          <a
            href="https://github.com/settings/tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-all"
            title={language === 'hi' ? 'GitHub पर नया टोकन बनाएँ' : 'Generate new token on GitHub'}
          >
            <span className="text-[#e3b341]">🔑</span>
            <span>{language === 'hi' ? 'PAT बनाएँ' : 'Create PAT'}</span>
            <ExternalLink className="w-3 h-3 text-[#7d8590]" />
          </a>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-all"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-[#2f81f7]" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#e3b341]" />
            ) : (
              <Moon className="w-4 h-4 text-[#2f81f7]" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
