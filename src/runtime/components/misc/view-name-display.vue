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
</script>

<template>
  <div class="absolute">
    <div ref="targetScrollElm" class="absolute top-0 pointer-events-none" :style="styleScrollTarget"></div>
    <div ref="targetVisibleElm" class="absolute top-0 pointer-events-none" :style="styleVisibleTarget"></div>
    <div class="view-name-display flex items-center justify-center" :class="{ isShow: !targetIsVisible && isMounted }">
      <div class="view-name elevation-4 cursor-pointer bg-white" @click.stop="scroll()">
        <div class="hover:bg-orange-700/10 min-h-full min-w-full px-2 py-1">
          {{ tx(props.label).value }}
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
  // background-color: white;
  // border: solid 1px green;
  pointer-events: none;

  &.isShow {
    opacity: 1;
  }
  .view-name {
    font-size: 0.8rem;
    // padding: 2px 10px;
    // border-radius: 4px;
    // background-color: white;
    border: solid 2px #eb6600;
    color: #eb6600;
    // border: solid 2px #1c03a2;
    // color: #1c03a2;
    pointer-events: all;
  }

  .view-name {
    font-size: 0.8rem;
  }

  // @media screen and (min-width: #{ 0 }px) and (max-width: #{ $app-breake-sp-tablet - 0.1}px) {
  //   top: calc(#{$app-header-height-mobile}px + 4px);

  // }

  // @media screen and (min-width: #{ $app-breake-sp-tablet  }px) {
  //   top: calc(#{$app-header-height-pc}px + 4px);
  //   .component-name {
  //     font-size: 0.9rem;
  //   }
  // }
}
</style>
