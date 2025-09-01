/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-is-mobile.ts
// ----------------------------------------------------------------------------
// [ composables ]
copnst hsFocus = useHsFocus()
----------------------------------------------------------------------------- */

// [ node_modules ]
import { ref } from "vue";
import { defineStore } from "pinia";
import { useRequestHeaders } from "#app";
// import { useRoute } from "#app";
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
export const useHsIsMobile = defineStore("HsIsMobile", () => {
  const isMobile = ref<boolean | null>(null);
  const GetUa = () => {
    try {
      if (import.meta.client) {
        if (navigator === undefined) return "";
        return navigator.userAgent.toLowerCase();
      }
      return useRequestHeaders(["User-Agent"])["user-agent"] || "";
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  const checkIsMobile = () => {
    if (import.meta.server && isMobile.value !== null) return;
    const ua = GetUa();
    const isOldIPad = /\(ipad.*os/.test(ua);
    const isIpad =
      /macintosh/.test(ua) &&
      navigator !== undefined &&
      navigator.maxTouchPoints > 1;
    const isiOS = /ip(?:ad|hone|od)/.test(ua);
    const isAndroid = /android|mobile/i.test(ua);
    isMobile.value = isOldIPad || isIpad || isiOS || isAndroid;
  };
  checkIsMobile();
  // console.log("isMobile", isMobile.value);
  return { isMobile };
});
