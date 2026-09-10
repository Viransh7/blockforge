import { useMemo } from "react";

import { ThemeMode } from "@/shared/constants/theme";
import { AppActionType } from "./action-types";
import { useAppContext } from "./hooks";

export function useAppCallbacks() {
  const { dispatch } = useAppContext();
  return useMemo(() => {
    return dispatch
      ? {
          onThemeModeDark: () => dispatch({ type: AppActionType.THEME_USER, payload: ThemeMode.DARK }),
          onThemeModeLight: () => dispatch({ type: AppActionType.THEME_USER, payload: ThemeMode.LIGHT }),
          onChangeInitialLevel: (payload: number) => dispatch({ type: AppActionType.INITIAL_LEVEL, payload }),
          onChangeInitialRows: (payload: number) => dispatch({ type: AppActionType.INITIAL_ROWS, payload }),
        }
      : {};
  }, [dispatch]);
}
