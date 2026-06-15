<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\pages\hs-form.vue
// ----------------------------------------------------------------------------
// PagesHsForm
// PagesHsFormPagesHsForm
---------------------------------------------------------------------------- */

definePageMeta({
  layout: 'default',
});
useHead({
  title: () => 'Test :: Form',
});
const linkList = [
  //
  { label: 'home', to: '/' },
  { label: 'Form' },
];
</script>

<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestForm />
  </Container>
</template>
