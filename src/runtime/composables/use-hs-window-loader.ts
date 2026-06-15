/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-window-loader.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-window-loader';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from 'pinia';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface State {
  state: {
    show: boolean;
    zindex: number;
  };
}
// ----------------------------------------------------------------------------
export const useHsWindowLoader = defineStore('HsWindowLoader', {
  state: (): State => {
    return {
      state: {
        show: false,
        zindex: 10000,
      },
    };
  },
  actions: {
    async Show() {
      this.state.show = true;
    },
    async Hide() {
      this.state.show = false;
    },
    // ---------------------------------------------------
  },
});
