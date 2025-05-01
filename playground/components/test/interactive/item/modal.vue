<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\interactive\item\modal.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemModal
// TestInteractiveItemModalTestInteractiveItemModal
----------------------------------------------------------------------------- */
const showModal1 = ref(false);
const showModal2 = ref(false);
const scrollLockA = useHsScrollLock();
const focusTargetElm1 = useTemplateRef<HTMLElement>("focusTargetElm1");
watch(focusTargetElm1, (elm) => {
  if (elm !== null) scrollLockA.init(elm);
});
const scrollLockB = useHsScrollLock();
const focusTargetElm2 = useTemplateRef<HTMLElement>("focusTargetElm2");
watch(focusTargetElm2, (elm) => {
  if (elm !== null) scrollLockB.init(elm);
});

onUnmounted(() => {
  // ロックしたままを回避
  scrollLockA.unlock();
  scrollLockB.unlock();
});

watch(showModal1, (v) => {
  if (v) {
    scrollLockA.lock();
  } else {
    scrollLockA.unlock();
  }
});
watch(showModal2, (v) => {
  if (v) {
    scrollLockB.lock();
  } else {
    scrollLockB.unlock();
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
      <Card ref="focusTargetElm1" class="max-h-full" @click.stop>
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
        <CardItem class="bg-back" variant="body" scroll>
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
      <Card
        ref="focusTargetElm2"
        class="max-h-full max-w-full w-[500px]"
        @click.stop
      >
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
        <CardItem class="bg-back" variant="body" scroll>
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
