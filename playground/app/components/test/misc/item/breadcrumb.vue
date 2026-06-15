<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\misc\item\breadcrumb.vue
// ----------------------------------------------------------------------------
// TestMiscItemBreadcrumb
// TestMiscItemBreadcrumbTestMiscItemBreadcrumb
---------------------------------------------------------------------------- */

const linkList = [
  //
  { label: 'home', to: '/' },
  { label: 'Interactive' },
];
const linkList2 = [
  //
  { label: 'home', to: '/' },
  { label: 'home', to: '/' },
  { label: 'home', to: '/' },
  { label: 'InteractiveInteractiveIInteractiventeractive' },
];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Breadcrumb </CardItem>
    <CardItem class="" variant="body">
      <div class="grid gap-2">
        <Breadcrumb :links="linkList"></Breadcrumb>
        <Breadcrumb :links="linkList2"></Breadcrumb>
        <Breadcrumb :links="linkList" class="h-[100px]"></Breadcrumb>
      </div>
      <div class="min-h-[44px] mb-2 flex flex-col 600:flex-row gap-2">
        <div class="flex-1 h-auto">
          <Breadcrumb :links="linkList2" class="h-full" class-link="text-link" class-unlink="text-main1"></Breadcrumb>
        </div>
        <div v-if="$slots.default" class="flex-none">
          <slot></slot>
        </div>
      </div>
    </CardItem>
  </Card>
</template>
