/* ----------------------------------------------------------------------------
// src\runtime\utils\wareki.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/wareki';
----------------------------------------------------------------------------- */

import { Int } from './number';
import { PaddingLeft } from './string';

export const WarekiShort = (yyyy: any, nullText = ''): string => {
  try {
    if (yyyy === undefined || yyyy == null) return nullText;
    yyyy = Int(yyyy);
    if (yyyy > 2019) {
      return `R${String(yyyy - 2018)}`;
    } else if (yyyy === 2019) {
      return `R1`;
    } else if (yyyy > 1989) {
      return `H${String(yyyy - 1988)}`;
    } else if (yyyy === 1989) {
      return `H1`;
    } else if (yyyy > 1926) {
      return `S${String(yyyy - 1925)}`;
    } else {
      return `?`;
    }
  } catch {
    return nullText;
  }
};

export const Wareki = (
  yyyy: any,
  withoutUnit = false,
  nullText = '',
  len: number | undefined = undefined,
  lang = 'ja'
): string => {
  try {
    const unit = lang === 'ja' ? '年' : 'y';
    if (yyyy === undefined || yyyy == null) return nullText;
    yyyy = Int(yyyy);
    if (yyyy > 2019) {
      if (withoutUnit) {
        if (len === undefined) {
          return `R${String(yyyy - 2018)}`;
        } else {
          return `R${PaddingLeft(String(yyyy - 2018), len, '0')}`;
        }
      } else {
        return `R${String(yyyy - 2018)} (${String(yyyy)}${unit})`;
      }
    } else if (yyyy === 2019) {
      if (withoutUnit) {
        return `R1`;
        // return `R1(H31)`;
      } else {
        return `R1 (${String(yyyy)}${unit})`;
        // return `R1(H31) (${String(yyyy)}${unit})`;
      }
    } else if (yyyy > 1989) {
      if (withoutUnit) {
        if (len === undefined) {
          return `H${String(yyyy - 1988)}`;
        } else {
          return `H${PaddingLeft(String(yyyy - 1988), len, '0')}`;
        }
      } else {
        return `H${String(yyyy - 1988)} (${String(yyyy)}${unit})`;
      }
    } else if (yyyy === 1989) {
      if (withoutUnit) {
        return `H1`;
        // return `H1(S64)`;
      } else {
        return `H1 (${String(yyyy)}${unit})`;
        // return `H1(S64) (${String(yyyy)}${unit})`;
      }
    } else if (yyyy > 1926) {
      if (withoutUnit) {
        if (len === undefined) {
          return `S${String(yyyy - 1925)}`;
        } else {
          return `S${PaddingLeft(String(yyyy - 1925), len, '0')}`;
        }
      } else {
        return `S${String(yyyy - 1925)} (${String(yyyy)}${unit})`;
      }
    } else {
      return `${String(yyyy)}`;
    }
  } catch {
    return nullText;
  }
};

export const WarekiToYYYYMMDD = (wareki: string | null): number => {
  try {
    let YYYYMMDD = '';
    if (wareki === null || wareki === '') return 0;
    // 和暦→YYYY変換
    const arr = wareki.replace(/日/g, '').replace(/月/g, '-').replace(/年/g, '-').split('-') as any;
    if (arr.length > 0) {
      if (/令和/.test(arr[0]) === true) {
        YYYYMMDD += String(Int(arr[0].replace(/令和/g, '')) + 2018);
      } else if (/平成/.test(arr[0]) === true) {
        YYYYMMDD += String(Int(arr[0].replace(/平成/g, '')) + 1988);
      } else if (/昭和/.test(arr[0]) === true) {
        YYYYMMDD += String(Int(arr[0].replace(/昭和/g, '')) + 1925);
      }
    }
    if (YYYYMMDD.length === 0) return 0;
    // 念の為桁数を揃える
    YYYYMMDD = ('0000' + YYYYMMDD).slice(-4);
    // 月日の変換
    for (let i = 1; i <= 2; i++) {
      if (arr.length > i && arr[i] !== '') {
        YYYYMMDD += ('00' + arr[i]).slice(-2);
      } else {
        YYYYMMDD += '00';
      }
    }
    // console.log('arr', arr);
    // console.log('変換後', wareki, YYYYMMDD);
    return Int(YYYYMMDD);
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};
