<script setup lang="ts">
/* ----------------------------------------------------------------------------
  layouts\default.vue
---------------------------------------------------------------------------- */
// const fixedHeader = "shadow-lg fixed left-0 top-0 right-0 z-50";
// const fixedContent = "mt-[60px]";
const multiLang = useHsMultiLang();
const toggleLang = () => {
  if (multiLang.lang === "ja") {
    multiLang.state.lang = "en";
  } else {
    multiLang.state.lang = "ja";
  }
};
</script>
<template>
  <div class="">
    <header class="bg-main1 text-white flex items-center h-[60px] px-2">
      <Btn to="/" theme="white" variant="text" class="py-0 min-h-auto">
        <div class="text-[20px] leading-[1.5em] sm:text-[24px]">
          <span class="hidden sm:inline">Module</span>
          [ nuxt-hs-ui ]
        </div>
      </Btn>
      <div class="flex grid-cols-3 gap-3 ms-3">
        <Btn to="/hs-form" theme="white" variant="text" class=""> Form </Btn>
        <Btn to="/hs-interactive" theme="white" variant="text" class="">
          Interactive
        </Btn>
        <Btn to="/hs-layout" theme="white" variant="text" class="">
          Layout
        </Btn>
        <Btn to="/hs-misc" theme="white" variant="text" class=""> MISC </Btn>
        <Btn theme="white" variant="text" class="" @click="toggleLang()">
          {{ multiLang.lang }}
        </Btn>
      </div>
      <div class="bg-white absolute top-full left-0 right-0 h-[1px]"></div>
    </header>
    <div class="pt-3">
      <slot />
    </div>
    <div class="py-10" />
  </div>
</template>
