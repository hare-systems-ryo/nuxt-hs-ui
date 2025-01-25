/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-multi-lang.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsMultiLang = useHsMultiLang()
----------------------------------------------------------------------------- */

// [dayjs]
import dayjs from "dayjs/esm/index";
import ja from "dayjs/esm/locale/ja.js";
import en from "dayjs/esm/locale/en.js";
import { defineStore } from "pinia";
// [ NUXT ]
import { computed, watch } from "vue";
// [ utils ]
import type { MultiLang } from "../utils/multi-lang";
import { GetTextByMultiLang } from "../utils/multi-lang";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface StoreState {
  state: {
    lang: string;
    fallBack: string;
    dateFormat: string;
    isInit: boolean;
  };

  // apiSetDefaultLang: {
  //   ts: string;
  //   loading: boolean;
  // };
}
// ----------------------------------------------------------------------------
export const useHsMultiLang = defineStore("HsMultiLang", {
  state: (): StoreState => {
    return {
      state: {
        lang: "ja",
        fallBack: "ja",
        dateFormat: "YYYY-MM-DD",
        isInit: false,
      },
    };
  },
  getters: {
    lang(state) {
      return state.state.lang;
    },
    dateFormat(state) {
      return state.state.dateFormat;
    },
  }, // ----------------------------------------------------------------------------
  actions: {
    init(arg: {
      lang?: string;
      changeLangFunc?: (lang: string) => Promise<void> | void;
    }) {
      const state = this.state;
      if (state.isInit) return;
      const changeLangFunc =
        arg.changeLangFunc === undefined
          ? (lang: string) => {
              if (lang === "ja") {
                dayjs.locale(ja);
              } else {
                dayjs.locale(en);
              }
            }
          : arg.changeLangFunc;
      watch(
        () => this.state.lang,
        (lang) => {
          changeLangFunc(lang);
        },
        { immediate: true }
      );
    },
    // ---------------------
    tx(text: MultiLang, lang = undefined) {
      const state = this.state;
      return computed(() => {
        if (lang) {
          return GetTextByMultiLang(text, lang, state.fallBack);
        }
        return GetTextByMultiLang(text, state.lang, state.fallBack);
      });
    },
    // ---------------------
  },
});
