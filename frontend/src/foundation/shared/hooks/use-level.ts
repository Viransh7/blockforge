import { useAppContext } from "@/context/app";
import { useGameContext } from "@/context/game";
import { CLEARED_FOR_LEVEL } from "@/shared/constants/score";

export function useLevel() {
  const {
    state: { cleared },
  } = useGameContext();
  const {
    state: { initialLevel },
  } = useAppContext();

  return Math.floor(cleared / CLEARED_FOR_LEVEL) + initialLevel;
}
