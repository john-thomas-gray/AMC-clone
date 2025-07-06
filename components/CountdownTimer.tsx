import { TimerContext } from "@/context/TimerContext";
import React, { useContext, useEffect, useRef } from "react";
import { Text } from "react-native";

type CountdownTimerProps = {
  initialSeconds?: number;
  onFinish?: () => void;
};

const CountdownTimer = ({ initialSeconds, onFinish }: CountdownTimerProps) => {
  const { timerSeconds, isRunning, startTimer } = useContext(TimerContext);
  const finishedRef = useRef(false);
  const startedSecondsRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      initialSeconds !== undefined &&
      initialSeconds > 0 &&
      startedSecondsRef.current !== initialSeconds
    ) {
      startTimer(initialSeconds);
      startedSecondsRef.current = initialSeconds;
    }
  }, [initialSeconds, startTimer]);

  const startedRef = useRef(false);

  useEffect(() => {
    if (timerSeconds > 0) {
      startedRef.current = true;
    }

    if (
      timerSeconds === 0 &&
      !isRunning &&
      !finishedRef.current &&
      startedRef.current
    ) {
      finishedRef.current = true;
      if (onFinish) onFinish();
    }

    if (timerSeconds > 0) {
      finishedRef.current = false;
    }
  }, [timerSeconds, isRunning, onFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Text className="text-white font-gordita-regular">
      {formatTime(timerSeconds)}
    </Text>
  );
};

export default CountdownTimer;
