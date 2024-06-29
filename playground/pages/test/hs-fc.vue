<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\test-vui.vue
----------------------------------------------------------------------------- */

definePageMeta({
  layout: 'default',
});
useHead({
  title: () => 'Test HS FormControl',
});
</script>
<template>
  <HsUiContainer class="">
    <TestFc class=""/>
  </HsUiContainer>
</template>
