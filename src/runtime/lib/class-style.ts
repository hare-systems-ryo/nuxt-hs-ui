/* ----------------------------------------------------------------------------
src\lib\class-style.ts
// ----------------------------------------------------------------------------
// [ src > lib > * ]
import {} from '~/src/lib/class-style';
----------------------------------------------------------------------------- */

type ClassTypeObje = {
  [key: string]: boolean;
};
type ClassTypeArray = (string | ClassTypeObje | ClassTypeArray)[];
export type ClassType = string | ClassTypeObje | ClassTypeArray;

// [ 変換 ]
const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export const ClassTypeToString = (c: ClassType | undefined) => {
  if (c === undefined) return '';
  const valueType = typeOf(c);
  if (valueType === 'string') return c as string;
  if (valueType === 'undefined') return '';
  if (valueType === 'array') {
    return (c as ClassTypeArray)
      .reduce((ret: string[], row) => {
        //
        const a = ClassTypeToString(row);
        if (a) {
          ret.push(a);
        }
        return ret;
      }, [] as string[])
      .join(' ');
    // return '';
  }
  if (valueType === 'object') {
    return Object.keys(c)
      .reduce((ret, key) => {
        const b = (c as ClassTypeObje)[key];
        if (b) {
          ret.push(key);
        }
        return ret;
      }, [] as string[])
      .join(' ');
  }
  return '';
};

export const ClassTypeToArray = (c: ClassType | undefined) => {
  if (c === undefined) return [] as string[];
  const valueType = typeOf(c);
  if (valueType === 'string') return [c] as string[];
  if (valueType === 'undefined') return [] as string[];
  if (valueType === 'array') {
    return (c as ClassTypeArray).reduce((ret: string[], row) => {
      //
      const a = ClassTypeToString(row);
      if (a) {
        ret.push(a);
      }
      return ret;
    }, [] as string[]);
  }
  if (valueType === 'object') {
    return Object.keys(c).reduce((ret, key) => {
      const b = (c as ClassTypeObje)[key];
      if (b) {
        ret.push(key);
      }
      return ret;
    }, [] as string[]);
  }
  return [];
};

// export type NumberBrakePoint = 400 | 600 | 800 | 1000 | 1200 | 1400 | 1600 | 1800;
