/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-misc.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsMisc = useHsMisc()
----------------------------------------------------------------------------- */

// [ pinia ]
import { defineStore } from "pinia";
// [ NUXT ]
import { nextTick, reactive } from "vue";
import { useEventListener } from "@vueuse/core";
import { useRequestHeaders } from "#app";
// [ utils ]
import { Sleep } from "../utils/com";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface StoreState {
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
}
// ----------------------------------------------------------------------------
export const useHsMisc = defineStore("HsMisc", () => {
  const GetUa = () => {
    try {
      if (import.meta.client) {
        if (navigator === undefined) return "";
        return navigator.userAgent.toLowerCase();
      }
      if (import.meta.server) {
        return useRequestHeaders(["User-Agent"])["user-agent"] || "";
      }
      return "";
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  const IsMobile = () => {
    const ua = GetUa();
    // console.log({ ua });
    if (/\(iPad.*OS/i.test(ua)) return true;
    if (/iP(?:ad|hone|od)/i.test(ua)) return true;
    if (/android|ipod|ipad|iphone|mobile/i.test(ua)) return true;
    if (/Macintosh/.test(ua) && import.meta.client) {
      if (navigator === undefined) return false;
      return navigator.maxTouchPoints > 1;
    }
    return false;
  };

  const state = reactive<StoreState>({
    isInit: false,
    isReady: false,
    isMobile: IsMobile(),
    readyDeray: 10,
    window: {
      h: 0,
      w: 0,
    },
    scrollbarWidth: 0,
  });

  const Init = async (arg?: { readyDeray?: number }) => {
    await Sleep(0);
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
  };
  return {
    state,
    GetUa,
    IsMobile,
    Init,
  };
});

// ----------------------------------------------------------------------------

// ---------------------
// },
