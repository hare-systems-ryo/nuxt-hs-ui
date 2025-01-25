<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\view-name-display.vue
// ----------------------------------------------------------------------------
// ViewNameDisplay
// ViewNameDisplayViewNameDisplay
----------------------------------------------------------------------------- */

// [ NUXT ]
import { ref, watch, onMounted, type Ref } from "#imports";
// [ vueuse ]
import { useElementVisibility } from "@vueuse/core";
// ----------------------------------------------------------------------------
// [ utils ]
import type { MultiLang } from "../../utils/multi-lang";
// [ composables ]
import { useHsMultiLang } from "../../composables/use-hs-multi-lang";
// ----------------------------------------------------------------------------
// [ Props ]
interface Props {
  // isShow: boolean;
  componentName: MultiLang;
  headerElm: HTMLElement | null;
}
const props = defineProps<Props>();
// ----------------------------------------------------------------------------
// [ MultiLang ]
const hsMultiLang = useHsMultiLang();
const tx = hsMultiLang.tx;
// ----------------------------------------------------------------------------
let targetIsVisible: false | Ref<boolean> = false;
watch(
  () => props.headerElm,
  () => {
    targetIsVisible = useElementVisibility(props.headerElm);
  }
);

const isMounted = ref(false);
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 1000);
});

const scroll = () => {
  if (props.headerElm === null) return;
  props.headerElm.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div
    class="view-name-display flex-cc"
    :class="{ isShow: !targetIsVisible && isMounted }"
  >
    <div class="view-name elevation-4" @click.stop="scroll()">
      {{ tx(props.componentName).value }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-name-display {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 300ms;
  // background-color: white;
  // border: solid 1px green;
  pointer-events: none;

  &.isShow {
    opacity: 1;
  }
  .view-name {
    font-size: 0.8rem;
    padding: 2px 10px;
    // border-radius: 4px;
    background-color: white;
    border: solid 2px #eb6600;
    color: #eb6600;
    border: solid 2px #1c03a2;
    color: #1c03a2;
    pointer-events: all;
  }

  .view-name {
    font-size: 0.8rem;
  }

  // @media screen and (min-width: #{ 0 }px) and (max-width: #{ $app-breake-sp-tablet - 0.1}px) {
  //   top: calc(#{$app-header-height-mobile}px + 4px);

  // }

  // @media screen and (min-width: #{ $app-breake-sp-tablet  }px) {
  //   top: calc(#{$app-header-height-pc}px + 4px);
  //   .component-name {
  //     font-size: 0.9rem;
  //   }
  // }
}
</style>
