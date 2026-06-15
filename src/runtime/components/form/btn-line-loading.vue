<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\btn-line-loading.vue
// ----------------------------------------------------------------------------
// BtnLineLoading
// BtnLineLoadingBtnLineLoading
---------------------------------------------------------------------------- */

// [ NUXT ]
import { computed } from "#imports";
// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// ----------------------------------------------------------------------------
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
  class: "",
});
// ----------------------------------------------------------------------------
const baseClass = [
  //
  "absolute",
  "inset-0",
  "bg-slate-600/[0.6]",
  "flex",
  "justify-center",
  "items-center",
  "transition-opacity",
];
const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
// ----------------------------------------------------------------------------
</script>

<template>
  <div class="BtnLineLoading" :class="[classStyle, { show: props.show }]">
    <span
      class="loader"
      :style="`--BtnLineLoading-height:${props.height}px;--BtnLineLoading-speed:${props.speed}ms`"
    />
  </div>
</template>

<style lang="scss" scoped>
.BtnLineLoading {
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
  height: var(--BtnLineLoading-height);
  display: inline-block;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  border-radius: 9999px;
}
.loader::after {
  content: "";
  width: 50%;
  height: var(--BtnLineLoading-height);
  background: #fff;
  position: absolute;
  border-radius: 9999px;

  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: BtnLineLoading-anime var(--BtnLineLoading-speed) linear
    infinite;
}
</style>

<style lang="scss">
@keyframes BtnLineLoading-anime {
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
