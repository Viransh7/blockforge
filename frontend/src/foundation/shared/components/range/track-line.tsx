export function TrackLine(props: { className?: string; scale?: number }) {
  return (
    <div
      className={[
        "absolute top-1/2 left-0 h-2 w-full",
        "rounded-full",
        "origin-top-left",
        "pointer-events-none",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transform: ["translateY(-50%)", typeof props.scale === "number" && `scaleX(${props.scale})`]
          .filter(Boolean)
          .join(" "),
      }}
    />
  );
}
