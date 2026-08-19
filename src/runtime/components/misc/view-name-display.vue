<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\view-name-display.vue
// ----------------------------------------------------------------------------
// ViewNameDisplay
// ViewNameDisplayViewNameDisplay
---------------------------------------------------------------------------- */

// [ NUXT ]
import { ref, computed, onMounted, watch } from '#imports';
// [ vueuse ]
import { useElementVisibility } from '@vueuse/core';
// ----------------------------------------------------------------------------
// [ utils ]
import type { MultiLang } from '../../utils/multi-lang';
// [ composables ]
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// ----------------------------------------------------------------------------
// [ Props ]
interface Props {
  label: MultiLang;
  offset?: number;
}
const props = withDefaults(defineProps<Props>(), {
  offset: 10,
});
type Emits = {
  ref: [element: HTMLElement];
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
// [ MultiLang ]
const hsMultiLang = useHsMultiLang(useHsPinia());
const tx = hsMultiLang.tx;
// ----------------------------------------------------------------------------
const targetScrollElm = ref<HTMLElement | null>(null);
watch(targetScrollElm, (e) => () => {
  if (!e) return;
  emit('ref', e);
});
const targetVisibleElm = ref<HTMLElement | null>(null);
const targetIsVisible = useElementVisibility(targetVisibleElm);
// ----------------------------------------------------------------------------
const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 1000);
});
// ----------------------------------------------------------------------------
const scroll = () => {
  if (targetScrollElm.value === null) return;
  targetScrollElm.value.scrollIntoView({ behavior: 'smooth' });
};
const styleScrollTarget = computed(() => {
  return `margin-top:-${props.offset}px;`;
});
const styleVisibleTarget = computed(() => {
  return `margin-top:-${props.offset - 10}px;`;
});
const label = tx(props.label);
</script>

<template>
  <div class="absolute">
    <div ref="targetScrollElm" class="absolute top-0 pointer-events-none" :style="styleScrollTarget"></div>
    <div ref="targetVisibleElm" class="absolute top-0 pointer-events-none" :style="styleVisibleTarget"></div>
    <div class="view-name-display flex items-center justify-center" :class="{ isShow: !targetIsVisible && isMounted }">
      <div class="view-name elevation-4 cursor-pointer bg-back0" @click.stop="scroll()">
        <div class="hover:bg-orange-700/10 min-h-full min-w-full px-2 py-1">
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-name-display {
  position: fixed;
  top: 4px;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 300ms;
  pointer-events: none;

  &.isShow {
    opacity: 1;
  }
  .view-name {
    font-size: 0.8rem;
    border: solid 2px var(--color-accent1);
    color: var(--color-accent1);
    pointer-events: all;
  }

  .view-name {
    font-size: 0.8rem;
  }
}
</style>
