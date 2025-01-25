<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\value-box.vue
// ----------------------------------------------------------------------------
// ValueBox
// ValueBoxValueBox
----------------------------------------------------------------------------- */

// [ node_modules ]
import BigNumber from "bignumber.js";
// [ NUXT ]
import {
  reactive,
  ref,
  watch,
  computed,
  useId,
  onMounted,
  nextTick,
} from "#imports";
// [ utils ]
import type { ClassType } from "../../utils/class-style";
import { InsertComma } from "../../utils/number";
import { FloatNullable } from "../../utils/float";
// [ composables ]
import { useHsFocus } from "../../composables/use-hs-focus";
import { useHsToast } from "../../composables/use-hs-toast";
import { useHsMisc } from "../../composables/use-hs-misc";
// [ Components ]
import InputFrame from "./input-frame.vue";
// ----------------------------------------------------------------------------
// [ com > lib > * ]
// import { FloatNullable } from '~/com/lib/float';
// ----------------------------------------------------------------------------
const hsFocus = useHsFocus();
const hsMisc = useHsMisc();
const Toast = useHsToast();
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  nullable?: boolean;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
  digits?: number;
  isShowBtnControl?: boolean;
  comma?: string;
  enterkeyhint?: string;
  // ----------------------------------------------------------------------------
  data: number | null;
  diff?: number | null | undefined;
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
  // ----------------------------------------------------------------------------
  uiText?: {
    validError: {
      title: string;
      nullValue: string;
      minValue: string;
      maxValue: string;
    };
  };
};
const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  nullable: true,
  unit: "",
  step: 1,
  min: -9999999999,
  max: 9999999999,
  digits: 0,
  isShowBtnControl: false,
  comma: ",",
  enterkeyhint: undefined,

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
  warnTimeOut: 300,
  // ----------------------------------------------------------------------------
  // 設定
  size: "m",
  // ----------------------------------------------------------------------------
  uiText: () => {
    return {
      validError: {
        title: "入力値の警告",
        nullValue: "数値以外は許可されていません。",
        minValue: "[{value}]以下の数値は入力できません",
        maxValue: "[{value}]以上の数値は入力できません",
      },
    };
  },
});

// ----------------------------------------------------------------------------
// [ emit ]
type Emits = {
  ref: [element: HTMLElement];
  focus: [elm: HTMLElement];
  blur: [elm: HTMLElement];
  // ----------------------------
  "update:data": [value: number | null];
  "value-change": [after: number | null, before: number | null];
  // ----------------------------
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
// [ getCurrentInstance ]
const uid = useId();

// ----------------------------------------------------------------------------
// [ reactive ]
interface State {
  value: string;
  inputMode: string;
}
const state = reactive<State>({
  value: "",
  inputMode: "text",
});
// ----------------------------------------------------------------------------
onMounted(() => {
  state.inputMode = hsMisc.state.isMobile === true ? "numeric" : "text";
});
watch(
  () => hsMisc.state.isMobile,
  () => {
    state.inputMode = hsMisc.state.isMobile === true ? "numeric" : "text";
  }
);

// ----------------------------------------------------------------------------
/**
 * 表示（カンマ表示）
 */
const displayText = computed(() => {
  if (props.data === null) return "";
  return InsertComma(props.data, props.digits, "0", props.comma);
});

/**
 * 値が適正かチェックする
 */
const validCheck = (
  val: number | null
): { result: boolean; message: string; value: number | null } => {
  if (val === null) {
    if (props.nullable === false) {
      return {
        result: false,
        value: 0,
        message: props.uiText.validError.nullValue,
      };
    } else {
      return { result: true, value: null, message: "" };
    }
  }
  if (val < props.min) {
    return {
      result: false,
      value: props.min,
      message: props.uiText.validError.minValue.replace(
        /\{value\}/g,
        String(props.min)
      ),
      // `[${props.min}]以下の数値は入力できません`,
    };
  } else if (props.max < val) {
    return {
      result: false,
      value: props.max,
      message: props.uiText.validError.maxValue.replace(
        /\{value\}/g,
        String(props.min)
      ),
      // message: `[${props.max}]以上の数値は入力できません`,
    };
  }
  return { result: true, value: val, message: "" };
};

/**
 * 更新を親コンポーネントに伝える
 * @param val
 */
const updateData = async (val: number | null, f = true) => {
  // console.log('updateData', val);
  const before = props.data;
  let updateValue: number | null = null;
  if (val !== null) {
    updateValue = val;
  } else if (props.nullable === false) {
    updateValue = 0;
  } else {
    updateValue = null;
  }
  emit("update:data", updateValue);
  await nextTick();
  if (f) emit("value-change", updateValue, before);
};

/**
 * 要素のイベント stepValue
 */
const stepValue = (isUp: boolean) => {
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  let nextValue = 0;
  const inputValue = FloatNullable(props.data, props.digits);
  const step = isUp === true ? props.step : props.step * -1;
  if (inputValue === null) {
    nextValue = step;
    if (isUp === true) {
      if (nextValue < props.min || props.max < nextValue) {
        nextValue = props.max;
      }
    } else if (nextValue < props.min || props.max < nextValue) {
      nextValue = props.min;
    }
  } else if (props.digits > 0 || step < 1) {
    if (isUp === true) {
      nextValue = BigNumber(inputValue).plus(BigNumber(props.step)).toNumber();
    } else {
      nextValue = BigNumber(inputValue).minus(BigNumber(props.step)).toNumber();
    }
  } else {
    nextValue = inputValue + step;
  }
  const validCheckResult = validCheck(nextValue);
  // console.log({ validCheckResult });
  if (validCheckResult.result === true) {
    updateData(validCheckResult.value);
    // } else {
    // emit('warn', validCheckResult.message, '入力値の警告', props.toastTime);
  }
};

const isArrowUp = computed(() => {
  if (props.data === null) return true;
  if (props.data + props.step <= props.max) return true;
  return false;
});
const isArrowDown = computed(() => {
  if (props.data === null) return true;
  if (props.min <= props.data - props.step) return true;
  return false;
});

/**
 * 全角数値を半角数値へ変換する
 */
const hankakuToZenkaku = (str: string) => {
  return (str + "").replace(/[０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
};

/**
 * 入力値の変更を起点としてチェック
 */
const checkValueByInput = () => {
  const inputText = hankakuToZenkaku(state.value)
    .replace(/ー/g, "-")
    .replace(/[^(0-9)|.\-+]+/g, "");
  const inputValue = FloatNullable(inputText, props.digits);
  const validCheckResult = validCheck(inputValue);

  // console.log(uid, { moto: state.value, inputText, inputValue, validCheckResult });
  if (validCheckResult.value === null) {
    state.value = "";
  } else {
    state.value = validCheckResult.value.toFixed(props.digits);
  }
  if (props.data !== validCheckResult.value) {
    updateData(validCheckResult.value);
  }
  if (validCheckResult.result === false) {
    Toast.Warning(
      validCheckResult.message,
      props.uiText.validError.title,
      props.warnTimeOut
    );
  }
};

/**
 * prop.data からのデータ入力
 */
const setValueByPropsData = () => {
  const val = FloatNullable(props.data, props.digits);
  if (props.data !== val) {
    // 小数点許容確認とデータ修正
    updateData(val, false);
    return;
  }
  const validCheckResult = validCheck(val);
  if (validCheckResult.result === true) {
    if (validCheckResult.value === null) {
      state.value = "";
    } else {
      state.value = validCheckResult.value.toFixed(props.digits);
    }
  } else {
    updateData(validCheckResult.value, false);
    Toast.Warning(
      validCheckResult.message,
      props.uiText.validError.title,
      props.warnTimeOut
    );
  }
};

/**
 * 要素のイベント keydown
 */
const keydown = (e: KeyboardEvent) => {
  emit("keydown", e);
  if (
    !props.isShowBtnControl &&
    (e.key === "ArrowUp" || e.key === "ArrowDown")
  ) {
    e.preventDefault();
    return;
  }
  if (e.key === "ArrowUp") {
    stepValue(true);
  } else if (e.key === "ArrowDown") {
    stepValue(false);
  }
};

/**
 * 要素のイベント keydown
 */
const onWheel = (e: WheelEvent) => {
  if (!props.isShowBtnControl) return;
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  if (e.deltaY < 0) {
    stepValue(true);
  } else if (e.deltaY > 0) {
    stepValue(false);
  }
  e.preventDefault();
};

// [ ref ]
const inputElement = ref();
const setRef = (elm: any) => {
  inputElement.value = elm;
  emit("ref", elm as HTMLInputElement);
};

/**
 * 強制focus
 */
const elmFocus = () => {
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
  if (hsFocus.state.id !== uid) return false;
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (focusState.isActivate) return true;
  if (focusState.isMmousedown) return true;
  return false;
});

/**
 * focus, blur イベント
 */
watch(computedActivate, (value) => {
  if (value === true) {
    // クリックでの遷移の場合に
    // 一つ前のコントロールのblurイベントよりも早くfocusが発生しないようにする対策で10ミリ秒処理をずらす
    setTimeout(() => {
      emit("focus", inputElement.value);
    }, 10);
  } else {
    emit("blur", inputElement.value);
  }
});

const zeroFlag = ref(false);
const onFocus = () => {
  zeroFlag.value = false;
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  hsFocus.state.id = uid;
  focusState.isActivate = true;
  if (state.inputMode === "text") {
    // inputElement.value.select();
  } else if (state.value === "0") {
    zeroFlag.value = true;
    state.value = "";
  }
};
// const instance = getCurrentInstance(); // コンポーネント固有のUIDを取得する
// const uid = instance != null ? String(instance.uid) : '';
// const id = useId();
const onBlur = () => {
  try {
    if (props.disabled === true) return;
    if (props.readonly === true) return;
    if (zeroFlag.value && state.value === "") {
      state.value = "0";
    }
    focusState.isActivate = false;
    focusState.isMmousedown = false;
    // await Sleep(50);
    checkValueByInput();
  } catch (err) {
    console.error(err);
  } finally {
    zeroFlag.value = true;
  }
};

// ----------------------------------------------------------------------------
// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff !== props.data) return true;
  return false;
});

// tabindex
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  return props.tabindex;
});

// [ locked ]
const locked = computed(() => {
  if (props.disabled === true) return true;
  if (props.readonly === true) return true;
  return false;
});
// ----------------------------------------------------------------------------

onMounted(() => {
  setValueByPropsData();
});

watch(
  () => props.data,
  () => {
    setValueByPropsData();
  }
);
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
    <div class="flex items-end justify-end">
      <div class="flex-1">
        <input
          :ref="(e) => setRef(e)"
          v-model="state.value"
          type="text"
          :inputmode="hsMisc.state.isMobile ? 'numeric' : 'text'"
          class="pe-[4px] w-full"
          :class="[
            //
            computedActivate ? 'opacity-100' : 'opacity-0',
            // { isShow: computedActivate },
          ]"
          maxlength="20"
          :enterkeyhint="props.enterkeyhint"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :tabindex="tabindex"
          @wheel="onWheel"
          @keydown="keydown"
          @keyup="(e) => emit('keyup', e)"
          @blur="onBlur()"
          @focus="onFocus()"
        />
        <input
          type="text"
          class="displayText pe-[4px] w-full"
          :class="[
            //
            computedActivate ? 'opacity-0' : 'opacity-100',
            { readonly: props.readonly },
          ]"
          :value="displayText"
          :disabled="props.disabled"
          :tabindex="-1"
          readonly
        />
      </div>
      <div v-if="props.unit.length !== 0" class="flex-none unit">
        {{ props.unit }}
      </div>
    </div>
    <template #right-icons>
      <div v-if="props.isShowBtnControl === true" class="u-d-icon" @click.stop>
        <div
          :class="[{ activate: isArrowUp && !locked }]"
          @click="stepValue(true)"
        >
          <i class="fas fa-caret-up"></i>
        </div>
        <div
          :class="[{ activate: isArrowDown && !locked }]"
          @click="stepValue(false)"
        >
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
    </template>
  </InputFrame>
</template>

<style lang="scss" scoped>
input {
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0px;
  outline: none;
  text-align: right;
  color: inherit;
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
  &.isShow {
    pointer-events: all;
  }

  &.displayText {
    position: absolute;
    inset: 0 0 0 0;
    margin-top: auto;
    margin-bottom: auto;
    pointer-events: none;
    &.readonly {
      pointer-events: all;
    }
  }
}

.unit {
  color: #696969;
  align-items: flex-end;
  align-self: flex-end;
  margin: 0px 0px 2px 4px;
  font-size: min(0.8em, 1rem);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.u-d-icon {
  width: 2em;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > div {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    cursor: pointer;
    background-color: transparent;
    color: #cccccc;
    padding: 0 10px;
    pointer-events: none;
    font-size: min(0.9em, 1rem);

    &.activate {
      cursor: pointer;
      background-color: transparent;
      color: #f68708;
      transition: all 300ms;
      pointer-events: all;

      &:hover {
        background-color: #f687084c;
      }
    }
  }

  > div:first-child {
    border-bottom: solid 1px gray;
  }
}
</style>
