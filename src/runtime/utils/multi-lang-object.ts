/* ----------------------------------------------------------------------------
// src\runtime\utils\multi-lang-object.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/multi-lang-object';
----------------------------------------------------------------------------- */

import type { SelectItem } from './select-item';
import { GetTextByMultiLang, type MultiLang } from './multi-lang';
import { ObjectValues } from './object';

// ----------------------------------------------------------------------------
export type KeyNumber = { [key: string]: number };
export type KeyMultilang<T extends KeyNumber> = {
  [key in T[keyof T]]: MultiLang;
};
export type CodeValues<T extends KeyNumber> = T[keyof T];
// ----------------------------------------------------------------------------
export const MapToSelectItem = <T extends KeyNumber>(
  keyNumber: T,
  keyMultilang: KeyMultilang<T>
): readonly SelectItem[] => {
  return ObjectValues(keyNumber).map((id) => {
    return { id: id, text: keyMultilang[id] };
  });
};

export const ValueToTextByMap = <T extends undefined | string>(
  keyMultilang: KeyMultilang<KeyNumber>,
  code: number | null,
  lang?: T,
  fallBackLang?: string | undefined
): T extends string ? string : MultiLang => {
  if (code === null) return '' as string;
  if (code in keyMultilang) {
    if (lang === undefined) {
      return keyMultilang[code] as T extends string ? string : MultiLang;
    } else if (lang in (keyMultilang as any)[code]) {
      return GetTextByMultiLang((keyMultilang as any)[code], lang, fallBackLang) as string;
    }
  }
  return '' as string;
};

export const SplitList = <T extends Array<any>>(arg: { size: number; list: T }): T[] => {
  const { list, size } = arg;
  if (size < 1) return [];
  const listCount = list.length;
  const rowCount = Math.ceil(listCount / size);
  const ret: any[] = Array.from({ length: rowCount })
    .fill(null)
    .map(() => []);
  // console.log({ listCount, size, rowCount, ret: JSON.stringify(ret) });
  list.forEach((row, index) => {
    const i = Math.floor(index / size);
    ret[i].push(row);
    // console.log({ i, row: JSON.stringify(row), ret: JSON.stringify(ret) });
  });
  return ret;
  //
};
