<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\accordion-down.vue
// ----------------------------------------------------------------------------
// AccordionDown
// AccordionDownAccordionDown
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

type Emits = {
  // ----------------------------
  closed: [];
  // ----------------------------
};
const emit = defineEmits<Emits>();

const innerHidden = ref(!props.open);
watch(
  () => props.open,
  async () => {
    if (props.open) {
      innerHidden.value = false;
    } else {
      await nextTick();
      setTimeout(() => {
        if (props.open) {
          innerHidden.value = false;
        } else {
          innerHidden.value = true;
          emit('closed');
        }
      }, props.span);
    }
  }
);

const classStyle = computed(() => {
  return twMerge([props.open ? 'open' : ''], ClassTypeToString(props.class));
});

// ----------------------------------------------------------------------------
</script>

<template>
  <div
    v-if="!innerHidden"
    class="Accordion"
    :class="[props.open ? 'open' : '', classStyle]"
    :style="`--hsui-accordion-span:${props.span}ms`"
    :inert="!props.open"
  >
    <div class="Accordion__inner" :class="{ hidden: innerHidden }">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.Accordion {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.Accordion__inner {
  transform-origin: bottom;
  transition: transform var(--hsui-accordion-span) ease, opacity var(--hsui-accordion-span) ease;
  transform: scaleY(0);
  opacity: 0;
  will-change: transform, opacity;

  &.hidden {
    display: none;
  }
}

.Accordion.open .Accordion__inner {
  transform: scaleY(1);
  opacity: 1;
  display: block;
}
</style>
