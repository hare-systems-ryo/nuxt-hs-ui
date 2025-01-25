/* ----------------------------------------------------------------------------
// src\runtime\utils\theme.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
----------------------------------------------------------------------------- */

// type OmitTheme<T extends string> = Omit<typeof Theme, T>[keyof Omit<
//   typeof Theme,
//   T
// >];
import { useRuntimeConfig } from "#imports";

import _appConfig from "#build/app.config";

export const Theme = {
  main0: "main0",
  main1: "main1",
  main2: "main2",
  main3: "main3",
  //
  accent1: "accent1",
  accent2: "accent2",
  //
  info: "info",
  link: "link",
  download: "download",
  success: "success",
  warn: "warn",
  error: "error",
  //
  white: "white",
  black: "black",
  dark: "dark",
  back: "back",
} as const;
export type Theme = (typeof Theme)[keyof typeof Theme];

export const ThemeKyes = Object.keys(Theme) as [keyof typeof Theme];

export const GetGolorCode = (code: string) => {
  const { public: config } = useRuntimeConfig();
  const colors = config.hsui.colors || {};
  if (code in colors) {
    return (colors as any)[code] || "#000000";
  }
  return "#000000";
};
