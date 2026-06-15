/* ----------------------------------------------------------------------------
// src\runtime\utils\select.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/select';
----------------------------------------------------------------------------- */

import type { SelectItem } from "./select-item";

export type DisplaySelectItem<IdType extends string | number> = {
  id: IdType | null;
} & Omit<SelectItem<IdType>, "id">;

export const useDisplayList = <IdType extends string | number>(arg: {
  list: SelectItem<IdType>[];
  id: IdType | null;
  order: boolean;
  unKnownData: SelectItem<IdType> | null;
  unKnownSelected: boolean;
  isShowHidden: boolean;
  require: boolean;
  nullText: string;
}) => {
  type ret = { id: IdType | null } & Omit<SelectItem<IdType>, "id">;
  //
  const {
    //
    list,
    id,
    order,
    unKnownData,
    unKnownSelected,
    isShowHidden,
    require,
    nullText,
  } = arg;
  const ret: DisplaySelectItem<IdType>[] = list
    .filter((row) => {
      if (row.deleted === true && row.id != id) {
        return false;
      }
      if (isShowHidden === false && row.hidden === true && row.id != id) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (!order) return 0;
      if (a.order === undefined || b.order === undefined) return 0;
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  const uk = unKnownData;
  if (uk !== null && unKnownSelected) {
    ret.push(uk);
  }
  if (!require) {
    ret.unshift({ id: null, text: nullText });
  }
  return ret;
  //   });
  //   return ret;
};
