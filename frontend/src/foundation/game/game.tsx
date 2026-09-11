import { useMemo } from "react";

import { useGameContext } from "@/context/game";
import { Board } from "@/shared/components/board";
import { getBoardCells } from "@/shared/utils/get-board-cells";

import { SwipeOverlay } from "./swipe/swipe";
import { useKeyboardGame } from "./use-keyboard";
import { useTick } from "./use-tick";

type GameProps = {
  onResume?: () => void;
};

export const Game = ({ onResume }: GameProps) => {
  const { state } = useGameContext();
  const boardCells = useMemo(() => getBoardCells(state), [state]);

  useTick();
  useKeyboardGame({ onResume });

  return (
    <Board
      cells={boardCells}
      classNameBoard="bg-board"
      overlay={<SwipeOverlay />}
    />
  );
};