<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\check-list.vue
// ----------------------------------------------------------------------------
// TestFormItemCheckList
// TestFormItemCheckListTestFormItemCheckList
---------------------------------------------------------------------------- */

const valueA = ref<number[]>([]);
const valueB = ref<number[]>([]);
const listA = [
  {
    id: 1,
    text: 'id:1',
    order: 1,
    imgUrl: '/assets/code-color-group/gray.png',
  },
  {
    id: 2,
    text: 'id:2',
    order: 2,
    imgUrl: '/assets/code-color-group/green.png',
  },
  // {
  //   id: 3,
  //   text: "id:3ididididididididdid",
  //   order: 3,
  //   imgUrl: "/assets/code-color-group/red.png",
  // },
  // {
  //   id: 4,
  //   text: "id:4",
  //   order: 4,
  //   imgUrl: "/assets/code-color-group/pink.png",
  // },
];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> CheckList </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="-">
        <div class="flex items-start gap-2">
          <CheckList
            v-model:data="valueA"
            :diff="valueB"
            :list="listA"
            class=""
            label="ge[]"
            size="m"
            class-img-tag="object-cover"
            image
          />
          <div class="h-[44px] w-4 bg-red-600 flex items-center justify-center text-white"></div>
          <div class="h-[48px] w-4 bg-red-600 flex items-center justify-center text-white"></div>
          <div class="">{{ valueA }}</div>
        </div>
      </div>
      <CheckList v-model:data="valueA" label="label" :list="listA">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </CheckList>
      <!--  -->

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
