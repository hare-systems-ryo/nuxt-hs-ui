<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\block-loading.vue
// ----------------------------------------------------------------------------
// BlockLoading
// BlockLoadingBlockLoading
---------------------------------------------------------------------------- */

// [ NUXT ]
import { computed } from '#imports';
// [ tailwind ]
import { twMerge } from 'tailwind-merge';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
type Props = {
  class?: ClassType;
  show: boolean;
  message?: string;
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
  message: 'Loading',
});

const variableStyle = computed(() => {
  if (props.show) {
    return [
      //
      'pointer-events-auto',
      'opacity-100',
    ];
  }
  return [
    //
    'pointer-events-none',
    'opacity-0',
  ];
});

const classStyle = computed(() => {
  return twMerge(
    'z-100',
    'px-2',
    'pt-2',
    'pb-1',
    'absolute',
    'inset-0',
    'h-full',
    'w-full',
    'overflow-hidden',
    'bg-[#13175C]/[0.5]',
    'flex',
    'items-center',
    'justify-center',
    'transition-opacity',
    variableStyle.value,
    ClassTypeToString(props.class)
  );
});
</script>

<template>
  <div class="HsUiBlockLoading" :class="[classStyle]">
    <div class="loading-container relative">
      <div class="loading-item ">
        <div class="loading-ball relative" />
        <div class="loading-ball relative" />
        <div class="loading-ball relative" />
      </div>
      <div class="loading-text">{{ props.message }}<slot /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  width: 50%;
  max-width: 200px;
  max-height: min(90%, 160px);

  &::before {
    content: '';
    display: block;
    padding-top: 56.25%;
    padding-top: 40%;
  }
}
.loading-item {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 20px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100% - 20px);
}
.loading-ball {
  height: 100%;
  width: 40px;
  max-width: 60px;
  // border: solid 1px gray;

  &::before,
  &::after {
    left: 10px;
    position: absolute;
    content: '';
    display: block;
    border-radius: 50%;
    background-color: red;
  }

  &::before {
    z-index: 1;
    top: 0px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    animation: HsUiBlockLoading-anime1 0.5s alternate infinite ease;
  }

  &::after {
    z-index: 0;
    bottom: 0px;
    width: 16px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(35, 32, 55);
    animation: HsUiBlockLoading-anime2 0.5s alternate infinite ease;
  }
  &:nth-child(2)::before,
  &:nth-child(2)::after {
    animation-delay: 0.2s;
  }

  &:nth-child(3)::before,
  &:nth-child(3)::after {
    animation-delay: 0.3s;
  }
}

.loading-text {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

<style lang="scss">
@keyframes HsUiBlockLoading-anime1 {
  0% {
    top: calc(100% - 4px);
    height: 5px;
    border-radius: 50% 50% 25% 25%;
    transform: scaleX(1.4);
  }

  40% {
    height: 16px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0%;
  }
}

@keyframes HsUiBlockLoading-anime2 {
  0% {
    transform: scaleX(1.5);
  }

  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }

  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
}
</style>
