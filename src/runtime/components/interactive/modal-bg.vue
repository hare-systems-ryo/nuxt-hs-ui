<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\modal-bg.vue
// ----------------------------------------------------------------------------
// ModalBg
// ModalBgModalBg
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { computed } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// [ composables ]
import { useHsModal } from "../../composables/use-hs-modal";
// ----------------------------------------------------------------------------
// [ com > lib > * ]
// ----------------------------------------------------------------------------
type Props = {
  class?: ClassType;
};
const props = withDefaults(defineProps<Props>(), {
  class: "",
});

const hsModal = useHsModal();

const zIndex = computed(() => {
  if (hsModal.state.activeList.length === 0) return -1;
  return Math.max(...hsModal.state.activeList.map((row) => row.zIndex)) - 1;
});

const activeData = computed(() => {
  const len = hsModal.state.activeList.length;
  if (len === 0) return null;
  return hsModal.state.activeList[len - 1];
});

const bg = computed(() => {
  if (activeData.value === null) return "";
  if (activeData.value.closeable) {
    // 外枠で閉じれるモーダル
    return "bg-slate-700/[0.6]";
  }
  return "bg-blue-800/[0.8]";
});

const isShow = computed(() => {
  if (hsModal.state.activeList.length === 0) return false;
  return true;
});

const classStyle = computed(() => {
  return twMerge(
    "transition-opacity",
    "fixed",
    "inset-0",
    "transition-opacity",
    bg.value,
    // isShow.value ? 'pointer-events-auto' : 'pointer-events-none',
    isShow.value ? "opacity-100" : "opacity-0",
    ClassTypeToString(props.class)
  );
});

const closeAll = () => {
  hsModal.removeAll();
};
</script>

<template>
  <Teleport to="body">
    <!--  -->
    <div
      class="ModalBg"
      :class="classStyle"
      :style="{ zIndex: zIndex }"
      @click.stop="closeAll()"
    />
  </Teleport>
</template>
