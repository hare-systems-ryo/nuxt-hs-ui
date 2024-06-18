<script setup lang="ts">
/* ----------------------------------------------------------------------------
playground\components\test-fc\test\btn.vue
// ----------------------------------------------------------------------------
TestFcTestBtn
TestFcTestBtnTestFcTestBtn
----------------------------------------------------------------------------- */
const btnColorList = [
  'main0',
  'main1',
  'main2',
  'main3',
  'accent1',
  'accent2',
  //
  'info',
  'link',
  'download',
  'success',
  'warn',
  'error',
  //
  'white',
  'black',
  'dark',
  'back',
] as const;
const c = () => {
  console.log('click');
};
const loading = ref(false);
const disabled = ref(false);
</script>
<template>
  <HsUiCard class="mt-4">
    <HsUiCardItem class="" variant="header"> Box </HsUiCardItem>
    <HsUiCardItem class="" variant="body">
      <div class="flex gap-2">
        <HsFcBtn theme="accent1" variant="outlined" class="" @click="loading = !loading">
          loading {{ loading }}
        </HsFcBtn>
        <HsFcBtn theme="accent1" variant="outlined" class="" @click="disabled = !disabled">
          disabled {{ disabled }}
        </HsFcBtn>
      </div>
      <div class="">btn</div>
      <div class="grid grid-cols-8 gap-2 mt-1">
        <template v-for="(color, index) in btnColorList" :key="index">
          <HsFcBtn :theme="color" variant="flat" :disabled="disabled" :loading="loading" @click="c">
            {{ color }}</HsFcBtn
          >
        </template>
      </div>
      <div class="grid grid-cols-8 gap-2 mt-1">
        <template v-for="(color, index) in btnColorList" :key="index">
          <HsFcBtn :theme="color" variant="outlined" :disabled="disabled" :loading="loading" @click="c">
            {{ color }}</HsFcBtn
          >
        </template>
      </div>
      <div class="mt-3">a link</div>
      <div class="mt-3">variant=flat</div>
      <div class="grid grid-cols-8 gap-2">
        <template v-for="(color, index) in btnColorList" :key="index">
          <HsFcBtn :theme="color" variant="flat" to="#" @click="c"> {{ color }}</HsFcBtn>
        </template>
      </div>
      <div class="mt-3">variant=outlined</div>
      <div class="grid grid-cols-8 gap-2">
        <template v-for="(color, index) in btnColorList" :key="index">
          <HsFcBtn :theme="color" variant="outlined" to="#" @click="c"> {{ color }}</HsFcBtn>
        </template>
      </div>
      <div class="mt-3">
        <HsFcBtn theme="accent1" variant="outlined" class="mt-3">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </HsFcBtn>
        <HsFcBtn theme="accent1" variant="outlined" text-wrap class="mt-3">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </HsFcBtn>
      </div>
    </HsUiCardItem>
  </HsUiCard>
</template>
