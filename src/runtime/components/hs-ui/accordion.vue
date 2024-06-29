<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\accordion.vue
// ----------------------------------------------------------------------------
HsUiAccordion
HsUiAccordionHsUiAccordion
----------------------------------------------------------------------------- */

// [ vue ]
import { computed, ref, watch, nextTick } from 'vue';
// [ NUXT ]
import { useRuntimeConfig } from '#imports';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../lib/prefix';
// ----------------------------------------------------------------------------
const runtimeConfig: any = useRuntimeConfig();
const prefix = GetPrefix(runtimeConfig);
// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: prefix,
});
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  class?: ClassType | undefined;
  open: boolean;
  span?: number;
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
  open: true,
  span: 300,
});

const innerHidden = ref(!props.open);
watch(
  () => props.open,
  (v) => {
    //
    if (v) {
      setTimeout(() => {
        if (props.open) {
          innerHidden.value = !v;
        }
      }, props.span);
    } else {
      nextTick(() => {
        innerHidden.value = !v;
      });
    }
  }
);

const baseClass = RemovePrefix(prefix, [
  //
  'w-full',
  'tw-w-full',
]);

const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
const classOverflow = RemovePrefix(prefix, [
  //
  'overflow-y-hidden',
  'tw-overflow-y-hidden',
]);
const overflowClass = computed(() => {
  if (innerHidden.value) return classOverflow;
  return '';
});
// ----------------------------------------------------------------------------
</script>
<template>
  <div
    class="HsUiAccordion"
    :class="[{ open: open }, classStyle]"
    :style="`--hsui-accordion-span:${props.span}ms`"
    :aria-hidden="!props.open"
  >
    <div :class="overflowClass"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.HsUiAccordion {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--hsui-accordion-span);
  &.open {
    grid-template-rows: 1fr;
  }
}
</style>
