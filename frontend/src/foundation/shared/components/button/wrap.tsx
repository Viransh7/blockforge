import { PropsWithChildren } from "react";
import { ButtonProps } from "./types";

export function ButtonWrap(props: ButtonProps & PropsWithChildren<{ className: string }>) {
  return props.href ? (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  ) : (
    <button disabled={props.disabled} type={props.type || "button"} onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
}
