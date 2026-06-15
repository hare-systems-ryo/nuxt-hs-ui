/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-toast.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-toast';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from 'pinia';
// ----------------------------------------------------------------------------
// [ utils ]
import { GenerateUniqeKey } from '../utils/com';
import type { MultiLang } from '../utils/multi-lang';
// [ types ]
import { type Message, Theme } from '../types/toast';
import { useHsPinia } from '../composables/use-pinia';
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
  const toast = useHsToast(useHsPinia());
  const key = GenerateUniqeKey();
  const newToast: Message = {
    key: key,
    // isShow: true,
    title: title,
    message: message,
    hideAfter: hideAfter,
    barWidth: 0,
    theme: theme,
    setEvent: false,
  };
  toast.state.pendingList.push(newToast);
  if (newToast.hideAfter !== 0) {
    setTimeout(() => {
      toast.state.pendingList = toast.state.pendingList.filter((row) => row.key !== key);
    }, newToast.hideAfter);
  }
};
// ----------------------------------------------------------------------------
export const useHsToast = defineStore('HsUiToast', {
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
    s(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Success);
    },
    Success(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Success);
    },
    Info(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Info);
    },
    i(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Info);
    },
    w(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Warning);
    },
    Warning(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Warning);
    },
    e(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Error);
    },
    Error(message: MultiLang, title: MultiLang, hideAfter = 0) {
      toastShow(message, title, hideAfter, Theme.Error);
    },
    // ---------------------------------------------------
  },
});
