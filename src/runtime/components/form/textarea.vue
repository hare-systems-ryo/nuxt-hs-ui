<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\textarea.vue
// ----------------------------------------------------------------------------
// Textarea
// TextareaTextarea
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { reactive, ref, watch, computed, useId, nextTick, onMounted } from '#imports';
// [ utils ]
import type { ClassType } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
import { Int } from '../../utils/number';

// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
import { useHsIsMobile } from '../../composables/use-hs-is-mobile';
// [ Components ]
import InputFrame from './input-frame.vue';
// ----------------------------------------------------------------------------
const hsFocus = useHsFocus(useHsPinia());
const hsIsMobile = useHsIsMobile(useHsPinia());
onMounted(() => {
  hsIsMobile.init();
});
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  rows?: number | string;
  maxRows?: number;
  maxLen?: number;
  autosize?: boolean;
  placeholder?: MultiLang;
  // ----------------------------------------------------------------------------
  data: string | null;
  diff?: string | null | undefined;
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
  // ----------------------------------------------------------------------------
  uiText?: {
    rowsUnit: MultiLang;
  };
};
const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  rows: 3,
  maxRows: 0,
  maxLen: 0,
  autosize: false,
  placeholder: '',
  // ----------------------------------------------------------------------------
  diff: undefined,
  tabindex: undefined,
  // ----------------------------------------------------------------------------
  class: '',
  classHeader: '',
  classInput: '',
  // ----------------------------------------------------------------------------
  // 状態
  //   focus: false,
  focusColor: 'shadow-[inset_0px_0px_1px_2px_#0d8ee4]',
  //   change: false,
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
  // ----------------------------------------------------------------------------
  uiText: () => {
    return {
      rowsUnit: { ja: '行', en: 'Rows' },
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
  'update:data': [value: string];
  'value-change': [after: string, before: string | null];
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
  'right-icons'?(): any;
  'left-icons'?(): any;
  'label-prepend'?(): any;
  'label-append'?(): any;
  'header-right'?(): any;
}>();
// ----------------------------------------------------------------------------

const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;

// [ getCurrentInstance ]

const uid = useId();
// ----------------------------------------------------------------------------

// [ reactive ]
interface State {
  value: string;
}
const state = reactive<State>({
  value: '',
});

// ----------------------------------------------------------------------------
watch(
  () => props.data,
  () => {
    setValue(props.data);
  }
);

const CutLen = (text: string, len: number, addWard = '') => {
  if (text === null) return '';
  if (len === 0) return text;
  return text.substring(0, len) + addWard;
};
const getCheckedText = (text: string) => {
  // 各行を配列の要素に分ける
  let ret = text;
  if (props.maxRows !== 0) {
    const lines = text.split('\n');
    let amari = '';
    // 入力行数が制限を超えた場合
    if (lines.length > props.maxRows) {
      const result = [];
      for (let i = 0; i < lines.length; i++) {
        if (i < props.maxRows) {
          result.push(lines[i]);
        } else {
          amari += lines[i]?.replace(/\n/g, '');
        }
      }
      ret = result.join('\n') + amari;
    }
  }
  if (props.maxLen !== 0 || ret.length > props.maxLen) {
    ret = CutLen(ret, props.maxLen, '');
  }
  return ret;
};

const setValue = (text: string | null) => {
  if (text === null) {
    state.value = '';
    return;
  }
  const lineCheckedText = getCheckedText(text);
  if (lineCheckedText === text) {
    state.value = text;
  } else {
    // 文字数のオーバーフロー確定
    // 親コンポーネントへの更新処理に移動
    updateValue(text);
  }
};
setValue(props.data);

//  更新を親コンポーネントに伝える
const updateValue = async (text: string | null) => {
  const before = props.data;
  let setText = '';
  if (text === null) {
    setText = '';
  } else {
    // 各行を配列の要素に分ける
    setText = getCheckedText(text);
  }
  state.value = setText;
  emit('update:data', setText);
  await nextTick();
  emit('value-change', setText, before);
};

// [ ref ]
const inputElement = ref();
defineExpose({ el: inputElement });
const setRef = (elm: any) => {
  inputElement.value = elm;
  emit('ref', elm as HTMLInputElement);
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
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (hsFocus.state.id !== uid) return false;
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
      emit('focus', inputElement.value);
    }, 10);
  } else {
    emit('blur', inputElement.value);
  }
});

const onMousedown = () => {
  focusState.isMmousedown = true;
};
const onMouseup = () => {
  elmFocus();
  focusState.isMmousedown = false;
};

const onFocus = () => {
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  focusState.isActivate = true;
  if (hsFocus.state.id !== uid) {
    hsFocus.state.id = uid;
  }
};
const onBlur = () => {
  focusState.isActivate = false;
};

// [ baseClass ]
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  if (props.readonly === true) return -1;
  return props.tabindex;
});

//  更新の有無確認
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff === null && props.data === '') return false;
  if (props.diff === '' && props.data === null) return false;
  if (props.diff !== props.data) return true;
  return false;
});
//  ---------------------------------------------------------------------------------
const lastLen = computed(() => {
  return props.maxLen - state.value.length;
});
const lastRow = computed(() => {
  return props.maxRows - state.value.split('\n').length;
});

// ----------------------------------------------------------------------------
const lenLabelClass = computed(() => {
  // const last = props.maxLen - state.value.length;
  return [
    twMerge(
      'text-white bg-[#2fa412]',
      lastLen.value < 9 ? 'bg-[#fdc90d]' : '',
      lastLen.value < 6 ? 'bg-[#fd750d]' : '',
      lastLen.value < 3 ? 'bg-[#fa541d]' : ''
    ),
  ];
});
const rowLabelClass = computed(() => {
  // const last = props.maxRows - state.value.split('\n').length;
  return [
    twMerge(
      'text-white bg-[#2fa412]',
      lastRow.value < 6 ? 'bg-[#fdc90d]' : '',
      lastRow.value < 5 ? 'bg-[#fd750d]' : '',
      lastRow.value < 2 ? 'bg-[#fa541d]' : ''
    ),
  ];
});

const textAreaFrameClass = computed(() => {
  return [
    twMerge(),
    //
    'bg-transparent',
    'flex flex-row items-center justify-center',
    'h-full w-full',
  ];
});
const textAreaClass = computed(() => {
  return [
    twMerge(
      //
      'flex-1',
      '!leading-[1.2em]',
      'bg-transparent',
      'mt-[1px]',
      'min-h-full min-w-full'
    ),
  ];
});

const _rows = computed(() => {
  if (!props.autosize) return props.rows;
  const placeholder = tx(props.placeholder).value;
  return Math.max(state.value.split('\n').length, placeholder.split('\n').length, Int(props.rows));
});
const placeholder = computed(() => tx(props.placeholder).value);
</script>

<template>
  <InputFrame
    :class="['h-auto', props.class]"
    :class-header="props.classHeader"
    :class-input="['flex-1', props.classInput]"
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
    :headerless="props.headerless"
    @click="elmFocus"
  >
    <template v-if="slots.overlay" #overlay="{ focus, change }">
      <slot name="overlay" :focus="focus" :change="change"></slot>
    </template>
    <template v-if="slots['left-icons']" #left-icons>
      <slot name="left-icons" :disabled="disabled" />
    </template>
    <template v-if="slots['right-icons']" #right-icons>
      <slot name="right-icons" :disabled="disabled" />
    </template>
    <template v-if="slots['label-prepend']" #label-prepend>
      <slot name="label-prepend" />
    </template>
    <template v-if="slots['label-append']" #label-append>
      <slot name="label-append" />
    </template>
    <template v-if="props.maxLen > 0 || props.maxRows > 0 || slots['header-right']" #header-right="{ defaultClass }">
      <div v-if="props.maxLen !== 0 && lastLen < 15" :class="[defaultClass, lenLabelClass]">
        {{ state.value.length }} / {{ props.maxLen }}
      </div>
      <div v-if="props.maxRows !== 0 && lastRow < 9" :class="[defaultClass, rowLabelClass]">
        {{ state.value.split('\n').length }} / {{ props.maxRows }}
        {{ tx(props.uiText.rowsUnit) }}
      </div>
      <slot name="header-right" />
    </template>
    <template #default="{ focus }">
      <span
        v-if="placeholder"
        class="text-black/50 pointer-events-none select-none px-1 absolute inset-0 items-center transition-opacity truncate"
        :class="focus || !!state.value ? 'opacity-0' : ''"
      >
        <div class="whitespace-pre-wrap w-full leading-[1.20em] mt-1">
          {{ placeholder }}
        </div>
      </span>
      <div class="nac-c-input-box" :class="[textAreaFrameClass, { isMobile: hsIsMobile.isMobile }]">
        <textarea
          :ref="(e) => setRef(e)"
          v-model="state.value"
          type="text"
          :class="textAreaClass"
          :rows="_rows"
          :disabled="props.disabled || props.readonly"
          :tabindex="tabindex"
          @blur="onBlur()"
          @focus="onFocus()"
          @mousedown="onMousedown"
          @mouseup="onMouseup"
          @input="updateValue(state.value)"
          @keydown="(e: KeyboardEvent) => emit('keydown', e)"
          @keyup="(e: KeyboardEvent) => emit('keyup', e)"
        ></textarea>
      </div>
    </template>
  </InputFrame>
</template>

<style lang="scss" scoped>
.nac-c-input-box {
  padding: 4px 2px 4px 4px;

  ::-webkit-scrollbar {
    width: 6px;
    padding-top: 3px;
    padding-bottom: 4px;
    cursor: pointer;
    background-color: transparent;
  }

  /*スクロールバーの軌道*/
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    margin-top: -3px;
    margin-bottom: 4px;
  }

  /*スクロールバーの動く部分*/
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
  }

  ::-webkit-resizer {
    background-color: transparent;
    opacity: 0;
    height: 2px !important;
  }

  &:not(.isMobile)::after {
    position: absolute;
    z-index: 0;
    bottom: 0px;
    right: 0px;
    width: 10px;
    height: 16px;
    content: '\f338';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    pointer-events: none;
    text-align: right;
    font-size: 10px;
    padding-right: 2px;
    color: #e26f2c;

    @media screen and (min-width: #{ 0 }px) and (max-width: #{ 600 - 0.1}px) {
      opacity: 0;
    }
  }
}

textarea {
  resize: vertical;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0px;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  overflow-y: scroll;
  &[disabled]::-webkit-resizer {
    background: #f3f3f3;
  }
}
</style>
