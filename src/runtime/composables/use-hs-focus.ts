/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-focus.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsFocus = useHsFocus()
----------------------------------------------------------------------------- */

// [ node_modules ]
import { watch } from "vue";
import { defineStore } from "pinia";
import { useRoute } from "#imports";
// ----------------------------------------------------------------------------
interface State {
  state: {
    isInit: boolean;
    id: string;
  };
}
// ----------------------------------------------------------------------------
export const useHsFocus = defineStore("HsFocus", {
  state: (): State => {
    return {
      state: {
        isInit: false,
        id: "",
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
          state.id = "";
        }
      );
    },
    // ---------------------------------------------------
  },
});
