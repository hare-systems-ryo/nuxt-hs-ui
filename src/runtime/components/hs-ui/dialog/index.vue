<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\dialog\index.vue
// ----------------------------------------------------------------------------
HsUiDialog
HsUiDialogHsUiDialog
----------------------------------------------------------------------------- */

// [ vue ]
import { computed, watch, ref, nextTick } from 'vue';
// [ tailwind ]
import { RemovePrefix } from '../../../lib/prefix';
// ----------------------------------------------------------------------------
import { DialogDefaultZIndex } from './index.type';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// ----------------------------------------------------------------------------
import { useHsUiDialog } from '../../../composables/use-hs-ui-dialog';
import { useHsMultiLang } from '../../../composables/use-hs-multi-lang';
// ----------------------------------------------------------------------------
// [ nac-Stroe ]
const toast = useHsUiDialog();
const state = toast.state;
// ----------------------------------------------------------------------------
const storeMultiLang = useHsMultiLang();
const MultiLangText = storeMultiLang.MultiLangText;
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
  if (activeItem.value !== null) {
    return activeItem.value.ts;
  } else {
    return null;
  }
});

const isShow = computed(() => {
  return activeItem.value !== null;
});

const clickLeft = () => {
  if (activeItem.value === null) return;
  const item = activeItem.value;
  if (item.data.option.btnLeft.isShow === false) return;
  item.data.leftBtnClick();
};
const clickRight = () => {
  if (activeItem.value === null) return;
  const item = activeItem.value;
  if (item.data.option.btnRight.isShow === false) return;
  item.data.rightBtnClick();
};

const clickCancel = () => {
  if (activeItem.value === null) return;
  const item = activeItem.value;
  if (item.data.option.btnCancel.isShow === false) return;
  item.data.cancelBtnClick();
};

watch(activateTs, async (ts) => {
  await nextTick();
  if (ts === null || !isShow.value) {
    return;
  }
  if (activeItem.value === null) return;
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
  if (activeItem.value === null) return '';
  if (e.key === 'Tab') return;
  if (activeItem.value.data.option.btnRight.isShow === true && rightBtnElm.value !== null) {
    keyMoveFlag.value = true;
    rightBtnElm.value.focus();
  }
};

const onKeyDownYesBtn = (e: KeyboardEvent) => {
  if (activeItem.value === null) return '';
  if (e.key === 'Tab') return;
  if (activeItem.value.data.option.btnLeft.isShow === true && leftBtnElm.value !== null) {
    keyMoveFlag.value = true;
    leftBtnElm.value.focus();
  }
};

const zindex = computed(() => {
  if (activeItem.value === null) return DialogDefaultZIndex;
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

const cancelBtnStyle = RemovePrefix([
  //
  'px-2',
  'tw-px-2',
  'py-1',
  'tw-py-1',
  'border-[1px]',
  'tw-border-[1px]',
  '!bg-transparent',
  'tw-bg-transparent',
  'rounded-none',
  'tw-rounded-none',
  'h-full',
  'tw-h-full',
]);

const cancelBtnStyleInner = RemovePrefix([
  //
  'flex',
  'tw-flex',
  'items-center',
  'tw-items-center',
]);
const btnBaseStyle = RemovePrefix([
  //
  'grid',
  'tw-grid',
  'grid-cols-2',
  'tw-grid-cols-2',
  'gap-2',
  'tw-gap-2',
]);
const btnStyle = RemovePrefix([
  //
  'py-1',
  'tw-py-1',
  'w-full',
  'tw-w-full',
]);
const titleStyle = RemovePrefix([
  //
  'text-[14px]',
  'tw-text-[14px]',
  'sm:text-[18px]',
  'sm:tw-text-[18px]',
  'whitespace-pre-line',
  'tw-whitespace-pre-line',
  'text-wrap',
  'tw-text-wrap',
]);
const messageStyle = RemovePrefix([
  //
  'text-[14px]',
  'tw-text-[14px]',
  'sm:text-[18px]',
  'sm:tw-text-[18px]',
  'whitespace-pre-line',
  'tw-whitespace-pre-line',
  'text-wrap',
  'tw-text-wrap',
  //
  'pb-2',
  'tw-pb-2',
]);
const cardStyle = RemovePrefix([
  //
  'min-w-[300px]',
  'tw-min-w-[300px]',
  'mt-auto',
  'tw-mt-auto',
  'mb-auto',
  'tw-mb-auto',
]);
</script>
<template>
  <ClientOnly>
    <HsUiModal ref="targetElm" :show="isShow" :z-index="zindex" focus-lock @close="clickCancel()">
      <HsUiCard v-if="activeItem !== null" class="HsUiDialog" :class="cardStyle" @click.stop>
        <HsUiCardItem
          :class="[`theme-${activeItem.data.option.theme}`, RemovePrefix(['py-1', 'tw-py-1', 'pe-1', 'tw-pe-1'])]"
          variant="header"
        >
          <div :class="titleStyle">
            {{ MultiLangText(activeItem.data.title) }}
          </div>
          <HsFcBtn
            v-if="activeItem.data.option.btnCancel.isShow"
            :class="cancelBtnStyle"
            :class-inner="cancelBtnStyleInner"
            variant="outlined"
            :theme="activeItem.data.option.btnCancel.theme"
            @click="clickCancel()"
            @ref="(e:any) => (cancelBtnElm = e)"
          >
            <i class="fas fa-times mx-1" />
            {{ MultiLangText(activeItem.data.option.btnCancel.title) }}
          </HsFcBtn>
        </HsUiCardItem>
        <HsUiCardItem variant="body">
          <div :class="messageStyle">
            {{ MultiLangText(activeItem.data.message) }}
          </div>
          <div :class="btnBaseStyle">
            <div>
              <HsFcBtn
                v-if="activeItem.data.option.btnLeft.isShow"
                :class="btnStyle"
                variant="flat"
                :theme="activeItem.data.option.btnLeft.theme"
                @click="clickLeft()"
                @ref="(e:any) => (leftBtnElm = e)"
                @keydown="onKeyDownNoBtn"
              >
                {{ MultiLangText(activeItem.data.option.btnLeft.title) }}
              </HsFcBtn>
            </div>
            <div>
              <HsFcBtn
                v-if="activeItem.data.option.btnRight.isShow"
                :class="btnStyle"
                variant="flat"
                :theme="activeItem.data.option.btnRight.theme"
                @click="clickRight()"
                @ref="(e:any) => (rightBtnElm = e)"
                @keydown="onKeyDownYesBtn"
              >
                {{ MultiLangText(activeItem.data.option.btnRight.title) }}
              </HsFcBtn>
            </div>
          </div>
        </HsUiCardItem>
      </HsUiCard>
    </HsUiModal>
  </ClientOnly>
</template>
<style lang="scss" scoped>
.theme-main0 {
  background-color: theme('colors.main0');
  color: theme('colors.white');
}
.theme-main1 {
  background-color: theme('colors.main1');
  color: theme('colors.white');
}
.theme-main2 {
  background-color: theme('colors.main2');
  color: theme('colors.white');
}
.theme-main3 {
  background-color: theme('colors.main3');
  color: theme('colors.white');
}
.theme-accent1 {
  background-color: theme('colors.accent1');
  color: theme('colors.white');
}
.theme-accent2 {
  background-color: theme('colors.accent2');
  color: theme('colors.white');
}
// ----------------------
.theme-info {
  background-color: theme('colors.info');
  color: theme('colors.white');
}
.theme-link {
  background-color: theme('colors.link');
  color: theme('colors.white');
}
.theme-download {
  background-color: theme('colors.download');
  color: theme('colors.white');
}
.theme-success {
  background-color: theme('colors.success');
  color: theme('colors.white');
}
.theme-warn {
  background-color: theme('colors.warn');
  color: theme('colors.white');
}
.theme-error {
  background-color: theme('colors.error');
  color: theme('colors.white');
}
// ----------------------
.theme-white {
  background-color: theme('colors.white');
  color: theme('colors.main1');
  .HsFcBtn--border {
    border-color: theme('colors.gray.600');
  }
}
.theme-black {
  background-color: theme('colors.black');
  color: theme('colors.white');
}
.theme-dark {
  background-color: theme('colors.dark');
  color: theme('colors.white');
}
.theme-back {
  background-color: theme('colors.back');
  color: theme('colors.main1');
}
</style>
