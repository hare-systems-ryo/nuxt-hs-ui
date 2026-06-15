/* ----------------------------------------------------------------------------
// src\runtime\types\toast.ts
// ----------------------------------------------------------------------------
// [ src > runtime > types > * ]
import {} from '~/src/runtime/types/toast';
----------------------------------------------------------------------------- */

// [ utils ]
import type { MultiLang } from "../utils/multi-lang";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

export const Theme = {
  Success: "success",
  Info: "info",
  Warning: "warning",
  Error: "error",
} as const;
export type Theme = (typeof Theme)[keyof typeof Theme];

export interface Message {
  key: string;
  title: MultiLang;
  message: MultiLang;
  // isShow: boolean;
  hideAfter: number;
  barWidth: number;
  theme: Theme;
  setEvent:boolean
}

export interface Controler {
  Success: (message: MultiLang, title: MultiLang, hideAfter?: number) => void;
  Info: (message: MultiLang, title: MultiLang, hideAfter?: number) => void;
  Warning: (message: MultiLang, title: MultiLang, hideAfter?: number) => void;
  E: (message: MultiLang, title: MultiLang, hideAfter?: number) => void;
}
