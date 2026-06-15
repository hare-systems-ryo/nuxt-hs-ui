<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\textarea.vue
// ----------------------------------------------------------------------------
// TestFormItemTextarea
// TestFormItemTextareaTestFormItemTextarea
---------------------------------------------------------------------------- */

const textA = ref('textA');
const textB = ref('textB');
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Textarea </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-2 gap-1">
        <!-- <Textarea v-model:data="textA" size="m" label="" :max-len="30" autosize /> -->
        <Textarea v-model:data="textA" size="m"  autosize />
        <Textarea :data="''" size="m" :placeholder="textA" autosize />
      </div>

      <div>通常</div>
      <div class="grid grid-cols-2 gap-1">
        <Textarea
          v-model:data="textA"
          :diff="textB"
          size="m"
          label=""
          rows="3"
          autosize
          placeholder="あいうえおplaceholderplaceholder"
        />
        <Textarea v-model:data="textA" :diff="textB" size="m" label="" rows="3" placeholder="placeholderplaceholder" />
      </div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>文字数制限</div>
      <Textarea v-model:data="textB" size="m" label="文字数制限" :max-len="30" />
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>行数制限</div>
      <Textarea v-model:data="textB" size="m" label="文字数制限" :max-rows="6" />
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>文字数制限 + 行数制限</div>
      <Textarea v-model:data="textB" size="m" label="文字数制限" :max-rows="6" :max-len="30" />
      <!-- ------------------------------------------------ -->
      <Textarea v-model:data="textB" :diff="textB" label="label">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </Textarea>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
