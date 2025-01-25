<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\test-vui.vue
----------------------------------------------------------------------------- */

definePageMeta({
  layout: "default",
});
useHead({
  title: () => "Test :: Form",
});
const linkList = [
  //
  { label: "home", to: "/" },
  { label: "Form" },
];
</script>

<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
    <div class="py-1"></div>
    <TestForm />
  </Container>
</template>
