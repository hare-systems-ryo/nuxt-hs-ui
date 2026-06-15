<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\window-loader.vue
// ----------------------------------------------------------------------------
// WindowLoader
// WindowLoaderWindowLoader
---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
const WindowLoader = useHsWindowLoader();
WindowLoader.Show()
WindowLoader.zindex=10000
----------------------------------------------------------------------------- */

// [ vueuse ]
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

// [ NUXT ]
import { ref, watch } from '#imports';
// [ composables ]
import { useHsWindowLoader } from '../../composables/use-hs-window-loader';
import { useHsPinia } from '../../composables/use-pinia';
// ----------------------------------------------------------------------------
const WindowLoader = useHsWindowLoader(useHsPinia());
// ----------------------------------------------------------------------------
// [ focusTrap ]
const focusTargetElm = ref<HTMLElement | null>(null);
const { activate, deactivate } = useFocusTrap(focusTargetElm);
watch(
  () => WindowLoader.state.show,
  (show) => {
    if (show) {
      activate();
    } else {
      deactivate();
    }
  }
);
// ----------------------------------------------------------------------------
</script>

<template>
  <div
    ref="focusTargetElm"
    class="HsUiWindowLoader"
    :class="{ show: WindowLoader.state.show }"
    :style="{ 'z-index': WindowLoader.state.zindex }"
  >
    <!--  -->
    <!--  -->
    <div class="HsUiWindowLoader-body">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1" />
        <div class="sk-cube sk-cube2" />
        <div class="sk-cube sk-cube3" />
        <div class="sk-cube sk-cube4" />
        <div class="sk-cube sk-cube5" />
        <div class="sk-cube sk-cube6" />
        <div class="sk-cube sk-cube7" />
        <div class="sk-cube sk-cube8" />
        <div class="sk-cube sk-cube9" />
      </div>
      <div class="HsUiWindowLoader-text">Please wait...</div>
      <input type="checkbox" class="dummy" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$base-color-modal: rgba(0, 0, 0, 0.411);

//--------------------------------------------

//ダミー用
.dummy {
  opacity: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
}
.HsUiWindowLoader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: $base-color-modal;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 300ms;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  &.show {
    pointer-events: all;
    opacity: 1;
  }

  .HsUiWindowLoader-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .HsUiWindowLoader-text {
    padding: 18px 0 0 0;
    font-size: 20px;
    line-height: 1em;
    color: white;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;

    @media screen and (min-width: #{ 0 }px) and (max-width: #{ 600 - 0.1}px) {
      font-size: 16px;
    }
    &:focus {
      background-color: red;
    }
  }

  .sk-cube-grid {
    width: 130px;
    height: 130px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .sk-cube {
    width: calc(33.33% - 2px);
    height: calc(33.33% - 2px);
    margin: 1px;
    background-color: rgba(37, 243, 233, 0.767);
    animation: HsUiWindowLoader-anime 1.3s infinite ease-in-out;
  }

  .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
}
</style>

<style lang="scss">
@keyframes HsUiWindowLoader-anime {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }

  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
