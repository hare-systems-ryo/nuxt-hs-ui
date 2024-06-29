<script setup lang="ts">
/* ----------------------------------------------------------------------------
src\runtime\components\hs-ui\modal\index.vue
// ----------------------------------------------------------------------------
HsUiModal
HsUiModalHsUiModal
----------------------------------------------------------------------------- */

// [ vue ]
import { computed, ref, watch, nextTick, onUnmounted } from 'vue';
// [ NUXT ]
import { useId, useRuntimeConfig } from '#imports';
// [ tailwind ]
import { extendTailwindMerge } from 'tailwind-merge';
import { type ClassType, ClassTypeToString } from '../../../lib/class-style';
import { GetPrefix, RemovePrefix } from '../../../lib/prefix';

// [ vueuse ]
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
// [ components > v-ui > modal > * ]
import { useStoreModal } from './use-ui-modal';
// ----------------------------------------------------------------------------
const runtimeConfig: any = useRuntimeConfig();
const prefix = GetPrefix(runtimeConfig);
// ----------------------------------------------------------------------------
const twMerge = extendTailwindMerge({
  prefix: prefix,
});
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType | undefined;
  classInner?: ClassType | undefined;
  show: boolean;
  mounted?: boolean;
  zIndex?: number | undefined;
  focusLock?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  classInner: '',
  show: false,
  mounted: true,
  zIndex: undefined,
  focusLock: false,
});

type Emits = {
  close: [];
};
const emit = defineEmits<Emits>();

// ----------------------------------------------------------------------------
const vUiModal = useStoreModal();
vUiModal.watch();
const id = useId();
const active = computed(() => {
  return vUiModal.activeId === id;
});
// ----------------------------------------------------------------------------
// [ focusTrap ]
const focusTargetElm = ref<HTMLElement | null>(null);
const { activate, deactivate } = useFocusTrap(focusTargetElm);
watch(
  () => [props.show, active.value],
  async () => {
    await nextTick();
    if (!props.focusLock || !active.value || !props.show) {
      deactivate();
      return;
    }
    activate();
  }
);

// ----------------------------------------------------------------------------
const zOrder = computed(() => {
  if (props.zIndex !== undefined) return props.zIndex;
  return vUiModal.myzIndex(id).value;
});
if (props.show) {
  vUiModal.add(id);
}
watch(
  () => props.show,
  (v) => {
    if (v) {
      vUiModal.add(id);
    } else {
      vUiModal.remove(id);
    }
  }
);
onUnmounted(() => {
  vUiModal.remove(id);
});
const mounted = computed(() => {
  if (props.show) return true;
  if (props.mounted) return true;
  return false;
});
// 背景色は[VUiModalBg]が担当します
const baseClass = RemovePrefix(prefix, [
  //
  'p-2',
  'tw-p-2',
  'transition-opacity',
  'tw-transition-opacity',
  'fixed',
  'tw-fixed',
  'inset-0',
  'tw-inset-0',
  'flex',
  'tw-flex',
  'justify-center',
  'tw-justify-center',
  'pointer-events-none',
  'tw-pointer-events-none',
]);

const classStyle = computed(() => {
  return twMerge(baseClass, ClassTypeToString(props.class));
});

const innerClass = RemovePrefix(prefix, [
  //
  'w-full',
  'tw-w-full',
  'h-full',
  'tw-h-full',
  'p-0',
  'tw-p-0',
  'flex',
  'tw-flex',
  'flex-col',
  'tw-flex-col',
  'items-center',
  'tw-items-center',
  'overflow-auto',
  'tw-overflow-auto',
  'transition-opacity',
  'tw-transition-opacity',
  'aaaaaa',
  'tw-aaaaaa',
  'aaaaaa',
  'tw-aaaaaa',
]);
const variableStyle = computed(() => {
  if (props.show) {
    return RemovePrefix(prefix, [
      //
      'pointer-events-auto',
      'tw-pointer-events-auto',
    ]);
  }
  return RemovePrefix(prefix, [
    //
    'pointer-events-none',
    'tw-pointer-events-none',
  ]);
});

const classInner = computed(() => {
  return twMerge(innerClass, variableStyle.value, ClassTypeToString(props.classInner));
});
const closeOnBackEvent = () => {
  emit('close');
};
</script>
<template>
  <div class="HsUiModal-Parent">
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="mounted"
          :id="id"
          class="HsUiModal"
          data-show=""
          :class="classStyle"
          :style="{ zIndex: zOrder, opacity: props.show ? 1 : 0 }"
          :aria-hidden="!props.show"
        >
          <div ref="focusTargetElm" :class="classInner" @click="closeOnBackEvent">
            <slot />
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.HsUiModal {
  > * {
    pointer-events: none;
  }
  &[aria-hidden='false'] {
    > * {
      pointer-events: all;
    }
  }
}
.HsUiModal-Parent {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
</style>
