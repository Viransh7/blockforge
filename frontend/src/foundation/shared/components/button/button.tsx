import { useLightModeResolved } from "@/context/app";
import { ThemeMode } from "@/shared/constants/theme";

import { ButtonProps } from "./types";
import { ButtonWrap } from "./wrap";

export function Button(props: ButtonProps) {
  const mode = useLightModeResolved();
  const variant = props.variant || "big";

  return (
    <ButtonWrap
      {...props}
      className={[
        "flex items-center gap-4",
        "rounded-md w-60 text-center",
        "bg-button text-button_text border-button_shade",
        mode === ThemeMode.LIGHT && "border",
        variant === "big" ? "p-4" : "px-4 py-2",
        "border-b-4",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {props.icon && <span className="w-8 h-8">{props.icon}</span>}
      <span className={["font-bold", variant === "big" && "text-xl"].filter(Boolean).join(" ")}>{props.children}</span>
    </ButtonWrap>
  );
}
