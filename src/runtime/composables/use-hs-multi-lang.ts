/* ----------------------------------------------------------------------------
  composables\use-store-multi-lang.ts
---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
// [ store ]
const storeMultiLang = useStoreMultiLang()

// [ MultiLang ]
const storeMultiLang = useStoreMultiLang();
const MultiLangText = storeMultiLang.MultiLangText;
const GetTextByMultiLang = storeMultiLang.GetTextByMultiLang;

const lang = computed(() => storeMultiLang.lang);

// or

// [ MultiLang ]
const MultiLangText = useStoreMultiLang().MultiLangText;
const GetTextByMultiLang = useStoreMultiLang().GetTextByMultiLang;

---------------------------------------------------------------------------- */

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type MultiLang, GetTextByMultiLang } from '../lib/multi-lang';
// ----------------------------------------------------------------------------
export interface StoreState {
  lang: string;
  fallback: string;
}
// ----------------------------------------------------------------------------
export const useHsMultiLang = defineStore({
  id: 'HsMultiLang',
  state: (): StoreState => {
    return {
      lang: 'ja',
      fallback: 'ja',
    };
  },
  // ----------------------------------------------------------------------------
  actions: {
    MultiLangText(text: MultiLang) {
      return computed(() => {
        return GetTextByMultiLang(text, this.lang, this.fallback);
      }).value;
    },
    GetTextByMultiLang: GetTextByMultiLang,
  },
});
