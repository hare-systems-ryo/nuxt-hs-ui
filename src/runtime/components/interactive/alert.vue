<script lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\alert.vue
// ----------------------------------------------------------------------------
// Alert
// AlertAlert
----------------------------------------------------------------------------- */

// [ utils ]
import { tv } from "../../utils/tv";
import type { Theme } from "../../utils/theme";
const alertTv = tv({
  slots: {
    base: [
      //
      `p-2`,
      "bg-white border-2 border-[var(--main-color)] text-[color-mix(in_srgb,_var(--main-color)_,_#000_30%)]",
      "rounded-xl overflow-hidden",
    ],
    bg: "absolute inset-0 bg-[var(--main-color)] opacity-10",
    inner: "",
  },
  variants: {
    variant: {
      header: {
        base: [`flex justify-between items-center`],
      },
      body: {
        base: [``],
      },
      footer: {
        base: [`flex justify-between items-center`],
      },
    },
    scroll: {
      true: {
        base: "overflow-y-auto overflow-x-hidden flex-1",
      },
      false: {
        base: "flex-y-none",
      },
    },
  },
});
</script>
<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\alert.vue
// ----------------------------------------------------------------------------
// Alert
// AlertAlert
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
// [ NUXT ]
import { computed, useRuntimeConfig } from "#imports";
// [ utils ]
import { type ClassType, ClassTypeToString } from "../../utils/class-style";
import { GetGolorCode } from "../../utils/theme";

// ----------------------------------------------------------------------------
const { public: config } = useRuntimeConfig();
// ----------------------------------------------------------------------------

interface Props {
  class?: ClassType;
  classBg?: ClassType;
  classInner?: ClassType;
  theme?: Theme;
}
const props = withDefaults(defineProps<Props>(), {
  class: "",
  classBg: "",
  classInner: "",
  theme: "info",
});
// ----------------------------------------------------------------------------

const styleMain = computed(() => {
  return [
    //
    `--main-color:${GetGolorCode(props.theme)};`,
  ];
});
const classTv = computed(() => {
  return alertTv({});
});

const classTvBase = computed(() => {
  return classTv.value.base({
    class: ClassTypeToString(props.class),
  });
});

const classTvBg = computed(() => {
  return classTv.value.bg({
    class: ClassTypeToString(props.classBg),
  });
});

const classTvInner = computed(() => {
  return classTv.value.inner({
    class: ClassTypeToString(props.classInner),
  });
});
</script>

<template>
  <div :class="classTvBase" :style="styleMain">
    <div :class="classTvBg"></div>
    <div :class="classTvInner">
      <slot />
    </div>
  </div>
</template>
