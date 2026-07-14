import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

interface UseSpeechSynthesisResult {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

function subscribeNoop() {
  return () => {};
}
function getSupportSnapshot() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
function getServerSupportSnapshot() {
  return false;
}

/**
 * Wraps the browser's native SpeechSynthesis API. isSupported reads false during SSR
 * and on browsers without support (via useSyncExternalStore, so there's no hydration
 * mismatch), letting callers hide the control entirely.
 * Cancels any in-progress speech on unmount so it doesn't keep talking after navigation.
 */
export function useSpeechSynthesis(): UseSpeechSynthesisResult {
  const isSupported = useSyncExternalStore(subscribeNoop, getSupportSnapshot, getServerSupportSnapshot);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  return { isSupported, isSpeaking, isPaused, speak, pause, resume, stop };
}
