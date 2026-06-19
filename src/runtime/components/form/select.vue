<script setup lang="ts" generic="IdType extends string|number">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\select.vue
// ----------------------------------------------------------------------------
// Select
// SelectSelect
---------------------------------------------------------------------------- */

// [ NUXT ]

import {
  reactive,
  ref, //
  watch,
  computed,
  useId,
  defineShortcuts,
  nextTick,
  onMounted,
  useTemplateRef,
} from '#imports';

// [ utils ]
import type { ClassType } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
import type { SelectItem } from '../../utils/select-item';
import { ObjectCopy } from '../../utils/object';
import { type ModalControl, InitModalControl, InitModals } from '../../utils/modal';

// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsPinia } from '../../composables/use-pinia';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsScrollLock } from '../../composables/use-hs-scroll-lock';
import { useHsMisc } from '../../composables/use-hs-misc';

// [ Components ]
import InputFrame from './input-frame.vue';
import Btn from '../form/btn.vue';
import SelectHiddenItemToggle from './_select/hidden-item-toggle.vue';
import { useHsIsMobile } from '../../composables/use-hs-is-mobile';
import TextBox from '../form/text-box.vue';
import SelectItemContainer from './_select/item-container.vue';
import ViewSelectItemRow from './_select/item-row.vue';

// ----------------------------------------------------------------------------

type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  list: SelectItem<IdType>[];
  order?: boolean;
  loading?: boolean;
  nullText?: MultiLang;
  unknownText?: MultiLang;
  img?: boolean;
  imgMode?: 'cover' | 'contain';
  classImg?: ClassType;
  classImgTag?: ClassType;
  nullable?: boolean;
  searchable?: boolean;
  // ----------------------------------------------------------------------------
  class?: ClassType;
  classHeader?: ClassType;
  classInput?: ClassType;
  // ----------------------------------------------------------------------------
  data: IdType | null;
  diff?: IdType | null | undefined;
  tabindex?: string | undefined;
  // ----------------------------------------------------------------------------
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
};
const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  order: false,
  loading: false,
  nullText: () => ({ ja: '選択してください', en: 'Select...' }),
  unknownText: () => ({
    ja: '無効な選択が設定されています',
    en: 'An invalid selection has been made',
  }),
  nullable: false,
  image: false,
  classImg: '',
  classImgTag: '',
  diff: undefined,
  tabindex: undefined,
  imgMode: 'contain',
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
  // 表示-副情報
  require: false,
  requireText: () => ({ ja: '必須', en: 'Required' }),
  warn: '',
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
});

// [ emit ]
type Emits = {
  // ----------------------------
  'update:data': [value: IdType | null];
  'value-change': [after: IdType | null, before: IdType | null];
  focus: [];
  blur: [];
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
type ListRow = SelectItem<IdType> & {
  _key: string;
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
const gt = multiLang.gt;
const hsFocus = useHsFocus(useHsPinia());
const hsIsMobile = useHsIsMobile(useHsPinia());
const hsMisc = useHsMisc(useHsPinia());
onMounted(() => {
  hsIsMobile.init();
});
// ----------------------------------------------------------------------------
const uid = useId();
const inputFrameElm = ref();
const searchWord = ref('');
// ----------------------------------------------------------------------------
const selectOpen = ref(false);
const openToggle = () => {
  if (selectOpen.value || modal.sp.isShow) {
    selectOpen.value = false;
    modal.sp.close();
    return;
  }
  if (props.disabled) return;
  if (props.readonly) return;
  if (props.searchable && hsIsMobile.isMobile) {
    modal.sp.show();
  } else {
    selectOpen.value = true;
  }
};
// ----------------------------------------------------------------------------

const lock = computed(() => {
  return props.disabled || props.readonly;
});

const activeValue = ref<any | null>(props.data);
watch(
  () => props.data,
  () => {
    activeValue.value = props.data;
  }
);
// ----------------------------------------------------------------------------
let versionCounter = 0;
const nullItem = computed(() => {
  return { id: null, text: props.nullText } as any;
});
const listBase = computed<ListRow[]>(() => {
  versionCounter++;
  const ret = ObjectCopy(
    props.list.map((row) => {
      return {
        ...row,
        text: gt(row.text) || '',
        _key: `${row.id}:${versionCounter ?? 0}`,
      };
    })
  );
  if (props.nullable) {
    ret.unshift(nullItem.value);
  }
  return ret;
});
const hasLabel = computed(() => {
  return !!props.list.find((row) => !!row.groupId);
});

const activeRow = computed(() => {
  return listBase.value.find((row) => row.id === activeValue.value) || null;
});
const diffDisplayText = computed(() => {
  if (!props.diff) return '';
  const data = listBase.value.find((row) => row.id === props.diff) || null;
  if (!data) return props.nullText;
  return tx(data.text).value;
});

const hiddenItemVisible = ref(false);
const hasHiddenItem = computed(() => {
  return (
    props.list.filter((row) => {
      if (row.deleted) return false;
      if (row.hidden) return true;
      return false;
    }).length !== 0
  );
});

const updateData = (value: IdType | null) => {
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  const before = props.data;
  if (!value) {
    if (!props.nullable) return;
    emit('update:data', value as null);
    emit('value-change', value, before);
    return;
  }
  emit('update:data', value as IdType);
  emit('value-change', value, before);
};

const displayList = computed(() => {
  const ret = listBase.value
    .filter((row) => {
      if (row.id === props.data) return true;
      if (row.deleted) return false;
      if (!hiddenItemVisible.value && row.hidden) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.order === undefined || b.order === undefined) return 0;
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  return ret;
});

// ----------------------------------------------------------------------------
// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff !== props.data) return true;
  return false;
});

// [ focus, blur ]
interface FocusState {
  isActivate: boolean;
  openActual: boolean;
}
const focusState = reactive<FocusState>({
  isActivate: false,
  openActual: false,
});

// const isOpen = ref(false);
const onFocus = () => {
  // console.log('onFocus');
  if (props.disabled === true) return;
  if (props.readonly === true) return;
  focusState.isActivate = true;
  if (hsFocus.state.id !== uid) {
    hsFocus.state.id = uid;
  }
};
const onBlur = () => {
  // console.log('onBlur');
  focusState.isActivate = false;
};
const focusId = computed(() => hsFocus.state.id);
watch(focusId, () => {
  if (hsFocus.state.id !== uid) {
    focusState.openActual = false;
    selectOpen.value = false;
  }
});

watch(selectOpen, (v) => {
  if (!v) {
    setTimeout(() => {
      // if (!focusState.isActivate) {
      focusState.openActual = false;
      // }
    }, 300);
    // focusState.openActual = false;
  } else {
    focusState.openActual = true;
    if (hsFocus.state.id !== uid) {
      hsFocus.state.id = uid;
    }
  }
  //
});
defineShortcuts({
  delete: {
    // 入力フォーカス中でも発火させたいなら true（環境によっては省略でOK）
    usingInput: false,
    handler: (e) => {
      if (selectOpen.value) return; // メニュー展開中は無視（検索入力と競合するため）
      if (!focusState.isActivate) return; // 対象以外のコントロールのデリートイベントは無視
      e.preventDefault();
      updateData(null); // 未選択化（undefined でも可）
    },
  },
  backspace: {
    usingInput: false,
    handler: (e) => {
      if (selectOpen.value) return; // メニュー展開中は無視（検索入力と競合するため）
      if (!focusState.isActivate) return; // 対象以外のコントロールのデリートイベントは無視
      e.preventDefault();
      updateData(null); // 未選択化（undefined でも可）
    },
  },
  enter: {
    usingInput: false,
    handler: () => {
      if (selectOpen.value) return; // メニュー展開中は無視（検索入力と競合するため）
      if (!focusState.isActivate) return; // 対象以外のコントロールのデリートイベントは無視
      selectOpen.value = !selectOpen.value;
    },
  },
});

// ----------------------------------------------------------------------------
const content = {
  disableOutsidePointerEvents: true,
  bodyLock: false,
};
const uiBase = [
  '!bg-transparent hover:bg-transparent',
  'max-w-full text-left',
  'focus-visible:outline-none  focus:outline-none ring-0 focus:ring-0',
  'py-0 pr-[10px]',
  'focus-visible:ring-0 ',
];
// ----------------------------------------------------------------------------
interface Modal {
  sp: ModalControl;
}
const modal = reactive<Modal>({
  sp: InitModalControl(),
});
onMounted(() => InitModals(modal, nextTick));
const modalSpScrollTop = () => {
  if (!modalSpScrollTopTarget.value) return;
  modalSpScrollTopTarget.value?.scrollIntoView();
};
modal.sp.showBefore = async () => {
  if (!activeValue.value) return modalSpScrollTop();
  // await Sleep(300);
  const target = spFilterList.value.find((row) => row.id === activeValue.value);
  // console.log('showAfter', target);
  if (target === undefined || !target.html) return modalSpScrollTop();
  target.html.scrollIntoView();
};
const modalSpScrollTopTarget = useTemplateRef<HTMLElement>('modalSpScrollTopTarget');
const scrollLock = useHsScrollLock();
const modalElm = useTemplateRef<HTMLElement>('modalElm');
watch(modalElm, (elm) => {
  if (elm !== null) scrollLock.init(elm);
});
watch(
  () => modal.sp.isShow,
  (v) => {
    if (v) {
      scrollLock.lock();
    } else {
      scrollLock.unlock();
    }
  }
);
const showSpModal = () => {
  if (props.disabled) return;
  if (props.readonly) return;
  modal.sp.show();
};
const norm = (s: any) => {
  return s.normalize('NFKC');
};

const spFilterList = computed<(ListRow & { html: null | HTMLElement })[]>(() => {
  return displayList.value
    .filter((row) => {
      if (!searchWord.value) return true;
      if (norm(row.text).toLocaleLowerCase().includes(norm(searchWord.value).toLocaleLowerCase())) {
        return true;
      }
      return false;
    })
    .map((row) => {
      return {
        ...row,
        html: null,
      };
    });
});

// ----------------------------------------------------------------------------

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (selectOpen.value) return true;
  if (modal.sp.isShow) return true;
  if (hsFocus.state.id !== uid) return false;
  if (focusState.openActual) return true;
  if (focusState.isActivate) return true;
  return false;
});
/**
 * focus, blur イベント
 */
watch(computedActivate, (value) => {
  if (value === true) {
    setTimeout(() => {
      emit('focus');
    }, 10);
  } else {
    emit('blur');
  }
});

// ----------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="['HsSelect', props.class]"
    :class-header="props.classHeader"
    :class-input="[' px-0 flex items-center flex-1', props.classInput]"
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
    @focusin="onFocus"
    @focusout="onBlur"
    @ref="(e) => (inputFrameElm = e)"
    @click="openToggle()"
  >
    <template #overlay="{ focus, change }">
      <div
        v-if="props.diff !== undefined && change"
        class="absolute inset-0 bg-red/30 transition-opacity flex items-center p-1 bg-dark/20 overflow-hidden"
        :class="!focus && hsMisc.capsLockState ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'"
      >
        <div class="flex items-center w-full h-full py-1" @mousedown.prevent @click.prevent>
          <Btn
            variant="outlined"
            theme="error"
            tabindex="-1"
            size="xs"
            class="bg-white flex-none"
            @click.stop="updateData(props.diff)"
          >
            <i class="fa-solid fa-rotate-right"></i>
          </Btn>
          <div v-if="props.diff" class="px-1 mx-1 flex-1 select-none truncate bg-white" @click.stop>
            {{ diffDisplayText }}
          </div>
        </div>
      </div>
      <template v-if="slots.overlay">
        <slot name="overlay" :focus="focus" :change="change"></slot>
      </template>
    </template>
    <template v-if="slots['left-icons']" #left-icons>
      <slot name="left-icons" :disabled="disabled" />
    </template>
    <template #right-icons>
      <Btn
        v-if="!lock && props.nullable && props.data !== null"
        variant="text"
        theme="error"
        tabindex="-1"
        class="text-error w-[1.4em] hover:bg-accent1/10 mr-1"
        @click.stop="updateData(null)"
      >
        <i class="fa-solid fa-xmark"></i>
      </Btn>
      <Btn
        v-if="!lock"
        variant="text"
        theme="accent1"
        tabindex="-1"
        class="text-accent1 w-[1.4em] hover:bg-accent1/10 mr-1"
        @click.stop="openToggle()"
      >
        <i class="fa-solid fa-chevron-down transition-all" :class="[selectOpen ? 'rotate-x-180' : '']"></i>
      </Btn>
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
    <template #default>
      <template v-if="!props.searchable">
        <USelect
          v-model:open="selectOpen"
          :model-value="activeValue"
          :items="displayList"
          value-key="id"
          label-key="text"
          class="w-full"
          :trailing="false"
          trailing-icon=""
          :ui="{
            base: uiBase,
            item: ['!bg-white hover:!bg-white focus:bg-white active:bg-white p-0'],
          }"
          :content="{
            reference: inputFrameElm,
            ...content,
          }"
          :disabled="lock"
          :close-on-select="false"
          @update:model-value="(v:any) => updateData(v)"
        >
          <template #default>
            <div
              class="flex items-center w-full"
              :class="[
                props.disabled ? 'cursor-not-allowed' : '', //
                props.readonly ? 'cursor-text' : '', //
                !lock ? 'cursor-pointer' : '', //
              ]"
              @click.stop="openToggle()"
            >
              <template v-if="activeRow">
                <SelectItemContainer
                  :item="activeRow"
                  :value="activeValue"
                  :img="props.img"
                  :activated="props.img"
                  :class-img="props.classImg"
                  :class-img-tag="props.classImgTag"
                  :img-mode="props.imgMode"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  :overflow="false"
                  type="display"
                />
              </template>
              <template v-else-if="!!props.data">
                <div class="min-w-0 truncate flex-1 text-[1rem]" :class="[!props.disabled ? 'text-error' : '']">
                  {{ tx(props.unknownText) }}
                </div>
              </template>
              <template v-else>
                <div class="min-w-0 truncate flex-1 text-[1rem]" :class="[!props.disabled ? 'text-gray-700' : '']">
                  {{ tx(props.nullText) }}
                </div>
              </template>
            </div>
          </template>
          <template #trailing>
            <div></div>
          </template>
          <template #item="{ item, index }">
            <ViewSelectItemRow
              :list="displayList"
              :item="item"
              :index="index"
              :active-id="activeValue"
              :has-label="hasLabel"
              :img="props.img"
              :class-img="props.classImg"
              :class-img-tag="props.classImgTag"
              :img-mode="props.imgMode"
              :disabled="props.disabled"
              :readonly="props.readonly"
            />
          </template>
          <template v-if="hasHiddenItem" #content-bottom>
            <div class="p-1">
              <SelectHiddenItemToggle v-model:hidden-item-visible="hiddenItemVisible" />
            </div>
          </template>
        </USelect>
      </template>
      <template v-else-if="props.searchable && !hsIsMobile.isMobile">
        <USelectMenu
          v-model:serach-term="searchWord"
          v-model:open="selectOpen"
          :model-value="activeValue"
          :items="displayList"
          value-key="id"
          label-key="text"
          class="w-full"
          :trailing="false"
          trailing-icon=""
          :ui="{
            base: uiBase,
            item: ['!bg-white hover:!bg-white focus:bg-white active:bg-white p-0'],
          }"
          :content="{
            reference: inputFrameElm,
            ...content,
          }"
          :disabled="lock"
          :close-on-select="false"
          @update:model-value="(v:any) => updateData(v)"
        >
          <template #default>
            <div
              :key="activeRow?._key || 'null-' + '_base'"
              class="flex items-center w-full"
              :class="[
                props.disabled ? 'cursor-not-allowed' : '', //
                props.readonly ? 'cursor-text' : '', //
                !lock ? 'cursor-pointer' : '', //
              ]"
              @click.stop="openToggle()"
            >
              <template v-if="activeRow">
                <SelectItemContainer
                  :item="activeRow"
                  :value="activeValue"
                  :img="props.img"
                  :activated="props.img"
                  :class-img="props.classImg"
                  :class-img-tag="props.classImgTag"
                  :img-mode="props.imgMode"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  :overflow="false"
                  type="display"
                />
              </template>
              <template v-else-if="!!props.data">
                <div class="min-w-0 truncate flex-1 text-[1rem]" :class="[!props.disabled ? 'text-error' : '']">
                  {{ tx(props.unknownText) }}
                </div>
              </template>
              <template v-else>
                <div class="min-w-0 truncate flex-1" :class="[!props.disabled ? 'text-gray-700' : '']">
                  {{ tx(props.nullText) }}
                </div>
              </template>
            </div>
          </template>
          <template #trailing>
            <div></div>
          </template>
          <template #item="{ item, index }">
            <ViewSelectItemRow
              :key="item.id"
              :list="displayList"
              :item="item"
              :index="index"
              :active-id="activeValue"
              :has-label="hasLabel"
              :img="props.img"
              :class-img="props.classImg"
              :class-img-tag="props.classImgTag"
              :img-mode="props.imgMode"
              :disabled="props.disabled"
              :readonly="props.readonly"
            />
          </template>
          <template v-if="hasHiddenItem" #content-bottom>
            <div class="p-1">
              <SelectHiddenItemToggle v-model:hidden-item-visible="hiddenItemVisible" />
            </div>
          </template>
        </USelectMenu>
      </template>
      <template v-else>
        <div
          :key="activeRow?._key || 'null-' + '_base'"
          class="flex items-center w-full px-2.5 text-neutral-900"
          :class="[
            props.disabled ? 'cursor-not-allowed' : '', //
            props.readonly ? 'cursor-text' : '', //
            !lock ? 'cursor-pointer' : '', //
          ]"
          @click.stop="showSpModal()"
        >
          <template v-if="activeRow">
            <SelectItemContainer
              :item="activeRow"
              :value="activeValue"
              :img="props.img"
              :activated="props.img"
              :class-img="props.classImg"
              :class-img-tag="props.classImgTag"
              :img-mode="props.imgMode"
              :disabled="props.disabled"
              :readonly="props.readonly"
              type="display"
            />
          </template>
          <template v-else-if="!!props.data">
            <div class="min-w-0 truncate flex-1 text-[1rem]" :class="[!props.disabled ? 'text-error' : '']">
              {{ tx(props.unknownText) }}
            </div>
          </template>
          <template v-else>
            <div class="min-w-0 truncate flex-1" :class="[!props.disabled ? 'text-gray-700' : '']">
              {{ tx(props.nullText) }}
            </div>
          </template>
        </div>
        <Modal
          :show="modal.sp.isShow"
          closeable
          @close="
            modal.sp.close();
            selectOpen = false;
          "
        >
          <Card ref="modalElm" class="HsSelectModal w-full max-w-125 max-h-full">
            <CardItem variant="header" size="s" cross @update:open="modal.sp.close()">
              <div>
                {{ tx(props.label || { ja: '選択', en: 'Please Select' }) }}
              </div>
            </CardItem>
            <CardItem variant="body">
              <div class="text-[14px] text-gray-600 leading-[1em] mb-1">{{ tx({ ja: '検索', en: 'Search' }) }}</div>
              <TextBox v-model:data="searchWord" size="m" />
            </CardItem>
            <CardItem variant="body">
              <div class="h-px w-full bg-main0/50"></div>
            </CardItem>
            <CardItem variant="body" scroll>
              <div ref="modalSpScrollTopTarget" class="grid gap-1">
                <template v-for="(row, index) in spFilterList" :key="index">
                  <div
                    v-if="
                      row.groupId !== undefined && (index === 0 || spFilterList[index - 1]?.groupId !== row.groupId)
                    "
                    class="mt-1 py-1 px-2 font-semibold bg-dark/5 border-dark/40 border"
                    :class="index !== 0 ? 'mt-2' : ''"
                  >
                    {{ tx(row.groupLabel ?? '') }}
                  </div>
                  <div
                    :ref="(e:any) => (row.html = e)"
                    class="cursor-pointerw-full text-neutral-900 border rounded bg-white overflow-hidden"
                    :class="[
                      row.id === activeValue ? 'border-accent1' : 'border-black/20',
                      row.id !== null && hasLabel ? 'ml-2' : '',
                    ]"
                    @click="
                      updateData(row.id);
                      modal.sp.close();
                    "
                  >
                    <div class="flex items-center active:bg-accent1/10 p-3">
                      <SelectItemContainer
                        :item="row"
                        :value="activeValue"
                        :img="props.img"
                        :activated="props.img"
                        :class-img="props.classImg"
                        :class-img-tag="props.classImgTag"
                        :img-mode="props.imgMode"
                        :disabled="props.disabled"
                        :readonly="props.readonly"
                        type="item"
                      />
                    </div>
                  </div>
                </template>
                <div
                  v-if="listBase.length !== 0 && spFilterList.length === 0"
                  class="text-error whitespace-pre-line text-center"
                >
                  {{
                    tx({
                      ja: '検索条件に一致する結果は見つかりませんでした。\n他のキーワードでお試しください。',
                      en: 'No results matched your search. \nPlease try different keywords.',
                    })
                  }}
                </div>
                <div v-else-if="listBase.length === 0" class="text-error text-center">
                  {{
                    tx({
                      ja: '利用可能な選択肢がありません',
                      en: 'No selectable options',
                    })
                  }}
                </div>
              </div>
            </CardItem>
            <CardItem variant="body" class="pt-1 bg-back">
              <SelectHiddenItemToggle v-if="hasHiddenItem" v-model:hidden-item-visible="hiddenItemVisible" />
            </CardItem>
          </Card>
        </Modal>
      </template>
    </template>
  </InputFrame>
</template>

<style lang="scss">
.HsSelect {
  .icons {
    > * {
      height: auto;
      height: calc(100% - 6px);
      max-height: calc(100% - 6px);
      min-height: 0;
      min-width: 0;
    }
    > *:after {
      display: none;
    }
  }
}
.HsSelectItem:not(.active):hover {
  background-color: var(--color-bg);
}

[data-highlighted] .HsSelectItem:hover {
  background-color: var(--color-bg);
}
[data-highlighted] .HsSelectItem:not(:hover) {
  background-color: var(--color-bg);
}
[data-reka-popper-content-wrapper] > [data-dismissable-layer] {
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.58));
}
[data-reka-popper-content-wrapper] > [data-dismissable-layer] > span > svg {
  fill: white;
}
</style>
