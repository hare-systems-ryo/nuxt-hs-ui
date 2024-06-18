<script setup lang="ts">
// [ vue ]

import { computed, ref } from 'vue';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../lib/com';
import { GetPrefix, RemovePrefix } from '../lib/prefix';

// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: GetPrefix(),
});
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  text?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: 'hello',
});

const baseClass = RemovePrefix([
  //
  'bg-blue-400',
  'tw-bg-blue-400',
  `m-0`,
  `sm:m-4`,
  `tw-m-0`,
  `sm:tw-m-4`,
]);

const topClass = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});
const counter = ref(0);
</script>
<template>
  <div class="tw-my-3">
    <button class="text-message" :class="topClass" @click="counter++">
      {{ topClass }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.text-message {
  //   background: rgb(255, 243, 221);
  color: black;
  border: solid 2px rgb(227, 123, 27);
  padding: 2px 10px;
  border-radius: 4px;
  outline: none;
  font-weight: bold;
}
</style>
