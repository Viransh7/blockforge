import { useEffect, useRef } from "react";

import { useGameCallbacks, useGameContext } from "@/context/game";
import { GameStatus } from "@/shared/constants/game";
import { useSpeed } from "@/shared/hooks/use-speed";

export function useTick() {
  const {
    state: { status },
  } = useGameContext();
  const { onTick } = useGameCallbacks();

  const speedMs = useSpeed();

  const interval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const isPlaying = status === GameStatus.PLAYING;
  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    if (isPlaying && onTick) {
      interval.current = setInterval(onTick, speedMs);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [onTick, speedMs, isPlaying]);
}
