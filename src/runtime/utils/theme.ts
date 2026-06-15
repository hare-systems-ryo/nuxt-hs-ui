/* ----------------------------------------------------------------------------
// src\runtime\utils\theme.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/theme';
----------------------------------------------------------------------------- */

import { GetColorCode as _GetColorCode } from '#build/nuxt-hs-ui-next/runtime/theme.mjs';
import type { ThemeColor } from '#build/nuxt-hs-ui-next/types/theme';

export const GetColorCode = (theme: ThemeColor): string => _GetColorCode(theme) as string;
export type { ThemeColor } from '#build/nuxt-hs-ui-next/types/theme';
import { Theme as theme } from '#build/nuxt-hs-ui-next/runtime/theme.mjs';
export const Theme = theme as Record<ThemeColor, ThemeColor>;

type RGB = { r: number; g: number; b: number };
type RGBA = RGB & { a: number };

export function GetTextColor(bgHex: string, over: string = '#ffffff'): '#000000' | '#ffffff' {
  try {
    const bg = parseHex(bgHex);
    const base = parseHex(over);

    const opaque: RGB = bg.a < 1 ? compositeOver(bg, base) : { r: bg.r, g: bg.g, b: bg.b };

    const L = relativeLuminance(opaque);
    const contrastWithBlack = (L + 0.05) / 0.05; // black luminance = 0
    const contrastWithWhite = 1.05 / (L + 0.05); // white luminance = 1

    return contrastWithBlack >= contrastWithWhite ? '#000000' : '#ffffff';
  } catch (err) {
    console.error('GetTextColor', err);
    return '#000000';
  }
}

// ----------------------------------------------------------------------------
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function parseHex(hex: string): RGBA {
  let s: any = hex.trim();
  if (s.startsWith('#')) s = s.slice(1);

  if (s.length === 3) {
    const r = Number.parseInt(s[0] + s[0], 16);
    const g = Number.parseInt(s[1] + s[1], 16);
    const b = Number.parseInt(s[2] + s[2], 16);
    return { r, g, b, a: 1 };
  }
  if (s.length === 4) {
    const r = Number.parseInt(s[0] + s[0], 16);
    const g = Number.parseInt(s[1] + s[1], 16);
    const b = Number.parseInt(s[2] + s[2], 16);
    const a = Number.parseInt(s[3] + s[3], 16) / 255;
    return { r, g, b, a };
  }
  if (s.length === 6) {
    const r = Number.parseInt(s.slice(0, 2), 16);
    const g = Number.parseInt(s.slice(2, 4), 16);
    const b = Number.parseInt(s.slice(4, 6), 16);
    return { r, g, b, a: 1 };
  }
  if (s.length === 8) {
    const r = Number.parseInt(s.slice(0, 2), 16);
    const g = Number.parseInt(s.slice(2, 4), 16);
    const b = Number.parseInt(s.slice(4, 6), 16);
    const a = Number.parseInt(s.slice(6, 8), 16) / 255;
    return { r, g, b, a };
  }

  throw new Error(`Invalid hex color: ${hex}`);
}

function compositeOver(fg: RGBA, bg: RGBA): RGB {
  const a = fg.a + bg.a * (1 - fg.a);
  const r = Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a);
  const g = Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a);
  const b = Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a);
  return { r, g, b };
}

function relativeLuminance({ r, g, b }: RGB): number {
  const toLinear = (c: number) => {
    const cs = c / 255;
    return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function hexToRgba(hex: string): RGBA {
  let s: any = hex.trim();
  if (s.startsWith('#')) s = s.slice(1);
  if (![3, 4, 6, 8].includes(s.length)) throw new Error(`Invalid hex: ${hex}`);

  const to255 = (hh: string) => Number.parseInt(hh, 16);

  if (s.length === 3) {
    const r = to255(s[0] + s[0]);
    const g = to255(s[1] + s[1]);
    const b = to255(s[2] + s[2]);
    return { r, g, b, a: 1 };
  }
  if (s.length === 4) {
    const r = to255(s[0] + s[0]);
    const g = to255(s[1] + s[1]);
    const b = to255(s[2] + s[2]);
    const a = to255(s[3] + s[3]) / 255;
    return { r, g, b, a };
  }
  if (s.length === 6) {
    return {
      r: to255(s.slice(0, 2)),
      g: to255(s.slice(2, 4)),
      b: to255(s.slice(4, 6)),
      a: 1,
    };
  }
  // length === 8
  return {
    r: to255(s.slice(0, 2)),
    g: to255(s.slice(2, 4)),
    b: to255(s.slice(4, 6)),
    a: to255(s.slice(6, 8)) / 255,
  };
}

function rgbaToHex({ r, g, b, a }: RGBA): string {
  const h2 = (v: number) => v.toString(16).padStart(2, '0');
  const base = `#${h2(r)}${h2(g)}${h2(b)}`;
  return a < 1 ? `${base}${h2(Math.round(a * 255))}` : base;
}

// === RGB <-> HSL ===
function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;

  if (d !== 0) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }): RGB {
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const r = Math.round(hue2rgb(h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(h) * 255);
  const b = Math.round(hue2rgb(h - 1 / 3) * 255);
  return { r, g, b };
}

export function pickTextColor(bgHex: string, over: string = '#ffffff'): '#000000' | '#ffffff' {
  const bg = hexToRgba(bgHex);
  const base = hexToRgba(over);
  const opaque = bg.a < 1 ? compositeOver(bg, base) : { r: bg.r, g: bg.g, b: bg.b };
  const L = relativeLuminance(opaque);
  const contrastBlack = (L + 0.05) / 0.05;
  const contrastWhite = 1.05 / (L + 0.05);
  return contrastBlack >= contrastWhite ? '#000000' : '#ffffff';
}

// === Lightness adjusters ===
// delta: +0.0〜+1.0で明るく、-0.0〜-1.0で暗く（デフォは±0.08=「微妙」）
export function lighten(hex: string, delta = 0.08): string {
  const rgba = hexToRgba(hex);
  const hsl = rgbToHsl(rgba);
  hsl.l = clamp(hsl.l + Math.abs(delta));
  const rgb = hslToRgb(hsl);
  return rgbaToHex({ ...rgb, a: rgba.a });
}

export function darken(hex: string, delta = 0.08): string {
  const rgba = hexToRgba(hex);
  const hsl = rgbToHsl(rgba);
  hsl.l = clamp(hsl.l - Math.abs(delta));
  const rgb = hslToRgb(hsl);
  return rgbaToHex({ ...rgb, a: rgba.a });
}

// 「ほんの少し」用のシンタックスシュガー
export const microLighten = (hex: string) => lighten(hex, 0.08);
export const microDarken = (hex: string) => darken(hex, 0.08);

// === Alert用の配色をまとめて作る ===
// - tone: "soft" … 背景を少し薄く/文字は自動で黒白
//         "ink"  … 背景を少し薄く/文字はベース色を強く(濃く)した色
export function MakeAlertColors(
  baseHex: string,
  opts?: {
    tone?: 'soft' | 'ink';
    bgDelta?: number; // 背景をどれだけ明るくするか（デフォ 0.18）
    inkDelta?: number; // "ink"の時、文字色をどれだけ暗くするか（デフォ 0.45）
    borderDelta?: number; // 枠線は背景より少し暗く（デフォ 0.10）
    over?: string; // 透明色の合成先（デフォ #fff）
  }
): { bg: string; text: string; border: string } {
  const { tone = 'soft', bgDelta = 0.18, inkDelta = 0.45, borderDelta = 0.1, over = '#ffffff' } = opts || {};

  const bg = lighten(baseHex, bgDelta);
  const border = darken(bg, borderDelta);

  const text = tone === 'ink' ? darken(baseHex, inkDelta) : pickTextColor(bg, over); // 'soft' は黒/白 自動判定

  return { bg, text, border };
}
