<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\dialog.vue
// ----------------------------------------------------------------------------
// Dialog
// DialogDialog
---------------------------------------------------------------------------- */

// [ tailwind ]
// import { twMerge } from 'tailwind-merge';

// ----------------------------------------------------------------------------

// import { type ClassType, ClassTypeToString } from '~/components/lib/class-style';
// import { TailwindPrefix } from '~/components/hs/setting';
// ----------------------------------------------------------------------------

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// [ NUXT ]
import { computed, ref, watch, nextTick } from '#imports';
// [ types ]
import { DialogDefaultZIndex } from '../../types/dialog';
// [ composables ]
import { useHsDialog } from '../../composables/use-hs-dialog';
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// [ Components ]
import Modal from './modal.vue';
import Card from '../layout/card.vue';
import CardItem from '../layout/card-item.vue';
import Btn from '../form/btn.vue';

import { GetTextColor, GetColorCode } from '../../utils/theme';
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// [ nac-Stroe ]
const toast = useHsDialog(useHsPinia());
const state = toast.state;
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
const cancelBtnElm = ref<HTMLElement | null>(null);
const leftBtnElm = ref<HTMLElement | null>(null);
const rightBtnElm = ref<HTMLElement | null>(null);
// ----------------------------------------------------------------------------

const activeItem = computed(() => {
  if (state.pendingList.length !== 0) {
    return state.pendingList[0];
  } else {
    return null;
  }
});

const activateTs = computed(() => {
  if (activeItem.value) {
    return activeItem.value.ts;
  } else {
    return null;
  }
});

const isShow = computed(() => {
  return activeItem.value !== null;
});

const clickLeft = () => {
  if (!activeItem.value) return;
  const item = activeItem.value;
  if (item.data.option.btnLeft.isShow === false) return;
  item.data.leftBtnClick();
};
const clickRight = () => {
  if (!activeItem.value) return;
  const item = activeItem.value;
  if (item.data.option.btnRight.isShow === false) return;
  item.data.rightBtnClick();
};

const clickCancel = () => {
  if (!activeItem.value) return;
  const item = activeItem.value;
  if (item.data.option.btnCancel.isShow === false) return;
  item.data.cancelBtnClick();
};

const clickBg = () => {
  if (!activeItem.value) return;
  const item = activeItem.value;
  if (activeItem.value?.data.option.bgClose === true) {
    item.data.cancelBtnClick();
    return;
  }
  if (item.data.option.btnCancel.isShow === false) return;
  item.data.cancelBtnClick();
};

watch(activateTs, async (ts) => {
  await nextTick();
  if (ts === null || !isShow.value) {
    return;
  }
  if (!activeItem.value) return;
  if (isShow.value === true) {
    if (activeItem.value.data.option.defaultBtn === 'right' && rightBtnElm.value !== null) {
      rightBtnElm.value.focus();
    } else if (activeItem.value.data.option.defaultBtn === 'left' && leftBtnElm.value !== null) {
      leftBtnElm.value.focus();
    } else if (activeItem.value.data.option.defaultBtn === 'cancel' && cancelBtnElm.value !== null) {
      cancelBtnElm.value.focus();
    }
  }
});

const keyMoveFlag = ref(false);
const onKeyDownNoBtn = (e: KeyboardEvent) => {
  if (!activeItem.value) return;
  if (e.key === 'Tab') return;
  if (activeItem.value.data.option.btnRight.isShow === true && rightBtnElm.value !== null) {
    keyMoveFlag.value = true;
    rightBtnElm.value.focus();
  }
};

const onKeyDownYesBtn = (e: KeyboardEvent) => {
  if (!activeItem.value) return;
  if (e.key === 'Tab') return;
  if (activeItem.value.data.option.btnLeft.isShow === true && leftBtnElm.value !== null) {
    keyMoveFlag.value = true;
    leftBtnElm.value.focus();
  }
};

const zindex = computed(() => {
  if (!activeItem.value) return DialogDefaultZIndex;
  return activeItem.value.data.option.zindex;
});

// const headerColor = computed(() => {
//   if (!activeItem.value) return '';
//   // return BgColorStyle(activeItem.value.data.option.color);
// });

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const targetElm = ref<HTMLElement | null>(null);
watch(isShow, (v) => {
  if (!targetElm.value) return;
  if (v) {
    const options = {
      reserveScrollBarGap: true, // bodyにスクロールバー分のpadding-rightを追加するかどうか（デフォルト値：false）
    };
    // console.log(id, 'activate');
    disableBodyScroll(targetElm.value, options);
  } else {
    // console.log(id, 'de-activate');
    enableBodyScroll(targetElm.value);
  }
});

const cancelBtnStyle = [
  //
  'px-2',
  'py-1',
  'border-[1px]',
  '!bg-transparent',
  'rounded-none',
  'h-full',
];

const cancelBtnStyleInner = [
  //
  'flex',
  'items-center',
];
const btnBaseStyle = [
  //
  'grid',
  'grid-cols-2',
  'gap-2',
];
const btnStyle = [
  //
  'py-1',
  'w-full',
];
const titleStyle = [
  //
  'text-[14px]',
  'sm:text-[18px]',
  'whitespace-pre-line',
  'text-wrap',
];
const messageStyle = [
  //
  'text-[14px]',
  'sm:text-[18px]',
  'whitespace-pre-line',
  'text-wrap',
  'pb-2',
];
const cardStyle = [
  //
  'min-w-[300px]',
  'mt-auto',
  'mb-auto',
];
const closeBtnIcon = [
  //
  'mx-1',
];
const baseCardHeader = [
  //
  'py-1',
  'pe-1',
  'bg-[var(--color-bg)]',
  'text-[var(--color-text)]',
];

const modalClosable = computed(() => {
  if (activeItem.value?.data.option.btnCancel.isShow) return true;
  if (activeItem.value?.data.option.bgClose !== undefined) {
    return activeItem.value?.data.option.bgClose;
  }
  return false;
});
const bgColorCode = computed(() => {
  if (!activeItem.value) return '#000000';
  return GetColorCode(activeItem.value.data.option.theme);
});
const textColorCode = computed(() => {
  if (!activeItem.value) return '#FFFFFF';
  return GetTextColor(bgColorCode.value);
});
const headerStyle = computed(() => {
  return ['--color-bg:' + bgColorCode.value, '--color-text:' + textColorCode.value];
});
</script>

<template>
  <ClientOnly>
    <Modal ref="targetElm" :show="isShow" :z-index="zindex" focus-lock :closeable="modalClosable" @close="clickBg()">
      <Card v-if="activeItem" class="HsUiDialog" :class="cardStyle" @click.stop>
        <CardItem
          :class="[`theme-${activeItem.data.option.theme}`, baseCardHeader]"
          variant="header"
          :style="headerStyle"
        >
          <div :class="titleStyle">
            {{ tx(activeItem.data.title) }}
          </div>
          <Btn
            v-if="activeItem.data.option.btnCancel.isShow"
            :class="cancelBtnStyle"
            :class-inner="cancelBtnStyleInner"
            variant="outlined"
            :theme="activeItem.data.option.btnCancel.theme"
            @click="clickCancel()"
            @ref="(e:any) => (cancelBtnElm = e)"
          >
            <i class="fas fa-times" :class="closeBtnIcon" />
            {{ tx(activeItem.data.option.btnCancel.title) }}
          </Btn>
        </CardItem>
        <CardItem variant="body">
          <div :class="messageStyle">
            {{ tx(activeItem.data.message) }}
          </div>
          <div :class="btnBaseStyle">
            <div class="flex items-center justify-center">
              <Btn
                v-if="activeItem.data.option.btnLeft.isShow"
                :class="[btnStyle, activeItem.data.option.btnLeft.variant === 'outlined' ? 'bg-white' : '']"
                :variant="activeItem.data.option.btnLeft.variant"
                :theme="activeItem.data.option.btnLeft.theme"
                @click="clickLeft()"
                @ref="(e:any) => (leftBtnElm = e)"
                @keydown="onKeyDownNoBtn"
              >
                {{ tx(activeItem.data.option.btnLeft.title) }}
              </Btn>
            </div>
            <div class="flex items-center justify-center">
              <Btn
                v-if="activeItem.data.option.btnRight.isShow"
                :class="[btnStyle, activeItem.data.option.btnRight.variant === 'outlined' ? 'bg-white' : '']"
                :variant="activeItem.data.option.btnRight.variant"
                :theme="activeItem.data.option.btnRight.theme"
                @click="clickRight()"
                @ref="(e:any) => (rightBtnElm = e)"
                @keydown="onKeyDownYesBtn"
              >
                {{ tx(activeItem.data.option.btnRight.title) }}
              </Btn>
            </div>
          </div>
        </CardItem>
      </Card>
    </Modal>
  </ClientOnly>
</template>
