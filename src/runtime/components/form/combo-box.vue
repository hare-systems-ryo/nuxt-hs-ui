<script setup lang="ts" generic="IdType extends string|number">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\combo-box.vue
// ----------------------------------------------------------------------------
// ComboBox
// ComboBoxComboBox
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';

// [ NUXT ]
import { reactive, ref, watch, computed, nextTick, useId, watchEffect } from '#imports';

// [ utils ]
import type { ClassType } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
import type { SelectItem } from '../../utils/select-item';
// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsPinia } from '../../composables/use-pinia';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsMisc } from '../../composables/use-hs-misc';
// [ Components ]
import InputFrame from './input-frame.vue';
// ----------------------------------------------------------------------------
const fcFocus = useHsFocus(useHsPinia());
const hsMisc = useHsMisc(useHsPinia());
// ----------------------------------------------------------------------------
// [ Props ]
type Enterkeyhint = 'done' | 'search' | 'enter' | 'go' | 'next' | 'previous' | 'send';

type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  type?: 'email' | 'number' | 'tel' | 'text' | 'url';
  textAlign?: 'left' | 'center' | 'right';
  maxLen?: number;
  autocomplete?: string;
  datalist?: string[];
  enterkeyhint?: Enterkeyhint | undefined;
  inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | undefined;
  inputSize?: string | number;
  placeholder?: MultiLang;
  pattern?: string;
  lang?: string;
  list: SelectItem<IdType>[];
  listLoading?: boolean;
  activeId: IdType | null;
  freeTextId: IdType | null;
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
  focusColor?: string;
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
  // ----------------------------------------------------------------------------
  // Input 種類別
  type: 'text',
  textAlign: 'left',
  maxLen: 0,
  autocomplete: 'off',
  datalist: () => [],
  enterkeyhint: undefined,
  inputmode: undefined,
  inputSize: 10,
  placeholder: '',
  pattern: undefined,
  lang: undefined,
  listLoading: false,
  // ----------------------------------------------------------------------------
  diff: undefined,
  tabindex: undefined,
  // ----------------------------------------------------------------------------
  class: '',
  classHeader: '',
  classInput: '',
  // ----------------------------------------------------------------------------
  // 状態
  focusColor: 'shadow-[inset_0px_0px_1px_2px_#0d8ee4]',
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
  require: false,
  requireText: () => ({ ja: '必須', en: 'Required' }),
  warn: '',
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
});
// ----------------------------------------------------------------------------
// [ emit ]
type Emits = {
  ref: [element: HTMLElement];
  focus: [elm: HTMLElement];
  blur: [elm: HTMLElement];
  // ----------------------------
  'update:data': [value: string];
  'update:activeId': [id: IdType | null];
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
// [ getCurrentInstance ]
const uid = useId();
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
const gt = multiLang.gt;
watch(
  () => multiLang.lang,
  () => {
    if (!props.activeId) return;
    const data = props.list.find((row) => row.id === props.activeId);
    if (!data) return;
    updateValue(gt(data.text), props.activeId);
  }
);
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

// 更新を親コンポーネントに伝える
// forceId: リスト選択時はrow.idを直接指定、自由入力時はundefined（リスト照合を行う）
const updateValue = async (text: string | null, forceId?: IdType | null) => {
  const before = props.data;
  let setText = '';
  if (text === null) {
    setText = '';
  } else if (props.maxLen === 0 || text.length <= props.maxLen) {
    setText = text;
  } else {
    const CutLen = (text: string, len: number, addWard = '') => {
      if (text === null) return '';
      if (len === 0) return text;
      return text.substring(0, len) + addWard;
    };
    setText = CutLen(text, props.maxLen, '');
  }
  state.value = setText;
  emit('update:data', setText);

  if (!setText) {
    emit('update:activeId', null);
  } else if (forceId !== undefined) {
    if (props.activeId !== forceId) {
      // リスト選択: 渡されたIDをそのまま使う
      emit('update:activeId', forceId);
    }
  } else {
    // 自由入力: テキストがリストと完全一致するか照合
    const matched = props.list.find((row) => tx(row.text).value === setText);
    emit('update:activeId', matched ? matched.id : props.freeTextId ?? null);
  }

  await nextTick();
  emit('value-change', setText, before);
};

const setValue = (text: string | null) => {
  // console.log({ text });
  if (text === null) {
    state.value = '';
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
defineExpose({ el: inputElement });
const setRef = (elm: any) => {
  inputElement.value = elm;
  emit('ref', elm);
};

// /**
//  * 強制focus
//  */
// const elmFocus = () => {
//   if (props.disabled === true) return;
//   if (props.readonly === true) return;
//   inputElement.value.focus();
// };

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
      emit('focus', inputElement.value);
    }, 10);
  } else {
    emit('blur', inputElement.value);
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
  if (props.diff === null && props.data === '') return false;
  if (props.diff === '' && props.data === null) return false;
  if (props.diff !== props.data) return true;
  return false;
});
// tabindex
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  if (props.readonly === true) return -1;
  return props.tabindex;
});

const lastLen = computed(() => {
  return props.maxLen - state.value.length;
});

// ----------------------------------------------------------------------------
const lenLabelClass = computed(() => {
  return [
    twMerge(
      'text-white bg-[#2fa412]',
      lastLen.value < 9 ? 'bg-[#fdc90d]' : '',
      lastLen.value < 6 ? 'bg-[#fd750d]' : '',
      lastLen.value < 3 ? 'bg-[#fa541d]' : ''
    ),
  ];
});

const dataListId = ref(`textbox-list-${uid}`);
const placeholder = computed(() => tx(props.placeholder).value);

const filteredList = computed(() => {
  if (!props.data || props.data.length === 0) return props.list;
  const query = props.data.toLowerCase();
  return props.list.filter((row) => tx(row.text).value.toLowerCase().includes(query));
});

const open = ref(false);
watchEffect(() => {
  if (computedActivate.value && (filteredList.value.length !== 0 || props.listLoading)) {
    open.value = computedActivate.value;
  } else if (!computedActivate.value) {
    open.value = false; // フォーカスが外れたら閉じる
  }
});
// ----------------------------------------------------------------------------
</script>

<template>
  <UPopover :open="open" :ui="{ content: 'w-(--reka-popper-anchor-width) p-0 overflow-hidden' }">
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
      :headerless="props.headerless"
    >
      <template #overlay="{ focus, change }">
        <div
          v-if="props.diff !== undefined && change"
          class="absolute inset-0 bg-red/30 transition-opacity flex items-center p-1 bg-dark/20"
          :class="!focus && hsMisc.capsLockState ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'"
        >
          <div class="flex">
            <Btn
              variant="outlined"
              theme="error"
              tabindex="-1"
              size="xs"
              class="bg-white flex-none"
              @click="updateValue(props.diff)"
            >
              <i class="fa-solid fa-rotate-right"></i>
            </Btn>
            <div v-if="props.diff" class="px-1 truncate bg-white mx-1 flex items-center">{{ props.diff }}</div>
          </div>
        </div>
        <template v-if="slots.overlay">
          <slot name="overlay" :focus="focus" :change="change"></slot>
        </template>
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
      <template v-if="props.maxLen > 0 || slots['header-right']" #header-right="{ defaultClass }">
        <slot name="header-right" />
        <div v-if="props.maxLen > 0 && lastLen < 15" :class="[defaultClass, lenLabelClass]">
          {{ state.value.length }} / {{ props.maxLen }}
        </div>
      </template>
      <template #default="{ focus }">
        <span
          v-if="placeholder"
          class="text-black/50 pointer-events-none select-none px-1 absolute inset-0 items-center transition-opacity truncate"
          :class="focus || !!state.value ? 'opacity-0' : ''"
        >
          <div class="truncate w-full" :style="`text-align:${props.textAlign};`">
            {{ placeholder }}
          </div>
        </span>

        <div v-if="props.disabled" class="input-d" :style="`text-align:${props.textAlign};`">
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
          :size="props.inputSize"
          :lang="props.lang"
          :pattern="props.pattern"
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
      </template>
    </InputFrame>
    <template #content>
      <div class="grid gap-1 bg-white max-h-60 overflow-y-auto p-2 select-none min-h-30">
        <BlockLoading :show="props.listLoading" />
        <template v-for="(row, index) in filteredList" :key="index">
          <div
            class="relative border border-dark hover:border-accent1 cursor-pointer hover:bg-accent1/5 rounded p-2"
            :class="props.activeId === row.id ? 'pointer-events-none' : ''"
            @click="updateValue(tx(row.text).value, row.id)"
          >
            {{ tx(row.text) }}
            <div v-if="props.activeId === row.id" class="absolute inset-px border-2 border-accent1 rounded"></div>
          </div>
        </template>
      </div>
    </template>
  </UPopover>
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
}
input::-webkit-calendar-picker-indicator {
  opacity: 0;
}
</style>
