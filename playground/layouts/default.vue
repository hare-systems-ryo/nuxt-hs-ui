<script setup lang="ts">
/* ----------------------------------------------------------------------------
  layouts\default.vue
---------------------------------------------------------------------------- */
</script>
<template>
  <div class="">
    <HsUiContainer class="mt-2">
      <HsUiCard>
        <HsUiCardItem class="bg-main3" variant="body">
          <div class="grid grid-cols-6 gap-2 py-2">
            <HsFcBtn to="/" theme="link" variant="outlined" class="bg-white">home</HsFcBtn>
            <HsFcBtn to="/test/hs-ui" theme="link" variant="outlined" class="bg-white"> test/hs-ui </HsFcBtn>
            <HsFcBtn to="/test/hs-fc" theme="link" variant="outlined" class="bg-white"> test/hs-fc </HsFcBtn>
          </div>
        </HsUiCardItem>
      </HsUiCard>
    </HsUiContainer>
    <div class="pt-3">
      <slot />
    </div>
    <div class="py-10"></div>
  </div>
</template>
