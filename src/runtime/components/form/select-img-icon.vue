<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\select-img-icon.vue
// ----------------------------------------------------------------------------
// SelectImgIcon
// SelectImgIconSelectImgIcon
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { computed } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// ----------------------------------------------------------------------------
type Props = {
  imgUrl?: string | null;
  classImg?: ClassType;
  classImgTag?: ClassType;
};

const props = withDefaults(defineProps<Props>(), {
  imgUrl: null,
  classImg: "",
  classImgTag: "",
});

const imgClass = computed(() => {
  return twMerge(
    //
    "border border-gray-700",
    "h-[18px] w-[36px]",
    ClassTypeToString(props.classImg)
  );
});

const imgTagClass = computed(() => {
  return twMerge(
    "object-contain w-full h-full",
    ClassTypeToString(props.classImgTag)
  );
});
</script>

<template>
  <div class="flex-cc border border-gray-300 me-[4px]" :class="imgClass">
    <img v-if="props.imgUrl" :src="props.imgUrl" alt="" :class="imgTagClass" />
    <div v-else class="text-center leading-[1em]" style="transform: scale(0.5)">
      <div>NO</div>
      <div>IMG</div>
    </div>
  </div>
</template>
