import { useMemo } from "react";

import { useGameContext } from "@/context/game";
import { SPEED_DROPPING_MS, SPEED_INCREASE_MS, SPEED_INITIAL_MS } from "@/shared/constants/score";

import { useLevel } from "./use-level";

export function useSpeed() {
  const {
    state: { dropping },
  } = useGameContext();

  const level = useLevel();

  return useMemo(() => {
    let result = SPEED_INITIAL_MS - level * SPEED_INCREASE_MS;
    if (dropping && result > SPEED_DROPPING_MS) {
      result = SPEED_DROPPING_MS;
    }
    return result;
  }, [level, dropping]);
}
