<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\accordion.vue
// ----------------------------------------------------------------------------
// Accordion
// AccordionAccordion
----------------------------------------------------------------------------- */

// [ NUXT ]
import { computed, ref, watch, nextTick } from "#imports";
// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  class?: ClassType;
  open: boolean;
  span?: number;
};
const props = withDefaults(defineProps<Props>(), {
  class: "",
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

const baseClass = [
  //
  "w-full",
];

const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
const classOverflow = [
  //
  "overflow-y-hidden",
];
const overflowClass = computed(() => {
  if (innerHidden.value) return classOverflow;
  return "";
});
// ----------------------------------------------------------------------------
</script>

<template>
  <div
    class="Accordion"
    :class="[{ open: open }, classStyle]"
    :style="`--hsui-accordion-span:${props.span}ms`"
  >
    <!-- :aria-hidden="!props.open" -->
    <div :class="overflowClass"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.Accordion {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--hsui-accordion-span);
  &.open {
    grid-template-rows: 1fr;
  }
}
</style>
