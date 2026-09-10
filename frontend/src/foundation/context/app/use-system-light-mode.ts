import { useEffect } from "react";

import { ThemeMode } from "@/shared/constants/theme";

import { AppAction, AppActionType } from "./action-types";

export function useSystemLightMode({ dispatch }: { dispatch: React.Dispatch<AppAction> }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      dispatch({
        type: AppActionType.THEME_SYSTEM,
        payload: mediaQuery.matches ? ThemeMode.DARK : ThemeMode.LIGHT,
      });
    };

    listener();
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [dispatch]);
}
