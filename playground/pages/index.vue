<script setup lang="ts">
// import { type ClassType, ClassTypeToString } from 'nuxt-hs-ui/lib/com';
import { RemovePrefix } from 'nuxt-hs-ui/lib/com';
const aaa = RemovePrefix('tw-', ['p-2', 'tw-p-2', 'sm:p-2', 'sm:tw-p-2']);
// console.log(aaa, ['p-2', 'tw-p-2', 'sm:p-2', 'sm:tw-p-2']);
</script>
<template>
  <HsUiContainer class="">
    <div class="bg-green-200">
      {{ aaa.join(' ') }}
    </div>
  </HsUiContainer>
</template>
