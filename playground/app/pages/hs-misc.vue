<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\pages\hs-misc.vue
// ----------------------------------------------------------------------------
// PagesHsMisc
// PagesHsMiscPagesHsMisc
---------------------------------------------------------------------------- */

definePageMeta({
  layout: 'default',
});
useHead({
  title: () => 'Test :: MISC',
});
const linkList = [
  //
  { label: 'home', to: '/' },
  { label: 'MISC' },
];
</script>
<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestMisc />
  </Container>
</template>
