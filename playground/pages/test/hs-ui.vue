<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\test-vui.vue
----------------------------------------------------------------------------- */

definePageMeta({
  layout: 'default',
});
useHead({
  title: () => 'Test HS UI',
});
</script>
<template>
  <HsUiContainer class="">
    <TestUi class=""/>
  </HsUiContainer>
</template>
