<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\select.vue
// ----------------------------------------------------------------------------
// TestFormItemSelect
// TestFormItemSelectTestFormItemSelect
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
      // { id: `a`, text: "id:a" },
      // { id: `b`, text: "id:b" },
      // { id: `c`, text: "id:c" },
    ],
  },
  testNumber: {
    data: 1,
    diff: null,
    list: [
      { id: 1, text: "id:1" },
      { id: 2, text: "id:2" },
      { id: 3, text: "id:3" },
    ],
  },
});
onMounted(() => {
  state.value.testString.list.push(
    ...Array.from({ length: 20 })
      .fill(null)
      .map((row, index) => {
        return {
          id: index.toString(36),
          text: "id:" + index.toString(36),
        };
      })
  );
  loading.value = false;
});

const valueA = ref<number | null>(null);
const valueAtext = computed(() => {
  if (valueA.value === null) return "null";
  return valueA.value;
});
const valueB = ref<number | null>(null);
const valueBtext = computed(() => {
  if (valueB.value === null) return "null";
  return valueB.value;
});
// const listA: SelectItem[] = Array.from({ length: 100 })
//   .fill(null)
//   .map((row, index) => {
//     return {
//       id: index,
//       text: `ID:{inxex}`,
//     };
//   });
// [
// {
//   id: 1,
//   text: {
//     ja: "id:1 日本語",
//     en: "id:1 英語",
//   },
//   order: 1,
//   imgUrl: "/assets/code-color-group/gray.png",
//   appendIcon: "fa-solid fa-arrow-up-wide-short w-[1em] text-center",
// },
// {
//   id: 2,
//   text: {
//     ja: "id:2 日本語",
//     en: "id:2 英語",
//   },
//   order: 2,
//   imgUrl: "/assets/code-color-group/green.png",
//   appendIcon: "fa-solid fa-arrow-up-wide-short w-[1em] text-center",
// },
// ];
// const listB: SelectItem[] = [
//   {
//     id: 1,
//     text: "id:1",
//     order: 3,
//     hidden: true,
//     appendIcon: "fa-solid fa-arrow-up-wide-short w-[1em] text-center",
//   },
//   {
//     id: 2,
//     text: "id:2",
//     order: 2,
//     deleted: true,
//     appendIcon: "fa-solid fa-arrow-up-wide-short w-[1em] text-center",
//   },
//   {
//     id: 3,
//     text: "id:3",
//     order: 1,
//     appendIcon: "fa-solid fa-arrow-up-wide-short w-[1em] text-center",
//   },
// ];
const listString = ref<SelectItem<string>[]>([]);
// <i class=""></i>
// const listNumber: SelectItem[] = [
//   { id: 1, text: "id:1" },
//   { id: 2, text: "id:2" },
//   { id: 3, text: "id:3" },
// ];
const listStringData = ref<string | null>(null);
// const listStringDiff = ref<string | null>(null);
// const listNumberData = ref<number | null>(null);
// const listNumberDiff = ref<number | null>(null);
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    listStringData.value = "TN";
    loading.value = true;
    setTimeout(() => {
      listString.value.push(
        ...[
          {
            id: "SR",
            text: {
              ja: "スリナム",
              en: "SURINAME",
            },
          },
          {
            id: "TN",
            text: {
              ja: "チュニジア",
              en: "TUNISIA",
            },
          },
        ]
      );
      loading.value = false;
    }, 2000);
  }, 2000);
});
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Select </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-2 gap-1">
        <div class="border border-main2 p-1">valueA = {{ valueAtext }}</div>
        <div class="border border-main2 p-1">valueB = {{ valueBtext }}</div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div>
        <div class="">通常</div>
        <div class="">data = {{ valueAtext }} :: diff = {{ valueBtext }}</div>
      </div>
      <div class="grid grid-cols-1 600:grid-cols-2 gap-1">
        <Select
          v-model:data="state.testString.data"
          :list="state.testString.list"
          size="s"
          label=""
        />
        <div class="flex-c">{{ state.testString.data }}</div>
        <Select
          v-model:data="state.testNumber.data"
          :list="state.testNumber.list"
          size="s"
          label=""
        />
        <div class="flex-c">{{ state.testNumber.data }}</div>
        <!-- <Select
          v-model:data="valueA"
          :diff="valueB"
          :list="listA"
          size="s"
          label="基本的な使い方(Null許容)"
          nullable
        /> -->
      </div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>
      <div class="p-20"></div>

      <!-- ------------------------------------------------ -->
      <!-- <div class="p-1"></div>
      <div>
        <div class="">画像付き</div>
        <div class="">data = {{ valueAtext }} :: diff = {{ valueBtext }}</div>
      </div> -->
      <!-- <Select
        v-model:data="valueA"
        :diff="valueB"
        :list="listA"
        size="s"
        label="画像付き"
        class-img-tag="object-cover"
        image
      /> -->
      <!-- ------------------------------------------------ -->
      <!-- <div class="p-1"></div>
      <div>
        <div class="">非表示・削除アイテム含む</div>
        <div class="">data = {{ valueBtext }}</div>
      </div> -->
      <!-- <Select
        v-model:data="valueB"
        :list="listB"
        size="s"
        label="非表示アイテム含む"
      /> -->
      <!-- <div class="mt-1 flex gap-1">
        <Btn variant="outlined" class="bg-white" @click="valueB = 1">
          Hidden Item
        </Btn>
        <Btn variant="outlined" class="bg-white" @click="valueB = 2">
          Delete Item
        </Btn>
      </div> -->
      <!-- <div class="">
        <div class="flex">
          <div class="w-32">非表示アイテム</div>
          <div class="">
            選択肢に非表示アイテムが含まれる場合、表示切替ボタンが表示される
          </div>
        </div>

        <div class="flex">
          <div class="w-32">削除アイテム</div>
          <div class="">
            選択肢に原則出てこない、プログラムから値がセットされたときにだけ表示する
          </div>
        </div>
      </div> -->
      <div>
        <div class="">文字列がIDキー</div>
        <div class="">listStringData = {{ listStringData }}</div>
        <!-- <div class="">listNumberData = {{ listNumberData }}</div> -->
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Select
          v-model:data="listStringData"
          :list="listString"
          :loading="loading"
          size="s"
          label="IDが文字列 listStringData"
        />
        <!-- <Select
          v-model:data="listNumberData"
          :diff="listNumberDiff"
          :list="listNumber"
          size="s"
          label="IDが数値 listNumberData"
        /> -->
      </div>
      <div class=""></div>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
