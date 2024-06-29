<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\aspect-box.vue
// ----------------------------------------------------------------------------
HsUiAspectBox
HsUiAspectBoxHsUiAspectBox
----------------------------------------------------------------------------- */

// [ vue ]
import { computed } from 'vue';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../lib/prefix';
// [ src > runtime > lib > * ]
import { Int } from '../../lib/number';
// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: GetPrefix(),
});
// ----------------------------------------------------------------------------
type Props = {
  class?: ClassType | undefined;
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

const baseClass = RemovePrefix([
  //
  'relative',
  'tw-relative',
]);
const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
</script>
<template>
  <div class="HsUiAspectContainer" :class="classStyle" :style="` --aspect-rate: ${aspectRate}%;`">
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HsUiAspectContainer {
  display: block;
  --aspect-rate: 66.66%;
  &::before {
    content: '';
    display: block;
    padding-top: var(--aspect-rate);
  }
  /* 3:2 */
  > div {
    position: absolute;
    inset: 0 0 0 0;
  }
}
</style>
