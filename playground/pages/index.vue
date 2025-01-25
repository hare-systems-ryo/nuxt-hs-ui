<script setup lang="ts">
// import { type ClassType, ClassTypeToString } from 'nuxt-hs-ui/lib/com';
// import { RemovePrefix } from 'nuxt-hs-ui/lib/com';
const linkList = [
  //
  { label: "home" },
];
</script>
<template>
  <Container fluid>
    <Breadcrumb :links="linkList"></Breadcrumb>
  </Container>
</template>
