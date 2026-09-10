import { useGameContext } from "../../foundation/context/game";
import {
  SHAPES_CLASSNAMES,
  SHAPES_SMALL,
} from "../../foundation/shared/constants/shape";

function NextPiece() {
  const {
    state: { board },
  } = useGameContext();

  const shape = board?.shapeNext;

  if (!shape) {
    return null;
  }

  const cells = SHAPES_SMALL[shape][0] ?? [];

  return (
    <div className="next-piece">
      <h2>NEXT</h2>

      <div className="next-piece-grid">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className={`next-piece-cell ${
              cells.includes(index) ? SHAPES_CLASSNAMES[shape] : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default NextPiece;