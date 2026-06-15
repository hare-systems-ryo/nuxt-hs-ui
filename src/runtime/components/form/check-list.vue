<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\check-list.vue
// ----------------------------------------------------------------------------
// CheckList
// CheckListCheckList
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { reactive, ref, watch, computed, nextTick } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
import { ObjectCompare, ListIdSort } from '../../utils/object';
import type { SelectItem } from '../../utils/select-item';
// [ composables ]
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// [ Components ]
import InputFrame from './input-frame.vue';
import HsFcCheckBox from './check-box.vue';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  list: SelectItem[] | readonly SelectItem[];
  image?: boolean;
  nullText?: MultiLang;
  classRow?: ClassType;
  classCol?: ClassType;
  classItem?: ClassType;
  classImg?: ClassType;
  classImgTag?: ClassType;
  // ----------------------------------------------------------------------------
  data: number[];
  diff?: number[] | undefined;
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
  // ----------------------------------------------------------------------------
};
const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  order: false,
  image: false,
  nullText: () => ({ ja: '選択してください', en: '' }),
  nullable: true,
  classRow: '',
  classCol: '',
  classItem: '',
  classImg: '',
  classImgTag: '',
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
  requireText: () => ({ ja: '必須', en: '' }),
  warn: '',
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
});
// [ emit ]
type InputFocusEventArg = {
  elm: HTMLElement;
  label: MultiLang;
  data: number[];
};
type Emits = {
  ref: [element: HTMLElement];
  focus: [arg: InputFocusEventArg];
  blur: [arg: InputFocusEventArg];
  'update:data': [value: number[], id: number];
  'value-change': [after: number[], before: number[], id: number];
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

// [ 選択肢配列 ]
interface ItemListRow {
  id: number;
  text: MultiLang;
  focus: boolean;
  imgUrl: string | null;
}
const itemList = ref<ItemListRow[]>([]);
watch(
  () => [...props.list],
  () => {
    //
    setItemList();
  }
);
const setItemList = () => {
  itemList.value = props.list.map((row) => {
    return {
      id: row.id,
      text: row.text,
      imgUrl: row.imgUrl === undefined ? null : row.imgUrl,
      focus: false,
    } as ItemListRow;
  });
};
setItemList();

// ----------------------------------------------------------------------------

const valueChange = async (id: number) => {
  const before = props.data.map((row) => row);
  let temp = props.data.map((row) => row);
  if (props.data.includes(id)) {
    // console.log('valueChange off', id);
    temp = props.data.filter((row) => {
      if (row === id) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    // console.log('valueChange on', id, value);
    temp.push(id);
  }
  const ret = ListIdSort([...props.list], temp);
  emit('update:data', ret, id);
  await nextTick();
  emit('value-change', ret, before, id);
};

// ----------------------------------------------------------------------------
// [ ref ]
const inputElement = ref();
defineExpose({ el: inputElement });
const setRef = (elm: any, index: number) => {
  if (index === 0) {
    inputElement.value = elm;
    emit('ref', inputElement.value as HTMLInputElement);
  }
};

// [ focus, blur ]
interface FocusState {
  isMmousedown: boolean;
}

const focusState = reactive<FocusState>({
  isMmousedown: false,
});

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (focusState.isMmousedown) return true;
  if (itemList.value.filter((row) => row.focus === true).length !== 0) return true;
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
      emit('focus', {
        elm: inputElement.value,
        label: props.label,
        data: props.data.map((row) => row),
      });
    }, 10);
  } else {
    emit('blur', {
      elm: inputElement.value,
      label: props.label,
      data: props.data.map((row) => row),
    });
  }
});

const onFocus = (row: ItemListRow) => {
  row.focus = true;
};

const onBlur = (row: ItemListRow) => {
  setTimeout(() => {
    row.focus = false;
  }, 10);
};

// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  return !ObjectCompare(
    props.diff.map((row) => row).sort(),
    props.data.map((row) => row)
  );
});

const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  return props.tabindex;
});
// ----------------------------------------------------------------------------
// Class
const baseClass = computed(() => {
  return [
    twMerge(
      //
      'h-auto',
      props.size === 's' ? 'min-h-[44px] ' : '',
      props.size === 'm' ? 'min-h-[48px]' : '',
      props.size === 'l' ? 'min-h-[60px]' : '',
      ClassTypeToString(props.class)
    ),
  ];
});
const rowClass = computed(() => {
  return twMerge(
    //
    'flex items-center flex-wrap',
    ClassTypeToString(props.classRow)
  );
});
const colClass = computed(() => {
  return twMerge(
    //
    'min-w-[0]',
    ClassTypeToString(props.classCol)
  );
});

const itemClass = computed(() => {
  return twMerge(
    //
    'px-[6px] py-[1px]  w-full',
    ClassTypeToString(props.classItem)
  );
});

// ----------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="baseClass"
    :class-header="props.classHeader"
    :class-input="props.classInput"
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
    :require-text="tx(props.requireText).value"
    :warn="props.warn"
    :warn-time-out="props.warnTimeOut"
    :size="props.size"
    :headerless="props.headerless"
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
    <template v-if="slots['header-right']" #header-right>
      <slot name="header-right" />
    </template>
    <div class="nac-input-box" @mousedown.stop="" @mouseup.stop="">
      <div class="w-full h-full" :class="rowClass" style="background-color: transparent">
        <template v-for="(row, index) in itemList" :key="index">
          <div :class="colClass">
            <HsFcCheckBox
              :data="props.data.includes(row.id) === true"
              :label="tx(row.text).value"
              :class="itemClass"
              :class-img="props.classImg"
              :class-img-tag="props.classImgTag"
              :image="props.image"
              :img-url="row.imgUrl"
              :tabindex="tabindex === undefined ? undefined : String(tabindex)"
              :disabled="props.disabled"
              @value-change="(value) => valueChange(row.id)"
              @focus="() => onFocus(row)"
              @blur="() => onBlur(row)"
              @ref="(e) => setRef(e, index)"
            />
          </div>
        </template>
      </div>
    </div>
  </InputFrame>
</template>

<style lang="scss" scoped>
.nac-input-box {
  width: 100%;
  height: 100%;
}
</style>
