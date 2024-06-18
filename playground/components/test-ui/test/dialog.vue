<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\page\test-ui\test\dialog.vue
// ----------------------------------------------------------------------------
PageTestUiTestDialog
PageTestUiTestDialogPageTestUiTestDialog
----------------------------------------------------------------------------- */

const dialogResult1 = ref<string>('');
const dialogResult2 = ref<string>('');
const Dialog = useHsUiDialog();
const test1 = async () => {
  dialogResult1.value = '';
  dialogResult2.value = '';
  // const Color = Dialog.Color;
  const option = Dialog.InitOption();
  // option.btnCancel.isShow = true;
  // option.btnCancel.title = 'Cancel';
  const ret1 = await Dialog.Show('message', 'title', option);
  dialogResult1.value = ret1;
  // option.btnCancel.color = Color.main3;
  const ret2 = await Dialog.Show('message', 'title', option);
  dialogResult2.value = ret2;
};
</script>
<template>
  <HsUiCard class="">
    <HsUiCardItem class="bg-main1 text-white" type="header"> Dialog </HsUiCardItem>
    <HsUiCardItem class="bg-back" type="body">
      <HsFcBtn color="accent1" variant="flat" @click="test1"> show </HsFcBtn>
      <div class="">dialogResult1 : {{ dialogResult1 }}</div>
      <div class="">dialogResult2 : {{ dialogResult2 }}</div>
    </HsUiCardItem>
  </HsUiCard>
</template>
