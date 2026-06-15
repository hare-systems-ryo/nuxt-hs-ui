<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\text-box.vue
// ----------------------------------------------------------------------------
// TestFormItemTextBox
// TestFormItemTextBoxTestFormItemTextBox
---------------------------------------------------------------------------- */

import { Sleep } from '../../../../../../src/runtime/utils/com';
import type { SelectItem } from '../../../../../../src/runtime/utils/select-item';

// const disabled = ref(false);
// const textA = ref('textA');
const textB = ref('');
const state = ref<{
  data: string | null;
  diff: string | null;
  dataId: string | null;
  label: string;
  list: SelectItem<string>[];
}>({
  data: null,
  diff: null,
  dataId: null,
  list: [
    {
      id: `1`,
      text: { ja: 'トヨタ', en: 'TOYOTA' },
      groupId: 'JPN',
      groupLabel: { ja: '日本', en: 'Japan' },
    },
    {
      id: `2`,
      text: { ja: 'ニッサン', en: 'NISSAN' },
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
onMounted(() => {
  state.value.list = Array.from({ length: 20 })
    .fill(null)
    .map((row, index) => {
      return [
        {
          id: `1` + index,
          text: { ja: 'トヨタ', en: 'TOYOTA' },
          groupId: 'JPN',
          groupLabel: { ja: '日本', en: 'Japan' },
        },
        {
          id: `2` + index,
          text: { ja: 'ニッサン', en: 'NISSAN' },
          groupId: 'JPN',
          groupLabel: { ja: '日本', en: 'Japan' },
        },
        {
          id: `3` + index,
          text: 'Ford',
          groupId: 'USA',
          groupLabel: { ja: 'アメリカ', en: 'USA' },
        },
        {
          id: `4` + index,
          text: 'CHEVROLET',
          groupId: 'USA',
          groupLabel: { ja: 'アメリカ', en: 'USA' },
        },
      ];
    })
    .flat();
});
// const list = ['a', 'b', 'c'];
const listLoading = ref(false);
const test = async () => {
  state.value.list = [];
  listLoading.value = true;
  await Sleep(2000);
  state.value.list = Array.from({ length: 20 })
    .fill(null)
    .map((row, index) => {
      return [
        {
          id: `1` + index,
          text: { ja: 'トヨタ', en: 'TOYOTA' },
          groupId: 'JPN',
          groupLabel: { ja: '日本', en: 'Japan' },
        },
        {
          id: `2` + index,
          text: { ja: 'ニッサン', en: 'NISSAN' },
          groupId: 'JPN',
          groupLabel: { ja: '日本', en: 'Japan' },
        },
        {
          id: `3` + index,
          text: 'Ford',
          groupId: 'USA',
          groupLabel: { ja: 'アメリカ', en: 'USA' },
        },
        {
          id: `4` + index,
          text: 'CHEVROLET',
          groupId: 'USA',
          groupLabel: { ja: 'アメリカ', en: 'USA' },
        },
      ];
    })
    .flat();
  listLoading.value = false;
};
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> ComboBox </CardItem>
    <CardItem class="" variant="body">
      <Btn theme="accent1" variant="outlined" size="xs" @click="test"> test </Btn>
      <div class="grid gap-1 grid-cols-2">
        <ComboBox
          v-model:data="state.data"
          v-model:active-id="state.dataId"
          :free-text-id="'x'"
          :diff="textB"
          :list="state.list"
          :list-loading="listLoading"
          size="s"
          label=""
          input-size="2"
          placeholder="placeholderplaceholder"
        />
      </div>
      <div class="">data: {{ state.data }}</div>
      <div class="">dataId: {{ state.dataId }}</div>

      <!-- ------------------------------------------------

      <div class="grid grid-cols-2 gap-2 mt-2">
        <div class="flex items-center gap-1">
          <Btn theme="accent1" variant="outlined" size="xs" @click="disabled = !disabled">
            {{ !disabled }}
          </Btn>
          <div class="">disabled = {{ disabled }}</div>
        </div>
      </div>

       <div class="p-1"></div>
      <div>通常</div>
      <div class="grid grid-cols-4 items-start gap-2">
        <TextBox v-model:data="textA" :diff="textB" size="s" label="" :disabled="disabled" />
        <TextBox v-model:data="textA" :diff="textB" size="s" label="ラベル付き" :disabled="disabled" />
        <TextBox v-model:data="textA" :diff="textB" size="s" label="文字数制限" :max-len="20" :disabled="disabled" />
        <div class="h-11 w-4 bg-red-600 flex items-center justify-center text-white"></div>
      </div> 
      
      <div>特殊制限</div>
      <div class="flex items-start gap-2">
        <TextBox v-model:data="textA" :label="'icon付き'" :diff="textB" headerless :max-len="10" />
        <TextBox v-model:data="textA" :label="'readonly'" :diff="textB" :disabled="disabled" readonly />
        <TextBox v-model:data="textA" :diff="textB" label="readonly" :disabled="disabled" readonly />

        <TextBox v-model:data="textA" :diff="textB" label="ラベルセットで使うrequire" :disabled="disabled" require />
      </div>
      <div class="">Requireは赤い必須ラベルがつくだけなのでラベルをボックスの外で使うときは別途タグを設置</div>
      
      <div class="p-1"></div>
      <div>datalist付き</div>
      <TextBox v-model:data="textB" size="s" label="" :datalist="list" />
     
      <div>datalist付き</div>
      <div class="flex items-start gap-2">
        <TextBox v-model:data="textA" label="" text-align="left" />
        <TextBox v-model:data="textA" label="" text-align="center" />
        <TextBox v-model:data="textA" label="" text-align="right" />
      </div> 
      
      <TextBox v-model:data="textA" :diff="textB" label="label">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </TextBox>
    ------------------------------------------------  -->

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
