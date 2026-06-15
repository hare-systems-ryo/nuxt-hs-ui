<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\main.vue
// ----------------------------------------------------------------------------
// Main
// MainMain
---------------------------------------------------------------------------- */

import { useElementSize } from '@vueuse/core';
import { useTemplateRef } from 'vue';
// import { GetColorCode } from '#imports'
// import { GetColorCode } from '#imports';
// import { GetColorCode, type Theme } from '../../src/runtime/utils/theme';
// import { useStore } from '../../src/runtime/composables/test';
// import { GetColorCode } from '#build/runtime/theme';

// const store = useStore();

const el = useTemplateRef('el');
const { width } = useElementSize(el);

// const ThemeList = [
//   'bg-main0', //
//   'bg-main1', //
//   'bg-main2', //
//   'bg-main3', //
//   'bg-main4', //
//   'bg-accent1', //
//   'bg-accent2', //
//   //
//   'bg-info', //
//   'bg-success', //
//   'bg-warn', //
//   'bg-error', //
//   //
//   'bg-link', //
//   'bg-download', //
//   'bg-dark', //
//   'bg-back1', //
//   'bg-back2', //
//   'bg-back3', //
// ] as const;
// const value = ref<Theme>('main1');
// const sColor = computed(() => {
//   return GetColorCode(store.theme);
// });
// const vColor = computed(() => {
//   return GetColorCode(value.value);
// });
const open = ref(true);
</script>

<template>
  <UContainer ref="el" class="mt-10 @container">
    <div>{{ width }}</div>
    <div class="flex">
      <div class="flex items-center bg-accent1 mt-2 inline-block p-3 border rounded text-white" @click="open = !open">
        {{ open }}
      </div>
    </div>
    <div class="grid grid-cols-2">
      <Accordion :open="open" class="mt-2">
        <div class="py-1 bg-main0">main0</div>
        <div class="py-1 bg-main1">main1</div>
        <div class="py-1 bg-main2">main2</div>
        <div class="py-1 bg-main3">main3</div>
        <div class="py-1 bg-accent1">accent1</div>
        <div class="py-1 bg-accent2">accent2</div>
        <div class="py-1 bg-info">info</div>
        <div class="py-1 bg-success">success</div>
        <div class="py-1 bg-warn">warn</div>
        <div class="py-1 bg-error">error</div>
        <div class="py-1 bg-link">link</div>
        <div class="py-1 bg-download">download</div>
        <div class="py-1 bg-dark">dark</div>
        <div class="py-1 bg-back1">back1</div>
        <div class="py-1 bg-back2">back2</div>
        <div class="py-1 bg-back3">back3</div>
      </Accordion>
      <Accordion :open="open" class="mt-2">
        <!-- <div class="py-1 text-main0">main0</div>
        <div class="py-1 text-main1">main1</div>
        <div class="py-1 text-main2">main2</div>
        <div class="py-1 text-main3">main3</div>
        <div class="py-1 text-accent1">accent1</div>
        <div class="py-1 text-accent2">accent2</div>
        <div class="py-1 text-info">info</div>
        <div class="py-1 text-success">success</div>
        <div class="py-1 text-warn">warn</div>
        <div class="py-1 text-error">error</div>
        <div class="py-1 text-link">link</div>
        <div class="py-1 text-download">download</div>
        <div class="py-1 text-dark">dark</div>
        <div class="py-1 text-back1">back1</div>
        <div class="py-1 text-back2">back2</div>
        <div class="py-1 text-back3">back3</div> -->
      </Accordion>
    </div>
    <div class="relative container-type-inline-size">
      grid grid-cols-1 @800:grid-cols-4
      <div class="grid grid-cols-1 600:grid-cols-4">
        <div class="bg-main2">main2</div>
        <div class="bg-main3">main2</div>
      </div>
    </div>

    <div class="@sm:text-[2em]">@sm:text-[2em]</div>
    <div class="@800:text-[2em]">@800:text-[2em]</div>
    <div class="800:text-[2em]">800:text-[2em]</div>
    <div class="800:bg-green-400">800:bg-green-400</div>
    <div class="bg-main2 @800:bg-green-400">bg-main2 @800:bg-green-400</div>
    <!-- 
   
      -->
    <!-- <div>{{ value }}</div> -->
    <!-- <div class="grid gap-4">
      <div class="flex gap-1 relative">
        <div class="flex items-center">store.theme</div>
        <UInput v-model="store.theme" />
        <div class="flex items-center">{{ store.theme }}</div>
        <div class="flex items-center">{{ sColor }}</div>
        <div class="bg-[var(--color)] absolute left-0 right-0 bottom-0 h-[2px]" :style="`--color:${sColor}`"></div>
      </div>
      <div class="flex gap-1 relative">
        <div class="flex items-center">value</div>
        <UInput v-model="value" />
        <div class="flex items-center">{{ value }}</div>
        <div class="flex items-center">{{ vColor }}</div>
        <div class="bg-[var(--color)] absolute left-0 right-0 bottom-0 h-[2px]" :style="`--color:${vColor}`"></div>
      </div>
    </div> -->
    <div class="py-2"></div>
    <!-- <div class="grid grid-cols-2 gap-1 relative">
      <div class="content-start grid gap-2 relative">
        <UAlert title="open" @click="open = !open" />
      </div>
    </div> -->
  </UContainer>
</template>
