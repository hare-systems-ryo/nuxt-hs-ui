<script setup lang="ts">
/* ----------------------------------------------------------------------------
playground\components\test-ui\test\block-loading.vue
// ----------------------------------------------------------------------------
TestUiTestBlockLoading
TestUiTestBlockLoadingTestUiTestBlockLoading
----------------------------------------------------------------------------- */
const show = ref<boolean>(false);
</script>
<template>
  <HsUiCard class="mt-4">
    <HsUiCardItem class="bg-main1 text-white" variant="header">
      BlockLoading
      <HsFcBtn color="accent1" variant="flat" @click="show = !show"> BlockLoading </HsFcBtn>
    </HsUiCardItem>
    <HsUiCardItem class="bg-back" variant="body">
      <div class="">show:{{ show }}</div>
      <HsFcBtn color="accent1" variant="flat" @click="show = !show"> blockLoadingFlag</HsFcBtn>
      <HsUiBlockLoading :show="show" />
    </HsUiCardItem>
  </HsUiCard>
</template>
