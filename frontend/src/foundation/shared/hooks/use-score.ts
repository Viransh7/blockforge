import { useAppContext } from "@/context/app";
import { useGameContext } from "@/context/game";
import { useLevel } from "./use-level";

export function useScore() {
  const {
    state: { initialLevel, initialRows },
  } = useAppContext();
  const {
    state: { cleared },
  } = useGameContext();
  const level = useLevel();

  return cleared * (initialLevel + initialRows + level + 1);
}
