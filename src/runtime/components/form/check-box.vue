<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\check-box.vue
// ----------------------------------------------------------------------------
// CheckBox
// CheckBoxCheckBox
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { reactive, ref, watch, computed, useId, nextTick } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import type { MultiLang } from '../../utils/multi-lang';
// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsToast } from '../../composables/use-hs-toast';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// [ Components ]
import SelectImgIcon from './select-img-icon.vue';
// ----------------------------------------------------------------------------
const hsFocus = useHsFocus(useHsPinia());
const Toast = useHsToast(useHsPinia());
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  // imageObjectFit?: 'contain' | 'cover';
  // imageBorder?: string;
  image?: boolean;
  imgUrl?: string | null;
  classImg?: ClassType;
  classImgTag?: ClassType;
  classLabel?: ClassType;
  // ----------------------------------------------------------------------------
  data: boolean | null;
  diff?: boolean | null | undefined;
  tabindex?: string | undefined;
  // ----------------------------------------------------------------------------
  // 状態
  disabled?: boolean;
  // ----------------------------------------------------------------------------
  // 表示
  label?: MultiLang;
  warn?: string;
  warnTimeOut?: number;
  // ----------------------------------------------------------------------------
  // 設定
  size?: 's' | 'm' | 'l';
  // ----------------------------------------------------------------------------
  uiText?: {
    validError: {
      title: MultiLang;
    };
  };
};

const props = withDefaults(defineProps<Props>(), {
  // imageObjectFit: 'contain',
  // imageBorder: 'border-gray'
  image: false,
  imgUrl: null,
  classImg: '',
  classImgTag: '',
  classLabel: '',
  // ----------------------------------------------------------------------------
  diff: undefined,
  tabindex: undefined,
  // ----------------------------------------------------------------------------
  // 状態
  disabled: false,
  // ----------------------------------------------------------------------------
  // 表示
  label: '',
  warn: '',
  warnTimeOut: 3000,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
  uiText: () => {
    return {
      validError: {
        title: { ja: '入力値の警告', en: 'Input Value Warning' },
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
  'update:data': [value: boolean];
  'value-change': [after: boolean, before: boolean | null];
  // ----------------------------
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------

const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
// [ getCurrentInstance ]
const uid = useId();
// ----------------------------------------------------------------------------
// [ ref ]
const inputElement = ref();
defineExpose({ el: inputElement });
const setRef = (elm: any) => {
  inputElement.value = elm;
  emit('ref', elm);
};

const switchValue = () => {
  const before = props.data as boolean | null;
  if (props.disabled === true) return;

  if (props.data === true) {
    emit('update:data', false);
    nextTick(() => {
      emit('value-change', false, before);
    });
  } else {
    emit('update:data', true);
    nextTick(() => {
      emit('value-change', true, before);
    });
  }
  if (inputElement.value !== null) {
    inputElement.value.focus();
  }
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
  // console.log(JSON.stringify(focusState));
  if (props.disabled === true) return false;
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
  if (props.disabled === true) return;
  focusState.isMmousedown = true;
};
const onMouseup = () => {
  if (props.disabled === true) return;
  elmFocus();
  focusState.isMmousedown = false;
};
const onFocus = () => {
  if (props.disabled === true) return;
  focusState.isActivate = true;
  if (hsFocus.state.id !== uid) {
    hsFocus.state.id = uid;
  }
};
const onBlur = () => {
  focusState.isActivate = false;
};

// [ iconEventShowWarn ]
const iconEventShowWarn = () => {
  Toast.Warning(props.warn, props.uiText.validError.title, props.warnTimeOut);
};
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  return props.tabindex;
});
//
// ----------------------------------------------------------------------------
// Class

const baseClass = computed(() => {
  return {
    disabled: props.disabled,
    activate: computedActivate.value,
    diff: props.diff !== undefined && props.diff !== props.data && !(props.diff === null && props.data === true),
  };
});

const boxClass = computed(() => {
  return [
    twMerge(
      'border border-gray-700',
      !props.disabled ? 'cursor-pointer' : 'cursor-not-allowed',
      !props.disabled ? 'bg-white' : 'bg-gray-100',
      props.size === 's' ? 'w-[16px] h-[16px] ' : '',
      props.size === 'm' ? 'w-[18px] h-[18px] ' : '',
      props.size === 'l' ? 'w-[22px] h-[22px] ' : ''
    ),
  ];
});

const checkClass = computed(() => {
  return [
    twMerge(
      'absolute inset-0',
      'flex items-center justify-center',
      props.size === 's' ? 'text-[14px]' : '',
      props.size === 'm' ? 'text-[16px]' : '',
      props.size === 'l' ? 'text-[18px]' : '',
      props.data === true ? 'scale-100' : 'scale-0'
    ),
  ];
});
const labelClass = computed(() => {
  return [
    twMerge(
      'flex items-center gap-[2px]',
      !props.disabled ? 'cursor-pointer' : 'cursor-not-allowed',
      props.size === 's' ? 'text-[14px] ps-[6px]' : '',
      props.size === 'm' ? 'text-[16px] ps-[8px]' : '',
      props.size === 'l' ? 'text-[20px] ps-[10px]' : '',
      ClassTypeToString(props.classLabel)
    ),
  ];
});

// ----------------------------------------------------------------------------
</script>

<template>
  <div class="nac-checkbox" :class="baseClass">
    <input
      :ref="(e) => setRef(e)"
      :tabindex="tabindex"
      type="checkbox"
      class="checkbox"
      @blur="onBlur()"
      @focus="onFocus()"
    />
    <div
      class="nac-checkbox-box flex-none relative"
      :class="[boxClass, { checked: props.data === true }]"
      @click="switchValue()"
    >
      <div :class="checkClass">
        <i class="fas fa-check text-green-600"></i>
      </div>
    </div>
    <div
      class="nac-checkbox-text"
      :class="labelClass"
      @mousedown="onMousedown()"
      @mouseup="onMouseup()"
      @click="switchValue()"
    >
      <SelectImgIcon
        v-if="props.image"
        class="flex-none"
        :img-url="props.imgUrl"
        :class-img="props.classImg"
        :class-img-tag="props.classImgTag"
      />
      <div class="flex-1 min-w-[0] whitespace-pre-wrap break-words">
        {{ tx(label) }}
        <slot />
      </div>
      <span v-if="props.warn.length !== 0" class="warn flex-none" @click.stop="iconEventShowWarn()">
        <i class="fas fa-exclamation-triangle"></i>{{ props.warn }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nac-checkbox {
  display: inline-flex;
  align-items: center;

  > .checkbox {
    z-index: -1;
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .nac-checkbox-box {
    > div {
      transition: transform 100ms;
      will-change: transform;
      transform-origin: center center;
    }
  }

  .nac-checkbox-text {
    min-width: 0;
    line-height: 1em;
    .warn {
      color: rgb(190, 0, 0);
    }
  }

  &.disabled {
    cursor: default;

    &:not(.activate) {
      .nac-checkbox-box {
        box-shadow: inset 0px 0px 1px 2px #858585;
      }

      .nac-checkbox-text {
        opacity: 0.8;
      }
    }
  }

  &.diff:not(.activate):not(.disabled) {
    .nac-checkbox-box {
      box-shadow: inset 0px 0px 1px 2px #fd9831be;
    }
  }

  &.activate:not(.disabled) {
    .nac-checkbox-box {
      box-shadow: inset 0px 0px 1px 2px #0d8ee4;
    }

    .nac-checkbox-text {
      text-decoration: underline;
    }
  }
}
</style>
