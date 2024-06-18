/* ----------------------------------------------------------------------------
src\runtime\composables\use-hs-form-focus.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-form-focus';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { watch } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from '#imports';
// ----------------------------------------------------------------------------
interface State {
  state: {
    isInit: boolean;
    id: string;
  };
}
// ----------------------------------------------------------------------------
export const useHsFormFocus = defineStore({
  id: 'HsFormFocus',
  state: (): State => {
    return {
      state: {
        isInit: false,
        id: '',
      },
    };
  },
  actions: {
    async Init() {
      const state = this.state;
      if (state.isInit) return;
      const route = useRoute();
      watch(
        () => route.fullPath,
        () => {
          state.id = '';
        }
      );
    },
    // ---------------------------------------------------
  },
});
