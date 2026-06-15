<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\breadcrumb.vue
// ----------------------------------------------------------------------------
// Breadcrumb
// BreadcrumbBreadcrumb
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { computed } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';

import Card from '../layout/card.vue';
import CardItem from '../layout/card-item.vue';
import type { MultiLang } from '../../utils/multi-lang';
import { Theme, type ThemeColor } from '../../utils/theme';

// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  links: { label: MultiLang; to?: string; icon?: string }[];
  classLink?: ClassType;
  classUnlink?: ClassType;
  theme?: ThemeColor;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  classLink: '',
  classUnlink: '',
  theme: Theme.back1,
});
// ----------------------------------------------------------------------------

const classStyle = computed(() => {
  return twMerge(`w-full  min-w-0`, ClassTypeToString(props.class));
});
const classStyleLink = computed(() => {
  return twMerge(`!text-link`, 'relative', ClassTypeToString(props.classLink));
});
const classStyleUnlink = computed(() => {
  return twMerge(`text-gray-600`, ClassTypeToString(props.classUnlink));
});
</script>

<template>
  <Card :class="classStyle">
    <CardItem class="px-1 py-1 min-w-0 h-full" :theme="props.theme" variant="body">
      <div class="flex flex-wrap gap-[2px] max-w-full relative items-center min-h-full">
        <template v-for="(item, index) in props.links" :key="index">
          <div class="truncate min-w-0 w-auto relative text-link">
            <NuxtLink v-if="item.to !== undefined" :to="item.to" :class="[classStyleLink, { hasBefore: index !== 0 }]">
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.label }}
            </NuxtLink>
            <span v-else :class="[classStyleUnlink, { hasBefore: index !== 0 }]">
              <i v-if="item.icon" :class="item.icon"></i>
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
  content: '\f054';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  color: #4b5563;
  position: absolute;
  inset: 0 auto 0 0;
  width: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
