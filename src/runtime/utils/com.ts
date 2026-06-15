/* ----------------------------------------------------------------------------
// src\runtime\utils\com.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/com';
----------------------------------------------------------------------------- */

import dayjs from "dayjs/esm/index";

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
