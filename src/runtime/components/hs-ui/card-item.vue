<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\card-item.vue
// ----------------------------------------------------------------------------
HsUiCardItem
HsUiCardItemHsUiCardItem
----------------------------------------------------------------------------- */

// [ vue ]
import { computed } from 'vue';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToArray } from '../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../lib/prefix';

// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: GetPrefix(),
});
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType | undefined;
  variant?: 'header' | 'body' | 'footer';
  accordion?: boolean | undefined;
  // hasCloseBtn?: boolean | undefined;
  isOpen?: boolean | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  variant: 'body',
  accordion: undefined,
  isOpen: undefined,
  // hasCloseBtn: undefined,
});
type Emits = {
  ref: [e: HTMLElement];
  'update:isOpen': [value: boolean];
  'bg-click': [];
};
const emit = defineEmits<Emits>();

// ----------------------------------------------------------------------------

const baseClass = RemovePrefix([
  //
  'relative',
  'tw-relative',
  'px-2',
  'tw-px-2',
  'py-1',
  'tw-py-1',
]);

const baseClassHeaderFooter = RemovePrefix([
  //,,
  'relative',
  'tw-relative',
  // 'p-1',
  // 'tw-p-1',
  'bg-[#FFFFFF]',
  'tw-bg-[#FFFFFF]',
  'flex',
  'tw-flex',
  'justify-between',
  'tw-justify-between',
  'items-center',
  'tw-items-center',
  'flex-none',
  'tw-flex-none',
]);

const baseClassBody = RemovePrefix([
  //
  'relative',
  'tw-relative',
  // 'p-1',
  // 'tw-p-1',
  'bg-[#FFFFFF]',
  'tw-bg-[#FFFFFF]',
  'flex-1',
  'tw-flex-1',
  'overflow-auto',
  'tw-overflow-auto',
]);

const pe1 = RemovePrefix([
  //
  'pe-1',
  'tw-pe-1',
]);

const showBtnStyle = RemovePrefix([
  //
  'border-[1px]',
  'tw-border-[1px]',
  '!bg-transparent',
  '!tw-bg-transparent',
]);

const c = computed(() => {
  if (props.variant === 'header' || props.variant === 'footer') {
    return baseClassHeaderFooter;
  }
  return baseClassBody;
});

const classStyle = computed(() => {
  return twMerge(baseClass, c.value, props.isOpen !== undefined ? pe1 : '', ClassTypeToArray(props.class));
});
</script>
<template>
  <template v-if="props.isOpen !== undefined">
    <div :ref="(e:any)=>emit('ref',e)" class="HsUiCardItem" :class="classStyle" @click.stop="emit('bg-click')">
      <div class=""><slot /></div>
      <div class="">
        <HsFcBtn theme="white" :class="showBtnStyle" @click.stop="emit('update:isOpen', !props.isOpen)">
          <i v-if="props.isOpen" class="fa-solid fa-chevron-up" />
          <i v-else class="fa-solid fa-chevron-down" />
        </HsFcBtn>
      </div>
    </div>
  </template>
  <template v-else-if="props.accordion === undefined">
    <div :ref="(e:any)=>emit('ref',e)" class="HsUiCardItem" :class="classStyle">
      <slot />
    </div>
  </template>
  <template v-else>
    <HsUiAccordion :open="props.accordion">
      <div :ref="(e:any)=>emit('ref',e)" class="HsUiCardItem" :class="classStyle">
        <slot />
      </div>
    </HsUiAccordion>
  </template>
</template>
