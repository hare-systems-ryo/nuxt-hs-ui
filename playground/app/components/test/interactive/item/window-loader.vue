<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\interactive\item\window-loader.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemWindowLoader
// TestInteractiveItemWindowLoaderTestInteractiveItemWindowLoader
---------------------------------------------------------------------------- */

const WindowLoader = useHsWindowLoader();
const test = () => {
  WindowLoader.Show();
  setTimeout(() => {
    WindowLoader.Hide();
  }, 3000);
};
</script>
<template>
  <Card class="mt-4">
    <CardItem variant="header"> WindowLoader </CardItem>
    <CardItem variant="body">
      <Btn color="accent1" variant="outlined" class="bg-white" @click="test">
        test
      </Btn>
    </CardItem>
  </Card>
</template>
