<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\interactive\item\modal.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemModal
// TestInteractiveItemModalTestInteractiveItemModal
----------------------------------------------------------------------------- */

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

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
const storeModal = useHsModal();
</script>
<template>
  <Card class="">
    <CardItem variant="header"> Modal </CardItem>
    <CardItem variant="body">
      <div class="flex gap-2">
        <Btn theme="link" variant="outlined" @click="showModal1 = true">
          Modal1
        </Btn>
        <Btn theme="link" variant="outlined" @click="showModal2 = true">
          Modal2
        </Btn>
      </div>
      <div class="">activeList : {{ storeModal.state.activeList }}</div>
      <div class="">activeId : {{ String(storeModal.activeId) }}</div>
    </CardItem>
    <!--  -->
    <Modal :show="showModal1" closeable @close="() => (showModal1 = false)">
      <Card class="max-h-full h-full" @click.stop>
        <CardItem class="bg-main1 text-white" variant="header">
          Modal
          <Btn
            color="main1"
            variant="flat"
            class="border-white"
            @click="showModal1 = false"
          >
            Close
          </Btn>
        </CardItem>
        <CardItem
          class="bg-back"
          variant="body"
          @ref="(e) => (focusTargetElm1 = e)"
        >
          <Btn color="accent1" variant="flat" @click="showModal2 = true">
            showModal2
          </Btn>
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
        </CardItem>
      </Card>
    </Modal>
    <!--  -->
    <Modal :show="showModal2" @close="() => (showModal2 = false)">
      <Card class="max-h-full max-w-full w-[500px]" @click.stop>
        <CardItem class="bg-main2 text-white" variant="header">
          Modal
          <Btn
            color="main1"
            variant="flat"
            class="border-white"
            @click="showModal2 = false"
          >
            Close
          </Btn>
        </CardItem>
        <CardItem
          class="bg-back"
          variant="body"
          scroll
          @ref="(e) => (focusTargetElm2 = e)"
        >
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
        </CardItem>
      </Card>
    </Modal>
  </Card>
</template>
<style lang="scss" scoped></style>
