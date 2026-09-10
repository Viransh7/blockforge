import React, { PropsWithChildren, ReactNode, useMemo } from "react";

import { BoardCellValue } from "@/context/game/types";
import { BoardCell } from "@/shared/components/board-cell";
import { BOARD_AREA_WITH_EDGES } from "@/shared/constants/board";
import { isEdge } from "@/shared/utils/is-edge";

import styles from "./board.module.css";

type BoardProps = PropsWithChildren<{
  classNameBoard?: string;
  cells?: BoardCellValue[];
  isOpaque?: boolean;
  debug?: boolean;
  overlay?: ReactNode;
}>;

export function Board(props: BoardProps) {
  const boardCells = useMemo(() => [...Array(BOARD_AREA_WITH_EDGES)].map((_el, index) => index), []);

  const Wrap = props.children
    ? ({ children }: PropsWithChildren) => <div className="relative">{children}</div>
    : React.Fragment;

  return (
    <Wrap>
      <div className={[props.classNameBoard, styles.board, "relative"].filter(Boolean).join(" ")}>
        {boardCells.map((index) => {
          if (isEdge(index)) return null;
          return (
            <BoardCell
              className={[styles.board_cell, props.debug && "flex items-center justify-center"]
                .filter(Boolean)
                .join(" ")}
              key={index}
              shape={props.cells?.[index]}
            >
              {props.debug && index}
            </BoardCell>
          );
        })}
        {props.overlay}
      </div>
      {props.children ? (
        <>
          <div className={["absolute inset-0 bg-board", props.isOpaque && "opacity-80"].join(" ")} />
          <div className={["absolute top-0 left-0 w-full h-full", "flex items-center justify-center"].join(" ")}>
            {props.children}
          </div>
        </>
      ) : null}
    </Wrap>
  );
}
