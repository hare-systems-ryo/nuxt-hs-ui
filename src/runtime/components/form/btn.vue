<script lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\btn.vue
// ----------------------------------------------------------------------------
// Btn
// BtnBtn
---------------------------------------------------------------------------- */

// [ utils ]
import { tv } from '../../utils/tv';
import { Theme } from '../../utils/theme';
import { ObjectKeyToMap } from '../../utils/object';
// ----------------------------------------------------------------------------
const buttonTv = tv({
  slots: {
    base: [
      //
      'relative',
      `inline-flex items-center`,
      `rounded`,
      'touch-manipulation	',
      `min-w-0 overflow-hidden`,
    ],
    indicator: [
      'pointer-events-none',
      `absolute transition-all`,
      `border rounded`,
      `hover:opacity-60`,
      'border-[1px] inset-[-2px] rounded',
    ],
    overlay: [
      'pointer-events-none',
      'will-change-transform',
      `absolute inset-0`,
      'bg-white',
      'transition-[opacity_100ms_ease]',
      // "z-10",
      'opacity-0',
    ],
    body: [
      //
      'min-w-0 flex-1',
      'pointer-events-none',
      'select-none',
    ],
  },
  variants: {
    size: {
      xs: { base: ['text-[14px] leading-[1.4em] min-h-[32px]'] },
      s: { base: ['text-[14px] leading-[1.5em]  min-h-[44px]'] },
      m: { base: ['text-[16px] leading-[1.5em]  min-h-[48px]'] },
      l: { base: ['text-[1.2rem] leading-[1.6em]  min-h-[60px]'] },
      xl: { base: ['text-[1.4rem]  leading-[1.6em]  min-h-[70px]'] },
    },
    textAlign: {
      left: {
        base: 'justify-start',
        body: 'text-left	',
      },
      center: {
        base: 'justify-center',
        body: 'text-center',
      },
      right: {
        base: 'justify-end',
        body: 'text-end',
      },
    },
    wrap: {
      true: {
        body: 'text-wrap whitespace-pre-wrap	text-ellipsis overflow-hidden',
      },
      false: { body: 'truncate' },
    },
    disabled: {
      true: {
        base: 'cursor-default',
        // overlay: "opacity-40",
      },
      false: {
        base: 'cursor-pointer',
      },
    },
    flash: {
      true: '',
      false: '',
    },
    focus: {
      true: '',
      false: '',
    },
    hover: {
      true: '',
      false: '',
    },
    variant: {
      outlined: {
        base: 'py-1 px-2 border-[2px]',
        indicator: 'hover:border-[2px] ',
      },
      flat: {
        base: 'py-1 px-2 border',
        indicator: 'hover:border-[2px] ',
      },
      text: {
        base: 'border-0 min-h-0 h-auto no-underline',
        indicator: 'border-0',
      },
    },
    theme: ObjectKeyToMap(Theme, ''),
  },
  defaultVariants: {
    size: 'm',
    variant: 'outlined',
    theme: 'accent1',
    textAlign: 'center',
  },
  compoundVariants: [
    {
      flash: true,
      disabled: false,
      class: {
        overlay: 'opacity-40',
      },
    },
    {
      flash: false,
      disabled: false,
      class: {
        overlay: 'opacity-0',
      },
    },

    {
      variant: 'text',
      disabled: false,
      class: {
        base: 'hover:underline',
      },
    },
    {
      variant: ['outlined', 'flat'],
      focus: true,
      hover: [true, false],
      disabled: false,
      class: {
        indicator: ' border-[3px] inset-[2px] rounded opacity-50',
      },
    },
    {
      variant: ['outlined', 'flat'],
      focus: false,
      hover: true,
      disabled: false,
      class: {
        indicator: 'border-[2px] inset-[2px] rounded',
      },
    },
    {
      variant: ['text'],
      focus: true,
      hover: [false],
      disabled: false,
      class: {
        base: 'underline decoration-dotted',
        indicator: '',
        overlay: 'opacity-0',
      },
    },
    ...Object.keys(Theme).map((theme) => {
      return {
        theme: theme,
        variant: 'flat',
        class: {
          base: [
            `bg-[var(--main-color)] border-[var(--main-color)]`,
            ['back', 'white', 'warn'].includes(theme) ? `text-black ` : 'text-white ',
          ],
          indicator: ['back', 'white'].includes(theme) ? `border-gray-500` : 'border-white',
        },
      } as any;
    }),
    ...Object.keys(Theme).map((theme) => {
      return {
        theme: theme,
        variant: 'outlined',
        class: {
          base: ['bg-transparent', `text-[var(--main-color)] border-[var(--main-color)]`],
          indicator: ['border-current'],
        },
      } as any;
    }),
    ...Object.keys(Theme).map((theme) => {
      return {
        theme: theme,
        variant: 'text',
        class: {
          base: ['bg-transparent', `text-[var(--main-color)]`],
          indicator: [],
        },
      } as any;
    }),
    // disable
    {
      flash: [false, true],
      variant: ['flat'],
      disabled: true,
      class: {
        base: '',
        overlay: 'opacity-50 ',
      },
    },
    {
      flash: [false, true],
      variant: ['outlined'],
      disabled: true,
      class: {
        base: ['bg-transparent', `text-[var(--main-color)] border-[var(--main-color-opacity-50)]`],
        overlay: 'opacity-50 ',
      },
    },
    {
      flash: [false, true],
      variant: ['text'],
      disabled: true,
      class: {
        base: 'text-[var(--main-color-opacity-50)] ',
      },
    },
  ],
});
</script>
<script setup lang="ts">
// ----------------------------------------------------------------------------
// [ vueuse ]
import { useElementHover } from '@vueuse/core';
// [ NUXT ]
import { ref, computed, useId } from '#imports';
// [ utils ]
import { Dayjs } from '../../utils/dayjs';
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
// import { GetGolorCode } from '../../utils/theme';
import { Sleep } from '../../utils/com';
import { type ThemeColor, GetColorCode } from '../../utils/theme';
// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsPinia } from '../../composables/use-pinia';

import BtnLineLoading from './btn-line-loading.vue';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType;
  classInner?: ClassType;
  classOverlay?: ClassType;
  disabled?: boolean;
  to?: string;
  theme?: ThemeColor;
  variant?: 'outlined' | 'flat' | 'text';
  textWrap?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  loading?: boolean;
  noneFocusLine?: boolean;
  wrap?: boolean;
  // ----------------------------------------------------------------------------
  // 設定
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  classInner: '',
  classOverlay: '',
  to: undefined,
  theme: 'accent1',
  variant: 'outlined',
  disabled: false,
  textWrap: false,
  align: 'center',
  loading: false,
  textAlign: 'center',
  noneFocusLine: false,
  wrap: false,
  // ----------------------------------------------------------------------------
  // 設定
  size: 'm',
});

type InputFocusEventArg = {
  elm: HTMLElement;
  id: string;
};
type Emits = {
  id: [id: string];
  ref: [element: HTMLElement];
  focus: [e: InputFocusEventArg];
  blur: [e: InputFocusEventArg];
  click: [e: Event];
};
const onClick = (e: Event) => {
  if (disabled.value) return;
  emit('click', e);
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
const fcFocus = useHsFocus(useHsPinia());

const uid = useId();
emit('id', uid);
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const styleMain = computed(() => {
  return [
    //
    `--main-color:${GetColorCode(props.theme)};`,
    `--main-color-opacity-50:${GetColorCode(props.theme)}88;`,
    `--sub-color:${GetColorCode(props.theme)};`,
  ];
});

const classStyle = computed(() => {
  return btnTvBase.value;
});

// ----------------------------------------------------------------------------
//  disabled
const disabled = computed(() => {
  if (props.disabled) return true;
  if (props.loading) return true;
  return false;
});

// ----------------------------------------------------------------------------

// [ focus, blur ]
const isActivate = ref(false);

/** コントロールのFocus判定 */
const computedActivate = computed(() => {
  if (disabled.value) return;
  if (fcFocus.state.id !== uid) return false;
  if (isActivate.value) return true;
  // if (flashState.value) return true;
  return false;
});

//  focus, blur Event
const imputElm = ref<HTMLElement | null>(null);
defineExpose({ el: imputElm });
const setRef = (e: any) => {
  imputElm.value = e;
  emit('ref', e);
};
const onFocus = () => {
  // console.log("onFocus");
  if (disabled.value) return;
  isActivate.value = true;
  fcFocus.state.id = uid;
  const elm = imputElm.value;
  if (elm === null) return;
  emit('focus', { elm: elm, id: uid });
};
const onBlur = () => {
  // console.log("onBlur");
  isActivate.value = false;
  if (fcFocus.state.id === uid) {
    fcFocus.state.id = '';
  }
  if (disabled.value) return;
  const elm = imputElm.value;
  if (elm === null) return;
  emit('blur', { elm: elm, id: uid });
};

// ----------------------------------------------------------------------------

const isHovered = useElementHover(imputElm);

// ----------------------------------------------------------------------------
const flash = ref(false);
const pushOnTs = ref('');
const pushOn = async (e: any) => {
  if (imputElm.value === null) return;
  if (disabled.value) return;
  const ts = Dayjs().format('');
  pushOnTs.value = ts;
  flash.value = true;
  await Sleep(10000);
  if (pushOnTs.value === ts) {
    flash.value = false;
  }
};

const pushOff = () => {
  flash.value = false;
  // isActivate.value = false;
  if (props.disabled) return true;
};

// ----------------------------------------------------------------------------

const ui = computed(() => {
  return buttonTv({
    size: props.size,
    variant: props.variant,
    theme: props.theme,
    wrap: props.wrap,
    textAlign: props.textAlign,
    focus: computedActivate.value,
    flash: flash.value,
    hover: isHovered.value,
    disabled: disabled.value,
  });
});

const btnTvBase = computed(() => {
  return ui.value.base({
    class: ClassTypeToString(props.class),
  });
});

const btnTvIndicator = computed(() => {
  return ui.value.indicator({});
});

const btnTvBody = computed(() => {
  return ui.value.body({
    class: ClassTypeToString(props.classInner),
  });
});

const btnTvOverlay = computed(() => {
  return ui.value.overlay({
    class: ClassTypeToString(props.classOverlay),
  });
});

// ----------------------------------------------------------------------------
</script>

<template>
  <button
    v-if="props.to === undefined"
    :ref="(e:any) => setRef(e)"
    type="button"
    :class="btnTvBase"
    :style="styleMain"
    :disabled="disabled"
    @focus="onFocus()"
    @blur="onBlur()"
    @mousedown="pushOn"
    @mouseup="pushOff"
    @mouseend="pushOff"
    @touchstart="pushOn"
    @touchend="pushOff"
    @touchcancel="pushOff"
    @keydown.enter="pushOn"
    @keyup.enter="pushOff"
    @click="onClick"
    @keydown.enter.prevent.stop="onClick"
  >
    <div :class="btnTvIndicator"></div>
    <div :class="btnTvBody">
      <slot />
    </div>
    <div :class="btnTvOverlay"></div>
    <BtnLineLoading class="Btn--loading" :show="props.loading" />
  </button>
  <NuxtLink
    v-else
    :ref="(e:any) => setRef(e)"
    :to="disabled ? undefined : props.to"
    :class="classStyle"
    :style="styleMain"
    :disabled="disabled"
    ontouchstart=""
    @focus="onFocus()"
    @blur="onBlur()"
    @mousedown="pushOn"
    @mouseup="pushOff"
    @mouseend="pushOff"
    @touchstart="pushOn"
    @touchend="pushOff"
    @touchcancel="pushOff"
    @keydown.enter="pushOn"
    @keyup.enter="pushOff"
    @click="onClick"
    @keydown.enter.prevent.stop="onClick"
  >
    <div :class="btnTvIndicator"></div>
    <div :class="btnTvOverlay"></div>
    <div :class="btnTvBody">
      <slot />
    </div>
    <BtnLineLoading class="Btn--loading" :show="props.loading" />
  </NuxtLink>
</template>
