import { PropsWithChildren } from "react";

import { Shape, ShapeOther, SHAPES_CLASSNAMES } from "@/shared/constants/shape";

import styles from "./board-cell.module.css";

export function BoardCell(
  props: PropsWithChildren<{
    className?: string;
    classNameEmpty?: string;
    shape?: ShapeOther | Shape | undefined | null;
  }>
) {
  return (
    <div
      className={[
        styles.board_cell,
        props.className,
        props.shape ? SHAPES_CLASSNAMES[props.shape] : props.classNameEmpty,
        props.shape === ShapeOther.INITIAL && styles["board_cell-initial"],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {props.children}
    </div>
  );
}
