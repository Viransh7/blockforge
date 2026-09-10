import { ThemeMode } from "@/shared/constants/theme";

export enum AppActionType {
  INITIAL_LEVEL = "INITIAL_LEVEL",
  INITIAL_ROWS = "INITIAL_ROWS",
  THEME_SYSTEM = "THEME_SYSTEM",
  THEME_USER = "THEME_USER",
}

export type AppAction =
  | { type: AppActionType.INITIAL_LEVEL; payload: number }
  | { type: AppActionType.INITIAL_ROWS; payload: number }
  | { type: AppActionType.THEME_USER; payload: ThemeMode }
  | { type: AppActionType.THEME_SYSTEM; payload: ThemeMode };
