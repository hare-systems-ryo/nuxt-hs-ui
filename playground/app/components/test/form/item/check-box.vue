<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\check-box.vue
// ----------------------------------------------------------------------------
// TestFormItemCheckBox
// TestFormItemCheckBoxTestFormItemCheckBox
---------------------------------------------------------------------------- */
const valueA = ref<boolean | null>(false);
const valueB = ref<boolean | null>(null);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> CheckBox </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-2 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <CheckBox v-model:data="valueA" :diff="valueB" class="" label="ge" />
          <CheckBox v-model:data="valueB" class="">
            <i class="fa-solid fa-circle-down"></i>
            hoge
          </CheckBox>
        </div>
      </div>
      <!--  -->
      <div class="grid grid-cols-2 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <CheckBox v-model:data="valueA" :diff="valueB" size="s" label="ge" />
          <CheckBox v-model:data="valueA" :diff="valueB" size="m" label="ge" />
          <CheckBox v-model:data="valueA" :diff="valueB" size="l" label="ge" />
        </div>
        <div class="grid grid-cols-1 gap-1 my-1">
          <CheckBox v-model:data="valueA" :diff="valueB" size="s" label="ge" disabled />
          <CheckBox v-model:data="valueA" :diff="valueB" size="m" label="ge" disabled />
          <CheckBox v-model:data="valueA" :diff="valueB" size="l" label="ge" disabled />
        </div>
      </div>
      <!-- ------------------------------------------------ -->
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
