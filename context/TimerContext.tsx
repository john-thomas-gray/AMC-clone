import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";

interface TimerContextValue {
  timerSeconds: number;
  isRunning: boolean;
  startTimer: (seconds: number) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  onTimeReached: (seconds: number, callback: () => void) => void;
}

const defaultValue: TimerContextValue = {
  timerSeconds: 0,
  isRunning: false,
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
  onTimeReached: () => {}
};

export const TimerContext = createContext<TimerContextValue>(defaultValue);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timerSeconds]);

  useEffect(() => {
    const callbacks = callbacksRef.current.get(timerSeconds);
    if (callbacks?.length) {
      callbacksRef.current.delete(timerSeconds);
      callbacks.forEach(cb => cb());
    }
  }, [timerSeconds]);

  const callbacksRef = useRef<Map<number, (() => void)[]>>(new Map());

  const onTimeReached = (seconds: number, callback: () => void) => {
    const existing = callbacksRef.current.get(seconds) ?? [];
    if (existing.length > 0) {
      console.log(callbacksRef.current);
    }
    callbacksRef.current.set(seconds, [...existing, callback]);
  };

  const startTimer = (seconds: number) => {
    if (seconds > 0) {
      callbacksRef.current.clear();
      setTimerSeconds(seconds);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        timerSeconds,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
        onTimeReached
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
