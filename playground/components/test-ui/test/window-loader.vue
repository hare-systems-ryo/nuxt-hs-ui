<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\page\test-ui\test\window-loader.vue
// ----------------------------------------------------------------------------
PageTestUiTestWindowLoader
PageTestUiTestWindowLoaderPageTestUiTestWindowLoader
----------------------------------------------------------------------------- */

const WindowLoader = useHsUiWindowLoader();
const test = () => {
  WindowLoader.Show();
  setTimeout(() => {
    WindowLoader.Hide();
  }, 3000);
};
</script>
<template>
  <HsUiCard class="mt-4">
    <HsUiCardItem class="bg-main1 text-white" variant="header"> WindowLoader </HsUiCardItem>
    <HsUiCardItem class="bg-back" variant="body">
      <HsFcBtn color="accent1" variant="outlined" class="bg-white" @click="test"> test </HsFcBtn>
    </HsUiCardItem>
  </HsUiCard>
</template>
