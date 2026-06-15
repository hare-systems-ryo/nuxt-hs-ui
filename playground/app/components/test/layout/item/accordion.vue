<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\layout\item\accordion.vue
// ----------------------------------------------------------------------------
// TestLayoutItemAccordion
// TestLayoutItemAccordionTestLayoutItemAccordion
---------------------------------------------------------------------------- */
const isOpen = ref(true);
const isOpen2 = ref(true);
</script>

<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Accordion </CardItem>
    <CardItem class="" variant="body">
      <div class="flex gap-2 items-center">
        <div class="">isOpen = {{ isOpen }}</div>
        <Btn variant="outlined" theme="accent1" @click="isOpen = !isOpen">
          {{ !isOpen }}
        </Btn>
      </div>
      <div class="py-1"></div>
      <div class="grid grid-cols-2 gap-2">
        <Accordion :open="isOpen">
          <div class="border border-main1 p-3 bg-main3">
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </Accordion>
        <Accordion :open="!isOpen">
          <div class="border border-main1 p-3 bg-main3">
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </Accordion>
      </div>
      <div class="py-3"></div>
      <div class="flex gap-2 items-center">
        <div class="">isOpen2 = {{ isOpen2 }}</div>
        <Btn variant="outlined" theme="accent1" @click="isOpen2 = !isOpen2">
          {{ !isOpen }}
        </Btn>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <AccordionDown :open="isOpen2">
          <div class="border border-main1 p-3 bg-main3">
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </AccordionDown>
        <AccordionDown :open="!isOpen2">
          <div class="border border-main1 p-3 bg-main3">
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
            <div class="py-1">aa</div>
          </div>
        </AccordionDown>
      </div>
    </CardItem>
  </Card>
</template>
