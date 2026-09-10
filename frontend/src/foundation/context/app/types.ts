import { ThemeMode } from "@/shared/constants/theme";

import { AppAction } from "./action-types";

export type AppContextValue = {
  initialLevel: number;
  initialRows: number;
  themeSystem: ThemeMode | undefined;
  themeUser: ThemeMode | undefined;
};

export type AppDispatch = React.Dispatch<AppAction>;
