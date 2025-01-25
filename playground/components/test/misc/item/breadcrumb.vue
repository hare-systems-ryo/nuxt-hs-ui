<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\misc\item\breadcrumb.vue
// ----------------------------------------------------------------------------
// TestMiscItemBreadcrumb
// TestMiscItemBreadcrumbTestMiscItemBreadcrumb
----------------------------------------------------------------------------- */

const linkList = [
  //
  { label: "home", to: "/" },
  { label: "Interactive" },
];
const linkList2 = [
  //
  { label: "home", to: "/" },
  { label: "home", to: "/" },
  { label: "home", to: "/" },
  { label: "InteractiveInteractiveIInteractiventeractive" },
];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Breadcrumb </CardItem>
    <CardItem class="" variant="body">
      <div class="grid gap-2">
        <Breadcrumb :links="linkList"></Breadcrumb>
        <Breadcrumb :links="linkList2"></Breadcrumb>
      </div>
    </CardItem>
  </Card>
</template>
