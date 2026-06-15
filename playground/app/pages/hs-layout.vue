<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\pages\hs-layout.vue
// ----------------------------------------------------------------------------
// PagesHsLayout
// PagesHsLayoutPagesHsLayout
---------------------------------------------------------------------------- */

definePageMeta({
  layout: "default",
});
useHead({
  title: () => "Test :: Layout",
});
const linkList = [
  //
  { label: "home", to: "/" },
  { label: "Layout" },
];
</script>

<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestLayout />
  </Container>
</template>
