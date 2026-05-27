import React, { useState } from 'react';
import { Language } from '../types';
import { TROUBLESHOOTING_DATA } from '../data/guideData';
import { AlertTriangle, ChevronDown, ChevronUp, CheckCircle, Tag, Search } from 'lucide-react';

interface TroubleshootingProps {
  language: Language;
  activeFilterTag: string | null;
  setActiveFilterTag: (tag: string | null) => void;
}

export const Troubleshooting: React.FC<TroubleshootingProps> = ({
  language,
  activeFilterTag,
  setActiveFilterTag
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['auth-fail']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  // Collect unique tags
  const allTags = Array.from(
    new Set(TROUBLESHOOTING_DATA.flatMap(item => item.tags))
  );

  // Filter items based on active Tag and Search Query
  const filteredItems = TROUBLESHOOTING_DATA.filter(item => {
    const matchesTag = activeFilterTag ? item.tags.includes(activeFilterTag) : true;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = query === '' ? true : (
      item.error.hi.toLowerCase().includes(query) ||
      item.error.en.toLowerCase().includes(query) ||
      item.cause.hi.toLowerCase().includes(query) ||
      item.cause.en.toLowerCase().includes(query) ||
      item.solution.hi.toLowerCase().includes(query) ||
      item.solution.en.toLowerCase().includes(query)
    );

    return matchesTag && matchesSearch;
  });

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#f85149]/10 text-[#ff7b72] border border-[#f85149]/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {language === 'hi' ? 'सामान्य समस्याएं और समाधान' : 'Common Issues & Troubleshooting'}
            </h3>
            <p className="text-xs text-[#8b949e] mt-0.5">
              {language === 'hi'
                ? 'MGit उपयोग करते समय आने वाली एरर्स और उनके 100% काम करने वाले फिक्स।'
                : 'Real-world Android Git errors and their verified, step-by-step solutions.'}
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7d8590]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'एरर खोजें...' : 'Search errors...'}
            className="w-full bg-[#0d1117] text-xs text-[#c9d1d9] pl-9 pr-3 py-2 rounded-lg border border-[#30363d] focus:outline-none focus:border-[#58a6ff] transition-colors"
          />
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        <span className="text-xs text-[#7d8590] flex items-center gap-1 flex-shrink-0 mr-1">
          <Tag className="w-3 h-3" />
          <span>{language === 'hi' ? 'फ़िल्टर:' : 'Filter:'}</span>
        </span>

        <button
          onClick={() => setActiveFilterTag(null)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all ${
            activeFilterTag === null
              ? 'bg-[#2f81f7] text-white'
              : 'bg-[#0d1117] text-[#8b949e] hover:text-white border border-[#21262d]'
          }`}
        >
          {language === 'hi' ? 'सभी' : 'All'}
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilterTag(activeFilterTag === tag ? null : tag)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all ${
              activeFilterTag === tag
                ? 'bg-[#2f81f7] text-white'
                : 'bg-[#0d1117] text-[#8b949e] hover:text-white border border-[#21262d]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Issues Accordion */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-[#7d8590] text-xs bg-[#0d1117] rounded-xl border border-[#21262d]">
            {language === 'hi' 
              ? 'कोई समस्या नहीं मिली। कृपया दूसरे शब्दों से खोजें।' 
              : 'No issues matched your search. Try different keywords.'}
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#0d1117] border-[#30363d]' 
                    : 'bg-[#0d1117]/60 border-[#21262d] hover:border-[#30363d]'
                }`}
              >
                {/* Item Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs text-[#ff7b72] flex-shrink-0 font-bold">
                      {language === 'hi' ? 'एरर:' : 'Error:'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">
                      {language === 'hi' ? item.error.hi : item.error.en}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Small tags preview */}
                    <div className="hidden md:flex gap-1">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.2 bg-[#161b22] text-[#8b949e] rounded border border-[#30363d]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#7d8590]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7d8590]" />
                    )}
                  </div>
                </button>

                {/* Item Body */}
                {isExpanded && (
                  <div className="px-3.5 sm:px-4 pb-4 pt-1 space-y-3 border-t border-[#21262d] text-xs sm:text-sm">
                    
                    {/* Cause */}
                    <div className="bg-[#161b22] p-3 rounded-lg border border-[#30363d]/60 space-y-1">
                      <div className="text-[10px] font-bold text-[#e3b341] uppercase tracking-wider">
                        {language === 'hi' ? 'संभावित कारण (Cause):' : 'Probable Cause:'}
                      </div>
                      <p className="text-[#c9d1d9] leading-relaxed text-xs">
                        {language === 'hi' ? item.cause.hi : item.cause.en}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="bg-[#238636]/10 p-3 rounded-lg border border-[#238636]/20 space-y-1">
                      <div className="text-[10px] font-bold text-[#3fb950] uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{language === 'hi' ? 'समाधान (Solution):' : 'Solution:'}</span>
                      </div>
                      <p className="text-[#e6edf3] leading-relaxed text-xs">
                        {language === 'hi' ? item.solution.hi : item.solution.en}
                      </p>
                    </div>

                    {/* Tags row for mobile */}
                    <div className="flex md:hidden flex-wrap gap-1 pt-1">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.2 bg-[#161b22] text-[#8b949e] rounded border border-[#30363d]">
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
