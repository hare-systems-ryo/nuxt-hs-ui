<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\input-frame.vue
// ----------------------------------------------------------------------------
// InputFrame
// InputFrameInputFrame
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { computed, useSlots } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// [ composables ]
import { useHsToast } from "../../composables/use-hs-toast";
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
  // ----------------------------------------------------------------------------

  // 表示
  label?: string;
  // 表示-副情報
  require?: boolean;
  requireText?: string;
  warn?: string;
  warnTimeOut?: number;
  // ----------------------------------------------------------------------------
  // 設定
  size?: "s" | "m" | "l";
};
const props = withDefaults(defineProps<Props>(), {
  class: "",
  classHeader: "",
  classInput: "",
  // ----------------------------------------------------------------------------
  // 状態
  focus: false,
  focusColor: "shadow-[inset_0px_0px_1px_2px_#0d8ee4]",
  change: false,
  changeColor: "shadow-[inset_0px_0px_1px_2px_#fd9831be]",
  error: false,
  errorColor: "shadow-[inset_0px_0px_1px_2px_#d80000dc]",
  disabled: false,
  disabledColor: "",
  readonly: false,
  // ----------------------------------------------------------------------------
  // 表示
  label: "",
  // 表示-副情報
  require: false,
  requireText: "必須",
  warn: "",
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: "m",
});

type Emits = {
  // ----------------------------
  "header-label-click": [];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------

const toast = useHsToast();

// ----------------------------------------------------------------------------
const baseClass = computed(() => {
  return [
    twMerge(
      //
      "flex max-w-full",
      "border-[1px] border-main0",
      "bg-white",
      props.size === "s" ? "h-[44px]" : "",
      props.size === "m" ? "h-[48px]" : "",
      props.size === "l" ? "h-[60px]" : "",
      props.change ? props.changeColor : "",
      props.error ? props.errorColor : "",
      props.warn ? props.errorColor : "",
      props.focus ? props.focusColor : "",
      props.disabled ? "shadow-none bg-slate-300" : "",
      props.disabled ? props.disabledColor : "",
      props.readonly ? "shadow-none bg-transparent " : "",
      ClassTypeToString(props.class)
    ),
    props.disabled ? "disabled " : "",
    props.readonly ? "readonly " : "",
  ];
});

const headerClass = computed(() => {
  return [
    twMerge(
      //
      "px-1",
      "overflow-hidden",
      "text-[#996655]",
      props.size === "s" ? "h-[18px] text-[12px]" : "",
      props.size === "m" ? "h-[20px] text-[14px]" : "",
      props.size === "l" ? "h-[22px] text-[15px]" : "",
      ClassTypeToString(props.classHeader)
    ),
  ];
});

const headerIconClass = computed(() => {
  return [
    twMerge(
      //
      props.size === "s"
        ? "text-[12px] rounded leading-[12px] px-[2px] py-[2px]"
        : "",
      props.size === "m"
        ? "text-[13px] rounded leading-[13px] px-[2px] py-[2px]"
        : "",
      props.size === "l"
        ? "text-[14px] rounded leading-[14px] px-[2px] py-[3px]"
        : ""
    ),
  ];
});

const inputClass = computed(() => {
  return [
    twMerge(
      "px-1",
      "truncate",
      //
      "w-full",
      // 'max-w-full max-h-full w-full',
      props.size === "s" ? "text-[14px]" : "",
      props.size === "m" ? "text-[16px]" : "",
      props.size === "l" ? "text-[20px]" : "",
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
const slots = useSlots();
const hasHeader = computed(() => {
  if (props.label.length !== 0) return true;
  if (props.require && !props.readonly) return true;
  // if (slots.label) return true;
  if (slots["label-prepend"]) return true;
  if (slots["label-append"]) return true;
  if (slots["header-right"]) return true;
  return false;
});
// ----------------------------------------------------------------------------
</script>

<template>
  <div ref="el" class="hc-ui-input-frame" :class="baseClass">
    <div
      v-if="$slots['left-icons']"
      class="icons left-icons flex-none"
      :class="iconDisabled ? 'disabled' : ''"
    >
      <slot name="left-icons" :disabled="iconDisabled" />
    </div>
    <div class="flex-1 flex flex-col overflow-hidden justify-start">
      <div
        v-if="hasHeader"
        class="flex-none flex items-end"
        :class="headerClass"
      >
        <div
          class="grow-0 shrink-1 truncate leading-[1.5em]"
          :title="props.label"
          @click.stop="emit('header-label-click')"
        >
          <slot name="label-prepend" />{{ props.label
          }}<slot name="label-append" />
        </div>
        <div class="flex-1"></div>
        <div class="flex-none flex gap-2">
          <slot name="header-right" :default-class="headerIconClass" />
          <div
            v-if="props.require && !props.readonly"
            :class="headerIconClass"
            class="text-white bg-error"
          >
            <span data-type="require">{{ props.requireText }}</span>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <div :class="inputClass"><slot /></div>
      </div>
    </div>
    <div
      v-if="$slots['right-icons'] || props.warn"
      class="icons right-icons flex-none"
      :class="iconDisabled ? 'disabled' : ''"
    >
      <slot name="right-icons" :disabled="iconDisabled" />
      <div
        v-if="props.warn"
        @click="toast.Warning(props.warn, '', props.warnTimeOut)"
      >
        <i
          class="fa-solid fa-triangle-exclamation text-error cursor-pointer"
        ></i>
      </div>
    </div>
    <slot name="overlay"></slot>
  </div>
</template>

<style lang="scss" scoped>
.icons {
  display: flex;
  > * {
    height: 100%;
    min-width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: theme("colors.accent1");
    &::after {
      content: "";
      width: 1px;
      position: absolute;
      background-color: theme("colors.main0");
    }
  }
  &.disabled > * {
    color: theme("colors.dark");
  }
}

.left-icons > *::after {
  inset: 2px 0 2px auto;
}

.right-icons > *::after {
  inset: 2px auto 2px 0;
}

.hc-ui-input-frame {
  min-width: 100px;
}
</style>
