/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-multi-lang.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsMultiLang = useHsMultiLang()
----------------------------------------------------------------------------- */

// [dayjs]
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
import en from "dayjs/locale/en.js";
import { defineStore } from "pinia";
// [ NUXT ]
import { computed, watch } from "#imports";
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
  // ----------------------------------------------------------------------------
  actions: {
    init(arg: { lang?: string; setDayjsLang?: (lang: string) => void }) {
      const state = this.state;
      if (state.isInit) return;
      const setDayjsLang =
        arg.setDayjsLang !== undefined
          ? arg.setDayjsLang
          : (lang: string) => {
              if (lang === "ja") {
                dayjs.locale(ja);
              } else {
                dayjs.locale(en);
              }
            };
      watch(
        () => this.state.lang,
        (lang) => {
          if (arg.setDayjsLang) {
            arg.setDayjsLang(lang);
          } else {
            setDayjsLang(lang);
          }
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
