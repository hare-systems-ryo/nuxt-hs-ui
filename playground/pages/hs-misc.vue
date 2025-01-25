<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\pages\hs-misc.vue
----------------------------------------------------------------------------- */

definePageMeta({
  layout: "default",
});
useHead({
  title: () => "Test :: MISC",
});
const linkList = [
  //
  { label: "home", to: "/" },
  { label: "MISC" },
];
</script>
<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestMisc />
  </Container>
</template>
