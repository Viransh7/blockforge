import { useCallback, useState } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";

import { useGameCallbacks, useGameContext } from "@/context/game";
import { MAX_X } from "@/shared/constants/board";

type Swipe = {
  min: number;
  max: number;
  by: number;
};

export function useSwipe({ cellSize }: { cellSize: number | undefined }) {
  const {
    state: { board },
  } = useGameContext();
  const [swipe, setSwipe] = useState<undefined | Swipe>(undefined);

  const x = board?.x;
  const onSwipeStart = useCallback(() => {
    if (typeof x !== "number") return;
    setSwipe({
      min: x - MAX_X,
      max: MAX_X - x,
      by: 0,
    });
  }, [x]);
  const onSwiped = useCallback(() => {
    setSwipe(undefined);
  }, []);
  const onSwiping = useCallback(
    ({ absX, absY, deltaX, event }: SwipeEventData) => {
      event.preventDefault();
      setSwipe((old) => {
        if (!old || !cellSize) return undefined;
        if (absX < absY) return undefined;

        const by = Math.ceil(deltaX / cellSize);

        return {
          ...old,
          by,
          payload: by > 0 ? 1 : -1,
        };
      });
    },
    [cellSize]
  );
  const { onDropStart, onRotate } = useGameCallbacks();

  const handlers = useSwipeable({
    onSwipeStart,
    onSwiped,
    onSwiping,
    onSwipedDown: onDropStart,
    onTap: onRotate,
    preventScrollOnSwipe: true,
  });

  return {
    handlers,
    move: swipe?.by,
  };
}
