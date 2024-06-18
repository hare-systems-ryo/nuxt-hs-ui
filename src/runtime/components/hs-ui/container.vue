<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\container.vue
// ----------------------------------------------------------------------------
HsUiContainer
HsUiContainerHsUiContainer
----------------------------------------------------------------------------- */

// [ node_modules ]
// [ vue ]
import { computed } from 'vue';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../lib/prefix';

// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: GetPrefix(),
});
// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
});
const baseClass = RemovePrefix([
  //
  'container',
  'tw-container',
  'mx-auto',
  'tw-mx-auto',
  'px-2',
  'tw-px-2',
]);

const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
</script>
<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
