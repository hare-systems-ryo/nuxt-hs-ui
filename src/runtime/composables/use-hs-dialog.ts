/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-dialog.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-dialog';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from 'pinia';
// [ src > runtime > utils > * ]
// ----------------------------------------------------------------------------
// [ utils ]
import { GenerateUniqeKey } from '../utils/com';
import type { MultiLang } from '../utils/multi-lang';
import { Theme } from '../utils/theme';
import { dayjs } from '../utils/dayjs';

// [ types ]
import { DialogItem, InitDialogOption, DialogResult, type DialogOption } from '../types/dialog';
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
export const useHsDialog = defineStore('HsDialog', {
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
    async Show(message: MultiLang, title: MultiLang, option: DialogOption = InitDialogOption()) {
      if (import.meta.server) return DialogResult.cancel;
      // console.log('useVUiDialog show');
      const item = new DialogItem(message, title, option);
      const pendingList = this.state.pendingList;
      const ts = GenerateUniqeKey() + dayjs().format('x');
      pendingList.push({
        ts: ts,
        data: item,
      });
      const ret = await item.show();
      this.state.pendingList = this.state.pendingList.filter((row) => row.ts !== ts);
      return ret;
    },
    // ---------------------------------------------------
  },
});
