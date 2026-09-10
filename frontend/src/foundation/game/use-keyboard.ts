import { useCallback, useEffect } from "react";

import { useGameCallbacks, useGameContext } from "@/context/game";
import { GameStatus } from "@/shared/constants/game";
import { KEYS_BOTTOM, KEYS_LEFT, KEYS_PAUSE, KEYS_RIGHT, KEYS_ROTATE } from "@/shared/constants/keyboard";

export function useKeyboardGame() {
  const {
    state: { status },
  } = useGameContext();
  const { onDropStart, onDropStop, onMove, onPause, onRotate } = useGameCallbacks();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (KEYS_PAUSE.includes(e.key)) {
        onPause?.();
      } else if (KEYS_BOTTOM.includes(e.key)) {
        onDropStart?.();
      } else if (KEYS_ROTATE.includes(e.key)) {
        onRotate?.();
      } else if (KEYS_LEFT.includes(e.key)) {
        onMove?.(-1);
      } else if (KEYS_RIGHT.includes(e.key)) {
        onMove?.(1);
      }
    },
    [onDropStart, onMove, onPause, onRotate]
  );
  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (KEYS_BOTTOM.includes(e.key)) {
        onDropStop?.();
      }
    },
    [onDropStop]
  );

  const isPlaying = status === GameStatus.PLAYING;
  useEffect(() => {
    if (isPlaying) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    } else {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isPlaying, onKeyDown, onKeyUp]);
}
