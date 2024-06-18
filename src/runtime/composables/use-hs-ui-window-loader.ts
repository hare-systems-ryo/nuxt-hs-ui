/* ----------------------------------------------------------------------------
composables\use-ui-window-loader.ts
// ----------------------------------------------------------------------------
// [ composables > * ]
import {} from '~/composables/use-ui-window-loader';
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
export const useHsUiWindowLoader = defineStore({
  id: 'HsUiWindowLoader',
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
