/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-misc.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsMisc = useHsMisc()
----------------------------------------------------------------------------- */

// [ pinia ]
import { defineStore } from "pinia";
// [ NUXT ]
import { nextTick } from "vue";
import { useEventListener } from "@vueuse/core";
// [ utils ]
import { Sleep, IsMobile } from "../utils/com";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface StoreState {
  state: {
    isInit: boolean;
    isReady: boolean;
    isMobile: boolean;
    // ローディング終了までの時間
    readyDeray: number;
    window: {
      h: number;
      w: number;
    };
    scrollbarWidth: number;
  };
}
// ----------------------------------------------------------------------------
export const useHsMisc = defineStore("HsMisc", {
  state: (): StoreState => {
    return {
      state: {
        isInit: false,
        isReady: false,
        isMobile: IsMobile(),
        readyDeray: 10,
        window: {
          h: 0,
          w: 0,
        },
        scrollbarWidth: 0,
      },
    };
  },
  // ----------------------------------------------------------------------------
  actions: {
    IsMobile() {
      return IsMobile();
    },
    // ---------------------
    async Init(arg?: { readyDeray?: number }) {
      await Sleep(0);
      const state = this.state;
      if (state.isInit) return;
      if (arg?.readyDeray) {
        state.readyDeray = arg.readyDeray;
      }
      state.isInit = true;
      state.isMobile = IsMobile();
      const initWindow = () => {
        useEventListener(window, "resize", () => {
          state.window = {
            h: window.innerHeight,
            w: window.innerWidth,
          };
          state.scrollbarWidth =
            window.innerWidth - document.body.clientWidth < 0
              ? 0
              : window.innerWidth - document.body.clientWidth;
        });
        state.window = {
          h: window.innerHeight,
          w: window.innerWidth,
        };
        setTimeout(() => {
          state.scrollbarWidth =
            window.innerWidth - document.body.clientWidth < 0
              ? 0
              : window.innerWidth - document.body.clientWidth;
          // console.log(state.scrollbarWidth);
        }, 1000);
      };
      initWindow();
      await Sleep(state.readyDeray);
      state.isReady = true;
      await nextTick();
    },
    // ---------------------
  },
});
