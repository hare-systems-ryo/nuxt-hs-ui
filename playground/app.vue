<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'ja', prefix: 'og: http://ogp.me/ns#' },
  meta: [
    { 'http-equiv': 'refresh', content: '' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#FFF' },
    { hid: 'robots', name: 'robots', content: 'noindex' },
  ],
  link: [],
  script: [],
  noscript: [{ children: 'JavaScript is required' }],
  bodyAttrs: {
    class: '',
  },
});
</script>
<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <Teleport to="body">
        <!-- <div v-if="!isHideLoading" class="base-cover" :class="{ isHideLoading: storeApp.state.isReady }" :style="fixed">
        <span class="loader"></span>
      </div> -->
        <HsUiWindowLoader />
        <HsUiToast />
        <!-- <VUiFileSelect /> -->
      </Teleport>
      <HsUiModalBg />
      <HsUiDialog />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped></style>
