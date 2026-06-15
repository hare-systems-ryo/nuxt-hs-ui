<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\input-frame.vue
// ----------------------------------------------------------------------------
// TestFormItemInputFrame
// TestFormItemInputFrameTestFormItemInputFrame
---------------------------------------------------------------------------- */

import { dayjs } from '../../../../../../src/runtime/utils/dayjs';

const ts = ref('');

onMounted(() => {
  ts.value = Array.from({ length: 4 })
    .fill(null)
    .map(() => dayjs().format('x'))
    .join('-');
});

const disabled = ref(false);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> InputFrame </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div>サイズ</div>
      <div class="grid grid-cols-3 gap-1">
        <div class="flex flex-start gap-1 items-start">
          <InputFrame size="s"> s = small</InputFrame>
          <div class="w-8 h-[44px] bg-red-300 flex items-center justify-center text-sm">44px</div>
        </div>
        <div class="flex flex-start gap-1 items-start">
          <InputFrame size="m"> m = middle</InputFrame>
          <div class="w-8 h-[48px] bg-red-300 flex items-center justify-center text-sm">48px</div>
        </div>
        <div class="flex flex-start gap-1">
          <InputFrame size="l"> l=Lage</InputFrame>
          <div class="w-8 h-[60px] bg-red-300 flex items-center justify-center text-sm">60px</div>
        </div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Label</div>
      <div class="">
        <InputFrame size="s" label="Label"> </InputFrame>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Readonly</div>
      <div class="">
        <InputFrame size="s" label="Label" readonly>この項目は Readonly</InputFrame>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>disabled</div>
      <div class="">
        <InputFrame size="s" label="Label" disabled>この項目は Disabled</InputFrame>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Slots :: Default</div>
      <div class="">
        <InputFrame size="s"> default slot </InputFrame>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Slots :: label-append</div>
      <InputFrame size="s" label="aaa">
        <template #label-append>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-truck-fast"></i> A
        </template>
        slotでLabelを設定可能 ※fontawesome など
      </InputFrame>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Slots :: left-icons , right-icons</div>
      <InputFrame size="s">
        <template #left-icons>
          <div>
            <i class="fa-solid fa-house"></i>
          </div>
        </template>
        左右にアイコンはスロットで設定可能
        <template #right-icons="{ disabled: leftIconDisable }">
          <div><i class="fa-solid fa-house"></i>{{ leftIconDisable }}</div>
        </template>
      </InputFrame>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>Slots :: left-icons , right-icons のDisableプロパティ</div>
      <div class="flex gap-1">
        <Btn @click="disabled = !disabled">切り替え</Btn>
        <InputFrame size="m" class="flex-1" :disabled="disabled">
          スロットでdisabledプロパティが参照可能
          <template #right-icons="{ disabled: leftIconDisable }">
            <div>
              {{ leftIconDisable ? 'D' : '-' }}
            </div>
          </template>
        </InputFrame>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div>状態表示の色は変更可能</div>
      <InputFrame class="" focus>default focus-color</InputFrame>
      <InputFrame size="s" focus focus-color="shadow-[inset_0px_0px_1px_2px_#00FF00]">
        focus props.focus-color
      </InputFrame>
      <InputFrame class="" change change-color="shadow-[inset_0px_0px_1px_2px_#00FF00]"> aaa </InputFrame>
      <InputFrame class="" change>aaa</InputFrame>
      <InputFrame class="" error error-color="shadow-[inset_0px_0px_1px_2px_#00FF00]"> aaa </InputFrame>
      <InputFrame class="" error>aaa</InputFrame>
      <InputFrame class="" disabled disabled-color="shadow-[inset_0px_0px_1px_2px_#00FF00]"> aaa </InputFrame>
      <InputFrame class="" disabled change>aaa</InputFrame>

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
