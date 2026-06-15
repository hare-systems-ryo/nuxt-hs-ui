/* ----------------------------------------------------------------------------
// src\runtime\utils\class-style.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/class-style';
----------------------------------------------------------------------------- */

export type ClassTypeObje = {
  [key: string]: boolean;
};
export type ClassTypeArray = (string | ClassTypeObje | ClassTypeArray)[];
/** VueSFC の「Prop」に渡されるclassプロパティの型 */
export type ClassType = string | ClassTypeObje | ClassTypeArray;

// [ 変換 ]
const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/** VueSFC の「Prop」に渡されるclassプロパティを文字列に変換する */
export const ClassTypeToString = (c: ClassType) => {
  const valueType = typeOf(c);
  if (valueType === "string") return c as string;
  if (valueType === "undefined") return "";
  if (valueType === "array") {
    return (c as ClassTypeArray)
      .reduce((ret: string[], row) => {
        //
        const a = ClassTypeToString(row);
        if (a) {
          ret.push(a);
        }
        return ret;
      }, [] as string[])
      .join(" ");
    // return '';
  }
  if (valueType === "object") {
    return Object.keys(c)
      .reduce((ret, key) => {
        const b = (c as ClassTypeObje)[key];
        if (b) {
          ret.push(key);
        }
        return ret;
      }, [] as string[])
      .join(" ");
  }
  return "";
};
