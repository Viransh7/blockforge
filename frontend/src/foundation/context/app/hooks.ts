import { useContext } from "react";

import { ThemeColor, ThemeMode, THEMES } from "@/shared/constants/theme";

import { AppContext } from "./provider";

export function useAppContext() {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Missing AppProvider");
  return appContext;
}

export function useLightMode() {
  const {
    state: { themeSystem, themeUser },
  } = useAppContext();
  return themeUser ? themeUser : themeSystem;
}

export function useLightModeResolved() {
  const lightMode = useLightMode();
  return lightMode || ThemeMode.LIGHT;
}

export function useGetColor() {
  const mode = useLightModeResolved();
  return function getColor(color: ThemeColor) {
    return THEMES[mode][color];
  };
}
