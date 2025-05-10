<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\select.vue
// ----------------------------------------------------------------------------
// TestFormItemSelect
// TestFormItemSelectTestFormItemSelect
----------------------------------------------------------------------------- */
import type { SelectItem } from "../../../../../src/runtime/utils/select-item";

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
const listA: SelectItem[] = [
  {
    id: 1,
    text: "id:1",
    order: 1,
    imgUrl: "/assets/code-color-group/gray.png",
  },
  {
    id: 2,
    text: "id:2",
    order: 2,
    imgUrl: "/assets/code-color-group/green.png",
  },
];
const listB: SelectItem[] = [
  {
    id: 1,
    text: "id:1",
    order: 3,
    hidden: true,
  },
  {
    id: 2,
    text: "id:2",
    order: 2,
    deleted: true,
  },
  {
    id: 3,
    text: "id:3",
    order: 1,
  },
];
const listString: SelectItem<string>[] = [
  { id: `a`, text: "id:a" },
  { id: `b`, text: "id:b" },
  { id: `c`, text: "id:c" },
];

const listNumber: SelectItem[] = [
  { id: 1, text: "id:1" },
  { id: 2, text: "id:2" },
  { id: 3, text: "id:3" },
];
const listStringData = ref<string | null>(null);
const listStringDiff = ref<string | null>(null);
const listNumberData = ref<number | null>(null);
const listNumberDiff = ref<number | null>(null);
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

      <div>
        <div class="">通常</div>
        <div class="">data = {{ valueAtext }} :: diff = {{ valueBtext }}</div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <Select
          v-model:data="valueA"
          :diff="valueB"
          :list="listA"
          size="s"
          label="基本的な使い方"
        />
        <Select
          v-model:data="valueA"
          :diff="valueB"
          :list="listA"
          size="s"
          label="基本的な使い方(Null許容)"
          nullable
        />
      </div>

      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>
        <div class="">画像付き</div>
        <div class="">data = {{ valueAtext }} :: diff = {{ valueBtext }}</div>
      </div>
      <Select
        v-model:data="valueA"
        :diff="valueB"
        :list="listA"
        size="s"
        label="画像付き"
        class-img-tag="object-cover"
        image
      />
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>
        <div class="">非表示・削除アイテム含む</div>
        <div class="">data = {{ valueBtext }}</div>
      </div>
      <Select
        v-model:data="valueB"
        :list="listB"
        size="s"
        label="非表示アイテム含む"
      />
      <div class="mt-1 flex gap-1">
        <Btn variant="outlined" class="bg-white" @click="valueB = 1">
          Hidden Item
        </Btn>
        <Btn variant="outlined" class="bg-white" @click="valueB = 2">
          Delete Item
        </Btn>
      </div>
      <div class="">
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
      </div>
      <div>
        <div class="">文字列がIDキー</div>
        <div class="">listStringData = {{ listStringData }}</div>
        <div class="">listNumberData = {{ listNumberData }}</div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Select
          v-model:data="listStringData"
          :diff="listStringDiff"
          :list="listString"
          size="s"
          label="IDが文字列 listStringData"
        />
        <Select
          v-model:data="listNumberData"
          :diff="listNumberDiff"
          :list="listNumber"
          size="s"
          label="IDが数値 listNumberData"
        />
      </div>
      <div class=""></div>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
