<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\view-name-display-target.vue
// ----------------------------------------------------------------------------
// ViewNameDisplayTarget
// ViewNameDisplayTargetViewNameDisplayTarget
----------------------------------------------------------------------------- */

// [ NUXT ]
import { computed } from "#imports";
// ----------------------------------------------------------------------------
// [ Props ]
interface Props {
  // isShow: boolean;
  offset?: number|string;
  target: HTMLElement | null;
}
const props = withDefaults(defineProps<Props>(), {
  offset: 10,
});
type Emits = {
  "update:target": [e: HTMLElement];
};
const emit = defineEmits<Emits>();
const style = computed(() => {
  return `margin-top:-${props.offset}px;z-index:999;`;
});
const setRef = (e: HTMLElement) => {
  emit("update:target", e);
};
</script>

<template>
  <div
    :ref="(e:any) => setRef(e)"
    class="absolute top-0 pointer-events-none"
    :style="style"
  ></div>
</template>
