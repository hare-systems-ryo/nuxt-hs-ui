/* ----------------------------------------------------------------------------
// src\runtime\utils\object.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/object';
----------------------------------------------------------------------------- */

export const GetMapValue = <T>(obj: T, key: keyof T | null): T[keyof T] | null => {
  if (key === null) return null;
  return obj[key];
};

/**
 * オブジェクトをJSON経由でコピーします
 * - JSON.parse(JSON.stringify(obj));
 */
export const ObjectCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Object.keys
 */
export const ObjectKeys = <T>(obj: T): (keyof T)[] => {
  return Object.keys(obj as any) as (keyof T)[];
};
/**
 * Object.values
 */
export const ObjectValues = <T>(obj: T): T[keyof T][] => {
  return Object.values(obj as any) as T[keyof T][];
};

/**
 * Object.entries
 */
export const ObjectEntries = <T>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj as any) as [keyof T, T[keyof T]][];

/**
 * オブジェクトのキーを再利用して
 * Value値をinitDataにした新しいオブジェクトを生成します
 */
export const ObjectKeyToMap = <T, T2>(obj: T, initData: T2): { [x in keyof T]: T2 } => {
  const valueType = typeOf(initData);
  const ngObje = ['set', 'map', 'symbol'].includes(valueType);
  if (ngObje) {
    throw new Error('Set and Map are not supported');
  }
  // console.log("ObjectKeyToMap", valueType, initData);
  const isObje = ['array', 'object'].includes(valueType);
  const isUndefined = valueType === undefined;
  return ObjectKeys(obj).reduce((ret, key) => {
    if (isUndefined) {
      ret[key] = initData;
    } else if (isObje) {
      ret[key] = ObjectCopy(initData);
    } else {
      ret[key] = initData;
    }
    return ret;
  }, {} as any);
};

/**
 * オブジェクトのキー配列を返します
 */
export const ObjectListKeyMap = <T>(obj: T[], key: string): { [x: string]: T } => {
  return obj.reduce((ret, row) => {
    ret[String((row as any)[key])] = row;
    return ret;
  }, {} as any);
};

// [ Object関連 ]
/**
 * オブジェクトの比較用
 * @param a 比較オブジェクト
 * @param b 比較オブジェクト
 * @returns オブジェクトが異なる場合[ false ]を返す
 */
export const ObjectCompare = (a: any, b: any): boolean => {
  if (JSON.stringify(a) === JSON.stringify(b)) return true;
  const objectSort = (obj: any) => {
    if (obj === null) {
      return null;
    }
    // ソートする
    const sorted = Object.entries(obj).sort();
    for (const i in sorted) {
      const val = (sorted as any)?.[i]?.[1] || undefined;
      if (typeof val === 'object') {
        (sorted as any)[i][1] = objectSort(val);
      }
    }
    return sorted;
  };
  const aJSON = JSON.stringify(objectSort(a));
  const bJSON = JSON.stringify(objectSort(b));
  return aJSON === bJSON;
};

/**
 * 配列の並び替え
 * @param baseList 並び替えをするリスト
 * @param idList 並び替えの基準となるリスト
 * @returns 並び替え結果
 */
export const ListIdSort = (baseList: { id: number; [key: string]: any }[], idList: number[]): number[] => {
  const listOk: number[] = [];
  const listNg: number[] = [];
  const tList: number[] = [];
  baseList.forEach((row: any) => tList.push(row.id));
  idList.forEach((row) => {
    if (tList.includes(row) === true) {
      listOk.push(row);
    } else {
      listNg.push(row);
    }
  });
  const ret: number[] = [];
  tList.forEach((id) => {
    if (listOk.includes(id) === true) {
      ret.push(id);
    }
  });
  listNg.forEach((id) => ret.push(id));
  return ret;
};

// [ 変換 ]
const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * オブジェクトの階層をフラットにします。
 */
export const FlatObj = (obj: any, flatObj: any = {}, prefix = ''): { [key: string]: any } => {
  const valueType = typeOf(obj);
  // console.log(prefix, obj, flatObj);
  if (valueType === 'undefined') {
    return flatObj;
  } else if (valueType === 'null' || valueType === 'number' || valueType === 'string' || valueType === 'boolean') {
    flatObj[prefix] = obj;
    return flatObj;
  } else if (valueType === 'array') {
    flatObj[`${prefix}`] = [];
    (obj as any[]).forEach((row, index) => {
      const newKey = `${prefix}[${index}]`;
      FlatObj(row, flatObj, newKey);
    });
    return flatObj;
  } else if (valueType === 'object') {
    flatObj[`${prefix}`] = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = prefix === '' ? key : prefix + '.' + key;
      FlatObj(value, flatObj, newKey);
    });
    return flatObj;
  } else {
    throw new Error(`FlatObj :: Unknown  Type ${valueType}`);
  }
};
