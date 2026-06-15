<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\text-box.vue
// ----------------------------------------------------------------------------
// TestFormItemTextBox
// TestFormItemTextBoxTestFormItemTextBox
---------------------------------------------------------------------------- */
const disabled = ref(false);
const textA = ref('textA');
const textB = ref('');
const list = ['a', 'b', 'c'];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> TextBox </CardItem>
    <CardItem class="" variant="body">
      <div>Test</div>
      <div class="flex">
        <TextBox :data="''" size="s" label="" input-size="2" placeholder="placeholderplaceholder" />
        <TextBox v-model:data="textA" size="s" label="" input-size="2" placeholder="placeholderplaceholder" />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-1">
          <Btn theme="accent1" variant="outlined" size="xs" @click="disabled = !disabled">
            {{ !disabled }}
          </Btn>
          <div class="">disabled = {{ disabled }}</div>
        </div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>通常</div>
      <div class="grid grid-cols-4 items-start gap-2">
        <TextBox v-model:data="textA" :diff="textB" size="s" label="" :disabled="disabled" />
        <TextBox v-model:data="textA" :diff="textB" size="s" label="ラベル付き" :disabled="disabled" />
        <TextBox v-model:data="textA" :diff="textB" size="s" label="文字数制限" :max-len="20" :disabled="disabled" />
        <div class="h-[44px] w-4 bg-red-600 flex items-center justify-center text-white"></div>
      </div>
      <div>特殊制限</div>
      <div class="flex items-start gap-2">
        <TextBox :data="'icon付き'" :diff="textB" headerless :max-len="10" />
        <!-- <TextBox :data="'iconナシ'" :diff="textB" :max-len="39" /> -->
        <TextBox :data="'readonly'" :diff="textB" label="" :disabled="disabled" readonly />
        <TextBox :data="'readonly'" :diff="textB" label="readonly" :disabled="disabled" readonly />

        <TextBox :data="'require'" :diff="textB" label="ラベルセットで使う" :disabled="disabled" require />
      </div>
      <div class="">Requireは赤い必須ラベルがつくだけなのでラベルをボックスの外で使うときは別途タグを設置</div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>datalist付き</div>
      <TextBox v-model:data="textB" size="s" label="" :datalist="list" />
      <!--  -->
      <!-- <div>datalist付き</div>
      <div class="flex items-start gap-2">
        <TextBox v-model:data="textA" label="" text-align="left" />
        <TextBox v-model:data="textA" label="" text-align="center" />
        <TextBox v-model:data="textA" label="" text-align="right" />
      </div> -->

      <TextBox v-model:data="textA" :diff="textB" label="label">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </TextBox>

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
