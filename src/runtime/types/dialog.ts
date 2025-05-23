/* ----------------------------------------------------------------------------
// src\runtime\types\dialog.ts
// ----------------------------------------------------------------------------
// [ src > runtime > types > * ]
----------------------------------------------------------------------------- */

// [ utils ]
import type { MultiLang } from "../utils/multi-lang";
import type { Theme } from "../utils/theme";
// ----------------------------------------------------------------------------

export const DialogDefaultZIndex = 3000;

export const DialogResult = {
  left: "left",
  right: "right",
  cancel: "cancel",
} as const;
export type DialogResult = (typeof DialogResult)[keyof typeof DialogResult];

/**
 * Option interface
 */
export interface DialogOption {
  zindex: number;
  theme: Theme;
  defaultBtn: "left" | "right" | "cancel" | null;
  btnLeft: {
    isShow: boolean;
    title: MultiLang;
    theme: Theme;
    variant: "flat" | "text" | "outlined";
  };
  btnRight: {
    isShow: boolean;
    title: MultiLang;
    theme: Theme;
    variant: "flat" | "text" | "outlined";
  };
  btnCancel: {
    isShow: boolean;
    title: MultiLang;
    theme: Theme;
  };
}
/**
 * Option 初期化
 * Store経由で利用する
 */
export const InitDialogOption = (): DialogOption => {
  return {
    zindex: 10001,
    theme: "main1",
    defaultBtn: "right",
    btnLeft: {
      isShow: true,
      title: "no",
      theme: "dark",
      variant: "flat",
    },
    btnRight: {
      isShow: true,
      title: "Yes",
      theme: "accent1",
      variant: "flat",
    },
    btnCancel: {
      isShow: true,
      title: "",
      theme: "white",
    },
  };
};

export class DialogItem {
  public message: MultiLang;
  public title: MultiLang;
  public option: DialogOption;
  public counter: number;
  // public timeout: boolean;

  constructor(
    message: MultiLang,
    title: MultiLang,
    option: DialogOption = InitDialogOption()
  ) {
    this.message = message;
    this.title = title;
    this.option = option;
    this.counter = -1;
    // this.timeout = false;
  }

  public leftBtnClick = () => console.log();
  public rightBtnClick = () => console.log();
  public cancelBtnClick = () => console.log();
  public show = () => {
    return new Promise<DialogResult>((resolve) => {
      this.leftBtnClick = () => {
        // console.log('leftBtnClick');
        resolve(DialogResult.left);
      };
      this.rightBtnClick = () => {
        // console.log('rightBtnClick');
        resolve(DialogResult.right);
      };
      this.cancelBtnClick = () => {
        // console.log('cancelBtnClick');
        resolve(DialogResult.cancel);
      };
    });
  };
}
