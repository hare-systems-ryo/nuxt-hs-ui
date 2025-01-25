<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\pages\hs-interactive.vue
----------------------------------------------------------------------------- */

definePageMeta({
  layout: "default",
});
useHead({
  title: () => "Test : Interactive",
});
const linkList = [
  //
  { label: "home", to: "/" },
  { label: "Interactive" },
];
</script>

<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestInteractive />
  </Container>
</template>
