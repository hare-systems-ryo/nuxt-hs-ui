<script setup lang="ts">
/* ----------------------------------------------------------------------------
components\page\test-ui\test\toast.vue
// ----------------------------------------------------------------------------
PageTestUiTestToast
PageTestUiTestToastPageTestUiTestToast
----------------------------------------------------------------------------- */

const Toast = useHsUiToast();

const test = () => {
  Toast.s('Success', 'SuccessSuccess', 3000);
  Toast.i('Info', 'InfoInfo', 3200);
  Toast.w('Warning', 'WarningWarning', 3400);
  Toast.e('Error', 'ErrorError', 3600);
};
</script>
<template>
  <HsUiCard class="mt-4">
    <HsUiCardItem class="bg-main1 text-white" variant="header"> Toast </HsUiCardItem>
    <HsUiCardItem class="bg-back" variant="body">
      <div class="">only message has timeout [3000]</div>
      <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '', 30000)">
        Success : 30000
      </HsFcBtn>
      <div class="grid grid-cols-4 gap-2">
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Success('Success', '', 3000)">
          Success : 3000
        </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Info('Info', '', 3000)">
          Success : 3000
        </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '', 3000)">
          Success : 3000
        </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" @click="Toast.e('Error', '', 3000)"> Success : 3000 </HsFcBtn>
      </div>
      <div class="">only message has timeout none</div>
      <div class="grid grid-cols-4 gap-2">
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Success('Success', '')"> Success : </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Info('Info', '')"> Success : </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.Warning('Warning', '')"> Success : </HsFcBtn>
        <HsFcBtn color="accent1" variant="outlined" class="" @click="Toast.e('Error', '')"> Success : </HsFcBtn>
      </div>
      <div class="">test</div>
      <div class="grid grid-cols-4 gap-2">
        <HsFcBtn color="accent1" variant="outlined" @click="test"> test </HsFcBtn>
      </div>
    </HsUiCardItem>
  </HsUiCard>
</template>
