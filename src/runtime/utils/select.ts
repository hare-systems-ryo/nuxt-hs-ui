/* ----------------------------------------------------------------------------
// src\runtime\utils\select.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
----------------------------------------------------------------------------- */

import type { SelectItem as _SelectItem } from "./select-item";
export type SelectItem = _SelectItem;

export type DisplaySelectItem = { id: number | null } & Omit<SelectItem, "id">;
export const useDisplayList = (arg: {
  list: SelectItem[];
  id: number | null;
  order: boolean;
  unKnownData: SelectItem | null;
  unKnownSelected: boolean;
  isShowHidden: boolean;
  require: boolean;
  nullText: string;
}) => {
  type ret = { id: number | null } & Omit<SelectItem, "id">;
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
  //   const displayList = computed(() => {
  const ret: DisplaySelectItem[] = list
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
