<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\interactive\item\modal.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemModal
// TestInteractiveItemModalTestInteractiveItemModal
---------------------------------------------------------------------------- */

import { type ModalControl, InitModalControl, InitModals } from '../../../../../../src/runtime/utils/modal';

// ----------------------------------------------------------------------------

// const Dialog = ();
// import {} from '../../composables/use-pinia';

interface Modal {
  testA: ModalControl;
  testB: ModalControl;
}
const modal = reactive<Modal>({
  testA: InitModalControl(),
  testB: InitModalControl(),
});
onMounted(() => InitModals(modal, nextTick));
// modal.testA.closeBefore = async () => {
//   // if(md.)
//   const option = Dialog.InitOption();
//   option.theme = Dialog.Themes.main1;
//   option.btnCancel.isShow = true;
//   option.btnLeft.isShow = true;
//   option.btnLeft.title = { ja: "キャンセル" };
//   option.btnLeft.theme = Dialog.Themes.main2;
//   option.btnLeft.variant = "outlined";
//   option.btnRight.isShow = true;
//   option.btnRight.title = { ja: "OK" };
//   option.btnRight.theme = Dialog.Themes.download;
//   option.btnRight.variant = "outlined";
//   const ret1 = await Dialog.Show("message", "title", option);
//   if (ret1 === "right") return false;
//   return true;
// };
// ----------------------------------------------------------------------------

const scrollLockA = useHsScrollLock();
const focusTargetElm1 = useTemplateRef<HTMLElement>('focusTargetElm1');
watch(focusTargetElm1, (elm) => {
  if (elm !== null) scrollLockA.init(elm);
});
const scrollLockB = useHsScrollLock();
const focusTargetElm2 = useTemplateRef<HTMLElement>('focusTargetElm2');
watch(focusTargetElm2, (elm) => {
  if (elm !== null) scrollLockB.init(elm);
});

onUnmounted(() => {
  // ロックしたままを回避
  scrollLockA.unlock();
  scrollLockB.unlock();
});

watch(
  () => modal.testA.isShow,
  (v) => {
    if (v) {
      scrollLockA.lock();
    } else {
      scrollLockA.unlock();
    }
  }
);
watch(
  () => modal.testB.isShow,
  (v) => {
    if (v) {
      scrollLockB.lock();
    } else {
      scrollLockB.unlock();
    }
  }
);
const storeModal = useHsModal();

const listNumber = Array.from({ length: 30 })
  .fill(null)
  .map((r, i) => ({ id: i, text: `id:${i}`, hidden: i == 2 }));
const valueA = ref<string | null>('2024-12-16');
</script>
<template>
  <Card class="">
    <CardItem variant="header"> Modal </CardItem>
    <CardItem variant="body">
      <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
      <div class="flex gap-2">
        <Btn theme="link" variant="outlined" @click="modal.testA.show()"> Modal1 </Btn>
        <Btn theme="link" variant="outlined" @click="modal.testB.show()"> Modal2 </Btn>
      </div>
      <div class="">activeList : {{ storeModal.state.activeList }}</div>
      <div class="">activeId : {{ String(storeModal.activeId) }}</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
      <div class="py-10">-</div>
    </CardItem>
    <!--  -->
    <Modal :show="modal.testA.isShow" closeable :mounted="false" @close="modal.testA.close()">
      <Card ref="focusTargetElm1" class="max-h-full my-auto w-[300px]">
        <CardItem class="bg-main1 text-white" variant="header">
          Modal
          <Btn color="main1" variant="flat" class="border-white" @click="modal.testA.close()"> Close </Btn>
        </CardItem>
        <CardItem class="bg-back" variant="body" scroll>
          <Btn color="accent1" variant="flat" @click="modal.testB.show()"> showModal2 </Btn>
          <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <Select :data="1" :diff="1" :list="listNumber" size="s" label="基本的な使い方" searchable />
          <Select :data="1" :diff="1" :list="listNumber" size="s" label="基本的な使い方" />
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
          <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">-</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <!-- <div class="py-10">Modal</div> -->
          <!-- <div class="py-10">Modal</div> -->
          <!-- <div class="py-10">Modal</div> -->
          <!-- <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div>
          <div class="py-10">Modal</div> -->
          <div class="py-10">Modal</div>
          <div class="bg-error">bottom</div>
        </CardItem>
      </Card>
    </Modal>
    <!--  -->
    <Modal :show="modal.testB.isShow">
      <Card ref="focusTargetElm2" class="max-h-full max-w-full w-[500px]">
        <CardItem class="bg-main2 text-white" variant="header">
          Modal
          <Btn color="main1" variant="flat" class="border-white" @click="modal.testB.close()"> Close </Btn>
        </CardItem>
        <CardItem class="bg-back" variant="body" scroll>
          <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
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
