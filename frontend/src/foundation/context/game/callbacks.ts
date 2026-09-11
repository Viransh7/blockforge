import { useCallback, useMemo } from "react";

import { GameActionType } from "./action-types";
import { useGameContext } from "./hooks";

export function useGameCallbacks() {
  const { dispatch } = useGameContext();

  return useMemo(() => {
    return dispatch
      ? {
          onDropStart: () =>
            dispatch({
              type: GameActionType.DROP,
              payload: true,
            }),

          onDropStop: () =>
            dispatch({
              type: GameActionType.DROP,
              payload: false,
            }),

          onFinishedCountdown: () =>
            dispatch({
              type: GameActionType.COUNTDOWN_FINISHED,
            }),

          onMove: (payload: 1 | -1) =>
            dispatch({
              type: GameActionType.MOVE,
              payload,
            }),

          onMoveLeft: () =>
            dispatch({
              type: GameActionType.MOVE,
              payload: -1,
            }),

          onMoveRight: () =>
            dispatch({
              type: GameActionType.MOVE,
              payload: 1,
            }),

          onRotate: () =>
            dispatch({
              type: GameActionType.ROTATE,
              payload: 1,
            }),

          onPause: () =>
            dispatch({
              type: GameActionType.PAUSE,
            }),

          onTick: () =>
            dispatch({
              type: GameActionType.TICK,
            }),

          onUnpause: () =>
            dispatch({
              type: GameActionType.UNPAUSE,
            }),
        }
      : {};
  }, [dispatch]);
}

export function useOnPlay() {
  const { dispatch } = useGameContext();

  return useCallback(
    (initialRows: number) =>
      dispatch?.({
        type: GameActionType.RESTART,
        payload: { initialRows },
      }),
    [dispatch]
  );
}

export function useOnTick() {}