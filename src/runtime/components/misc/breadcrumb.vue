<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\breadcrumb.vue
// ----------------------------------------------------------------------------
// Breadcrumb
// BreadcrumbBreadcrumb
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { computed } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";

import Card from "../layout/card.vue";
import CardItem from "../layout/card-item.vue";
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  links: { label: string; to?: string }[];
  classLink?: ClassType;
  classUnlink?: ClassType;
}
const props = withDefaults(defineProps<Props>(), {
  class: "",
  classLink: "",
  classUnlink: "",
});

const classStyle = computed(() => {
  return twMerge(`w-full  min-w-0`, ClassTypeToString(props.class));
});
const classStyleLink = computed(() => {
  return twMerge(`text-main1`, ClassTypeToString(props.classLink));
});
const classStyleUnlink = computed(() => {
  return twMerge(`text-gray-600`, ClassTypeToString(props.classUnlink));
});
</script>

<template>
  <Card :class="classStyle">
    <CardItem
      class="px-1 py-1 sm:px-4 sm:py-1 min-w-0 h-full flex-c"
      theme="back"
      variant="body"
    >
      <div class="flex flex-wrap gap-[2px] sm:gap-[4px]">
        <template v-for="(item, index) in props.links" :key="index">
          <div class="truncate min-w-0 w-full sm:w-auto">
            <NuxtLink
              v-if="item.to !== undefined"
              :to="item.to"
              :class="[classStyleLink, { hasBefore: index !== 0 }]"
            >
              {{ item.label }}
            </NuxtLink>
            <span
              v-else
              :class="[classStyleUnlink, { hasBefore: index !== 0 }]"
            >
              {{ item.label }}
            </span>
          </div>
        </template>
      </div>
    </CardItem>
  </Card>
</template>

<style lang="scss" scoped>
.hasBefore {
  padding-left: calc(1em + 4px);
}
.hasBefore::before {
  content: "\f054";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  color: #4b5563;
  position: absolute;
  inset: 0 auto 0 0;
  width: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hov::before {
  content: "";
  position: absolute;
  inset: auto auto 0 0;
  width: 0;
  height: 1px;
  background-color: white;
  transition: all 300ms ease;
}
.hov:hover::before {
  width: 100%;
}
</style>
