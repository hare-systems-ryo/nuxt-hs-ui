<script setup lang="ts">
/* ----------------------------------------------------------------------------
playground\components\test-ui\test\modal.vue
// ----------------------------------------------------------------------------
TestUiTestModal
TestUiTestModalTestUiTestModal
----------------------------------------------------------------------------- */

import { useStoreModal } from '../../../../src/runtime/components/hs-ui/modal/use-ui-modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const showModal1 = ref(false);
const showModal2 = ref(false);
const focusTargetElm1 = ref<HTMLElement | null>(null);
const focusTargetElm2 = ref<HTMLElement | null>(null);

watch(showModal1, (v) => {
  if (!focusTargetElm1.value) return;
  if (v) {
    const options = {
      reserveScrollBarGap: true,
    };
    disableBodyScroll(focusTargetElm1.value, options);
  } else {
    enableBodyScroll(focusTargetElm1.value);
  }
});
watch(showModal2, (v) => {
  if (!focusTargetElm2.value) return;
  if (v) {
    const options = {
      reserveScrollBarGap: true,
    };
    disableBodyScroll(focusTargetElm2.value, options);
  } else {
    enableBodyScroll(focusTargetElm2.value);
  }
});
const storeModal = useStoreModal();
</script>
<template>
  <HsUiCard class="">
    <HsUiCardItem class="bg-main1 text-white" variant="header"> Modal </HsUiCardItem>
    <HsUiCardItem class="bg-back" variant="body">
      <HsFcBtn color="main1" variant="flat" @click="showModal1 = true"> show </HsFcBtn>
      <ClientOnly>
        <div class="">activeList : {{ storeModal.state.activeList }}</div>
        <div class="">activeId : {{ String(storeModal.activeId) }}</div>
      </ClientOnly>
    </HsUiCardItem>
    <!--  -->
    <HsUiModal :show="showModal1" focus-lock @close="() => (showModal1 = false)">
      <HsUiCard class="max-h-full h-full" @click.stop>
        <HsUiCardItem class="bg-main1 text-white" variant="header">
          Modal
          <HsFcBtn color="main1" variant="flat" class="border-white" @click="showModal1 = false"> Close </HsFcBtn>
        </HsUiCardItem>
        <HsUiCardItem class="bg-back" variant="body" @ref="(e) => (focusTargetElm1 = e)">
          <HsFcBtn color="accent1" variant="flat" @click="showModal2 = true"> showModal2</HsFcBtn>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="bg-error">bottom</div>
        </HsUiCardItem>
      </HsUiCard>
    </HsUiModal>
    <!--  -->
    <HsUiModal :show="showModal2" @close="() => (showModal2 = false)">
      <HsUiCard class="max-h-full max-w-full w-[500px]" @click.stop>
        <HsUiCardItem class="bg-main2 text-white" variant="header">
          Modal
          <HsFcBtn color="main1" variant="flat" class="border-white" @click="showModal2 = false"> Close </HsFcBtn>
        </HsUiCardItem>
        <HsUiCardItem class="bg-back" variant="body" @ref="(e) => (focusTargetElm2 = e)">
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
        </HsUiCardItem>
      </HsUiCard>
    </HsUiModal>
  </HsUiCard>
</template>
<style lang="scss" scoped></style>
