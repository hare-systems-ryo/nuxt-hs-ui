<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\btn.vue
// ----------------------------------------------------------------------------
// TestFormItemBtn
// TestFormItemBtnTestFormItemBtn
---------------------------------------------------------------------------- */

import { useInterval } from '@vueuse/core';
const counter = useInterval(200);
import { type ThemeColor, Theme } from '../../../../../../src/runtime/utils/theme';
const ThemeList = Object.keys(Theme) as ThemeColor[];
const c = () => {
  console.info('click');
};
const loading = ref(false);
const disabled = ref(true);
const test = () => {
  console.log('test');
};
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Btn </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-3 gap-2">
        <Btn theme="accent1" variant="outlined" class="bg-white mb-2" :disabled="disabled" @click="test()"> test </Btn>
        <Btn theme="accent1" variant="outlined" class="bg-white mb-2" @click="test()"> test </Btn>
        <Btn theme="accent1" variant="outlined" class="bg-white mb-2" @click="test()"> test </Btn>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-1">
          <Btn theme="accent1" variant="outlined" size="xs" @click="loading = !loading">
            {{ !loading }}
          </Btn>
          <div class="">loading = {{ loading }}</div>
        </div>
        <div class="flex items-center gap-1">
          <Btn theme="accent1" variant="outlined" size="xs" @click="disabled = !disabled">
            {{ !disabled }}
          </Btn>
          <div class="">disabled = {{ disabled }}</div>
        </div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-1"></div>
      <!-- ------------------------------------------------ -->
      <div class="">
        <div class="h-[4px] bg-green-500"></div>
        <div class="flex gap-2">
          <Btn theme="accent1" variant="flat" class="flex-1" size="m" @click="c"> c </Btn>
          <div class="flex-none h-[44px] w-10 bg-red-500 text-white flex items-center justify-center">44px</div>
        </div>
        <div class="h-[4px] bg-green-500"></div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div class="">Size</div>
      <div class="flex gap-1 items-start mt-3">
        <Btn theme="accent1" variant="outlined" size="xs">BTN [xs] </Btn>
        <div class="h-[32px] w-4 bg-red-600 flex items-center justify-center text-white"></div>

        <Btn theme="accent1" variant="outlined" size="s">BTN [s]--| </Btn>
        <div class="h-[38px] w-4 bg-red-600 flex items-center justify-center text-white"></div>

        <Btn theme="accent1" variant="outlined" size="m">BTN [m]--| </Btn>
        <div class="h-[48px] w-4 bg-red-600 flex items-center justify-center text-white"></div>

        <Btn theme="accent1" variant="outlined" size="l">BTN [l]--| </Btn>
        <div class="h-[60px] w-4 bg-red-600 flex items-center justify-center text-white"></div>

        <Btn theme="accent1" variant="outlined" size="xl">BTN [xl]--| </Btn>
        <div class="h-[60px] w-4 bg-red-600 flex items-center justify-center text-white"></div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div class="">flat</div>
      <div class="grid grid-cols-4 800:grid-cols-8 gap-1">
        <template v-for="(color, index) in ThemeList" :key="index">
          <Btn :theme="color" variant="flat" :disabled="disabled" :loading="loading" @click="c">
            {{ color }}
          </Btn>
        </template>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div class="">outlined</div>
      <div class="grid grid-cols-4 800:grid-cols-8 gap-1">
        <template v-for="(color, index) in ThemeList" :key="index">
          <Btn :theme="color" variant="outlined" :disabled="disabled" :loading="loading" @click="c">
            {{ color }}
          </Btn>
        </template>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div class="">text</div>
      <div class="grid grid-cols-4 800:grid-cols-8 gap-1">
        <template v-for="(color, index) in ThemeList" :key="index">
          <Btn :theme="color" variant="text" :disabled="disabled" :loading="loading" @click="c">
            {{ color }}
          </Btn>
        </template>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="py-2"></div>
      <div class="">link</div>
      <div class="grid grid-cols-4 800:grid-cols-8 gap-1">
        <template v-for="(color, index) in ThemeList" :key="index">
          <Btn
            :theme="color"
            variant="text"
            :disabled="disabled"
            :loading="loading"
            :to="$route.path + '?ts=' + counter"
          >
            {{ color }}
          </Btn>
        </template>
      </div>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
