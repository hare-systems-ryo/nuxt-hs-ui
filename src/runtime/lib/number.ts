/* ----------------------------------------------------------------------------
src\runtime\lib\to-int.ts
// ----------------------------------------------------------------------------
// [ src > runtime > lib > * ]
import {} from '~/src/runtime/lib/to-int';
----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
import { Int } from '~/com/lib/convert';
import { InsertComma } from '~/com/lib/convert';
----------------------------------------------------------------------------- */

import BigNumber from 'bignumber.js';
// [ 変換 ]

/**
 * 数値をカンマを挿入した文字列に変換する
 * @param  num 数値
 * @returns カンマが挿入された文字列
 */
export const InsertComma = (num: number | string | null, digits = 0, nullText = '0', comma = ',') => {
  if (num === null || num === '') {
    num = nullText;
    return num;
  }
  const numString = String(num).replace(/,/g, '');
  const delimitExp = /(\d)(?=(\d{3})+$)/g; //
  const decimalDelimitExp = /(\d)(?=(\d{3})+(\.\d+))/g; //
  let ret = '';
  if (numString.includes('.')) {
    ret = numString.replace(decimalDelimitExp, '$1' + comma);
  } else {
    ret = numString.replace(delimitExp, '$1' + comma);
  }
  if (digits === 0) return ret;
  const d = Int(numString) < 0 ? digits + 1 : digits;
  if (numString.includes('.')) {
    const m = ret.replace(/\d+\./g, '');
    if (m.length < d) {
      ret = `${ret}${Array(d + 1 - m.length).join('0')}`;
    }
  } else {
    ret = `${ret}.${Array(digits + 1).join('0')}`;
  }
  return ret;
};
/**
 * 数値をカンマを挿入した文字列に変換する
 * @param  num 数値
 * @returns カンマが挿入された文字列
 */
export const InsertCommaK = (num: number | string | null) => {
  num = Int(num) * 100;
  num = InsertComma(num);
  return num.replace(/(.*)\d{2}$/, '$1');
};

export const Int = (i: any): number => {
  try {
    const str = String(i).replace(/(\\|,|-$)/g, '');
    const num = Number.parseInt(str, 10);
    if (Number.isNaN(num)) {
      return 0;
    } else {
      return num;
    }
  } catch (error) {
    console.error(`Comvert.Int(${i})`, i, error);
    return 0;
  }
};

export const IntNullable = (i: any): number | null => {
  try {
    if (i === null) return null;
    if (i === '') return null;
    const str = String(i).replace(/(\\|,|-$)/g, '');
    const num = Number.parseInt(str, 10);
    if (Number.isNaN(num)) {
      return null;
    } else {
      return num;
    }
  } catch (error) {
    console.error(`IntNullable(${i})`, { i, error });
    return null;
  }
};

export const Float = (i: any, digits = 0): number => {
  try {
    const str = `${String(i).replace(/(\\|,|-$)/g, '')}`;
    const num = new BigNumber(str);
    if (Number.isNaN(num.toNumber())) {
      return 0;
    } else {
      return num.dp(digits).toNumber();
    }
  } catch (error) {
    console.error(`Float(${i})`, { i, digits, error });
    return 0;
  }
};
export const FloatNullable = (i: any, digits = 0): number | null => {
  try {
    // console.log('hoge')
    if (i === null) return null;
    if (i === '') return null;
    BigNumber.config({
      ROUNDING_MODE: BigNumber.ROUND_DOWN, // 切り上げ
    });
    const str = `${String(i).replace(/(\\|,|-$)/g, '')}`;
    const num = new BigNumber(str);
    if (Number.isNaN(num.toNumber())) {
      return null;
    } else {
      return num.dp(digits).toNumber();
    }
  } catch (error) {
    console.error(`FloatNullable(${i})`, { i, digits, error });
    return null;
  }
};
