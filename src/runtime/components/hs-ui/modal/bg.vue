<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\modal\bg.vue
// ----------------------------------------------------------------------------
HsUiModalBg
HsUiModalBgHsUiModalBg
----------------------------------------------------------------------------- */

// [ vue ]
import { computed } from 'vue';
// [ NUXT ]
import { useRuntimeConfig } from '#imports';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../../lib/prefix';
// [ components > v-ui > modal > * ]
import { useStoreModal } from './use-ui-modal';
// ----------------------------------------------------------------------------
const runtimeConfig: any = useRuntimeConfig();
const prefix = GetPrefix(runtimeConfig);
// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: prefix,
});

// ----------------------------------------------------------------------------

type Props = {
  class?: ClassType | undefined;
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const vUiModal = useStoreModal();

const zIndex = computed(() => {
  if (vUiModal.state.activeList.length === 0) return -1;
  return Math.max(...vUiModal.state.activeList.map((row) => row.zIndex)) - 1;
});

const isShow = computed(() => {
  if (vUiModal.state.activeList.length === 0) return false;
  return true;
});

const baseClass = RemovePrefix(prefix, [
  //
  'transition-opacity',
  'tw-transition-opacity',
  'fixed',
  'tw-fixed',
  'inset-0',
  'tw-inset-0',
  'bg-slate-800/[0.8]',
  'tw-bg-slate-800/[0.8]',
  'transition-opacity',
  'tw-transition-opacity',
]);

const variableStyle = computed(() => {
  if (isShow.value) {
    return RemovePrefix(prefix, [
      //
      'pointer-events-auto',
      'tw-pointer-events-auto',
      'opacity-100',
      'tw-opacity-100',
    ]);
  }
  return RemovePrefix(prefix, [
    //
    'pointer-events-none',
    'tw-pointer-events-none',
    'opacity-0',
    'tw-opacity-0',
  ]);
});

const classStyle = computed(() => {
  return twMerge(baseClass, variableStyle.value, ClassTypeToString(props.class));
});

const closeAll = () => {
  vUiModal.removeAll();
};
</script>
<template>
  <Teleport to="body">
    <!--  -->
    <div class="VUiModalBg" :class="classStyle" :style="{ zIndex: zIndex }" @click.stop="closeAll()" />
  </Teleport>
</template>
