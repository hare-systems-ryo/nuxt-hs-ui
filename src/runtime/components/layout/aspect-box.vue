<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\aspect-box.vue
// ----------------------------------------------------------------------------
// AspectBox
// AspectBoxAspectBox
---------------------------------------------------------------------------- */
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { computed } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import { Int } from '../../utils/number';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
type Props = {
  class?: ClassType;
  /**
   * Aspect ratio
   * - Example:
   *   - 1:1
   *   - 3:2 <- Default
   *   - 4:3
   *   - 16:9
   */
  rate?: string;
};

const props = withDefaults(defineProps<Props>(), {
  class: '',
  rate: '3:2',
});
const aspectRate = computed(() => {
  const left = Int(props.rate.replace(/^(\d*):(\d*)$/, '$1'));
  const right = Int(props.rate.replace(/^(\d*):(\d*)$/, '$2'));
  if (left === 0 || right === 0) return '100';
  return ((right / left) * 100).toFixed(3);
});

const classStyle = computed(() => {
  return twMerge(`relative block`, ClassTypeToString(props.class));
});
</script>

<template>
  <div class="UiAspectContainer" :class="classStyle" :style="` --aspect-rate: ${aspectRate}%;`">
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.UiAspectContainer {
  --aspect-rate: 66.66%;
  &::before {
    content: '';
    display: block;
    padding-top: var(--aspect-rate);
  }
  > div {
    position: absolute;
    inset: 0 0 0 0;
  }
}
</style>
