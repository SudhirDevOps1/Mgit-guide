import { useState, useEffect } from 'react';
import { Language } from './types';
import { STEPS_DATA } from './data/guideData';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepProgressTracker } from './components/StepProgressTracker';
import { StepCard } from './components/StepCard';
import { GitVisualizer } from './components/GitVisualizer';
import { TokenHelper } from './components/TokenHelper';
import { Troubleshooting } from './components/Troubleshooting';
import { Cheatsheet } from './components/Cheatsheet';
import { Footer } from './components/Footer';
import { BestPractices } from './components/BestPractices';
import { Testimonials } from './components/Testimonials';
import { PosterStudio } from './components/PosterStudio';

// Icons
import { BookOpen, Play, KeyRound, AlertTriangle, Terminal, Award, Users, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // --- States ---
  const [language, setLanguage] = useState<Language>('hi');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load completed steps from localStorage
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('mgit_guide_progress_v2');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Track active App View / Tab
  type AppTab = 'tutorial' | 'simulator' | 'tokenHelper' | 'troubleshooting' | 'cheatsheet' | 'posterStudio' | 'bestpractices' | 'stories';
  const [activeTab, setActiveTab] = useState<AppTab>('tutorial');

  // Track active step inside the Step Progress Tracker
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  // Filter tag for Troubleshooting
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);

  // --- Effects ---
  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mgit_guide_progress_v2', JSON.stringify(completedSteps));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [completedSteps]);

  // Trigger Confetti when all 5 steps are checked!
  useEffect(() => {
    if (completedSteps.length === 5) {
      // Fire double confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2f81f7', '#3fb950', '#e3b341', '#bc8cff', '#58a6ff']
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [completedSteps]);

  // --- Handlers ---
  const handleToggleComplete = (stepId: number) => {
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) {
        return prev.filter((id) => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const handleResetProgress = () => {
    if (window.confirm(language === 'hi' ? 'क्या आप अपनी प्रगति रीसेट करना चाहते हैं?' : 'Are you sure you want to reset your progress?')) {
      setCompletedSteps([]);
    }
  };

  const handleOpenTroubleshootingForTag = (tag: string) => {
    setActiveFilterTag(tag);
    setActiveTab('troubleshooting');
    // Scroll to section
    setTimeout(() => {
      const el = document.getElementById('troubleshooting-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // --- Render logic ---
  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0d1117] text-[#e6edf3]' 
        : 'bg-[#f0f3f6] text-[#1f2328]'
    }`}>
      
      {/* 1. Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      {/* 2. Hero */}
      <Hero
        language={language}
        onStartGuide={() => {
          setActiveTab('tutorial');
          const el = document.getElementById('main-content-anchor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSimulator={() => {
          setActiveTab('simulator');
          const el = document.getElementById('main-content-anchor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Sticky Navigation Tabs */}
      <div id="main-content-anchor" className={`sticky top-16 z-40 border-b transition-colors shadow-sm ${
        theme === 'dark' 
          ? 'bg-[#010409]/95 border-[#30363d]' 
          : 'bg-white/95 border-gray-200'
      } backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 scrollbar-none">
            
            {/* Tab 1: Tutorial */}
            <button
              onClick={() => setActiveTab('tutorial')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'tutorial'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'मास्टर गाइड' : 'Master Guide'}</span>
            </button>

            {/* Tab 2: Simulator */}
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Play className="w-4 h-4 text-[#e3b341]" />
              <span>{language === 'hi' ? 'गिट सिम्युलेटर' : 'Git Simulator'}</span>
            </button>

            {/* Tab 3: Token Helper */}
            <button
              onClick={() => setActiveTab('tokenHelper')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'tokenHelper'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <KeyRound className="w-4 h-4 text-[#3fb950]" />
              <span>{language === 'hi' ? 'PAT स्कोप चेकर' : 'PAT Scopes'}</span>
            </button>

            {/* Tab 4: Troubleshooting */}
            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'troubleshooting'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-[#f85149]" />
              <span>{language === 'hi' ? 'समस्याएं व समाधान' : 'Troubleshooting'}</span>
              {activeFilterTag && (
                <span className="w-2 h-2 rounded-full bg-[#f85149]" />
              )}
            </button>

            {/* Tab 5: Cheatsheet */}
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'cheatsheet'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Terminal className="w-4 h-4 text-[#bc8cff]" />
              <span>{language === 'hi' ? 'चीटशीट (CLI)' : 'Cheatsheet'}</span>
            </button>

            {/* Tab 6: Poster Studio */}
            <button
              onClick={() => setActiveTab('posterStudio')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'posterStudio'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#58a6ff]" />
              <span>{language === 'hi' ? '10 Visual Posters' : '10 Visual Posters'}</span>
            </button>

            {/* Tab 7: Best Practices */}
            <button
              onClick={() => setActiveTab('bestpractices')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'bestpractices'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Award className="w-4 h-4 text-[#f0883e]" />
              <span>{language === 'hi' ? 'बेस्ट प्रैक्टिसेज' : 'Best Practices'}</span>
            </button>

            {/* Tab 8: Stories */}
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'stories'
                  ? 'bg-[#2f81f7] text-white shadow-sm'
                  : theme === 'dark'
                  ? 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4 text-[#bc8cff]" />
              <span>{language === 'hi' ? 'सफलता की कहानियाँ' : 'Success Stories'}</span>
            </button>

          </div>
        </div>
      </div>

      {/* 4. Main Content Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* VIEW 1: Master Tutorial */}
        {activeTab === 'tutorial' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Step Progress Tracker */}
            <StepProgressTracker
              language={language}
              completedSteps={completedSteps}
              onToggleStep={handleToggleComplete}
              onResetProgress={handleResetProgress}
              activeStepTab={activeStepTab}
              setActiveStepTab={setActiveStepTab}
            />

            {/* Pre-requisite info block */}
            <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
              theme === 'dark' 
                ? 'bg-[#161b22] border-[#30363d]' 
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label="info">📱</span>
                  <span className="font-bold">
                    {language === 'hi' 
                      ? 'तैयारी : सुनिश्चित करें कि आपके पास MGit ऐप इंस्टॉल है' 
                      : 'Preparation : Ensure you have the MGit App installed'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.manichord.mgit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#58a6ff] hover:underline bg-[#21262d] px-2.5 py-1 rounded-md border border-[#30363d]"
                  >
                    Google Play
                  </a>
                  <a
                    href="https://f-droid.org/en/packages/com.manichord.mgit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#58a6ff] hover:underline bg-[#21262d] px-2.5 py-1 rounded-md border border-[#30363d]"
                  >
                    F-Droid
                  </a>
                </div>
              </div>
            </div>

            {/* Steps Container */}
            <div className="space-y-8">
              {STEPS_DATA.map((step) => {
                const isDone = completedSteps.includes(step.id);

                return (
                  <div key={step.id} className="relative">
                    
                    {/* Visual Vertical Node Connection (hidden for last item) */}
                    {step.id < STEPS_DATA.length - 1 && (
                      <div className="absolute left-6 sm:left-10 top-full w-0.5 h-8 bg-[#30363d] -z-10 hidden sm:block" />
                    )}

                    <StepCard
                      step={step}
                      language={language}
                      isCompleted={isDone}
                      onToggleComplete={() => handleToggleComplete(step.id)}
                      onOpenTroubleshooting={handleOpenTroubleshootingForTag}
                    />

                  </div>
                );
              })}
            </div>

            {/* Global Bottom Checklist shortcut */}
            <div className={`p-6 rounded-2xl border text-center space-y-4 ${
              theme === 'dark' 
                ? 'bg-[#161b22] border-[#30363d]' 
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <h3 className="text-sm font-bold">
                {language === 'hi' 
                  ? '✨ क्या आपने अपने सभी स्टेप्स चेक कर लिए हैं?' 
                  : '✨ Have you marked all your steps as completed?'}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                {STEPS_DATA.map(s => {
                  const done = completedSteps.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleToggleComplete(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        done 
                          ? 'bg-[#238636] text-white border-[#238636]' 
                          : theme === 'dark'
                          ? 'bg-[#21262d] text-[#c9d1d9] border-[#30363d]'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {done ? '✓ ' : ''} {s.emoji} {language === 'hi' ? s.title.hi.split(' : ')[0].split(' – ')[0] : s.title.en.split(' : ')[0].split(' – ')[0]}
                    </button>
                  );
                })}
              </div>

              {completedSteps.length < 5 ? (
                <p className="text-xs text-[#8b949e]">
                  {language === 'hi' 
                    ? `बाकी स्टेप्स: ${5 - completedSteps.length} — ऊपर दिए गए निर्देशों का पालन करें।` 
                    : `${5 - completedSteps.length} steps remaining — follow the guidelines above.`}
                </p>
              ) : (
                <p className="text-xs text-[#3fb950] font-bold">
                  🎉 {language === 'hi' ? 'शानदार! आपका सेटअप पूरी तरह तैयार है!' : 'Outstanding! Your environment is perfectly setup!'} 🎉
                </p>
              )}
            </div>

          </div>
        )}

        {/* VIEW 2: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div className="animate-fade-in space-y-6">
            <GitVisualizer language={language} />
            
            {/* Quick jump back to tutorial */}
            <div className="text-center">
              <button
                onClick={() => setActiveTab('tutorial')}
                className="text-xs text-[#58a6ff] hover:underline"
              >
                ← {language === 'hi' ? 'वापस मुख्य स्टेप-बाय-स्टेप गाइड पर जाएँ' : 'Back to primary Step-by-Step Guide'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: Token Scopes Helper */}
        {activeTab === 'tokenHelper' && (
          <div className="animate-fade-in space-y-6">
            <TokenHelper language={language} />
            
            <div className="text-center">
              <button
                onClick={() => setActiveTab('tutorial')}
                className="text-xs text-[#58a6ff] hover:underline"
              >
                ← {language === 'hi' ? 'टोकन बनने के बाद "स्टेप 1: क्लोन" पर आगे बढ़ें' : 'Proceed to "Step 1: Clone" after creating your token'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: Common Errors & Troubleshooting */}
        {activeTab === 'troubleshooting' && (
          <div id="troubleshooting-container" className="animate-fade-in space-y-6">
            <Troubleshooting
              language={language}
              activeFilterTag={activeFilterTag}
              setActiveFilterTag={setActiveFilterTag}
            />

            <div className="text-center">
              <button
                onClick={() => {
                  setActiveFilterTag(null);
                  setActiveTab('tutorial');
                }}
                className="text-xs text-[#58a6ff] hover:underline"
              >
                ← {language === 'hi' ? 'वापस मास्टर गाइड पर लौटें' : 'Return to Master Guide'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 5: Cheatsheet */}
        {activeTab === 'cheatsheet' && (
          <div className="animate-fade-in space-y-6">
            <Cheatsheet language={language} />

            <div className="text-center">
              <button
                onClick={() => setActiveTab('tutorial')}
                className="text-xs text-[#58a6ff] hover:underline"
              >
                ← {language === 'hi' ? 'गाइड पर लौटें' : 'Return to Guide'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 6: Visual Poster Studio - NEW */}
        {activeTab === 'posterStudio' && (
          <div className="animate-fade-in space-y-6">
            <PosterStudio language={language} />

            <div className="text-center">
              <button
                onClick={() => setActiveTab('tutorial')}
                className="text-xs text-[#58a6ff] hover:underline"
              >
                ← {language === 'hi' ? 'वापस MGit Master Guide पर जाएँ' : 'Back to MGit Master Guide'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 7: Best Practices - NEW */}
        {activeTab === 'bestpractices' && (
          <div className="animate-fade-in space-y-6">
            <BestPractices language={language} />
            
            <div className="text-center text-xs text-[#8b949e] border border-dashed border-[#30363d] rounded-2xl p-6">
              {language === 'hi' 
                ? '💡 इन प्रैक्टिसेज को अपनाकर आप प्रोफेशनल मोबाइल डेवलपर बन सकते हैं।' 
                : '💡 Following these practices will help you become a truly professional mobile developer.'}
            </div>
          </div>
        )}

        {/* VIEW 8: Success Stories - NEW */}
        {activeTab === 'stories' && (
          <div className="animate-fade-in space-y-6">
            <Testimonials language={language} />
            
            <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-8 text-center">
              <p className="text-sm text-[#8b949e]">
                {language === 'hi' 
                  ? 'आपकी कहानी भी यहाँ आ सकती है। अपना अनुभव GitHub पर शेयर करें और टैग करें @mgithindi' 
                  : 'Your story could be featured here too. Share your journey on GitHub and tag @mgithindi'}
              </p>
            </div>
          </div>
        )}

      </main>

      {/* 5. Footer */}
      <Footer language={language} />

      {/* Floating Action Button - NEW */}
      <div className="fixed bottom-6 right-6 z-50">
        <div 
          onClick={() => {
            const progress = Math.round((completedSteps.length / 5) * 100);
            alert(language === 'hi' 
              ? `आपकी प्रगति: ${progress}% (${completedSteps.length}/5 स्टेप्स पूरे)\n\n🎯 ${completedSteps.length === 5 ? 'आपने सब पूरा कर लिया! बधाई हो!' : 'अभी भी कुछ स्टेप्स बाकी हैं। जारी रखें!'}` 
              : `Your Progress: ${progress}% (${completedSteps.length}/5 steps done)\n\n🎯 ${completedSteps.length === 5 ? 'You completed everything! Congratulations!' : 'Some steps still remain. Keep going!'}`);
          }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2f81f7] to-[#58a6ff] flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          <div className="text-white text-center leading-none">
            <div className="text-xs font-mono tracking-widest opacity-75">PROGRESS</div>
            <div className="font-bold text-lg -mt-1">{Math.round((completedSteps.length / 5) * 100)}%</div>
          </div>
        </div>
      </div>

    </div>
  );
}
