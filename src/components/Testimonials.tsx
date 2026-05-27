import React, { useState } from 'react';
import { Language } from '../types';
import { TESTIMONIALS_DATA } from '../data/guideData';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const testimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-8 sm:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#21262d] text-[#58a6ff] text-xs font-medium px-4 py-2 rounded-2xl">
            <Star className="w-4 h-4" /> 
            <span>{language === 'hi' ? 'रियल यूजर्स की कहानियाँ' : 'Real User Stories'}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-3">
            {language === 'hi' ? 'MGit ने इन डेवलपर्स का जीवन बदल दिया' : 'How MGit Changed These Developers’ Lives'}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 flex items-center justify-center rounded-2xl border border-[#30363d] hover:bg-[#21262d] text-[#8b949e] hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 flex items-center justify-center rounded-2xl border border-[#30363d] hover:bg-[#21262d] text-[#8b949e] hover:text-white transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-2 -top-6 text-[180px] text-[#21262d] font-serif leading-none select-none">“</div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-4xl leading-tight text-white font-light italic mb-8">
            “{language === 'hi' ? testimonial.quote.hi : testimonial.quote.en}”
          </div>

          <div className="flex justify-center mb-6">
            <div className="text-7xl">{testimonial.avatarEmoji}</div>
          </div>

          <div className="space-y-1">
            <div className="font-semibold text-xl text-white">{testimonial.name}</div>
            <div className="text-[#8b949e] text-sm">
              {language === 'hi' ? testimonial.role.hi : testimonial.role.en}
            </div>
            <div className="inline-block mt-3 bg-[#21262d] text-[#3fb950] text-xs px-4 py-1 rounded-3xl font-mono">
              {testimonial.achievement}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-12">
        {TESTIMONIALS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? 'bg-[#58a6ff] w-8' 
                : 'bg-[#30363d] hover:bg-[#8b949e]'
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-8 text-xs text-[#7d8590]">
        {language === 'hi' 
          ? '— ये कहानियाँ असली Android डेवलपर्स की हैं जो MGit का इस्तेमाल करके सफल हुए —' 
          : '— These are real stories from Android developers who succeeded using MGit —'}
      </div>
    </div>
  );
};
