import { useMemo } from "react";

import { THEME_DARK } from "@/shared/constants/colors";
import { ThemeColor } from "@/shared/constants/theme";

import { ROOT_CLASSNAME } from "@/shared/constants/ui";
import { useAppContext, useGetColor } from "./hooks";

export function CssVars() {
  const {
    state: { themeUser },
  } = useAppContext();
  const getDefaultColor = useGetColor();

  const style = useMemo(() => {
    const defaultRules = Object.keys(THEME_DARK)
      .map((key) => {
        const color = key as ThemeColor;
        return `--${color}: ${getDefaultColor(color)};`;
      })
      .join("");

    const darkModeRules = Object.keys(THEME_DARK)
      .map((key) => {
        const color = key as ThemeColor;
        return `--${color}: ${THEME_DARK[color]};`;
      })
      .join("");

    let result = `
      .${ROOT_CLASSNAME} {
        ${defaultRules}
      }
    `;

    if (!themeUser) {
      result += `
        @media (prefers-color-scheme:dark) {
          .${ROOT_CLASSNAME} {
            ${darkModeRules}
          }
        }
      `;
    }

    return result.replace(/\s+/g, "");
  }, [getDefaultColor, themeUser]);

  return <style>{style}</style>;
}
