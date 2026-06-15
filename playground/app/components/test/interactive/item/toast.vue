<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\interactive\item\toast.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemToast
// TestInteractiveItemToastTestInteractiveItemToast
---------------------------------------------------------------------------- */

const Toast = useHsToast();

const test = () => {
  // Toast.s('SuccessSuccessSuccessSuccessSuccessSuccessSuccess', 'SuccessSuccessSuccessSuccessSuccessSuccessSuccess');
  Toast.s('Success', 'SuccessSuccess', 3000);
  Toast.i('Info', 'InfoInfo', 3200);
  Toast.w('Warning', 'WarningWarning', 3400);
  Toast.e('Error', 'ErrorError', 3600);
};
</script>
<template>
  <Card class="">
    <CardItem class="bg-main1 text-white" type="header"> Toast </CardItem>
    <CardItem class="bg-back" type="body">
      <div class="">test</div>
      <div class="grid grid-cols-4 gap-2">
        <Btn color="accent1" variant="outlined" @click="test"> test </Btn>
      </div>
      <div class="">only message has timeout [3000]</div>

      <div class="grid grid-cols-4 gap-2">
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Success('Success', '', 3000)">
          Success : 3000
        </Btn>
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Info('Info', '', 3000)"> Success : 3000 </Btn>
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '', 3000)">
          Success : 3000
        </Btn>
        <Btn color="accent1" variant="outlined" @click="Toast.e('Error', '', 3000)"> Success : 3000 </Btn>
      </div>
      <div class="">only message has timeout none</div>
      <div class="grid grid-cols-4 gap-2">
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Success('Success', '')"> Success : </Btn>
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Info('Info', '')"> Info </Btn>
        <Btn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '')"> Warning : </Btn>
        <Btn color="accent1" variant="outlined" class="" @click="Toast.e('Error', '')"> Error : </Btn>
      </div>
      <div class="">30000ms</div>
      <Btn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '', 30000)">
        Success : 30000
      </Btn>
    </CardItem>
  </Card>
</template>
