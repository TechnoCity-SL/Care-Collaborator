import { useMemo } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { stripMarkdown } from '@/utils/stripMarkdown';

interface ListenToArticleProps {
  body: string;
  className?: string;
}

export function ListenToArticle({ body, className = '' }: ListenToArticleProps) {
  const { isSupported, isSpeaking, isPaused, speak, pause, resume, stop } = useSpeechSynthesis();
  const plainText = useMemo(() => stripMarkdown(body), [body]);

  if (!isSupported) return null;

  function handleToggle() {
    if (!isSpeaking) {
      speak(plainText);
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  }

  const label = !isSpeaking ? 'Listen to this article' : isPaused ? 'Resume' : 'Pause';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isSpeaking && !isPaused}
        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      >
        {isSpeaking && !isPaused ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {label}
      </button>

      {isSpeaking && (
        <button
          type="button"
          onClick={stop}
          className="font-sans text-sm text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          Stop
        </button>
      )}
    </div>
  );
}
