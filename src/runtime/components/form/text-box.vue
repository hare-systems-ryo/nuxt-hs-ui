<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\text-box.vue
// ----------------------------------------------------------------------------
// TextBox
// TextBoxTextBox
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";

// [ NUXT ]
import { reactive, ref, watch, computed, nextTick, useId } from "#imports";

// [ utils ]
import type { ClassType } from "../../utils/class-style";
// [ composables ]
import { useHsFocus } from "../../composables/use-hs-focus";
// [ Components ]
import InputFrame from "./input-frame.vue";
// ----------------------------------------------------------------------------
const fcFocus = useHsFocus();
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  textAlign?: "left" | "center" | "right";
  maxLen?: number;
  autocomplete?: string;
  datalist?: string[];
  enterkeyhint?: string;
  inputmode?:
    | "text"
    | "search"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
  // ----------------------------------------------------------------------------
  data: string | null;
  diff?: string | undefined;
  tabindex?: string | undefined;
  // ----------------------------------------------------------------------------
  class?: ClassType;
  classHeader?: ClassType;
  classInput?: ClassType;
  // ----------------------------------------------------------------------------
  // 状態
  //   focus?: boolean;
  focusColor?: string;
  //   change?: boolean;
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
  // ----------------------------------------------------------------------------
  // Input 種類別
  type: "text",
  textAlign: "left",
  maxLen: 0,
  autocomplete: "off",
  datalist: () => [],
  enterkeyhint: undefined,
  inputmode: undefined,
  // ----------------------------------------------------------------------------
  diff: undefined,
  tabindex: undefined,
  // ----------------------------------------------------------------------------
  class: "",
  classHeader: "",
  classInput: "",
  // ----------------------------------------------------------------------------
  // 状態
  //   focus: false,
  focusColor: "shadow-[inset_0px_0px_1px_2px_#0d8ee4]",
  //   change: false,
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
// ----------------------------------------------------------------------------
// [ emit ]
type Emits = {
  ref: [element: HTMLElement];
  focus: [elm: HTMLElement];
  blur: [elm: HTMLElement];
  // ----------------------------
  "update:data": [value: string];
  "value-change": [after: string, before: string];
  // ----------------------------
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
const slots = defineSlots<{
  default(props: { msg: string }): any;
  overlay?(): any;
  "right-icons"?(): any;
  "left-icons"?(): any;
}>();
// ----------------------------------------------------------------------------
// [ getCurrentInstance ]
const uid = useId();
// ----------------------------------------------------------------------------

// [ reactive ]
interface State {
  value: string;
}
const state = reactive<State>({
  value: "",
});
// ----------------------------------------------------------------------------
watch(
  () => props.data,
  () => {
    setValue(props.data);
  }
);

// 更新を親コンポーネントに伝える
const updateValue = async (text: string | null) => {
  const before = props.data;
  let setText = "";
  if (text === null) {
    setText = "";
  } else if (props.maxLen === 0 || text.length <= props.maxLen) {
    setText = text;
  } else {
    const CutLen = (text: string, len: number, addWard = "") => {
      if (text === null) return "";
      if (len === 0) return text;
      return text.substring(0, len) + addWard;
    };
    setText = CutLen(text, props.maxLen, "");
  }
  state.value = setText;
  emit("update:data", setText);
  await nextTick();
  emit("value-change", setText, before || "");
};

const setValue = (text: string | null) => {
  // console.log({ text });
  if (text === null) {
    state.value = "";
    return;
  }
  if (props.maxLen === 0 || text.length <= props.maxLen) {
    state.value = text;
  } else {
    // 文字数のオーバーフロー確定
    // 親コンポーネントへの更新処理に移動
    updateValue(text);
  }
};
setValue(props.data);

// [ ref ]
const inputElement = ref();
const setRef = (elm: any) => {
  inputElement.value = elm;
  emit("ref", elm);
};

/**
 * 強制focus
 */
const elmFocus = () => {
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  inputElement.value.focus();
};

// [ focus, blur ]
interface FocusState {
  isActivate: boolean;
  isMmousedown: boolean;
}

const focusState = reactive<FocusState>({
  isActivate: false,
  isMmousedown: false,
});

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (fcFocus.state.id !== uid) return false;
  if (focusState.isActivate) return true;
  if (focusState.isMmousedown) return true;
  return false;
});

/**
 * focus, blur イベント
 */
watch(computedActivate, (value) => {
  if (value === true) {
    setTimeout(() => {
      emit("focus", inputElement.value);
    }, 10);
  } else {
    emit("blur", inputElement.value);
  }
});

const onFocus = () => {
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  focusState.isActivate = true;
  fcFocus.state.id = uid;
};
const onBlur = () => {
  focusState.isActivate = false;
};
// ----------------------------------------------------------------------------
// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff === null && props.data === "") return false;
  if (props.diff === "" && props.data === null) return false;
  if (props.diff !== props.data) return true;
  return false;
});
// tabindex
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  if (props.readonly === true) return -1;
  return props.tabindex;
});

// ----------------------------------------------------------------------------
const lenLabelClass = computed(() => {
  return [
    twMerge(
      "text-white bg-[#2fa412]",
      props.maxLen - state.value.length < 5 ? "bg-[#fdc90d]" : "",
      props.maxLen - state.value.length < 3 ? "bg-[#fd750d]" : "",
      props.maxLen - state.value.length < 1 ? "bg-[#fa541d]" : ""
    ),
  ];
});

const dataListId = ref(`textbox-list-${uid}`);
// ----------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="props.class"
    :class-header="props.classHeader"
    :class-input="[props.classInput]"
    :focus="computedActivate"
    :focus-color="props.focusColor"
    :change="isChangeData"
    :change-color="props.changeColor"
    :error="props.error"
    :error-color="props.errorColor"
    :disabled="props.disabled"
    :disabled-color="props.disabledColor"
    :readonly="props.readonly"
    :label="props.label"
    :require="props.require"
    :require-text="props.requireText"
    :warn="props.warn"
    :warn-time-out="props.warnTimeOut"
    :size="props.size"
    @click="elmFocus"
  >
    <template v-if="slots['left-icons']" #left-icons>
      <slot name="left-icons" :disabled="disabled" />
    </template>
    <template v-if="slots['right-icons']" #right-icons>
      <slot name="right-icons" :disabled="disabled" />
    </template>
    <template v-if="slots.overlay" #overlay>
      <slot name="overlay"></slot>
    </template>
    <template v-if="props.maxLen > 0" #header-right="{ defaultClass }">
      <div :class="[defaultClass, lenLabelClass]">
        {{ state.value.length }} / {{ props.maxLen }}
      </div>
    </template>
    <div
      v-if="props.disabled"
      class="input-d"
      :style="`text-align:${props.textAlign};`"
    >
      {{ state.value }}
    </div>
    <input
      v-else
      :ref="(e) => setRef(e)"
      v-model="state.value"
      :list="props.datalist.length > 0 ? dataListId : undefined"
      :type="props.type"
      :autocomplete="props.autocomplete"
      style="ime-mode: active"
      :style="`text-align:${props.textAlign};`"
      class="w-full"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :tabindex="tabindex"
      :enterkeyhint="props.enterkeyhint"
      :inputmode="props.inputmode"
      @blur="onBlur()"
      @focus="onFocus()"
      @input="updateValue(state.value)"
      @keydown="(e: KeyboardEvent) => emit('keydown', e)"
      @keyup="(e: KeyboardEvent) => emit('keyup', e)"
      @click.stop=""
    />
    <datalist v-if="props.datalist.length !== 0" :id="dataListId">
      <template v-for="(row, index) in props.datalist" :key="index">
        <option :value="row" />
      </template>
    </datalist>
  </InputFrame>
</template>

<style lang="scss" scoped>
.input-d,
input {
  width: 100%;
  height: auto;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0px;
  outline: none;
  line-height: 1.4em;
  color: inherit;
  // height: 20px;
}
input::-webkit-calendar-picker-indicator {
  opacity: 0;
}
</style>
