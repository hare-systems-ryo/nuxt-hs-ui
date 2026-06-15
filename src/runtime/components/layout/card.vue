<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\card.vue
// ----------------------------------------------------------------------------
// Card
// CardCard
---------------------------------------------------------------------------- */

// [ NUXT ]
import { computed } from '#imports';
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
});

type Emits = {
  ref: [element: HTMLElement];
};
const emit = defineEmits<Emits>();

const baseClass = [
  //
  'relative',
  'flex',
  'flex-col',
  'border-[2px]',
  'border-white',
  'shadow-[0px_0px_4px_0px_#000]',
];
const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
</script>

<template>
  <div :ref="(e:any) => emit('ref', e)" :class="classStyle">
    <slot />
  </div>
</template>
