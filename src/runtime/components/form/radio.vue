<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\radio.vue
// ----------------------------------------------------------------------------
// Radio
// RadioRadio
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { reactive, ref, watch, computed, useId } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
import type { SelectItem } from "../../utils/select-item";
import { useDisplayList, type DisplaySelectItem } from "../../utils/select";
// [ composables ]
import { useHsFocus } from "../../composables/use-hs-focus";
import { useHsMultiLang } from "../../composables/use-hs-multi-lang";
// [ Components ]
import InputFrame from "./input-frame.vue";
import SelectImgIcon from "./select-img-icon.vue";
import Btn from "../form/btn.vue";

// ----------------------------------------------------------------------------
const hsFocus = useHsFocus();
const multiLang = useHsMultiLang();
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  list: SelectItem[];
  order?: boolean;
  image?: boolean;
  loading?: boolean;
  nullText?: string;
  classCol?: ClassType;
  classRow?: ClassType;
  classImg?: ClassType;
  classImgTag?: ClassType;
  nullable?: boolean;
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
};

const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  order: false,
  image: false,
  loading: false,
  nullText: "選択してください",
  nullable: false,
  classCol: "",
  classRow: "",
  classImg: "",
  classImgTag: "",
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
// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff !== props.data) return true;
  return false;
});
// [ ref ]

// ----------------------------------------------------------------------------
const displayData = ref<DisplaySelectItem | null>(null);
watch(displayData, (v) => {
  const before = props.data;
  if (v === null) {
    emit("update:data", null);
    emit("value-change", null, before);
    return;
  }
  if (v.id === null) {
    displayData.value = null;
    return;
  }
  emit("update:data", v.id);
  emit("value-change", v.id, before);
});
const selectedId = computed(() => {
  if (displayData.value === null) {
    return null;
  }
  return displayData.value.id;
});
// ----------------------------------------------------------------------------
// 不明選択肢太陽
const unKnownSelected = ref<boolean>(false);
const unKnownData = computed(() => {
  if (props.data === null) return null;
  return {
    id: props.data,
    text: `選択肢にない値です ID=${props.data}`,
  };
});

// ----------------------------------------------------------------------------
const isShowHidden = ref(false);
/** 選択肢に非表示アイテムが含まれているかどうか */
const includeHidden = computed(() => {
  return props.list.filter((row) => row.hidden).length > 0;
});
// ----------------------------------------------------------------------------
/** 選択肢 */
interface SelectItemShow extends DisplaySelectItem {
  elm: HTMLElement | null;
  activate: boolean;
}

const displayList = computed<SelectItemShow[]>(() => {
  return useDisplayList({
    list: props.list,
    id: props.data,
    order: props.order,
    unKnownData: unKnownData.value,
    unKnownSelected: unKnownSelected.value,
    isShowHidden: isShowHidden.value,
    require: props.require || !props.nullable,
    nullText: props.nullText,
  }).map((row) => {
    return {
      ...row,
      elm: null,
      activate: false,
    };
  });
});
// ----------------------------------------------------------------------------

const checkData = (id: number | null) => {
  const ret = displayList.value.find((row) => row.id === id);
  if (ret === undefined) {
    // 選択肢に存在しないコード引当
    unKnownSelected.value = true;
    displayData.value = unKnownData.value;
  } else {
    unKnownSelected.value = false;
    displayData.value = ret;
  }
};
checkData(props.data);
// const activateItem = computed(() => {
watch(
  () => props.data,
  (id) => {
    checkData(id);
  }
);
// ----------------------------------------------------------------------------

// [ focus, blur ]
interface FocusState {
  isActivate: boolean;
  isMmousedownItem: boolean;
  isNullActivate: boolean;
  isKeyDown: boolean;
}
const focusState = reactive<FocusState>({
  isActivate: false,
  isMmousedownItem: false,
  isNullActivate: false,
  isKeyDown: false,
});

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (props.disabled === true) return false;
  if (hsFocus.state.id !== uid) return false;
  if (focusState.isActivate) return true;
  if (focusState.isMmousedownItem) return true;
  if (focusState.isNullActivate) return true;
  if (focusState.isKeyDown) return true;
  if (displayList.value.filter((row) => row.activate === true).length === 1)
    return true;
  return false;
});

// ----------------------------------------------------------------------------
// const isOpen = ref(false);

const onFocus = (index: null | number) => {
  if (props.disabled) return;
  if (props.readonly) return;
  focusState.isActivate = true;
  if (index === null) {
    focusState.isNullActivate = true;
  } else {
    displayList.value[index].activate = true;
  }
  hsFocus.state.id = uid;
};

const onBlur = (index: null | number) => {
  if (props.disabled) return;
  if (props.readonly) return;
  if (index === null) {
    focusState.isNullActivate = false;
  } else {
    displayList.value[index].activate = false;
  }
  setTimeout(() => {
    focusState.isActivate = false;
  }, 5);
};
// ----------------------------------------------------------------------------
const colClass = computed(() => {
  return twMerge(
    //
    "col-auto",
    ClassTypeToString(props.classCol)
  );
});
// ----------------------------------------------------------------------------

const inputElementNull = ref<HTMLElement | null>(null);
// ----------------------------------------------------------------------------
const onMousedownItem = () => {
  if (props.disabled) return;
  if (props.readonly) return;
  focusState.isMmousedownItem = true;
};
const onMouseupItem = (elm: HTMLElement | null) => {
  if (props.disabled) return;
  if (props.readonly) return;
  focusState.isMmousedownItem = false;
  if (elm !== null) {
    elm.focus();
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }
  focusState.isKeyDown = true;
};

const onKeyup = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }
  focusState.isKeyDown = false;
};

const setValue = async (row: SelectItemShow | null) => {
  if (props.disabled) return;
  if (props.readonly) return;
  displayData.value = row;
};

// ----------------------------------------------------------------------------
const baseClass = computed(() => {
  return [
    twMerge(
      //
      "h-auto",
      props.size === "s" ? "min-h-[44px] " : "",
      props.size === "m" ? "min-h-[48px]" : "",
      props.size === "l" ? "min-h-[60px]" : "",
      ClassTypeToString(props.class)
    ),
  ];
});
// ----------------------------------------------------------------------------
const inputClass = computed(() => {
  return [
    twMerge(
      //
      "px-2",
      ClassTypeToString(props.classInput)
    ),
  ];
});

// ----------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="baseClass"
    :class-header="props.classHeader"
    :class-input="inputClass"
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
    <div class="nac-input">
      <div
        class="radio-row"
        :class="[`flex flex-wrap`, classRow]"
        @keyup.up="onKeyup"
        @keydown.up="onKeydown"
        @keyup.down="onKeyup"
        @keydown.down="onKeydown"
        @keyup.left="onKeyup"
        @keydown.left="onKeydown"
        @keyup.right="onKeyup"
        @keydown.right="onKeydown"
      >
        <!-- null -->
        <div
          v-if="!props.require && props.nullable"
          class="radio-col"
          :class="colClass"
        >
          <div
            class="nac-radio"
            :class="[{ disabled: props.disabled, readonly: props.readonly }]"
            @mousedown="onMousedownItem"
            @mouseup="onMouseupItem(inputElementNull)"
            @click="setValue(null)"
          >
            <input
              :id="`radio${uid}-null`"
              :ref="(e:any) => (inputElementNull = e)"
              v-bind="(selectedId as any)"
              type="radio"
              :name="`radio${uid}`"
              :tabindex="props.tabindex"
              :value="null"
              :disabled="props.disabled"
              :readonly="props.readonly"
              @focus="onFocus(null)"
              @blur="onBlur(null)"
            />
            <div
              class="radio-mark"
              :class="[{ checked: selectedId === null }]"
            ></div>
            <div class="radio-label">
              <SelectImgIcon
                v-if="props.image"
                class="flex-none"
                :img-url="null"
                :class-img="props.classImg"
                :class-img-tag="props.classImgTag"
              />
              <div class="radio-text truncate">{{ nullText }}</div>
            </div>
          </div>
        </div>
        <!-- list -->
        <template v-for="(row, index) in displayList" :key="index">
          <div
            v-if="row.id !== null"
            class="radio-col"
            :class="colClass"
            @mousedown="onMousedownItem"
            @mouseup="onMouseupItem(row.elm)"
            @click="setValue(row)"
          >
            <div
              class="nac-radio"
              :class="[{ disabled: props.disabled, readonly: props.readonly }]"
            >
              <input
                :id="`radio${uid}-${row.id}`"
                :ref="(e:any) => (row.elm = e)"
                v-bind="(selectedId as any)"
                type="radio"
                class=""
                :name="`radio${uid}`"
                :tabindex="props.tabindex"
                :value="row.id"
                :disabled="props.disabled"
                :readonly="props.readonly"
                @focus="onFocus(index)"
                @blur="onBlur(index)"
              />
              <div
                class="radio-mark"
                :class="[{ checked: selectedId === row.id }]"
              ></div>
              <div
                class="radio-label"
                :class="{
                  isDeleted: row.deleted === true,
                  isHidden: row.hidden === false,
                }"
              >
                <SelectImgIcon
                  v-if="props.image"
                  class="flex-none"
                  :img-url="row.imgUrl"
                  :class-img="props.classImg"
                  :class-img-tag="props.classImgTag"
                />
                <div class="radio-text truncate">
                  {{ tx(row.text) }}
                  <span
                    v-if="row.deleted"
                    class="text-error text-[0.7em] leading-[1em]"
                    >※削除済み</span
                  >
                  <span
                    v-if="row.hidden"
                    class="text-error text-[0.7em] leading-[1em]"
                    >※非表示</span
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template v-if="includeHidden">
        <Btn
          theme="accent1"
          variant="outlined"
          class="w-full mb-1"
          size="xs"
          @click="isShowHidden = !isShowHidden"
        >
          <span class="me-1">Hidden options</span>
          <i
            class="fas"
            :class="[
              !isShowHidden ? 'fa-eye-slash text-error' : 'fa-eye text-success',
            ]"
          ></i>
          <i class="fas fa-caret-right mx-1"></i>
          <i
            class="fas"
            :class="[
              isShowHidden ? 'fa-eye-slash text-error' : 'fa-eye text-success',
            ]"
          ></i>
        </Btn>
      </template>
    </div>
  </InputFrame>
</template>

<style lang="scss">
$control-fore-color: #222222 !default;
$control-line-color: #112288 !default;

.nac-input {
  width: 100%;
  height: 100%;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .radio-row {
    display: flex;
    align-items: center;
    width: 100%;
    // height: 100%;
  }
  .radio-col {
    display: flex;
    align-items: center;
    // width: 100%;
    // height: 100%;
  }

  .nac-radio {
    display: flex;
    align-items: center;
    min-width: 0;

    align-self: center;
    padding: 0 6px 0 0;

    input {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0px;
      outline: none;
    }

    .radio-mark {
      flex: 0 0 15px;
      justify-content: flex-start;
      flex: 0 0 auto;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      border: 1px solid gray;
      margin-right: 3px;
      margin: 3px 2px 2px 0;
      box-shadow: inset 0 0 6px rgba(23, 97, 236, 0.308);
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $control-line-color;
      transition: all 300ms;

      &::after {
        content: "";
        width: 9px;
        height: 9px;
        position: relative;
        border-radius: 100%;
        background-color: #ffdd9f;
        box-shadow: inset 0 0 6px #ffa600;
        transform: scale(0);
        transition: all 300ms;
      }
      &.checked {
        border: 1px solid #f55a00;

        &::after {
          background-color: #ffbcab;
          box-shadow: inset 0 0 7px #f58b00;
          // border: 1px solid #f58b00;
          transform: scale(100%);
        }
      }
    }
    .radio-label {
      min-width: 0;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      line-height: 14em;
      .radio-text {
        overflow: hidden;
        overflow-wrap: break-word;
        word-break: break-all;
        line-height: 1.4em;
      }
    }

    .radio-label.isDeleted {
      color: rgb(165, 0, 0);
    }
  }
}
.nac-radio:not(.disabled):not(.readonly) {
  cursor: pointer;
  .radio-mark,
  .radio-label {
    cursor: pointer;
  }
}

.nac-radio.readonly {
  cursor: not-allowed;
  .radio-mark,
  .radio-label {
    cursor: not-allowed;
  }
}

.nac-radio.disabled {
  cursor: default;
  .radio-mark,
  .radio-label {
    cursor: default;
  }
  .radio-mark {
    border: 1px solid #818181;

    &::after {
      background-color: #9e9e9e;
      box-shadow: inset 0 0 6px #505050;
    }
  }
}

.item-hidden-control {
  width: calc(100% - 0px);
  padding: 8px 0;
  margin: 6px 0px 0 0px;
  border-top: solid 1px gray;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  cursor: pointer;

  > .icons {
    margin: 0 0 0 3px;
    border: solid 1px rgb(190, 190, 190);
    border-radius: 4px;
    padding: 2px 8px;
    background-color: rgba(255, 255, 255, 0.212);

    i:nth-child(2) {
      margin: 0 8px;
    }
    .fa-caret-right {
      color: #9e9e9e;
    }
  }
}
//  disabled
.nac-input.disabled {
  .select-display::after {
    color: #969696;
  }
  .select-display > .img-box {
    cursor: default;
  }
  .select-display > .select-display-text {
    cursor: default;
  }

  .item-hidden-control {
    cursor: default;
    color: rgb(92, 92, 92) !important;
    i {
      color: rgb(92, 92, 92) !important;
    }
  }
}
</style>
