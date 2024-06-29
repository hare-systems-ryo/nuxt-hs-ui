/* ----------------------------------------------------------------------------
composables\use-ui-window-loader.ts
// ----------------------------------------------------------------------------
// [ composables > * ]
import {} from '~/composables/use-ui-window-loader';
----------------------------------------------------------------------------- */

// [ node_modules ]
// import dayjs from 'dayjs';
import dayjs from 'dayjs/esm/index';
import { defineStore } from 'pinia';
// ----------------------------------------------------------------------------
import { GenerateUniqeKey } from '../lib/com';
import { type MultiLang } from '../lib/multi-lang';
// ----------------------------------------------------------------------------
import { DialogItem, InitDialogOption, DialogResult, type DialogOption } from '../components/hs-ui/dialog/index.type';
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
export const useHsUiDialog = defineStore({
  id: 'HsUiDialog',
  state: (): State => {
    return {
      state: {
        id: 0,
        pendingList: [],
      },
    };
  },
  getters: {
    // hoge: (state) => {
    //   return '';
    // },
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
