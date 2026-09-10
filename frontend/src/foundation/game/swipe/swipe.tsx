import { useCellSize } from "./use-cell-size";
import { useMove } from "./use-move";
import { useSwipe } from "./use-swipe";

export function SwipeOverlay() {
  const { ref, cellSize } = useCellSize();
  const { handlers, move } = useSwipe({ cellSize });

  useMove({ move });

  return (
    <>
      <div ref={ref} className="absolute inset-0" />
      <div {...handlers} className="absolute inset-0" />
    </>
  );
}
