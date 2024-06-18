<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\card.vue
// ----------------------------------------------------------------------------
HsUiCard
HsUiCardHsUiCard
----------------------------------------------------------------------------- */

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
  'relative',
  'tw-relative',
  'flex',
  'tw-flex',
  'flex-col',
  'tw-flex-col',
  'border-2',
  'tw-border-2',
  'border-white',
  'tw-border-white',
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
