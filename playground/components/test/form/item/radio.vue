<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\radio.vue
// ----------------------------------------------------------------------------
// TestFormItemRadio
// TestFormItemRadioTestFormItemRadio
----------------------------------------------------------------------------- */

import type { SelectItem } from "../../../../../src/runtime/utils/select-item";

const state = ref<{
  testString: {
    data: string | null;
    diff: string | null;
    list: SelectItem<string>[];
  };
  testNumber: {
    data: number | null;
    diff: number | null;
    list: SelectItem<number>[];
  };
}>({
  testString: {
    data: null,
    diff: null,
    list: [
      { id: `a`, text: "id:a" },
      { id: `b`, text: "id:b" },
      { id: `c`, text: "id:c" },
    ],
  },
  testNumber: {
    data: null,
    diff: null,
    list: [
      { id: 1, text: "id:1" },
      { id: 2, text: "id:2" },
      { id: 3, text: "id:3" },
    ],
  },
});
// const valueA = ref<string | null>(null);
// const listAString: SelectItem<string>[] = [
//   { id: `a`, text: "id:a" },
//   { id: `b`, text: "id:b" },
//   { id: `c`, text: "id:c" },
// // ];
// const listA: SelectItem[] = [
//   {
//     id: 1,
//     text: "id:1",
//     order: 1,
//   },
//   {
//     id: 2,
//     text: "id:2",
//     order: 2,
//   },
//   // {
//   //   id: 3,
//   //   text: "id:3ididididididididididididididididididididididididididididididididididididididididididid",
//   //   order: 3,
//   //   imgUrl: "/assets/code-color-group/red.png",
//   // },
//   // {
//   //   id: 4,
//   //   text: "id:4",
//   //   order: 4,
//   //   imgUrl: "/assets/code-color-group/pink.png",
//   // },
// ];
// const valueB = ref<number | null>(null);

// const listB: SelectItem[] = [
//   {
//     id: 1,
//     text: "id:1",
//     order: 3,
//     hidden: true,
//   },
//   {
//     id: 2,
//     text: "id:2",
//     order: 2,
//     deleted: true,
//   },
//   {
//     id: 3,
//     text: "id:3",
//     order: 1,
//   },
// ];

// const listStringData = ref<string | null>(null);
// const listStringDiff = ref<string | null>(null);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Radio </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-1 gap-2">
        <!-- --------------- -->
        <div class="">
          <div class="">IDキー:文字列</div>
          <Radio
            v-model:data="state.testString.data"
            :list="state.testString.list"
            size="s"
            label="listA:valueA"
          />
          <div class="flex gap-1" @click="state.testString.data = null">
            <div class="">
              state.testString.data:{{
                state.testString.data === null ? "null" : state.testString.data
              }}
            </div>
            <div
              class="border border-accent1 text-accent1 bg-white px-2 rounded"
              @click="state.testString.data = null"
            >
              reset
            </div>
          </div>
        </div>
        <!-- --------------- -->
        <div class="">
          <div class="">IDキー:数値</div>
          <Radio
            v-model:data="state.testNumber.data"
            :list="state.testNumber.list"
            size="s"
            label="listA:valueA"
          />
          <div class="flex gap-1" @click="state.testNumber.data = null">
            <div class="">
              state.testNumber.data:{{
                state.testNumber.data === null ? "null" : state.testNumber.data
              }}
            </div>
            <div
              class="border border-accent1 text-accent1 bg-white px-2 rounded"
              @click="state.testNumber.data = null"
            >
              reset
            </div>
          </div>
        </div>

        <!-- <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          label="listA:valueA"
        />
        <Radio
          v-model:data="valueA"
          :list="listB"
          size="l"
          label="listB:valueA"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          label="listA:valueA"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          require
          label="require"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          nullable
          label="nullable"
        /> -->
        <!-- <Radio v-model:data="valueA" :list="listA" size="m" label="!nullable" /> -->

        <!-- <div class="">listStringData = {{ listStringData }}</div> -->
        <!-- <Radio
          v-model:data="listStringData"
          :diff="listStringDiff"
          :list="listAString"
          size="s"
          label="IDが文字列 listStringData"
        /> -->
        <!-- -----------------------------------------------------

      
        -----------------------------------------------------  -->
      </div>
    </CardItem>
  </Card>
</template>
