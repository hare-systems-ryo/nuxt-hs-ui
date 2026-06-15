<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\divider-h.vue
// ----------------------------------------------------------------------------
// DividerH
// DividerHDividerH
---------------------------------------------------------------------------- */
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { computed } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';

import { Theme, type ThemeColor, GetColorCode } from '../../utils/theme';
// ----------------------------------------------------------------------------
type Theme = keyof {
  main0: '#183C5E';
  main1: '#2C5A85';
  main2: '#487CB4';
  main3: '#A7CDED';
};

// type ThemeK = Record<Theme, Theme>;

// [ Props ]
interface Props {
  theme?: ThemeColor;
  size?: number;
  span1?: number;
  span2?: number;
  class?: ClassType;
}
const props = withDefaults(defineProps<Props>(), {
  // theme: '',
  theme: Theme.main0,
  size: 2,
  span1: 4,
  span2: 8,
  class: '',
});

const style = computed(() => {
  return [
    `--main-color:${GetColorCode(props.theme)};`,
    `--size:${props.size}px;`,
    `--span1:${props.span1}px;`,
    `--span2:${props.span2}px;`,
  ];
});
const classStyle = computed(() => {
  return twMerge('h-[var(--size)] w-full', ClassTypeToString(props.class));
});
</script>

<template>
  <div class="divider" :class="classStyle" :style="style"></div>
</template>

<style lang="scss" scoped>
.divider {
  background-image: linear-gradient(
    to right,
    var(--main-color),
    var(--main-color) var(--span1),
    transparent var(--span1),
    transparent var(--span2)
  );
  background-size: var(--span2) var(--span1);
  background-repeat: repeat-x;
  background-position: left bottom;
}
</style>
