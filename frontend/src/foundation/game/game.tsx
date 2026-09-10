import { useMemo } from "react";

import { Board } from "@/shared/components/board";
import { getBoardCells } from "@/shared/utils/get-board-cells";

import { useGameContext } from "@/context/game";
import { SwipeOverlay } from "./swipe/swipe";
import { useKeyboardGame } from "./use-keyboard";
import { useTick } from "./use-tick";

export const Game = () => {
  const { state } = useGameContext();
  const boardCells = useMemo(() => getBoardCells(state), [state]);

  useTick();
  useKeyboardGame();

  return <Board cells={boardCells} classNameBoard="bg-board" overlay={<SwipeOverlay />} />;
};
