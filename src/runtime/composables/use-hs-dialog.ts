/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-dialog.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsDialog = useHsDialog()
----------------------------------------------------------------------------- */

// [ node_modules ]
import dayjs from "dayjs/esm/index";
import { defineStore } from "pinia";
// ----------------------------------------------------------------------------
// [ utils ]
import { GenerateUniqeKey } from "../utils/com";
import type { MultiLang } from "../utils/multi-lang";
import { Theme } from "../utils/theme";
// [ types ]
import {
  DialogItem,
  InitDialogOption,
  DialogResult,
  type DialogOption,
} from "../types/dialog";
// ----------------------------------------------------------------------------
interface State {
  state: {
    id: number;
    pendingList: {
      ts: string;
      data: DialogItem;
    }[];
  };
}
// ----------------------------------------------------------------------------
export const useHsDialog = defineStore("HsDialog", {
  state: (): State => {
    return {
      state: {
        id: 0,
        pendingList: [],
      },
    };
  },
  getters: {
    Themes: () => {
      return Theme;
    },
    InitOption: () => {
      return InitDialogOption;
    },
    Result: () => {
      return DialogResult;
    },
  },
  actions: {
    async Show(
      message: MultiLang,
      title: MultiLang,
      option: DialogOption = InitDialogOption()
    ) {
      if (import.meta.server) return DialogResult.cancel;
      // console.log('useVUiDialog show');
      const item = new DialogItem(message, title, option);
      const pendingList = this.state.pendingList;
      const ts = GenerateUniqeKey() + dayjs().format("x");
      pendingList.push({
        ts: ts,
        data: item,
      });
      const ret = await item.show();
      this.state.pendingList = this.state.pendingList.filter(
        (row) => row.ts !== ts
      );
      return ret;
    },
    // ---------------------------------------------------
  },
});
