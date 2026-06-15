<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\interactive\item\block-loading.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemBlockLoading
// TestInteractiveItemBlockLoadingTestInteractiveItemBlockLoading
---------------------------------------------------------------------------- */
const show = ref<boolean>(false);
</script>
<template>
  <Card class="mt-4">
    <CardItem variant="header"> BlockLoading </CardItem>
    <CardItem variant="body">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-1">
          <div class="">show = {{ show }}</div>
          <Btn color="accent1" variant="flat" @click="show = !show">
            {{ !show }}
          </Btn>
        </div>
        <div class="border-2 border-main2 p-10 relative">
          <Btn color="accent1" variant="flat" @click="show = !show">
            blockLoadingFlag
          </Btn>
          <BlockLoading :show="show" />
        </div>
      </div>
    </CardItem>
  </Card>
</template>
