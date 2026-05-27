import React, { useMemo, useState } from 'react';
import { Language } from '../types';
import { Copy, Download, Eye, Image as ImageIcon, Sparkles, X, Wand2 } from 'lucide-react';

interface PosterStudioProps {
  language: Language;
}

const posterImages = [
  {
    id: 1,
    title: 'MGit + GitHub Guide',
    src: '/images/posters/mgit-handdrawn-poster-01.png',
    theme: 'Classic Study Notes',
  },
  {
    id: 2,
    title: 'Android se GitHub Push',
    src: '/images/posters/mgit-handdrawn-poster-02.png',
    theme: 'Android Flow Map',
  },
  {
    id: 3,
    title: 'PAT to Push Flow',
    src: '/images/posters/mgit-handdrawn-poster-03.png',
    theme: 'Arrow Workflow',
  },
  {
    id: 4,
    title: 'MGit Quick Setup',
    src: '/images/posters/mgit-handdrawn-poster-04.png',
    theme: 'Setup Checklist',
  },
  {
    id: 5,
    title: 'Mobile Coding Upload',
    src: '/images/posters/mgit-handdrawn-poster-05.png',
    theme: 'Mobile Dev Poster',
  },
  {
    id: 6,
    title: 'GitHub Upload Android',
    src: '/images/posters/mgit-handdrawn-poster-06.png',
    theme: 'Revision Sheet',
  },
  {
    id: 7,
    title: 'No Laptop Push Code',
    src: '/images/posters/mgit-handdrawn-poster-07.png',
    theme: 'Motivation Poster',
  },
  {
    id: 8,
    title: 'MGit Workflow Map',
    src: '/images/posters/mgit-handdrawn-poster-08.png',
    theme: 'Icon Flow Diagram',
  },
  {
    id: 9,
    title: 'Error Fix + Upload',
    src: '/images/posters/mgit-handdrawn-poster-09.png',
    theme: 'Troubleshooting Sheet',
  },
  {
    id: 10,
    title: 'Android MGit Master',
    src: '/images/posters/mgit-handdrawn-poster-10.png',
    theme: 'Master Guide Poster',
  },
];

const defaultNotes = `MGit + GitHub Guide

Step 0: Personal Access Token (PAT) बनायें
- GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
- Generate new token (classic)
- Note: MGit-Android
- Expiration: 90 days या No expiration
- Scopes: repo और workflow select करें
- Generate के बाद token तुरंत copy करके safe जगह save करें

Step 1: Clone करें
- MGit खोलें > + icon > Clone Remote Repository
- Remote URL: https://github.com/username/repo-name.git
- Username: GitHub username
- Password: Personal Access Token paste करें
- Clone button दबाएँ

Step 2: Code edit / files डालें
- Internal Storage > MGit > repo-name folder खोलें
- अपनी code files copy/edit करें
- MGit में वापस आकर Refresh करें

Step 3: Stage + Commit
- MGit Status tab खोलें
- Menu > Add all to stage
- Commit message लिखें जैसे Initial commit या Updated code
- Commit करें
- याद रखें: Commit सिर्फ phone में save होता है

Step 4: Push to GitHub
- Menu > Push
- Remote: origin
- Branch: main या master
- Password पूछे तो वही PAT paste करें
- Push successful होने पर GitHub refresh करें

Common Issues
- Authentication failed: Password नहीं, PAT डालें
- Updates rejected: पहले Pull करें फिर Push करें
- Files missing: सही MGit folder check करें और Refresh करें
- Branch issue: main/master branch सही select करें`;

export const PosterStudio: React.FC<PosterStudioProps> = ({ language }) => {
  const [notes, setNotes] = useState(defaultNotes);
  const [selectedPoster, setSelectedPoster] = useState(posterImages[0]);
  const [copied, setCopied] = useState(false);
  const [previewPoster, setPreviewPoster] = useState<(typeof posterImages)[number] | null>(null);

  const imagePrompt = useMemo(() => {
    return `Transform the given notes into a clean, visually appealing hand-drawn study poster on white paper.

Style guidelines:
- Use a neat handwritten look with colorful markers (blue, red, green, black).
- Add a soft, slightly uneven hand-drawn border around the page.
- Title should be at the top in large, playful, multicolor bubble letters.
- Organize content into clear numbered steps or sections with arrows (→) for flow.
- Maintain proper spacing, alignment, and readability.

Text handling:
- Keep the original content meaning EXACTLY the same (do not remove or add information).
- Rewrite slightly for clarity if needed, but preserve all instructions and steps.
- Use a mix of simple Hindi + English if the input has it (otherwise keep original language).
- Highlight commands or keywords clearly.

Decorations:
- Add small cute doodles around the page (stars, flowers, clouds, smiley sun, hearts, small icons relevant to topic).
- Keep doodles minimal and balanced — do not clutter the content.

Visual quality:
- Realistic paper texture visible.
- Soft natural lighting, flat-lay top view.
- Slight imperfections in lines to keep hand-drawn feel.
- Bright but natural colors (no over-saturation).

Output quality:
- Ultra high resolution (8K).
- Sharp text and clean edges.
- No stylization filters, no layout changes that distort structure.
- Maintain a clean, aesthetic, student-friendly notes poster look.

INPUT NOTES:
${notes}`;
  }, [notes]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(imagePrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Prompt copy failed', error);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([imagePrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'hand-drawn-study-poster-prompt.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-[#30363d] bg-[#161b22]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-[#30363d] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2f81f7]/30 bg-[#2f81f7]/10 px-3 py-1 text-xs font-semibold text-[#58a6ff]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{language === 'hi' ? 'नया फीचर: AI Poster Studio' : 'New Feature: AI Poster Studio'}</span>
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
              {language === 'hi' ? 'Notes को Hand-drawn Visual Poster में बदलें' : 'Turn Notes into Hand-drawn Visual Posters'}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#8b949e]">
              {language === 'hi'
                ? 'यह सेक्शन आपकी notes को साफ-सुथरे, white paper, marker style study poster prompt में बदलता है। नीचे 10 ready-made image examples भी जोड़ दिए गए हैं।'
                : 'This section converts your notes into a clean white-paper marker-style study poster prompt. It also includes 10 ready-made visual image examples.'}
            </p>

            <div className="mt-6 rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#8b949e]">
                {language === 'hi' ? 'Input Notes paste करें' : 'Paste Input Notes'}
              </label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-[360px] w-full resize-y rounded-2xl border border-[#30363d] bg-[#010409] p-4 font-mono text-xs leading-relaxed text-[#e6edf3] outline-none transition focus:border-[#58a6ff]"
                placeholder={language === 'hi' ? 'यहाँ अपनी notes paste करें...' : 'Paste your notes here...'}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={copyPrompt}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#238636] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2ea043] active:scale-[0.98]"
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? (language === 'hi' ? 'Prompt copy हो गया' : 'Prompt Copied') : (language === 'hi' ? 'AI Prompt Copy करें' : 'Copy AI Prompt')}</span>
              </button>

              <button
                onClick={downloadPrompt}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#30363d] bg-[#21262d] px-4 py-3 text-sm font-bold text-[#e6edf3] transition hover:bg-[#30363d] active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                <span>{language === 'hi' ? 'Prompt TXT Download' : 'Download Prompt TXT'}</span>
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b949e]">
                  {language === 'hi' ? 'Selected visual example' : 'Selected Visual Example'}
                </div>
                <h3 className="mt-1 text-xl font-bold text-white">{selectedPoster.title}</h3>
                <p className="text-xs text-[#8b949e]">{selectedPoster.theme}</p>
              </div>

              <a
                href={selectedPoster.src}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f81f7] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1f6feb]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{language === 'hi' ? 'Image Download' : 'Download Image'}</span>
              </a>
            </div>

            <button
              onClick={() => setPreviewPoster(selectedPoster)}
              className="group relative block w-full overflow-hidden rounded-[2rem] border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/30"
            >
              <img
                src={selectedPoster.src}
                alt={`${selectedPoster.title} hand drawn study poster`}
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:aspect-[5/4] lg:aspect-[4/5]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-black">
                  <Eye className="h-4 w-4" />
                  {language === 'hi' ? 'Full preview' : 'Full Preview'}
                </span>
              </div>
            </button>

            <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">
              {posterImages.map((poster) => (
                <button
                  key={poster.id}
                  onClick={() => setSelectedPoster(poster)}
                  className={`overflow-hidden rounded-xl border transition ${
                    selectedPoster.id === poster.id
                      ? 'border-[#58a6ff] ring-2 ring-[#58a6ff]/40'
                      : 'border-[#30363d] opacity-75 hover:opacity-100'
                  }`}
                  title={poster.title}
                >
                  <img src={poster.src} alt={poster.title} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#30363d] bg-[#161b22] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-[#bc8cff]/10 p-3 text-[#bc8cff]">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight text-white">
              {language === 'hi' ? '10 Ready-made Visual Images' : '10 Ready-made Visual Images'}
            </h3>
            <p className="text-sm text-[#8b949e]">
              {language === 'hi'
                ? 'हर image अलग visual composition है, लेकिन MGit guide का same meaning रखती है।'
                : 'Each image has a different composition while keeping the same MGit guide meaning.'}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posterImages.map((poster) => (
            <article key={poster.id} className="overflow-hidden rounded-3xl border border-[#30363d] bg-[#0d1117] transition hover:-translate-y-1 hover:border-[#58a6ff]">
              <button onClick={() => setPreviewPoster(poster)} className="block w-full">
                <img src={poster.src} alt={poster.title} className="aspect-[4/5] w-full object-cover" />
              </button>
              <div className="space-y-3 p-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#58a6ff]">
                    Poster {poster.id.toString().padStart(2, '0')}
                  </div>
                  <h4 className="mt-1 font-bold text-white">{poster.title}</h4>
                  <p className="text-xs text-[#8b949e]">{poster.theme}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPreviewPoster(poster)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#30363d] bg-[#21262d] px-3 py-2 text-xs font-bold text-[#e6edf3] hover:bg-[#30363d]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {language === 'hi' ? 'देखें' : 'View'}
                  </button>

                  <a
                    href={poster.src}
                    download
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#238636] px-3 py-2 text-xs font-bold text-white hover:bg-[#2ea043]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {language === 'hi' ? 'डाउनलोड' : 'Download'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            title: language === 'hi' ? 'All Devices Responsive' : 'All Devices Responsive',
            text: language === 'hi' ? 'Mobile, tablet, laptop और desktop पर gallery और prompt builder साफ दिखेगा।' : 'The gallery and prompt builder are optimized for mobile, tablet, laptop, and desktop.',
          },
          {
            title: language === 'hi' ? 'No Content Removed' : 'No Content Removed',
            text: language === 'hi' ? 'Existing guide, simulator, PAT helper, troubleshooting और cheatsheet untouched हैं।' : 'The existing guide, simulator, PAT helper, troubleshooting, and cheatsheet are preserved.',
          },
          {
            title: language === 'hi' ? 'Prompt + Image Ready' : 'Prompt + Image Ready',
            text: language === 'hi' ? 'आप prompt copy कर सकते हैं और 10 images सीधे download कर सकते हैं।' : 'You can copy the prompt and directly download all 10 images.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-[#30363d] bg-[#161b22] p-5">
            <div className="mb-3 inline-flex rounded-2xl bg-[#2f81f7]/10 p-3 text-[#58a6ff]">
              <Wand2 className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#8b949e]">{item.text}</p>
          </div>
        ))}
      </section>

      {previewPoster && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-[#30363d] bg-[#010409] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363d] p-4">
              <div>
                <div className="text-xs font-mono text-[#58a6ff]">Poster {previewPoster.id.toString().padStart(2, '0')}</div>
                <div className="font-bold text-white">{previewPoster.title}</div>
              </div>
              <button
                onClick={() => setPreviewPoster(null)}
                className="rounded-2xl border border-[#30363d] bg-[#21262d] p-2 text-[#c9d1d9] hover:bg-[#30363d] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[78vh] overflow-auto p-4">
              <img src={previewPoster.src} alt={previewPoster.title} className="mx-auto max-h-[74vh] rounded-2xl object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};