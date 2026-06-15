/* ----------------------------------------------------------------------------
// src\runtime\utils\dayjs.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/dayjs';
----------------------------------------------------------------------------- */
import _dayjs from 'dayjs/esm/index';
import utc from 'dayjs/esm/plugin/utc';
import timezone from 'dayjs/esm/plugin/timezone';
import advancedFormat from 'dayjs/esm/plugin/advancedFormat';

import ja from 'dayjs/esm/locale/ja.js';
import en from 'dayjs/esm/locale/en.js';

export const dayjs = _dayjs;
export type Dayjs = _dayjs.Dayjs;
export type QUnitType = _dayjs.QUnitType;
export type OpUnitType = _dayjs.OpUnitType;
let init = false;

export const DayjsInit = (f = false, defaultTimezone = 'Asia/Tokyo') => {
  if (init && !f) return;
  init = true;
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  dayjs.tz.setDefault(defaultTimezone);
  dayjs.locale(ja);
};

// ----------------------------------------------------------------------------
// デフォルトのタイムゾーン
// export const defaultTimezone = 'Asia/Tokyo';
// ----------------------------------------------------------------------------

/** dayjsオブジェクト生成 */
export const Dayjs = (arg?: string | number | Dayjs | Date | null | undefined, format?: string | undefined): Dayjs => {
  if (arg === null || arg === undefined) return dayjs(arg, format);
  return dayjs(arg, format);
};

/** dayjsオブジェクト生成
 * - 日付返還できない場合 Nullを返す */
export const DayjsNullable = (date?: string | null | Date | undefined): Dayjs | null => {
  try {
    if (date === undefined) return dayjs();
    if (date === null) return null;
    if (date === '') return null;
    if (/Date/.test(Object.prototype.toString.call(date)) === true) {
      return dayjs(date);
    }
    const ret = dayjs(String(date).replace(/\//g, '-'));
    if (ret.isValid() === false) {
      return null;
    }
    return ret;
  } catch {
    return null;
  }
};

/**
 * 日付の差分を計測
 * -  date - diff
 * @param  date 文字列、日付オブジェクト
 */
export const DayjsDiff = (date: Dayjs | null, diff: Dayjs | null, unit: QUnitType | OpUnitType): number | null => {
  try {
    if (date === null) return null;
    if (diff === null) return null;
    if (date.isValid() === false) return null;
    if (diff.isValid() === false) return null;
    return date.diff(diff, unit);
  } catch {
    return null;
  }
};

/**
 * 時差を取得する
 * - str:format()
 */
export const GetTimeShiftValue = (date: Dayjs | null, timeZone = 'Asia/Tokyo') => {
  if (date === null) return 0;
  const format = `YYYY-MM-DD HH:mm`;
  const a = date.format(format);
  const b = date.tz(timeZone).format(format);
  // console.log([a, b]);
  const diff = DayjsDiff(Dayjs(a), Dayjs(b), 'm');
  return diff === null ? 0 : diff;
};

/**
 * 日付の時間部分を[00:00:00.000]にする
 */
export const DateOnly = (date: string | null) => {
  if (date === null) {
    return null;
  }
  const d = Dayjs(date);
  if (d === null) {
    return null;
  }
  const shift = GetTimeShiftValue(d);
  if (shift === 0) {
    return d.startOf('day').format();
  } else {
    return d.startOf('day').add(shift, 'minute').format();
  }
  // console.log([d.format(), shift, data[key]]);
};

/**
 * 日付文字列をフォーマットされた日付に変換される
 * @param  date 文字列、日付オブジェクト
 * @returns 変換OKならDayjsフォーマット文字列、それ以外は空文字
 */
export const DayjsFormat = (date: string | null | Date, f = 'YYYY-MM-DD HH:mm:ss.SSS', nullText = ''): string => {
  try {
    if (date === null) return nullText;
    if (date === '') return nullText;
    if (/Date/.test(Object.prototype.toString.call(date)) === true) {
      return dayjs(date).format(f);
    }
    date = String(date).replace(/\//g, '-');
    if (dayjs(date).isValid() === false) {
      return nullText;
    }
    return dayjs(date).format(f);
  } catch {
    return nullText;
  }
};

/**
 * 日付文字列をフォーマットされた日付に変換される(変換不可の場合、null)
 * @param  date 文字列、日付オブジェクト
 * @returns 変換OKならDayjsフォーマット文字列、それ以外はnull
 */
export const DayjsFormatNullable = (date: string | null | Date, f = 'YYYY-MM-DD HH:mm:ss.SSS'): string | null => {
  const ret = DayjsFormat(date, f, '');
  if (!ret) return null;
  return ret;
};

export const DayjsSetLocal = (lang?: 'ja' | 'en') => {
  if (lang === 'en') {
    dayjs.locale(en);
  } else {
    dayjs.locale(ja);
  }
};
export const GetLocal = (lang?: 'ja' | 'en') => {
  if (lang === 'en') {
    return en;
  } else {
    return ja;
  }
};

export const DayjsSetTimezone = (tz = 'Asia/Tokyo') => {
  dayjs.tz.setDefault(tz);
};

/** Prismaの日付型の条件式を生成する関数 */
export const DayjsBetweenWhereQuery = (arg: { from: string | null; to: string | null }) => {
  const dateFrom = DayjsNullable(arg.from);
  const dateTo = DayjsNullable(arg.to);
  if (dateFrom && dateTo) {
    return {
      gte: dateFrom.toDate(),
      lte: dateTo.toDate(),
    };
  } else if (dateFrom) {
    return {
      gte: dateFrom.toDate(),
    };
  } else if (dateTo) {
    return {
      lte: dateTo.toDate(),
    };
  }
  return null;
};
