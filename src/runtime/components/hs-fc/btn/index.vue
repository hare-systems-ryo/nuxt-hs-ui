<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-fc\btn\index.vue
// ----------------------------------------------------------------------------
HsFcBtn
HsFcBtnHsFcBtn
----------------------------------------------------------------------------- */

// [ vue ]
import { computed, ref } from 'vue';
// [ NUXT ]
import { useId, useRuntimeConfig } from '#imports';
// [ vueuse ]
import { useHsFormFocus } from '../../../composables/use-hs-form-focus';
// ----------------------------------------------------------------------------
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../../lib/prefix';
// ----------------------------------------------------------------------------
import type { Theme } from '../../../lib/theme';
// ----------------------------------------------------------------------------
const runtimeConfig: any = useRuntimeConfig();
const prefix = GetPrefix(runtimeConfig);

const twMerge = extendTailwindMerge({
  prefix: prefix,
});

// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  classInner?: ClassType;
  disabled?: boolean;
  to?: string;
  theme?: Theme;
  variant?: 'outlined' | 'flat';
  textWrap?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  classInner: '',
  to: undefined,
  theme: 'accent1',
  variant: 'outlined',
  disabled: false,
  textWrap: false,
  align: 'center',
  loading: false,
  textAlign: 'center',
});

type InputFocusEventArg = {
  elm: HTMLElement;
  id: string;
};
type Emits = {
  id: [id: string];
  ref: [element: HTMLElement];
  focus: [e: InputFocusEventArg];
  blur: [e: InputFocusEventArg];
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
const id = useId();
emit('id', id);
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Base Design
// -----
const baseClass = RemovePrefix(prefix, [
  //
  'relative',
  'tw-relative',
  'inline-flex',
  'tw-inline-flex',
  'items-center',
  'tw-items-center',
  'py-2',
  'tw-py-2',
  'px-3',
  'tw-px-3',
  'w-auto',
  'leading-[1.2em]',
  'tw-leading-[1.2em]',
  'tw-w-auto',
  'max-w-full',
  'tw-max-w-full',
  'text-ellipsis',
  'tw-text-ellipsis',
  'overflow-hidden',
  'tw-overflow-hidden',
  'disabled:opacity-50',
  'tw-disabled:opacity-50',
  'disabled:pointer-events-none',
  'tw-disabled:pointer-events-none',
]);
const baseClassForm = RemovePrefix(prefix, [
  //
  'border',
  'tw-border',
  'border-[1px]',
  'tw-border-[1px]',
  'border-main1',
  'tw-border-main1',
  'min-h-[44px]',
  'tw-min-h-[44px]',
  'rounded',
  'tw-rounded',
  // `bg-transparent`,
  // `tw-bg-transparent`,
]);
const variableStyle = computed(() => {
  if (props.variant === 'outlined') {
    return RemovePrefix(prefix, [
      //
      'border-[2px]',
      'tw-border-[2px]',
      'bg-white',
      'tw-bg-white',
    ]);
  }
  return [];
});
const align = computed(() => {
  if (props.textAlign === 'left') {
    return RemovePrefix(prefix, [
      //
      'justify-start',
      'tw-justify-start',
    ]);
  }
  if (props.textAlign === 'right') {
    return RemovePrefix(prefix, [
      //
      'justify-end',
      'tw-justify-end',
    ]);
  }
  return RemovePrefix(prefix, [
    //
    'justify-center',
    'tw-justify-center',
  ]);
});
const classStyle = computed(() => {
  return twMerge(baseClass, baseClassForm, ...variableStyle.value, ...align.value, ClassTypeToString(props.class));
});
// ----------------------------------------------------------------------------
// Innder Design
// -----
const textWrapClass = computed(() => {
  if (props.textWrap) {
    return 'break-all text-wrap';
  }
  return '';
});
const classThisInner = computed(() => {
  return twMerge(
    'max-h-full max-w-full text-ellipsis overflow-hidden',
    textWrapClass.value,
    ClassTypeToString(props.classInner)
  );
});
// ----------------------------------------------------------------------------
//  focus, blur Event
const vFormFocus = useHsFormFocus();
const imputElm = ref<HTMLElement | null>(null);
const setRef = (e: any) => {
  imputElm.value = e;
  emit('ref', e);
};
const onFocus = () => {
  if (props.disabled) return;
  const elm = imputElm.value;
  if (elm === null) return;
  vFormFocus.state.id = id;
  emit('focus', { elm: elm, id: id });
};
const onBlur = () => {
  if (props.disabled) return;
  const elm = imputElm.value;
  if (elm === null) return;
  if (vFormFocus.state.id === id) {
    vFormFocus.state.id = '';
  }
  emit('blur', { elm: elm, id: id });
};
// ----------------------------------------------------------------------------
//  disabled
const disabled = computed(() => {
  if (props.disabled) return true;
  if (props.loading) return true;
  return false;
});
// ----------------------------------------------------------------------------
</script>
<template>
  <button
    v-if="props.to === undefined"
    :ref="(e:any)=>setRef(e)"
    type="button"
    class="HsFcBtn"
    :class="[classStyle, `theme-${props.theme}`, `variant-${props.variant}`]"
    :disabled="disabled"
    ontouchstart=""
    @focus="onFocus()"
    @blur="onBlur()"
  >
    <div class="HsFcBtn--hover HsFcBtn--overlay" />
    <div class="HsFcBtn--active HsFcBtn--overlay" />
    <div class="HsFcBtn--border" :class="[{ show: vFormFocus.state.id === id }]" />
    <div :class="classThisInner"><slot /></div>
    <HsFcBtnLineLoading class="HsFcBtn--loading" :show="props.loading" />
  </button>
  <NuxtLink
    v-else
    :ref="(e:any)=>setRef(e)"
    :to="props.to"
    :disabled="disabled"
    ontouchstart=""
    class="HsFcBtn"
    :class="[classStyle, `theme-${props.theme}`, `variant-${props.variant}`]"
    @focus="onFocus()"
    @blur="onBlur()"
  >
    <div class="HsFcBtn--hover HsFcBtn--overlay" />
    <div class="HsFcBtn--active HsFcBtn--overlay" />
    <div class="HsFcBtn--border" :class="[{ show: vFormFocus.state.id === id }]" />
    <div :class="classThisInner"><slot /></div>
    <HsFcBtnLineLoading class="HsFcBtn--loading" :show="props.loading" />
  </NuxtLink>
</template>
<style lang="scss" scoped>
.HsFcBtn {
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: none;
  }

  .HsFcBtn--loading {
    z-index: 2;
  }
  .HsFcBtn--border {
    position: absolute;
    inset: 2px 2px 2px 2px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    opacity: 0;
    background-color: transparent;
    &.show {
      opacity: 1;
    }
  }
  * {
    pointer-events: none !important;
    user-select: none;
  }

  .HsFcBtn--overlay {
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: 1;
  }
  &.variant-outlined {
    .HsFcBtn--hover {
      mix-blend-mode: multiply;
    }
    .HsFcBtn--active {
      mix-blend-mode: multiply;
    }
    .HsFcBtn--border {
      border-color: inherit;
    }
  }
  &.variant-flat {
    .HsFcBtn--hover {
      background-color: inherit;
      mix-blend-mode: screen;
    }
    .HsFcBtn--active {
      background-color: inherit;
      mix-blend-mode: multiply;
      mix-blend-mode: screen;
    }
    .HsFcBtn--border {
      border-color: white;
    }
  }

  @media (hover: hover) {
    /* hover指定できるPCを想定したスタイル */
    &:not(:active):hover {
      &.variant-outlined {
        .HsFcBtn--hover {
          opacity: 0.2;
        }
      }
      &.variant-flat {
        .HsFcBtn--hover {
          opacity: 0.8;
        }
      }
    }
    &:active {
      &.variant-outlined {
        .HsFcBtn--active {
          opacity: 0.5;
        }
      }
      &.variant-flat {
        .HsFcBtn--active {
          opacity: 0.4;
        }
      }
    }
  }

  @media (hover: none) {
    /* hoverが使えないタッチ端末を想定した装飾 */
    .HsFcBtn--hover {
      opacity: 0;
    }
    &:active {
      &.variant-outlined {
        .HsFcBtn--active {
          opacity: 0.4;
        }
      }
      &.variant-flat {
        .HsFcBtn--active {
          opacity: 0.8;
        }
      }
    }
  }
}
// ----------------------

.variant-flat {
  &.theme-main0 {
    background-color: theme('colors.main0');
    color: theme('colors.white');
  }
  &.theme-main1 {
    background-color: theme('colors.main1');
    color: theme('colors.white');
  }
  &.theme-main2 {
    background-color: theme('colors.main2');
    color: theme('colors.white');
  }
  &.theme-main3 {
    background-color: theme('colors.main3');
    color: theme('colors.white');
  }
  &.theme-accent1 {
    background-color: theme('colors.accent1');
    color: theme('colors.white');
  }
  &.theme-accent2 {
    background-color: theme('colors.accent2');
    color: theme('colors.white');
  }
  // ----------------------
  &.theme-info {
    background-color: theme('colors.info');
    color: theme('colors.white');
  }
  &.theme-link {
    background-color: theme('colors.link');
    color: theme('colors.white');
  }
  &.theme-download {
    background-color: theme('colors.download');
    color: theme('colors.white');
  }
  &.theme-success {
    background-color: theme('colors.success');
    color: theme('colors.white');
  }
  &.theme-warn {
    background-color: theme('colors.warn');
    color: theme('colors.white');
  }
  &.theme-error {
    background-color: theme('colors.error');
    color: theme('colors.white');
  }
  // ----------------------
  &.theme-white {
    background-color: theme('colors.white');
    color: theme('colors.main1');
    .HsFcBtn--border {
      border-color: theme('colors.gray.600');
    }
  }
  &.theme-black {
    background-color: theme('colors.black');
    color: theme('colors.white');
  }
  &.theme-dark {
    background-color: theme('colors.dark');
    color: theme('colors.white');
  }
  &.theme-back {
    background-color: theme('colors.back');
    color: theme('colors.main1');
    .HsFcBtn--border {
      border-color: theme('colors.gray.600');
    }
  }
} // Theme
.variant-outlined {
  &.theme-main0 {
    border-color: theme('colors.main0');
    color: theme('colors.main0');

    .HsFcBtn--overlay {
      background-color: theme('colors.main0');
    }
  }
  &.theme-main1 {
    border-color: theme('colors.main1');
    color: theme('colors.main1');
    .HsFcBtn--overlay {
      background-color: theme('colors.main1');
    }
  }
  &.theme-main2 {
    border-color: theme('colors.main2');
    color: theme('colors.main2');
    .HsFcBtn--overlay {
      background-color: theme('colors.main2');
    }
  }
  &.theme-main3 {
    border-color: theme('colors.main3');
    color: theme('colors.main3');
    .HsFcBtn--overlay {
      background-color: theme('colors.main3');
    }
  }
  &.theme-accent1 {
    border-color: theme('colors.accent1');
    color: theme('colors.accent1');
    .HsFcBtn--overlay {
      background-color: theme('colors.accent1');
    }
  }
  &.theme-accent2 {
    border-color: theme('colors.accent2');
    color: theme('colors.accent2');
    .HsFcBtn--overlay {
      background-color: theme('colors.accent2');
    }
  } // ----------------------
  &.theme-info {
    border-color: theme('colors.info');
    color: theme('colors.info');
    .HsFcBtn--hover {
      background-color: theme('colors.info');
    }
  }
  &.theme-link {
    border-color: theme('colors.link');
    color: theme('colors.link');
    .HsFcBtn--overlay {
      background-color: theme('colors.link');
    }
  }
  &.theme-download {
    border-color: theme('colors.download');
    color: theme('colors.download');
    .HsFcBtn--overlay {
      background-color: theme('colors.download');
    }
  }
  &.theme-success {
    border-color: theme('colors.success');
    color: theme('colors.success');
    .HsFcBtn--overlay {
      background-color: theme('colors.success');
    }
  }
  &.theme-warn {
    border-color: theme('colors.warn');
    color: theme('colors.warn');
    .HsFcBtn--overlay {
      background-color: theme('colors.warn');
    }
  }
  &.theme-error {
    border-color: theme('colors.error');
    color: theme('colors.error');
    .HsFcBtn--overlay {
      background-color: theme('colors.error');
    }
  }

  // ----------------------
  &.theme-white {
    border-color: theme('colors.white');
    color: theme('colors.white');
    .HsFcBtn--overlay {
      background-color: theme('colors.black');
    }
  }
  &.theme-black {
    border-color: theme('colors.black');
    color: theme('colors.black');
    .HsFcBtn--overlay {
      background-color: theme('colors.white');
    }
  }
  &.theme-dark {
    border-color: theme('colors.dark');
    color: theme('colors.dark');
    .HsFcBtn--overlay {
      background-color: theme('colors.dark');
    }
  }
  &.theme-back {
    border-color: theme('colors.back');
    color: theme('colors.back');
    .HsFcBtn--overlay {
      background-color: theme('colors.back');
    }
  }
}
</style>
