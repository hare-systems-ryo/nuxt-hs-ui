<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\interactive\item\dialog.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemDialog
// TestInteractiveItemDialogTestInteractiveItemDialog
----------------------------------------------------------------------------- */
const dialogResult1 = ref<string>("");
const dialogResult2 = ref<string>("");
const Dialog = useHsDialog();
const test1 = async () => {
  dialogResult1.value = "";
  dialogResult2.value = "";
  // const Color = Dialog.Color;
  const option = Dialog.InitOption();
  option.theme = Dialog.Themes.main1;
  option.btnCancel.isShow = false;
  option.btnLeft.isShow = true;
  option.btnLeft.title = { ja: "キャンセル" };
  option.btnLeft.theme = Dialog.Themes.main2;
  option.btnLeft.variant = "outlined";
  option.btnRight.isShow = true;
  option.btnRight.title = { ja: "出力" };
  option.btnRight.theme = Dialog.Themes.download;
  option.btnRight.variant = "text";

  // option.btnCancel.isShow = true;
  option.btnCancel.isShow = true;
  // option.btnCancel.title = 'Cancel';
  const ret1 = await Dialog.Show("message", "title", option);
  dialogResult1.value = ret1;
  option.btnCancel.isShow = false;
  option.btnLeft.variant = "text";
  option.btnRight.variant = "outlined";
  // option.btnCancel.color = Color.main3;
  const ret2 = await Dialog.Show("message", "title", option);
  dialogResult2.value = ret2;
};
</script>
<template>
  <Card class="">
    <CardItem class="bg-main1 text-white" type="header"> Dialog </CardItem>
    <CardItem class="bg-back" type="body">
      <Btn color="accent1" variant="flat" @click="test1"> show </Btn>
      <div class="">dialogResult1 : {{ dialogResult1 }}</div>
      <div class="">dialogResult2 : {{ dialogResult2 }}</div>
    </CardItem>
  </Card>
</template>
