<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\select.vue
// ----------------------------------------------------------------------------
// TestFormItemSelect
// TestFormItemSelectTestFormItemSelect
---------------------------------------------------------------------------- */

import type { SelectItem } from '../../../../../../src/runtime/utils/select-item';

const state = ref<{
  data: string | null;
  diff: string | null;
  label: string;
  list: SelectItem<string>[];
}>({
  data: null,
  diff: null,
  list: [
    {
      id: `1`,
      text: 'TOYOTA',
      groupId: 'JPN',
      groupLabel: { ja: '日本', en: 'Japan' },
    },
    {
      id: `2`,
      text: 'NISSAN',
      groupId: 'JPN',
      groupLabel: { ja: '日本', en: 'Japan' },
    },
    {
      id: `3`,
      text: 'Ford',
      groupId: 'USA',
      groupLabel: { ja: 'アメリカ', en: 'USA' },
    },
    {
      id: `4`,
      text: 'CHEVROLET',
      groupId: 'USA',
      groupLabel: { ja: 'アメリカ', en: 'USA' },
    },
  ],
  label: 'Select',
});
// const disabled = ref(false);
// const readonly = ref(false);
// const nullable = ref(false);
const dataChange = (v: string | null) => {
  console.log('dataChange', v);
};
// // onMounted(() => {
// //   for (let i = 0; i < 20; i++) {
// //     state.value.list.push({
// //       id: `${i}`,
// //       text: `${i}`,
// //       // appendIcon: 'fa-solid fa-arrow-down-short-wide w-[1em] text-center',
// //     });
// //   }
// // });
const selectedText = computed(() => {
  const ret = state.value.list.find((row) => row.id === state.value.data);
  if (!ret) return '';
  return ret.text;
});
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Select </CardItem>
    <CardItem class="grid gap-4" variant="body">
      <div class="grid grid-cols-1 gap-2">
        <Select
          v-model:data="state.data"
          :diff="state.diff"
          :list="state.list"
          :unknown-text="selectedText"
          nullable
          @value-change="(v:any) => dataChange(v)"
        />
        <Select
          v-model:data="state.diff"
          :diff="state.data"
          :list="state.list"
          :unknown-text="selectedText"
          searchable
          @value-change="(v:any) => dataChange(v)"
        />
      </div>
      <!-- ------------------------------------------------
       

            <div class="">
        <CheckBox v-model:data="disabled" label="disabled" placeholder="placeholderplaceholder" />
        <CheckBox v-model:data="readonly" label="readonly" placeholder="placeholderplaceholder" />
        <CheckBox v-model:data="nullable" label="nullable" placeholder="placeholderplaceholder" />
      </div>

      <div class="grid grid-cols-1 gap-2">
        <Select
          v-model:data="state.testStringA.data"
          :list="state.testStringA.list"
          :unknown-text="selectedText"
          nullable
          searchable
          @update:data="(v:any) => dataChange(v)"
        />
        <div class="">
          {{ { data: state.testStringA.data } }}
        </div>
        <Select v-model:data="state.testStringA.data" :list="state.testStringB.list" nullable searchable />
      </div>

      <div class="grid grid-cols-4 gap-2">
        <TextBox :data="'選択してください'" label="text" readonly />
        <Select
          v-model:data="state.testString.data"
          :list="state.testString.list"
          label="readonly"
          @update:data="(v:any) => dataChange(v)"
        />


        <Select v-model:data="state.testString.data" :list="state.testString.list" label="none" />
      </div>
      <div class="">
        <TextBox v-model:data="state.testString.label" label="label" />
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="grid gap-1">
          <div class="">Select data</div>
          <Select
            v-model:data="state.testString.data"
            :list="state.testString.list"
            size="s"
            img
            img-mode="cover"
            :disabled="disabled"
            :readonly="readonly"
            :nullable="nullable"
          />
          <Select
            v-model:data="state.testString.data"
            :list="state.testStringB.list"
            size="s"
            nullable
            :label="{ ja: 'ほげ', en: 'hoge' }"
            headerless
            searchable
            img
            img-mode="cover"
          />
          <div class="">value = {{ state.testString.data }}</div>
        </div>
        <div class="">
          <div class="">Select diff</div>
          <Select
            v-model:data="state.testString.diff"
            :list="state.testStringB.list"
            size="s"
            :label="state.testString.label"
            img
            :nullable="nullable"
          />
          <div class="">value = {{ state.testString.diff }}</div>
        </div>
        <div class="">
          <div class="">Select</div>
          <div class="">value = {{ state.testString.data }}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <Select v-model:data="state.testNumber.data" :list="state.testNumber.list" size="s" searchable nullable />
        <Select v-model:data="state.testNumber.data" :list="state.testNumber.list" size="s" nullable />
      </div>
      <Select v-model:data="state.testNumber.data" label="label" :list="state.testNumber.list">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </Select>

      
      
      
      
      -->

      <!--
      
      ------------------------------------------------ 
       

        <div class="grid grid-cols-2 gap-1">
        <div class="border border-main2 p-1">valueB = {{ valueBtext }}</div>
      </div>
      <div class="p-1"></div>
      
      <div>
        <div class="">通常</div>
        <div class="">data = {{ valueAtext }} :: diff = {{ valueBtext }}</div>
      </div>
      <div class="grid grid-cols-1 600:grid-cols-2 gap-1">
        <Select v-model:data="state.testString.data" :list="state.testString.list" size="s" label="" searchable />
        <div class="flex items-center">{{ state.testString.data }}</div>
        <Select v-model:data="state.testNumber.data" :list="state.testNumber.list" size="s" label="" />
        <div class="flex items-center">{{ state.testNumber.data }}</div>
      </div>



  <div>
        <div class="">文字列がIDキー</div>
        <div class="">listStringData = {{ listStringData }}</div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Select
          v-model:data="listStringData"
          :list="listString"
          :loading="loading"
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



      
      ------------------------------------------------ 
      
      -->
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

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
