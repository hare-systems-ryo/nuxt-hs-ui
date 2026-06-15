// src/dev-shim-build-modules.d.ts
// 開発リポ内でだけ #build/... の型を仮定する（公開しても害は少ない）
declare module '#build/runtime/theme' {
  export type ThemeKey = string;
  export const theme: Record<string, string>;
  export function GetColorCode(key: ThemeKey): string;
}
declare module '#build/runtime/theme-internal' {
  export const theme: Record<string, string>;
  export function GetColorCode(key: string): string;
}
