/* ----------------------------------------------------------------------------
// src\runtime\utils\select-item.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/select-item';
----------------------------------------------------------------------------- */

import type { MultiLang } from "./multi-lang";

export interface SelectItem<IdType extends number | string = number> {
  readonly id: IdType;
  /**
   * 多言語の場合は多言語のオブジェクトをセットする
   */
  readonly text: MultiLang;
  /**
   * 画像用URL
   */
  imgUrl?: string;
  /**
   * 表示順
   */
  order?: number;
  /**
   * 非表示 : true = 非表示。
   * ただし選択要素は表示する
   * 任意で表示に切り替え変更できる
   *
   */
  hidden?: boolean;
  /**
   * 削除非表示 : true = 非表示。
   * ただし選択要素は表示する
   */
  deleted?: boolean;
  /** iタグのアイコンを追加出来る Class */
  appendIcon?: string | string[];
}
// type WithoutRequier = Partial<Omit<SelectItem, "id" | "text">>;
// export type SelectItemOrigin = Omit<SelectItem, keyof WithoutRequier> &
//   WithoutRequier;
