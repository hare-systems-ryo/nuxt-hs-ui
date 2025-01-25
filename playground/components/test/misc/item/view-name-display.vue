<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\misc\item\view-name-display.vue
// ----------------------------------------------------------------------------
// TestMiscItemViewNameDisplay
// TestMiscItemViewNameDisplayTestMiscItemViewNameDisplay
----------------------------------------------------------------------------- */

const targetElm = ref<HTMLElement | null>(null);
</script>
<template>
  <Card class="mt-4">
    <ViewNameDisplayTarget v-model:target="targetElm" />
    <CardItem class="" variant="header"> ViewNameDisplay </CardItem>
    <CardItem class="" variant="body">
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <div class="py-20"></div>
      <ViewNameDisplay :header-elm="targetElm" component-name="View Name" />
    </CardItem>
  </Card>
</template>
