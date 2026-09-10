import { useEffect, useRef, useState } from "react";

import { BOARD_SIZE } from "@/shared/constants/board";

export function useCellSize() {
  const [cellSize, setCellSize] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setCellSize(ref.current.offsetWidth / BOARD_SIZE.width - 6);
  }, []);

  return { ref, cellSize };
}
