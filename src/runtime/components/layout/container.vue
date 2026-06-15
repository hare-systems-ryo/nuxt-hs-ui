<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\container.vue
// ----------------------------------------------------------------------------
// Container
// ContainerContainer
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
  fluid?: boolean;
  /**
   * default
   * ```javascript
   * const brakePoint= [
   *   'xs:max-w-[600px]',
   *   'md:max-w-[700px]',
   *   'lg:max-w-[950px]',
   *   'xl:max-w-[1200px]',
   *   '2xl:max-w-[1450px]',
   * ]
   * ```
   */
  brakePoint?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  fluid: false,
  brakePoint: () => [
    'xs:max-w-[600px]',
    'md:max-w-[700px]',
    'lg:max-w-[950px]',
    'xl:max-w-[1200px]',
    '2xl:max-w-[1450px]',
  ],
});
const classStyle = computed(() => {
  return twMerge('mx-auto px-2 w-full', props.fluid ? '' : props.brakePoint, ClassTypeToString(props.class));
});
</script>

<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
