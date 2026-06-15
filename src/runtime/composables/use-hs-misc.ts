/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-misc.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-misc';
----------------------------------------------------------------------------- */

// [ pinia ]
import { defineStore } from 'pinia';
import { useKeyModifier } from '@vueuse/core';
// [ NUXT ]
import { nextTick, reactive } from 'vue';
// [ utils ]

import { Sleep } from '../utils/com';

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface StoreState {
  isInit: boolean;
  isReady: boolean;
}
// ----------------------------------------------------------------------------

export const useHsMisc = defineStore('HsMisc', () => {
  const capsLockState = useKeyModifier('Control');
  const state = reactive<StoreState>({
    isInit: false,
    isReady: false,
  });

  const init = async (readyDeray = 10) => {
    if (import.meta.server) return;
    await Sleep(0);
    await nextTick();
    state.isInit = true;
    await Sleep(readyDeray);
    state.isReady = true;
  };
  return {
    state,
    init,
    capsLockState,
  };
});
