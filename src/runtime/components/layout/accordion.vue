<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\accordion.vue
// ----------------------------------------------------------------------------
// Accordion
// AccordionAccordion
---------------------------------------------------------------------------- */

// [ NUXT ]
import { computed, ref, watch, nextTick } from '#imports';
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  class?: ClassType;
  open: boolean;
  span?: number;
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
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

const classStyle = computed(() => {
  return twMerge([props.open ? 'open' : ''], ClassTypeToString(props.class));
});

const overflowClass = computed(() => {
  return [innerHidden.value ? 'overflow-y-hidden' : ''];
});
// ----------------------------------------------------------------------------
</script>

<template>
  <div
    class="Accordion"
    :class="classStyle"
    :style="`--hsui-accordion-span:${props.span}ms`"
    :inert="!props.open"
  >
    <div :class="overflowClass" class="overflow-y-hidden"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.Accordion {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--hsui-accordion-span) ease-in-out;
  &.open {
    grid-template-rows: 1fr;
  }
}
</style>
