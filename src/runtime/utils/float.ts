/* ----------------------------------------------------------------------------
// src\runtime\utils\float.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/float';
----------------------------------------------------------------------------- */

import BigNumber from "bignumber.js";
// [ 変換 ]
/** 小数点含む数値文字列の数値変換 変換失敗=0 */
export const Float = (i: any, digits = 0): number => {
  try {
    const str = `${String(i).replace(/(\\|,|-$)/g, "")}`;
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

/** 小数点含む数値文字列の数値変換 変換失敗=null */
export const FloatNullable = (i: any, digits = 0): number | null => {
  try {
    // console.log('hoge')
    if (i === null) return null;
    if (i === "") return null;
    BigNumber.config({
      ROUNDING_MODE: BigNumber.ROUND_DOWN, // 切り上げ
    });
    const str = `${String(i).replace(/(\\|,|-$)/g, "")}`;
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
