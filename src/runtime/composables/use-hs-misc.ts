/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-misc.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsMisc = useHsMisc()
----------------------------------------------------------------------------- */

// [ pinia ]
import { defineStore } from "pinia";
// [ NUXT ]
import { useEventListener, nextTick } from "#imports";
// [ utils ]
import { Sleep, IsMobile } from "../utils/com";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface StoreState {
  state: {
    isInit: boolean;
    isReady: boolean;
    isMobile: boolean;
    isBracke: boolean;
    spBracke: number;
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
        isMobile: false,
        isBracke: false,
        spBracke: 768,
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
    // ---------------------
    async Init(arg?: { spBracke?: number; readyDeray?: number }) {
      await Sleep(0);
      const state = this.state;
      if (state.isInit) return;
      if (arg?.readyDeray) {
        state.readyDeray = arg.readyDeray;
      }
      if (arg?.spBracke) {
        state.spBracke = arg.spBracke;
      }
      state.isInit = true;
      state.isMobile = IsMobile();
      const initWindow = () => {
        useEventListener(window, "resize", () => {
          state.isBracke = window.innerWidth < state.spBracke;
          state.window = {
            h: window.innerHeight,
            w: window.innerWidth,
          };
          state.scrollbarWidth =
            window.innerWidth - document.body.clientWidth < 0
              ? 0
              : window.innerWidth - document.body.clientWidth;
        });
        state.isBracke = window.innerWidth < state.spBracke;
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
