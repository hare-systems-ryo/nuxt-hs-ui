/* ----------------------------------------------------------------------------
// src\runtime\utils\com.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
----------------------------------------------------------------------------- */

import dayjs from "dayjs/esm/index";
import { useRequestHeaders } from "#app";

/** ユニークな文字列を生成する */
export const GenerateUniqeKey = (len = 32): string => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const word = len < 14 ? 14 : len - 15;
  return (
    dayjs().format("YYYYMMDDHHmmssSSS") +
    "_" +
    Array.from(Array(word))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join("")
  );
};

/** 一定時間処理を待機 */
export const Sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const GetUa = () => {
  try {
    if (import.meta.client) {
      if (navigator === undefined) return "";
      return navigator.userAgent.toLowerCase();
    }
    if (import.meta.server) {
      return useRequestHeaders(["User-Agent"])["user-agent"] || "";
    }
    return "";
  } catch (err) {
    console.error(err);
    return "";
  }
};
export const IsTouchDevice = () => {
  try {
    if (import.meta.client) return "ontouchend" in document;
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/** モバイル系デバイスかどうかの判定
 * - ブラウザ側で実行すること */
export const IsMobile = () => {
  const ua = GetUa();
  if (/android|ipod|ipad|iphone|macintosh/.test(ua) || IsTouchDevice()) {
    return true;
  } else {
    return false;
  }
};
