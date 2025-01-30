<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\radio.vue
// ----------------------------------------------------------------------------
// TestFormItemRadio
// TestFormItemRadioTestFormItemRadio
----------------------------------------------------------------------------- */

import type { SelectItem } from "../../../../../src/runtime/utils/select-item";

const valueA = ref<number | null>(1);
const valueB = ref<number | null>(null);
const listA: SelectItem[] = [
  {
    id: 1,
    text: "id:1",
    order: 1,
    imgUrl: "/assets/code-color-group/gray.png",
  },
  {
    id: 2,
    text: "id:2",
    order: 2,
    imgUrl: "/assets/code-color-group/green.png",
  },
  // {
  //   id: 3,
  //   text: "id:3ididididididididididididididididididididididididididididididididididididididididididid",
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
const listB: SelectItem[] = [
  {
    id: 1,
    text: "id:1",
    order: 3,
    hidden: true,
  },
  {
    id: 2,
    text: "id:2",
    order: 2,
    deleted: true,
  },
  {
    id: 3,
    text: "id:3",
    order: 1,
  },
];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Radio </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-1 gap-2">
        <Radio
          v-model:data="valueA"
          :diff="valueB"
          :list="listA"
          size="s"
          label="listA:valueA"
          image
          class-img-tag="object-cover"
        />
        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          label="listA:valueA"
        />
        <Radio
          v-model:data="valueA"
          :list="listB"
          size="l"
          label="listB:valueA"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          label="listA:valueA"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          require
          label="require"
        />

        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          nullable
          label="nullable"
        />
        <Radio
          v-model:data="valueA"
          :list="listA"
          size="m"
          label="!nullable"
        />
      </div>
    </CardItem>
  </Card>
</template>
