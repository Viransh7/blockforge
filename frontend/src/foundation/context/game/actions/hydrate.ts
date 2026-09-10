import { DEFAULT_INITIAL_ROWS } from "@/shared/constants/game";
import { getInitialGame } from "@/shared/utils/get-initial";
import { getRandomRotate, getRandomShape } from "@/shared/utils/get-random";

export function hydrate() {
  const shape = getRandomShape();
  const shapeNext = getRandomShape();
  return getInitialGame({
    countdown: false,
    initialRows: DEFAULT_INITIAL_ROWS,
    shape,
    shapeNext,
    rotate: getRandomRotate(shape),
    rotateNext: getRandomRotate(shapeNext),
  });
}
