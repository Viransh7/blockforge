import { PropsWithChildren } from "react";

import type { IThumbProps, ITrackProps } from "react-range/lib/types";
import { TrackLine } from "./track-line";

export function renderTrack({ props, children, scale }: PropsWithChildren<{ props: ITrackProps; scale: number }>) {
  return (
    <div {...props} className="relative flex flex-1 items-center h-8" style={props.style}>
      <TrackLine className="bg-board_shade" />
      {typeof scale === "number" && <TrackLine className="opacity-70 bg-shape_z" scale={scale} />}
      {children}
    </div>
  );
}

export function renderThumb({ props, isHidden }: { props: IThumbProps; isHidden: boolean }) {
  // react-range can not position render track properly on SSR
  return (
    <div
      {...props}
      className={[
        "w-8 h-8 flex items-center justify-center",
        isHidden ? "opacity-0" : "opacity-100",
        "transition-opacity",
      ].join(" ")}
      key={props.key}
      style={props.style}
    >
      <div className="w-4 h-4 rounded-full bg-shape_z" />
    </div>
  );
}
