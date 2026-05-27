import React, { useState } from 'react';
import { Language } from '../types';
import { SCOPES_DATA } from '../data/guideData';
import { KeyRound, Check, Info, ExternalLink } from 'lucide-react';

interface TokenHelperProps {
  language: Language;
}

export const TokenHelper: React.FC<TokenHelperProps> = ({ language }) => {
  // Select scopes based on user choice. Default to standard repo + workflow
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['repo', 'workflow']);

  const handleToggleScope = (id: string) => {
    if (selectedScopes.includes(id)) {
      // Keep at least repo if possible, but allow toggle
      setSelectedScopes(selectedScopes.filter(s => s !== id));
    } else {
      setSelectedScopes([...selectedScopes, id]);
    }
  };

  const selectPreset = (preset: 'minimal' | 'standard' | 'all') => {
    if (preset === 'minimal') setSelectedScopes(['repo']);
    if (preset === 'standard') setSelectedScopes(['repo', 'workflow']);
    if (preset === 'all') setSelectedScopes(SCOPES_DATA.map(s => s.id));
  };

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#e3b341]/10 text-[#e3b341] border border-[#e3b341]/20">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {language === 'hi' ? 'इंटरैक्टिव PAT स्कोप चेकर' : 'Interactive PAT Scope Checker'}
          </h3>
          <p className="text-xs text-[#8b949e] mt-0.5">
            {language === 'hi'
              ? 'चुनें कि आप MGit से क्या करना चाहते हैं, और यह टूल आपको बताएगा कि GitHub पर कौन से बॉक्स (Scopes) टिक करने हैं।'
              : 'Select what you want to do with MGit, and this tool will show you exactly which Scopes to check on GitHub.'}
          </p>
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="text-xs font-bold text-[#8b949e] uppercase tracking-wider block mb-2">
          {language === 'hi' ? 'क्विक प्रीसेट चुनें:' : 'Choose Quick Preset:'}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => selectPreset('minimal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedScopes.length === 1 && selectedScopes.includes('repo')
                ? 'bg-[#2f81f7] text-white border-[#2f81f7]'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#21262d] hover:border-[#30363d]'
            }`}
          >
            {language === 'hi' ? 'सिर्फ कोड पुश/पुल' : 'Only Push/Pull Code'}
          </button>

          <button
            onClick={() => selectPreset('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedScopes.length === 2 && selectedScopes.includes('repo') && selectedScopes.includes('workflow')
                ? 'bg-[#2f81f7] text-white border-[#2f81f7]'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#21262d] hover:border-[#30363d]'
            }`}
          >
            {language === 'hi' ? 'स्टैंडर्ड (सुझाया गया)' : 'Standard (Recommended)'}
          </button>

          <button
            onClick={() => selectPreset('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedScopes.length === SCOPES_DATA.length
                ? 'bg-[#2f81f7] text-white border-[#2f81f7]'
                : 'bg-[#0d1117] text-[#c9d1d9] border-[#21262d] hover:border-[#30363d]'
            }`}
          >
            {language === 'hi' ? 'सभी स्कोप्स' : 'All Available Scopes'}
          </button>
        </div>
      </div>

      {/* Scopes List */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-[#8b949e] uppercase tracking-wider block mb-1">
          {language === 'hi' ? 'आवश्यक स्कोप्स (GitHub पर इन्हें टिक करें):' : 'Required Scopes (Check these on GitHub):'}
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SCOPES_DATA.map((scope) => {
            const isSelected = selectedScopes.includes(scope.id);

            return (
              <div
                key={scope.id}
                onClick={() => handleToggleScope(scope.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected 
                    ? 'bg-[#238636]/10 border-[#3fb950] text-white' 
                    : 'bg-[#0d1117] border-[#21262d] text-[#7d8590] hover:border-[#30363d]'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  isSelected 
                    ? 'bg-[#3fb950] border-[#3fb950] text-white' 
                    : 'border-[#30363d] text-transparent'
                }`}>
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#3fb950]' : 'text-[#8b949e]'}`}>
                      {scope.name}
                    </span>
                    {scope.recommended && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d]">
                        {language === 'hi' ? 'ज़रूरी' : 'Required'}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-[#c9d1d9]' : 'text-[#7d8590]'}`}>
                    {language === 'hi' ? scope.description.hi : scope.description.en}
                  </p>

                  {/* Required for tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {scope.requiredFor.map((req, idx) => (
                      <span key={idx} className="text-[9px] px-1 bg-[#010409] text-[#8b949e] rounded border border-[#21262d]">
                        {req}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Info & Direct Link */}
      <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <Info className="w-4 h-4 text-[#58a6ff] flex-shrink-0" />
          <span>
            {language === 'hi' 
              ? 'टिप: "Expiration" को 90 दिन सेट करें ताकि टोकन सुरक्षित रहे।' 
              : 'Tip: Set "Expiration" to 90 days for optimal security.'}
          </span>
        </div>

        <a
          href="https://github.com/settings/tokens/new"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold transition-all"
        >
          <span>{language === 'hi' ? 'GitHub पर टोकन बनाएँ' : 'Generate Token on GitHub'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
