/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-scroll-lock.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-scroll-lock';
----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------

// SFC コンポーネント側
const scrollLock = useHsScrollLock();

const modalElm = useTemplateRef<HTMLElement>('modalElm');
watch(modalElm, (elm) => {
  if (elm !== null) scrollLock.init(elm);
});
onUnmounted(() => {
  // ロックしたままを回避
  scrollLock.unlock();
});

// ロックするとき
scrollLock.lock();
// 案ロックするとき
scrollLock.unlock();

----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from "pinia";
import { GenerateUniqeKey } from "../utils/com";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ref, onUnmounted } from "vue";

export const useHsScrollLockPinia = defineStore("HsScrollLockPinia", () => {
  // ---------------------------------------------------
  const active = ref(false);
  const key = ref("");
  return { active, key };
});

export const useHsScrollLock = () => {
  const scrollY = ref(0);
  const isIOS = ref(false);
  const elm = ref<HTMLElement | null>(null);
  const key = GenerateUniqeKey();
  const hsScrollLockPinia = useHsScrollLockPinia();

  onUnmounted(() => {
    unlock();
  });

  // ----------------------------------------------------------------------------
  const checkSafariMobile = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || "";
    const isOldIPad = /\(iPad.*OS/.test(ua);
    const isIpad = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    const isiOS = /iP(?:ad|hone|od)/.test(ua);
    // console.log({ ua, isOldIPad, isIpad, isiOS });
    return isOldIPad || isIpad || isiOS;
  };

  const init = (element: HTMLElement | null) => {
    if (element === null) {
      console.error(
        "[useScrollLock] Expected a valid HTMLElement in init(), but got null. Make sure to pass the correct ref."
      );
      if (import.meta.dev) {
        throw new Error(
          "[useScrollLock] Expected a valid HTMLElement in init(), but got null. Make sure to pass the correct ref."
        );
      }
    }
    elm.value = element;
    isIOS.value = checkSafariMobile();
  };

  const lock = () => {
    if (hsScrollLockPinia.active) return;
    hsScrollLockPinia.key = key;
    hsScrollLockPinia.active = true;
    if (isIOS.value) {
      scrollY.value = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY.value}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      if (!elm.value) return;
      const options = {
        // bodyにスクロールバー分のpadding-rightを追加するかどうか（デフォルト値：false）
        reserveScrollBarGap: true,
      };
      disableBodyScroll(elm.value, options);
    }
  };

  const unlock = () => {
    if (hsScrollLockPinia.key !== key) return;
    hsScrollLockPinia.key = "";
    hsScrollLockPinia.active = false;
    if (isIOS.value) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY.value);
    } else {
      if (!elm.value) return;
      enableBodyScroll(elm.value);
    }
  };
  return { unlock, lock, init };
};
