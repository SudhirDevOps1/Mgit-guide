import React from 'react';
import { Language } from '../types';
import { Check, RotateCcw } from 'lucide-react';

interface StepProgressTrackerProps {
  language: Language;
  completedSteps: number[];
  onToggleStep: (stepId: number) => void;
  onResetProgress: () => void;
  activeStepTab: number;
  setActiveStepTab: (stepId: number) => void;
}

export const StepProgressTracker: React.FC<StepProgressTrackerProps> = ({
  language,
  completedSteps,
  onToggleStep,
  onResetProgress,
  activeStepTab,
  setActiveStepTab
}) => {
  const stepsList = [
    { id: 0, emoji: '🔑', labelHi: 'PAT बनाएँ', labelEn: 'Create PAT' },
    { id: 1, emoji: '📥', labelHi: 'क्लोन करें', labelEn: 'Clone Repo' },
    { id: 2, emoji: '✏️', labelHi: 'कोड बदलें', labelEn: 'Edit Code' },
    { id: 3, emoji: '📌', labelHi: 'कमिट करें', labelEn: 'Commit' },
    { id: 4, emoji: '🚀', labelHi: 'पुश करें', labelEn: 'Push' }
  ];

  const allCompleted = stepsList.every(s => completedSteps.includes(s.id));

  const handleStepClick = (id: number) => {
    setActiveStepTab(id);
    const element = document.getElementById(`step-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-[#161b22] border-y sm:border sm:rounded-2xl border-[#30363d] p-4 sm:p-6 mb-8 shadow-md">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{language === 'hi' ? 'अपनी प्रगति ट्रैक करें' : 'Track Your Progress'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#21262d] text-[#58a6ff] border border-[#30363d]">
              {completedSteps.length} / {stepsList.length} {language === 'hi' ? 'पूरे हुए' : 'Completed'}
            </span>
          </h3>
          <p className="text-xs text-[#7d8590] mt-0.5">
            {language === 'hi' 
              ? 'स्टेप्स को पूरा करने के बाद नीचे दिए गए बटनों पर क्लिक करके सही का निशान लगाएँ।' 
              : 'Click the steps below to mark them as done as you progress through the guide.'}
          </p>
        </div>

        {completedSteps.length > 0 && (
          <button
            onClick={onResetProgress}
            className="self-start sm:self-auto inline-flex items-center gap-1 text-xs text-[#7d8590] hover:text-[#f85149] transition-colors py-1 px-2 rounded hover:bg-[#21262d]"
            title="Reset all completed marks"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'hi' ? 'रीसेट करें' : 'Reset'}</span>
          </button>
        )}
      </div>

      {/* Steps Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {stepsList.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = activeStepTab === step.id;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#21262d] border-[#58a6ff] shadow-sm' 
                  : 'bg-[#0d1117] border-[#21262d] hover:border-[#30363d]'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              {/* Checkbox + Emoji Top */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-base sm:text-lg" role="img" aria-label="step emoji">
                  {step.emoji}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStep(step.id);
                  }}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-[#238636] text-white'
                      : 'bg-[#21262d] border border-[#30363d] text-transparent hover:border-[#8b949e]'
                  }`}
                  title={language === 'hi' ? 'पूरा हुआ चिह्नित करें' : 'Mark as completed'}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </button>
              </div>

              {/* Step Label */}
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-[#7d8590] uppercase">
                  {language === 'hi' ? `स्टेप ${step.id}` : `Step ${step.id}`}
                </div>
                <div className={`text-xs font-medium truncate mt-0.5 ${isCompleted ? 'text-[#c9d1d9] line-through opacity-70' : 'text-white'}`}>
                  {language === 'hi' ? step.labelHi : step.labelEn}
                </div>
              </div>

              {/* Active Indicator bottom bar */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#58a6ff] rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {allCompleted && (
        <div className="mt-4 p-3 rounded-xl bg-[#238636]/10 border border-[#238636]/30 text-center animate-fade-in">
          <p className="text-xs sm:text-sm font-medium text-[#3fb950]">
            🎉 {language === 'hi' 
              ? 'बधाई हो! आपने सभी स्टेप्स पूरे कर लिए हैं। आपका कोड अब GitHub पर लाइव है!' 
              : 'Awesome! You have completed all steps. Your code is successfully live on GitHub!'} 🎉
          </p>
        </div>
      )}

    </div>
  );
};
