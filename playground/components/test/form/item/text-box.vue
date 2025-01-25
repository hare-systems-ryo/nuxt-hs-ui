<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\text-box.vue
// ----------------------------------------------------------------------------
// TestFormItemTextBox
// TestFormItemTextBoxTestFormItemTextBox
----------------------------------------------------------------------------- */
const disabled = ref(false);
const textA = ref("textA");
const textB = ref("");
const list = ["a", "b", "c"];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> TextBox </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-1">
          <Btn
            theme="accent1"
            variant="outlined"
            size="xs"
            @click="disabled = !disabled"
          >
            {{ !disabled }}
          </Btn>
          <div class="">disabled = {{ disabled }}</div>
        </div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>通常</div>
      <div class="flex items-start gap-2">
        <TextBox
          v-model:data="textA"
          :diff="textB"
          size="s"
          label=""
          :disabled="disabled"
        />
        <TextBox
          v-model:data="textA"
          :diff="textB"
          size="s"
          label="ラベル付き"
          :disabled="disabled"
        />
        <TextBox
          v-model:data="textA"
          :diff="textB"
          size="s"
          label="文字数制限"
          :max-len="20"
          :disabled="disabled"
        />
        <div class="h-[44px] w-4 bg-red-600 flex-cc text-white"></div>
      </div>
      <!-- ------------------------------------------------ -->
      <div class="p-1"></div>
      <div>datalist付き</div>
      <TextBox v-model:data="textB" size="s" label="" :datalist="list" />
      <!--  -->

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
