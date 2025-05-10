/* ----------------------------------------------------------------------------
// src\runtime\utils\select-item.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
----------------------------------------------------------------------------- */

import type { MultiLang } from "./multi-lang";

export interface SelectItem2<IdType extends number | string> {
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
}
type WithoutRequier = Partial<Omit<SelectItem2<any>, "id" | "text">>;
export type SelectItemOrigin = Omit<SelectItem2<any>, keyof WithoutRequier> &
  WithoutRequier;
