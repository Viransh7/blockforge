import { THEME_DARK, THEME_LIGHT } from "./colors";

export enum ThemeMode {
  DARK = "THEME_MODE_DARK",
  LIGHT = "THEME_MODE_LIGHT",
}

export type Theme = typeof THEME_DARK;
export type ThemeColor = keyof typeof THEME_DARK;

export const THEMES = {
  [ThemeMode.LIGHT]: THEME_LIGHT,
  [ThemeMode.DARK]: THEME_DARK,
};
