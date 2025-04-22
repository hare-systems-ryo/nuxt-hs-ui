<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\modal.vue
// ----------------------------------------------------------------------------
// Modal
// ModalModal
----------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from "tailwind-merge";
// [ NUXT ]
import { useId, computed, watch, onUnmounted } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
// [ composables ]
import { useHsModal } from "../../composables/use-hs-modal";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType;
  classInner?: ClassType;
  show: boolean;
  mounted?: boolean;
  zIndex?: number | undefined;
  /** 背景クリックで閉じれる場合に背景色を切り替える機能
   *   - closeイベントとセットで使う */
  closeable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  class: "",
  classInner: "",
  show: false,
  mounted: true,
  zIndex: undefined,
  closeable: false,
});

type Emits = {
  close: [];
  "update:show": [bool: boolean];
};
const emit = defineEmits<Emits>();

// ----------------------------------------------------------------------------
const hsModal = useHsModal();
hsModal.watch();
const id = useId();

// );

// ----------------------------------------------------------------------------
const zOrder = computed(() => {
  if (props.zIndex !== undefined) return props.zIndex;
  return hsModal.myzIndex(id).value;
});
if (props.show) {
  hsModal.add(id, props.closeable);
}
watch(
  () => props.show,
  (v) => {
    if (v) {
      hsModal.add(id, props.closeable);
    } else {
      hsModal.remove(id);
    }
  }
);
onUnmounted(() => {
  hsModal.remove(id);
});
const mounted = computed(() => {
  if (props.show) return true;
  if (props.mounted) return true;
  return false;
});
// 背景色は[VUiModalBg]が担当します

const classStyle = computed(() => {
  return twMerge(
    [
      //
      "p-2",
      "transition-opacity",
      "fixed",
      "inset-0",
      "flex",
      "justify-center",
      props.show ? "pointer-events-all" : "pointer-events-none",
    ],
    ClassTypeToString(props.class)
  );
});

const classInner = computed(() => {
  return twMerge(
    "w-full",
    "h-full",
    "p-0",
    "flex",
    "flex-col",
    "items-center",
    "overflow-auto",
    "transition-opacity",
    props.closeable ? "cursor-pointer" : "",
    props.show ? "pointer-events-all" : "pointer-events-none",
    ClassTypeToString(props.classInner)
  );
});
const closeOnBackEvent = () => {
  if (props.closeable) {
    emit("update:show", false);
    emit("close");
  }
};
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="mounted"
        :id="id"
        class="Modal"
        data-show=""
        :class="classStyle"
        :style="{ zIndex: zOrder, opacity: props.show ? 1 : 0 }"
      >
        <!-- :aria-hidden="!props.show" -->
        <div :class="classInner" @click="closeOnBackEvent">
          <slot />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss">
.Modal {
  > * > * {
    cursor: default;
  }
}
</style>
