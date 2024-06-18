/* ----------------------------------------------------------------------------
src\runtime\lib\com.ts
// ----------------------------------------------------------------------------
// [ src > runtime > lib > * ]
import {} from '~/src/runtime/lib/com';
----------------------------------------------------------------------------- */

import dayjs from 'dayjs';

export { type ClassType, ClassTypeToString } from './class-style';
export { RemovePrefix } from './prefix';

/**
 * ユニークな文字列を生成する
 */
export const GenerateUniqeKey = (len = 32): string => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const word = len < 14 ? 14 : len - 15;
  return (
    dayjs().format('YYYYMMDDHHmmssSSS') +
    '_' +
    Array.from(Array(word))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join('')
  );
};

/**
 * 一定時間処理を待機
 */
export const Sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * マウント後にブラウザ側で実行すること
 */
export const IsMobile = () => {
  if (navigator === undefined) return false;
  const userAgent = navigator.userAgent.toLowerCase();
  // console.log(userAgent);
  if (/android|ipod|ipad|iphone|macintosh/.test(userAgent) && 'ontouchend' in document) {
    return true;
  } else {
    return false;
  }
};
