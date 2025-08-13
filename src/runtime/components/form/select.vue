<script setup lang="ts" generic="IdType extends string|number">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\select.vue
// ----------------------------------------------------------------------------
// Select
// SelectSelect
----------------------------------------------------------------------------- */

// [ tailwind ]
// [ NUXT ]
import { reactive, ref, watch, computed, useId, nextTick } from "#imports";

// import { createPopper } from "@popperjs/core";

// [ utils ]
import type { ClassType } from "../../utils/class-style";
import type { SelectItem } from "../../utils/select-item";
import { useDisplayList, type DisplaySelectItem } from "../../utils/select";
import { ObjectCopy } from "../../utils/object";

import type { MultiLang } from "../../utils/multi-lang";
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
const gt = multiLang.gt;

// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  list: SelectItem<IdType>[];
  order?: boolean;
  loading?: boolean;
  nullText?: MultiLang;
  image?: boolean;
  classImg?: ClassType;
  classImgTag?: ClassType;
  nullable?: boolean;
  // ----------------------------------------------------------------------------
  data: IdType | null;
  diff?: IdType | null | undefined;
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
  size?: "s" | "m" | "l";
};

const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  order: false,
  loading: false,
  nullText: () => ({ ja: "選択してください", en: "Select..." }),
  nullable: false,
  image: false,
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
  headerless: false,
  // ----------------------------------------------------------------------------
  // 表示
  label: "",
  // 表示-副情報
  require: false,
  requireText: () => ({ ja: "必須", en: "Required" }),
  warn: "",
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: "m",
});
// ----------------------------------------------------------------------------
type EmitIdType = IdType extends string ? string : number;

// [ emit ]
type Emits = {
  ref: [element: HTMLElement];
  focus: [elm: HTMLElement];
  blur: [elm: HTMLElement];
  // ----------------------------
  "update:data": [value: EmitIdType | null];
  "value-change": [after: EmitIdType | null, before: EmitIdType | null];
  // ----------------------------
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  selectOpen: [uid: string];
  selectClose: [uid: string];
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
const displayData = ref<DisplaySelectItem<IdType> | null>(null);
watch(displayData, (v) => {
  const before = props.data;
  if (v === null) {
    if (before === null) return;
    emit("update:data", null);
    emit("value-change", null, before as any as EmitIdType | null);
    return;
  }
  if (v.id === null) {
    displayData.value = null;
    return;
  }
  if (v.id === before) return;
  emit("update:data", v.id as any as EmitIdType | null);
  emit(
    "value-change",
    v.id as any as EmitIdType | null,
    before as any as EmitIdType | null
  );
});

// ----------------------------------------------------------------------------
// 不明選択肢太陽
const unKnownSelected = ref<boolean>(false);
const unKnownData = computed(() => {
  if (props.data === null) return null;
  return {
    id: props.data,
    text: gt({
      ja: `無効な値が選択されています (ID=${props.data})`,
      en: `Invalid value selected (ID=${props.data})`,
    }),
  };
});

// ----------------------------------------------------------------------------
const isShowHidden = ref(false);
/** 選択肢に非表示アイテムが含まれているかどうか */

const pList = computed(() => {
  return ObjectCopy(props.list);
});
const includeHidden = computed(() => {
  return pList.value.filter((row) => row.hidden).length > 0;
});
// ----------------------------------------------------------------------------
/** 選択肢 */
const displayList = ref<DisplaySelectItem<IdType>[]>([]);

watch(
  () => [
    props.list,
    props.list.length,
    props.data,
    isShowHidden.value,
    props.require,
    props.nullable,
    props.nullText,
  ],
  () => {
    displayList.value = useDisplayList<IdType>({
      list: ObjectCopy(props.list).map((row) => {
        return { ...row, text: gt(row.text) };
      }),
      id: props.data,
      order: props.order,
      unKnownData: unKnownData.value,
      unKnownSelected: unKnownSelected.value,
      isShowHidden: isShowHidden.value,
      require: props.require || !props.nullable,
      nullText: tx(props.nullText).value,
    });
  },
  { immediate: true }
);
// const displayList = computed(() => {
//   console.log("displayList");
//   return useDisplayList<IdType>({
//     list: ObjectCopy(props.list).map((row) => {
//       return { ...row, text: gt(row.text) };
//     }),
//     id: props.data,
//     order: props.order,
//     unKnownData: unKnownData.value,
//     unKnownSelected: unKnownSelected.value,
//     isShowHidden: isShowHidden.value,
//     require: props.require || !props.nullable,
//     nullText: tx(props.nullText).value,
//   });
// });
// ----------------------------------------------------------------------------

const checkData = (id: IdType | null) => {
  // console.log("checkData");
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
watch(displayList, () => {
  // console.log("change list");
  nextTick(() => {
    checkData(props.data);
  });
});
// ----------------------------------------------------------------------------

// [ focus, blur ]
interface FocusState {
  isActivate: boolean;
  isOpen: boolean;
}
const focusState = reactive<FocusState>({
  isActivate: false,
  isOpen: false,
});

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (focusState.isActivate) return true;
  if (focusState.isOpen) return true;
  if (hsFocus.state.id !== uid) return false;
  return false;
});

// ----------------------------------------------------------------------------
// const isOpen = ref(false);
const onFocus = () => {
  // console.log('onFocus');
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  focusState.isActivate = true;
  hsFocus.state.id = uid;
};
const onBlur = () => {
  // console.log('onBlur');
  focusState.isActivate = false;
};
const selectOpen = () => {
  emit("selectOpen", uid);
  focusState.isOpen = true;
};
const selectClose = () => {
  // console.log('selectClose');
  focusState.isOpen = false;
  emit("selectClose", uid);
};
// const placement = ref("top");
const inputElement = ref<HTMLElement | null>(null);
// const withPopper = (dropdownList: any, component: any, { width }: any) => {
//   dropdownList.style.width = width;
//   const popper = createPopper(component.$refs.toggle, dropdownList, {
//     placement: placement.value as any,
//     modifiers: [
//       {
//         name: "offset",
//         options: {
//           offset: [0, -1],
//         },
//       },
//       {
//         name: "toggleClass",
//         enabled: true,
//         phase: "write",
//         fn({ state }) {
//           component.$el.classList.toggle("drop-up", state.placement === "top");
//         },
//       },
//     ],
//   });
//   return () => popper.destroy();
// };
//       :calculate-position="withPopper"

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="[props.class]"
    :class-header="props.classHeader"
    :class-input="['px-0', props.classInput]"
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
    <template v-if="slots['left-icons']" #left-icons>
      <slot name="left-icons" :disabled="disabled" />
    </template>
    <template v-if="slots['right-icons']" #right-icons>
      <slot name="right-icons" :disabled="disabled" />
    </template>
    <template v-if="slots.overlay" #overlay>
      <slot name="overlay"></slot>
    </template>
    <div
      v-if="displayData === null"
      class="absolute inset-0 flex items-center px-1 pointer-events-none text-[0.9em]"
      :class="[computedActivate ? 'opacity-30' : '']"
    >
      {{ tx(props.nullText) }}
    </div>
    <v-select
      ref="inputElement"
      v-model="displayData"
      label="text"
      index="id"
      append-to-body
      :options="displayList"
      :loading="props.loading"
      :clearable="!props.require && props.nullable"
      :disabled="props.disabled || props.readonly"
      :uid="uid"
      :class="[
        `size-${props.size}`,
        { disabled: props.disabled || props.readonly },
      ]"
      @open="selectOpen"
      @close="selectClose"
      @blur="onBlur()"
      @focus="onFocus()"
    >
      <!--  -->
      <!--  -->
      <template #selected-option="{ text, imgUrl, deleted, appendIcon }">
        <div
          class="flex items-baseline w-full max-w-full min-w-0"
          :class="loading ? 'opacity-0' : ''"
        >
          <SelectImgIcon
            v-if="imgUrl && props.image"
            class="flex-none"
            :class="[computedActivate ? 'opacity-40' : '']"
            :img-url="imgUrl"
            :class-img="props.classImg"
            :class-img-tag="props.classImgTag"
          />
          <div class="flex-1 truncate min-w-0">{{ text }}</div>
          <div v-if="deleted" class="text-error text-[0.7em] leading-[1em]">
            {{ tx({ ja: "削除済", en: "Deleted" }) }}
          </div>
          <!-- <div v-if="hidden" class="text-error text-[0.7em] leading-[1em]">
            {{ tx({ ja: "非表示", en: "Hidden" }) }}
          </div> -->
          <div
            v-if="appendIcon && typeof appendIcon === 'string'"
            class="flex-none"
          >
            <i :class="appendIcon"></i>
          </div>

          <div
            v-else-if="appendIcon && Array.isArray(appendIcon)"
            class="flex-none"
          >
            <i v-for="(c, i) in appendIcon" :key="i" :class="c"></i>
          </div>
        </div>
      </template>
      <template #option="{ text, imgUrl, deleted, hidden, appendIcon }">
        <div class="flex items-center">
          <SelectImgIcon
            v-if="props.image"
            class="flex-none"
            :img-url="imgUrl"
            :class-img="props.classImg"
            :class-img-tag="props.classImgTag"
          />
          <div class="flex-1 truncate">{{ text }}</div>
          <div v-if="deleted" class="text-error text-[0.7em] leading-[1em]">
            {{ tx({ ja: "削除済", en: "Deleted" }) }}
          </div>
          <div v-if="hidden" class="text-error text-[0.7em] leading-[1em]">
            {{ tx({ ja: "非表示", en: "Hidden" }) }}
          </div>
          <span v-if="appendIcon && typeof appendIcon === 'string'">
            <i :class="appendIcon"></i>
          </span>
          <span v-else-if="appendIcon && Array.isArray(appendIcon)">
            <i v-for="(c, i) in appendIcon" :key="i" :class="c"></i>
          </span>
        </div>
      </template>
      <template v-if="includeHidden" #list-footer>
        <li class="vs__dropdown-option v-select-hidden-toggle-switch">
          <Btn
            theme="accent1"
            variant="outlined"
            class="w-full"
            size="xs"
            @click="isShowHidden = !isShowHidden"
          >
            <span class="me-1">Hidden options</span>
            <i
              class="fas"
              :class="[
                !isShowHidden
                  ? 'fa-eye-slash text-error'
                  : 'fa-eye text-success',
              ]"
            ></i>
            <i class="fas fa-caret-right mx-1"></i>
            <i
              class="fas"
              :class="[
                isShowHidden
                  ? 'fa-eye-slash text-error'
                  : 'fa-eye text-success',
              ]"
            ></i>
          </Btn>
        </li>
      </template>
    </v-select>
  </InputFrame>
</template>

<style lang="scss">
.v-select {
  > div {
    border-width: 0 !important;
  }
  &:not(.vs--open).vs--single.vs--searchable .vs__selected {
    width: 100%;
  }
  &.vs--open.vs--single.vs--searchable .vs__selected {
    width: calc(100% - 0.5em);
  }
  .vs__selected {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    flex: 1 1 auto;
  }
  .vs__selected,
  .vs__selected-options {
    max-width: 100%;
    min-width: 0;
  }
  .vs__search {
    margin: 0 !important;
  }
  .vs__clear {
    padding: 3px;
    border: solid 1px transparent;
    transition: border-color 300ms;
    border-radius: 3px;
    &:focus {
      // border: solid 1px rgb(38, 38, 217);
      box-shadow: inset 0px 0px 1px 2px #0d8ee4;
    }
  }
  .vs__dropdown-toggle {
    background-color: transparent;
  }
  &.size-s {
    .vs__dropdown-toggle {
      padding-bottom: 0 !important;
      height: 24px !important;
    }
    .vs__spinner {
      width: 3.5em;
      height: 3.5em;
    }
  }
  &.size-m {
    .vs__dropdown-toggle {
      padding-bottom: 0 !important;
      height: 26px !important;
    }
    .vs__spinner {
      width: 4em;
      height: 4em;
    }
  }
  &.disabled {
    .vs__search,
    .vs__dropdown-toggle,
    .vs__open-indicator {
      background-color: transparent !important;
    }
    .vs__clear {
      display: none;
    }
  }
}
.vs__dropdown-menu {
  //
  max-height: 250px;
}
// 表示非表示の要素
.v-select-hidden-toggle-switch {
  pointer-events: all !important;
}
</style>
