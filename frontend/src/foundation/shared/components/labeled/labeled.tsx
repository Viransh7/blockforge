import { PropsWithChildren, ReactNode } from "react";

import { LabeledValue } from "./value";

export function Labeled(
  props: PropsWithChildren<{ className?: string; htmlFor?: string; label: ReactNode; value?: number }>
) {
  const Label = props.htmlFor ? "label" : "strong";
  return (
    <div className={["flex flex-col gap-2", props.className].filter(Boolean).join(" ")}>
      <Label className="font-bold" htmlFor={props.htmlFor}>
        {props.label}
      </Label>
      {typeof props.value === "number" ? <LabeledValue value={props.value} /> : props.children}
    </div>
  );
}
