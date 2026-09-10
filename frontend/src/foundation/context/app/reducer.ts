import { AppAction, AppActionType } from "./action-types";
import { AppContextValue } from "./types";

export function appReducer(state: AppContextValue, action: AppAction): AppContextValue {
  switch (action.type) {
    case AppActionType.INITIAL_LEVEL:
      return {
        ...state,
        initialLevel: action.payload,
      };
    case AppActionType.INITIAL_ROWS:
      return {
        ...state,
        initialRows: action.payload,
      };
    case AppActionType.THEME_USER:
      return {
        ...state,
        themeUser: action.payload,
      };
    case AppActionType.THEME_SYSTEM:
      return {
        ...state,
        themeSystem: action.payload,
      };
  }
}
