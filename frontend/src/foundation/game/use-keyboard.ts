import { useCallback, useEffect } from "react";

import { useGameCallbacks, useGameContext } from "@/context/game";
import { GameStatus } from "@/shared/constants/game";
import {
  KEYS_BOTTOM,
  KEYS_LEFT,
  KEYS_PAUSE,
  KEYS_RIGHT,
  KEYS_ROTATE,
} from "@/shared/constants/keyboard";

export function useKeyboardGame() {
  const {
    state: { status },
  } = useGameContext();

  const {
    onDropStart,
    onDropStop,
    onMove,
    onPause,
    onRotate,
    onUnpause,
    onFinishedCountdown,
  } = useGameCallbacks();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (KEYS_PAUSE.includes(e.key)) {
        e.preventDefault();

        if (e.repeat) {
          return;
        }

        if (status === GameStatus.PLAYING) {
          onPause?.();
        } else if (status === GameStatus.PAUSED) {
          onUnpause?.();
          onFinishedCountdown?.();
        }

        return;
      }

      if (status !== GameStatus.PLAYING) {
        return;
      }

      if (KEYS_BOTTOM.includes(e.key)) {
        onDropStart?.();
      } else if (KEYS_ROTATE.includes(e.key)) {
        onRotate?.();
      } else if (KEYS_LEFT.includes(e.key)) {
        onMove?.(-1);
      } else if (KEYS_RIGHT.includes(e.key)) {
        onMove?.(1);
      }
    },
    [
      onDropStart,
      onMove,
      onPause,
      onRotate,
      onUnpause,
      onFinishedCountdown,
      status,
    ]
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (KEYS_BOTTOM.includes(e.key)) {
        onDropStop?.();
      }
    },
    [onDropStop]
  );

  const canUseKeyboard =
    status === GameStatus.PLAYING || status === GameStatus.PAUSED;

  useEffect(() => {
    if (canUseKeyboard) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [canUseKeyboard, onKeyDown, onKeyUp]);
}