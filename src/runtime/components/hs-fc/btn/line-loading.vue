<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-fc\btn\line-loading.vue
// ----------------------------------------------------------------------------
HsFcBtnLineLoading
HsFcBtnLineLoadingHsFcBtnLineLoading
----------------------------------------------------------------------------- */

// [ vue ]
import { computed } from 'vue';
// [ NUXT ]
import { useRuntimeConfig } from '#imports';
// // [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../../lib/com';
import { GetPrefix, RemovePrefix } from '../../../lib/prefix';
// ----------------------------------------------------------------------------
const runtimeConfig: any = useRuntimeConfig();
const prefix = GetPrefix(runtimeConfig);
// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: prefix,
});

// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType;
  show: boolean;
  height?: number | undefined;
  speed?: number | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  height: 5,
  speed: 1000,
  class: '',
});
// ----------------------------------------------------------------------------
const baseClass = RemovePrefix(prefix, [
  //
  'absolute',
  'tw-absolute',
  'inset-0',
  'tw-inset-0',
  'bg-indigo-600/[0.6]',
  'tw-bg-indigo-600/[0.6]',
  'flex',
  'tw-flex',
  'justify-center',
  'tw-justify-center',
  'items-center',
  'tw-items-center',
  'transition-opacity',
  'tw-transition-opacity',
]);
const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="HsFcBtnLineLoading" :class="[classStyle, { show: props.show }]">
    <!-- <div class="circleloader"></div> -->
    <span
      class="loader"
      :style="`--HsFcBtnLineLoading-height:${props.height}px;--HsFcBtnLineLoading-speed:${props.speed}ms`"
    />
  </div>
</template>
<style lang="scss" scoped>
.HsFcBtnLineLoading {
  opacity: 0;
  pointer-events: none;
  user-select: none;
  padding: 0 10%;
  &.show {
    opacity: 1;
  }
}
.loader {
  width: 100%;
  height: var(--HsFcBtnLineLoading-height);
  display: inline-block;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  // border-radius: calc(infinity * 1px);
  border-radius: calc(1px / 0);
}
.loader::after {
  content: '';
  width: 50%;
  height: var(--HsFcBtnLineLoading-height);
  background: #fff;
  position: absolute;
  // border-radius: calc(infinity * 1px);
  border-radius: calc(1px / 0);
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: HsFcBtnLineLoading-anime var(--HsFcBtnLineLoading-speed) linear infinite;
}
</style>

<style lang="scss">
@keyframes HsFcBtnLineLoading-anime {
  0% {
    opacity: 0;
    left: 0;
    transform: translateX(-200%);
  }
  20% {
    opacity: 1;
    left: 0;
    transform: translateX(-200%);
  }
  80% {
    opacity: 1;
    left: 100%;
    left: 0;
    transform: translateX(200%);
  }
  100% {
    left: 100%;
    left: 0;
    transform: translateX(200%);
    opacity: 0;
  }
}
</style>
