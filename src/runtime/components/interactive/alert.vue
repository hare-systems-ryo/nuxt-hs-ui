<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\alert.vue
// ----------------------------------------------------------------------------
// Alert
// AlertAlert
---------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ NUXT ]
import { computed } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import { type ThemeColor, GetColorCode, MakeAlertColors } from '../../utils/theme';
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  theme?: ThemeColor;
  bgDelta?: number; // 背景をどれだけ明るくするか（デフォ 0.18）
  inkDelta?: number; // "ink"の時、文字色をどれだけ暗くするか（デフォ 0.45）
  borderDelta?: number; // 枠線は背景より少し暗く（デフォ 0.10）
  over?: string; // 透明色の合成先（デフォ #fff）
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  theme: 'info',
  bgDelta: 0.5,
  inkDelta: 0.3,
  borderDelta: 0.3,
  over: '#ffffff',
});
// ----------------------------------------------------------------------------

const baseColorCode = computed(() => {
  return GetColorCode(props.theme);
});

const color = computed(() => {
  return MakeAlertColors(baseColorCode.value, {
    tone: 'ink',
    bgDelta: props.bgDelta,
    inkDelta: props.inkDelta,
    borderDelta: props.borderDelta,
  });
});

const styleMain = computed(() => {
  return [
    //
    // `--main-color:${GetColorCode(props.theme)};`,
    `--color-bg:${color.value.bg};`,
    `--color-text:${color.value.text};`,
    `--color-border:${color.value.border};`,
  ];
});

const classStyle = computed(() => {
  return twMerge(
    `relative block`,
    `p-2`,
    'border border-[var(--color-border)] text-[var(--color-text)] bg-[var(--color-bg)]',
    'rounded overflow-hidden',
    ClassTypeToString(props.class)
  );
});
</script>

<template>
  <div :class="classStyle" :style="styleMain">
    <slot />
  </div>
</template>
