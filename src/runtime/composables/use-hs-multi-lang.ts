/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-multi-lang.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-multi-lang';
----------------------------------------------------------------------------- */

// [dayjs]
import { dayjs } from '../utils/dayjs';
import ja from 'dayjs/esm/locale/ja.js';
import en from 'dayjs/esm/locale/en.js';
import { defineStore } from 'pinia';
// [ NUXT ]
import { computed, watch, ref } from 'vue';
// [ utils ]
import type { MultiLang } from '../utils/multi-lang';
import { GetTextByMultiLang } from '../utils/multi-lang';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export const useHsMultiLang = defineStore('HsMultiLang', () => {
  const lang = ref('ja');
  const fallBack = ref('ja');

  const langChange = ref((_lang: string) => {
    if (import.meta.server) return;
    if (_lang === 'ja') {
      dayjs.locale(ja);
    } else {
      dayjs.locale(en);
    }
  });

  /**
   * A reactive handler that updates the Day.js locale whenever
   * the application language changes.
   *
   * By default, this function switches between Japanese and English:
   *
   * ```javascript
   * import ja from 'dayjs/esm/locale/ja.js';
   * import en from 'dayjs/esm/locale/en.js';
   * const _langChange=(_lang: string)=>{
   *  if (_lang === 'ja') {
   *    dayjs.locale(ja);
   *  } else {
   *    dayjs.locale(en);
   *  }
   * }
   * ```
   *
   * This ensures that all Day.js–based formatting (e.g., dates, times)
   * automatically reflects the current UI language setting.
   */
  const setLangChange = (_langChange: (_lang: string) => void) => {
    langChange.value = _langChange;
  };
  watch(
    () => lang.value,
    (_lang) => {
      langChange.value(_lang);
    },
    { immediate: true }
  );

  /**
   * Creates a `ComputedRef<string>` that resolves the appropriate text
   * from a given `MultiLang` object based on the active language.
   *
   * This is useful when you need a reactive value that automatically updates
   * whenever the language setting changes.
   */
  const tx = (text: MultiLang) => {
    return computed(() => {
      return GetTextByMultiLang(text, lang.value, fallBack.value);
    });
  };

  /**
   * Retrieves the localized text from a `MultiLang` object
   * for the current (or optionally provided) language.
   *
   * Unlike `tx`, this returns a plain string rather than a computed reference.
   */
  const gt = (text: MultiLang) => {
    return GetTextByMultiLang(text, lang.value, fallBack.value);
  };
  return { lang, fallBack, tx, gt, GetText: GetTextByMultiLang, setLangChange };
});
