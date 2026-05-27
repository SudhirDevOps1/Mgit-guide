import React, { useState } from 'react';
import { StepData, Language } from '../types';
import { Copy, Terminal, HelpCircle, CheckCircle2, Circle } from 'lucide-react';

interface StepCardProps {
  step: StepData;
  language: Language;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenTroubleshooting: (tag: string) => void;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  language,
  isCompleted,
  onToggleComplete,
  onOpenTroubleshooting
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCLI = () => {
    if (step.cliEquivalent) {
      navigator.clipboard.writeText(step.cliEquivalent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to render inline custom SVG representations
  const renderSchematic = (type: StepData['imageSchematicType']) => {
    switch (type) {
      case 'token':
        return (
          <div className="bg-[#010409] rounded-xl p-3 border border-[#30363d] font-mono text-[11px] text-[#c9d1d9] select-none">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-2 mb-2">
              <span className="text-[#8b949e]">github.com/settings/tokens</span>
              <span className="bg-[#238636] text-white px-2 py-0.5 rounded text-[9px] font-sans font-bold">Classic Token</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[#8b949e]">Note:</span>
                <span className="text-[#58a6ff]">MGit-Android</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Select scopes:</span>
                <div className="mt-1 grid grid-cols-2 gap-1 bg-[#0d1117] p-1.5 rounded border border-[#21262d]">
                  <div className="flex items-center gap-1 text-[#3fb950]">
                    <span className="text-xs">☑</span> repo
                  </div>
                  <div className="flex items-center gap-1 text-[#3fb950]">
                    <span className="text-xs">☑</span> workflow
                  </div>
                  <div className="flex items-center gap-1 text-[#7d8590]">
                    <span className="text-xs">☐</span> admin:org
                  </div>
                  <div className="flex items-center gap-1 text-[#7d8590]">
                    <span className="text-xs">☐</span> gist
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <div className="text-[10px] text-[#8b949e]">Generated Token:</div>
                <div className="bg-[#161b22] text-[#e3b341] p-1 rounded border border-[#30363d] tracking-widest text-center">
                  ghp_••••••••••••••••••••••••••••••••
                </div>
              </div>
            </div>
          </div>
        );

      case 'clone':
        return (
          <div className="bg-[#0d1117] rounded-xl p-3 border border-[#30363d] font-sans text-[11px] text-[#c9d1d9] select-none">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-2 mb-2 bg-[#161b22] -mx-3 -mt-3 p-2 rounded-t-xl">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2f81f7]" />
                <span className="font-bold text-white">MGit</span>
              </div>
              <span className="text-[#8b949e] text-[10px]">Clone Remote</span>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-[9px] text-[#8b949e] block">Remote URL</label>
                <div className="bg-[#010409] p-1 rounded text-[#58a6ff] truncate border border-[#21262d]">
                  https://github.com/user/repo.git
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-[#8b949e] block">Username</label>
                  <div className="bg-[#010409] p-1 rounded text-[#c9d1d9] border border-[#21262d]">
                    developer
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-[#8b949e] block">Password</label>
                  <div className="bg-[#010409] p-1 rounded text-[#e3b341] border border-[#21262d] truncate">
                    ghp_token_here
                  </div>
                </div>
              </div>
              <div className="bg-[#2f81f7] text-white text-center py-1 rounded font-medium text-xs mt-1">
                CLONE
              </div>
            </div>
          </div>
        );

      case 'edit':
        return (
          <div className="bg-[#161b22] rounded-xl p-3 border border-[#30363d] font-mono text-[11px] text-[#c9d1d9] select-none">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5 mb-1.5 text-[10px]">
              <span className="text-[#8b949e]">📂 Storage/MGit/repo/</span>
              <span className="text-[#3fb950]">index.html</span>
            </div>
            <div className="bg-[#0d1117] p-2 rounded text-[10px] space-y-0.5 border border-[#21262d]">
              <div className="text-[#7d8590]">&lt;!DOCTYPE html&gt;</div>
              <div className="text-[#ff7b72]">&lt;<span className="text-[#7ee787]">html</span>&gt;</div>
              <div className="text-[#ff7b72] pl-2">&lt;<span className="text-[#7ee787]">body</span>&gt;</div>
              <div className="text-[#c9d1d9] pl-4">&lt;<span className="text-[#7ee787]">h1</span>&gt;Hello GitHub!&lt;/<span className="text-[#7ee787]">h1</span>&gt;</div>
              <div className="text-[#ff7b72] pl-2">&lt;/<span className="text-[#7ee787]">body</span>&gt;</div>
              <div className="text-[#ff7b72]">&lt;/<span className="text-[#7ee787]">html</span>&gt;</div>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[9px] text-[#8b949e]">
              <span>Modified 1 file</span>
              <span className="text-[#58a6ff]">MGit → Swipe down to refresh</span>
            </div>
          </div>
        );

      case 'stage':
        return (
          <div className="bg-[#0d1117] rounded-xl p-3 border border-[#30363d] font-sans text-[11px] text-[#c9d1d9] select-none">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5 mb-2">
              <span className="font-bold text-white text-xs">Status Tab</span>
              <span className="bg-[#21262d] px-1.5 py-0.5 rounded text-[9px] text-[#58a6ff]">☰ Menu → Add all</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between bg-[#161b22] p-1 px-2 rounded border-l-2 border-[#3fb950]">
                <span className="font-mono text-[#3fb950]">index.html</span>
                <span className="text-[9px] bg-[#238636]/20 text-[#3fb950] px-1 rounded">Staged</span>
              </div>
              <div className="flex items-center justify-between bg-[#161b22] p-1 px-2 rounded border-l-2 border-[#f85149]">
                <span className="font-mono text-[#ff7b72]">styles.css</span>
                <span className="text-[9px] bg-[#f85149]/20 text-[#ff7b72] px-1 rounded">Unstaged</span>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-[#21262d] flex items-center justify-between">
              <span className="text-[9px] text-[#8b949e]">Commit Message:</span>
              <span className="bg-[#010409] px-2 py-0.5 rounded text-[#c9d1d9] text-[9px] font-mono">"Initial Setup"</span>
            </div>
          </div>
        );

      case 'push':
        return (
          <div className="bg-[#161b22] rounded-xl p-3 border border-[#30363d] font-sans text-[11px] text-[#c9d1d9] select-none">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5 mb-2">
              <span className="font-bold text-white text-xs">Push to Remote</span>
              <span className="text-[#3fb950] font-mono text-[9px]">origin/main</span>
            </div>
            <div className="space-y-1.5 bg-[#0d1117] p-2 rounded border border-[#21262d]">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#8b949e]">Remote:</span>
                <span className="font-mono text-white">origin</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#8b949e]">Branch:</span>
                <span className="font-mono text-[#58a6ff]">main</span>
              </div>
              <div className="w-full bg-[#21262d] h-1 rounded-full overflow-hidden mt-1">
                <div className="bg-gradient-to-r from-[#2f81f7] to-[#3fb950] h-full w-3/4 animate-pulse" />
              </div>
            </div>
            <div className="text-center mt-1.5">
              <span className="text-[9px] text-[#3fb950] font-medium">✓ Push Successful! Live on GitHub</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      id={`step-card-${step.id}`}
      className={`bg-[#161b22] rounded-2xl border transition-all duration-300 overflow-hidden ${
        isCompleted 
          ? 'border-[#238636] ring-1 ring-[#238636]/20' 
          : 'border-[#30363d] hover:border-[#8b949e]'
      }`}
    >
      {/* Card Header */}
      <div className="bg-[#0d1117] px-4 sm:px-6 py-4 border-b border-[#30363d] flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          {/* Step Number Badge */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-inner ${
            isCompleted 
              ? 'bg-[#238636] text-white' 
              : 'bg-[#2f81f7] text-white'
          }`}>
            {step.id === 0 ? '🔑' : step.id}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {language === 'hi' ? step.title.hi : step.title.en}
              </h2>
            </div>
            <p className="text-xs text-[#8b949e] mt-0.5">
              {language === 'hi' ? step.subtitle.hi : step.subtitle.en}
            </p>
          </div>
        </div>

        {/* Completion Checkmark Toggle */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            isCompleted
              ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/30 hover:bg-[#238636]/20'
              : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d]'
          }`}
          title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
              <span className="hidden sm:inline">{language === 'hi' ? 'पूरा हुआ' : 'Done'}</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-[#7d8590]" />
              <span className="hidden sm:inline">{language === 'hi' ? 'बाकी है' : 'Mark Done'}</span>
            </>
          )}
        </button>

      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* Description & Interactive Mockup Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          
          <div className="lg:col-span-3 space-y-3">
            <p className="text-sm text-[#c9d1d9] leading-relaxed">
              {language === 'hi' ? step.description.hi : step.description.en}
            </p>

            {/* Troubleshooting Hint Link */}
            <div className="pt-1">
              <button
                onClick={() => onOpenTroubleshooting(step.id === 0 ? 'Token' : step.id === 1 ? 'Login' : step.id === 3 ? 'Files' : 'Push')}
                className="inline-flex items-center gap-1 text-xs text-[#58a6ff] hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>
                  {language === 'hi' 
                    ? 'इस स्टेप में कोई समस्या आ रही है? समाधान देखें' 
                    : 'Having trouble with this step? View solutions'}
                </span>
              </button>
            </div>
          </div>

          {/* Visual UI Schematic */}
          <div className="lg:col-span-2">
            {renderSchematic(step.imageSchematicType)}
          </div>

        </div>

        {/* Detailed Action Steps */}
        <div>
          <h3 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-3">
            {language === 'hi' ? 'क्या करें (निर्देश):' : 'Action Steps:'}
          </h3>
          
          <div className="space-y-2.5">
            {(language === 'hi' ? step.codeSteps.hi : step.codeSteps.en).map((item, idx) => {
              
              // Highlight bold parts correctly
              const formattedText = item.split('**').map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
              );

              return (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e6edf3]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e] flex items-center justify-center text-xs font-mono mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="leading-relaxed flex-1">
                    {formattedText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Developer Tip */}
        {step.tip && (
          <div className={`p-3 sm:p-4 rounded-xl border text-xs sm:text-sm ${
            step.tip.type === 'warning'
              ? 'bg-[#3b2b1f]/40 border-[#f0883e]/30 text-[#ffdfb3]'
              : step.tip.type === 'success'
              ? 'bg-[#238636]/10 border-[#238636]/30 text-[#e6edf3]'
              : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9]'
          }`}>
            <div className="flex gap-2">
              <span className="flex-shrink-0">
                {step.tip.type === 'warning' ? '⚠️' : step.tip.type === 'success' ? '💡' : '📌'}
              </span>
              <div className="leading-relaxed">
                <strong className="text-white font-medium">
                  {language === 'hi' ? 'प्रो टिप: ' : 'Pro Tip: '}
                </strong>
                {language === 'hi' ? step.tip.hi : step.tip.en}
              </div>
            </div>
          </div>
        )}

        {/* CLI Equivalent */}
        {step.cliEquivalent && (
          <div>
            <div className="flex items-center justify-between text-xs text-[#8b949e] mb-1.5">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'गिट कमांड लाइन समतुल्य:' : 'Git CLI Equivalent:'}</span>
              </span>

              <button
                onClick={handleCopyCLI}
                className="flex items-center gap-1 text-[11px] text-[#58a6ff] hover:text-white transition-colors"
                title="Copy Command"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? (language === 'hi' ? 'कॉपी किया!' : 'Copied!') : (language === 'hi' ? 'कोड कॉपी करें' : 'Copy CLI')}</span>
              </button>
            </div>

            <pre className="bg-[#010409] p-3 rounded-xl border border-[#30363d] text-xs font-mono text-[#e6edf3] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{step.cliEquivalent}</code>
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
