<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\input-frame.vue
// ----------------------------------------------------------------------------
// InputFrame
// InputFrameInputFrame
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { computed, useSlots } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
// [ composables ]
import { useHsToast } from '../../composables/use-hs-toast';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  class?: ClassType;
  classHeader?: ClassType;
  classInput?: ClassType;
  // ----------------------------------------------------------------------------
  // 状態
  focus?: boolean;
  focusColor?: string;
  change?: boolean;
  changeColor?: string;
  error?: boolean;
  errorColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  readonly?: boolean;
  headerless?: boolean;
  // ----------------------------------------------------------------------------

  // 表示
  label?: MultiLang;
  // 表示-副情報
  require?: boolean;
  requireText?: MultiLang;
  warn?: string;
  warnTimeOut?: number;
  // ----------------------------------------------------------------------------
  // 設定
  size?: 's' | 'm' | 'l';
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
  classHeader: '',
  classInput: '',
  // ----------------------------------------------------------------------------
  // 状態
  focus: false,
  focusColor: 'shadow-[inset_0px_0px_1px_2px_#0d8ee4]',
  change: false,
  changeColor: 'shadow-[inset_0px_0px_1px_2px_#fd9831be]',
  error: false,
  errorColor: 'shadow-[inset_0px_0px_1px_2px_#d80000dc]',
  disabled: false,
  disabledColor: '',
  readonly: false,
  headerless: false,
  // ----------------------------------------------------------------------------
  // 表示
  label: '',
  // 表示-副情報
  require: false,
  requireText: () => ({ ja: '必須', en: 'Required' }),
  warn: '',
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
});

type Emits = {
  // ----------------------------
  'header-label-click': [];
  ref: [elm: HTMLElement];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------

const toast = useHsToast(useHsPinia());

const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
const baseClass = computed(() => {
  return [
    twMerge(
      //
      'flex max-w-full relative',
      'border-[1px] border-[#183C5E]',
      'bg-white',
      'min-w-[100px]',
      props.size === 's' ? 'min-h-[44px]' : '',
      props.size === 'm' ? 'min-h-[48px]' : '',
      props.size === 'l' ? 'min-h-[60px]' : '',
      props.change ? props.changeColor : '',
      props.error ? props.errorColor : '',
      props.warn ? props.errorColor : '',
      props.focus ? props.focusColor : '',
      props.disabled ? 'shadow-none bg-slate-300' : '',
      props.disabled ? props.disabledColor : '',
      props.readonly ? 'shadow-none bg-transparent ' : '',
      ClassTypeToString(props.class)
    ),
    props.disabled ? 'disabled ' : '',
    props.readonly ? 'readonly ' : '',
  ];
});

const headerClass = computed(() => {
  return [
    twMerge(
      //
      'px-1',
      'overflow-hidden',
      'text-[#996655]',
      props.size === 's' ? 'h-[18px] text-[12px]' : '',
      props.size === 'm' ? 'h-[20px] text-[14px]' : '',
      props.size === 'l' ? 'h-[22px] text-[15px]' : '',
      ClassTypeToString(props.classHeader)
    ),
  ];
});

const headerIconClass = computed(() => {
  return [
    twMerge(
      //
      props.size === 's' ? 'text-[12px] rounded leading-[12px] px-[2px] py-[2px]' : '',
      props.size === 'm' ? 'text-[13px] rounded leading-[13px] px-[2px] py-[2px]' : '',
      props.size === 'l' ? 'text-[14px] rounded leading-[14px] px-[2px] py-[3px]' : ''
    ),
  ];
});

const inputClass = computed(() => {
  return [
    twMerge(
      'px-1',
      'truncate relative',
      'flex items-center',
      'text-black',
      props.disabled ? 'text-gray-600 ' : '',
      // props.readonly ? 'text-black' : '',
      'w-full',
      // 'max-w-full max-h-full w-full',
      props.size === 's' ? 'text-[16px]' : '',
      props.size === 'm' ? 'text-[16px]' : '',
      props.size === 'l' ? 'text-[20px]' : '',
      ClassTypeToString(props.classInput)
    ),
  ];
});
// ----------------------------------------------------------------------------
const iconDisabled = computed(() => {
  if (props.disabled) return true;
  if (props.readonly) return true;
  return false;
});
// ----------------------------------------------------------------------------
const label = computed(() => tx(props.label).value);
// ----------------------------------------------------------------------------
const slots = useSlots();
const hasHeader = computed(() => {
  if (label.value) return true;
  if (props.require && !props.readonly) return true;
  // if (slots.label) return true;
  if (slots['label-prepend']) return true;
  if (slots['label-append']) return true;
  if (slots['header-right']) return true;
  return false;
});
const setRef = (e: HTMLElement) => {
  emit('ref', e);
};
// ----------------------------------------------------------------------------
</script>

<template>
  <div :ref="(e:any) => setRef(e)" class="hc-ui-input-frame" :class="baseClass">
    <div
      v-if="$slots['left-icons']"
      class="icons left-icons flex-none text-accent1 relative"
      :class="iconDisabled ? 'disabled' : ''"
    >
      <slot name="left-icons" :disabled="iconDisabled" />
    </div>
    <div class="flex-1 flex flex-col overflow-hidden justify-start relative">
      <div v-if="hasHeader && !props.headerless" class="flex-none flex items-end relative" :class="headerClass">
        <div
          class="hc-input-label grow-0 shrink-1 truncate leading-[1.5em] relative"
          :title="label"
          @click="emit('header-label-click')"
        >
          <slot name="label-prepend" />{{ label }}<slot name="label-append" />
        </div>
        <div class="flex-1"></div>
        <div class="flex-none flex gap-2 relative">
          <slot name="header-right" :default-class="headerIconClass" />
          <div v-if="props.require && !props.readonly" :class="headerIconClass" class="text-white bg-error">
            <span data-type="require">{{ tx(props.requireText) }}</span>
          </div>
        </div>
      </div>
      <div class="hc-input-body flex-1 flex flex-col justify-center relative">
        <div :class="inputClass"><slot name="default" :focus="props.focus" :change="props.change" /></div>
      </div>
    </div>
    <div
      v-if="$slots['right-icons'] || props.warn"
      class="icons right-icons flex-none relative"
      :class="iconDisabled ? 'disabled' : ''"
    >
      <slot name="right-icons" :disabled="iconDisabled" />
      <div v-if="props.warn" class="relative" @click="toast.Warning(props.warn, '', props.warnTimeOut)">
        <i class="fa-solid fa-triangle-exclamation text-error cursor-pointer"></i>
      </div>
    </div>
    <slot name="overlay" :focus="props.focus" :change="props.change"></slot>
  </div>
</template>

<style lang="scss">
.hc-ui-input-frame {
  .icons {
    display: flex;
    align-items: center;
    > * {
      position: relative;
      height: 100%;
      min-width: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      // color: theme('colors.accent1');
      &::after {
        content: '';
        width: 1px;
        position: absolute;
        background-color: #9faab3;
        // background-color: #687a8a;
      }
    }
    &.disabled > * {
      color: #224466;
    }
  }

  .left-icons > *::after {
    inset: 2px 0 2px auto;
  }

  .right-icons > *::after {
    inset: 2px auto 2px 0;
  }
}
</style>
