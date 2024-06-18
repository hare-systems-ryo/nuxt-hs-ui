<script setup lang="ts">
/* ----------------------------------------------------------------------------
playground\components\test-ui\test\accordion.vue
// ----------------------------------------------------------------------------
TestUiTestAccordion
TestUiTestAccordionTestUiTestAccordion
----------------------------------------------------------------------------- */

const open1 = ref(true);
const open2 = ref(true);
const open3 = ref(true);
</script>
<template>
  <div>
    <HsUiCard class="mt-4 bg-back">
      <HsUiCardItem v-model:is-open="open1" class="bg-main1 text-white" variant="header"> Accordion </HsUiCardItem>
      <HsUiCardItem class="bg-back" variant="body"> open1 = {{ open1 }} </HsUiCardItem>

      <HsUiCardItem class="bg-back" variant="body" :accordion="open1">
        <div class="h-[1px] bg-main1 -mx-2"></div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
        <div class="py-1">aa</div>
      </HsUiCardItem>
    </HsUiCard>
    <HsUiCard class="mt-4">
      <HsUiCardItem class="bg-back" variant="body">
        <div class="">
          <HsFcBtn color="accent1" :aria-expanded="open2" variant="outlined" @click="open2 = !open2">
            open2 = {{ open2 }}
          </HsFcBtn>
        </div>
        <HsUiAccordion :open="open2">
          <div class="">
            <div v-if="open2" class="mt-2 h-[1px] bg-main1"></div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </HsUiAccordion>
        <div class="mt-2 mb-1">
          <HsFcBtn color="accent1" :aria-expanded="open3" variant="outlined" @click="open3 = !open3">
            open3 = {{ open3 }}
          </HsFcBtn>
        </div>
        <HsUiAccordion :open="open3">
          <div class="border border-main2 border-1 rounded-sm p-2">
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </HsUiAccordion>
      </HsUiCardItem>
    </HsUiCard>
  </div>
</template>
