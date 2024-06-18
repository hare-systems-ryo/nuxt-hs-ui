/* ----------------------------------------------------------------------------
composables\use-ui-window-loader.ts
// ----------------------------------------------------------------------------
// [ composables > * ]
import {} from '~/composables/use-ui-window-loader';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from 'pinia';
// ----------------------------------------------------------------------------
import { GenerateUniqeKey } from '../lib/com';
import { type MultiLang } from '../lib/multi-lang';
// ----------------------------------------------------------------------------
import { type Message, Theme } from '../components/hs-ui/toast/index.type';
// ----------------------------------------------------------------------------
interface State {
  state: {
    id: number;
    pendingList: Message[];
    zindex: number;
  };
}
// ----------------------------------------------------------------------------
const toastShow = (message: MultiLang, title: MultiLang, hideAfter: number, theme: Theme) => {
  const toast = useHsUiToast();
  const newToast: Message = {
    key: GenerateUniqeKey(),
    isShow: true,
    title: title,
    message: message,
    hideAfter: hideAfter,
    barWidth: 0,
    theme: theme,
  };
  toast.state.pendingList.push(newToast);
};
// ----------------------------------------------------------------------------
export const useHsUiToast = defineStore({
  id: 'HsUiToast',
  state: (): State => {
    return {
      state: {
        id: 0,
        pendingList: [],
        zindex: 10002,
      },
    };
  },
  actions: {
    Success(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Success);
    },
    Info(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Info);
    },
    Warning(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Warning);
    },
    Error(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Error);
    },
    // ---------------------------------------------------
  },
});
