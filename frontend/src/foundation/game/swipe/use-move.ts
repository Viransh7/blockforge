import { useEffect, useRef, useState } from "react";

import { useGameCallbacks } from "@/context/game";

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useMove({ move }: { move: number | undefined }) {
  const [current, setCurrent] = useState(move);
  const previous = usePrevious(current);

  const { onMove } = useGameCallbacks();

  useEffect(() => setCurrent(move), [move]);

  useEffect(() => {
    let payload: 1 | -1 | undefined;
    if (previous && current) {
      payload = current > previous ? 1 : current < previous ? -1 : undefined;
    } else if (!previous && current) {
      payload = current > 0 ? 1 : current < 0 ? -1 : undefined;
    } else {
      payload = undefined;
    }

    if (payload) onMove?.(payload);
  }, [previous, current, onMove]);
}
