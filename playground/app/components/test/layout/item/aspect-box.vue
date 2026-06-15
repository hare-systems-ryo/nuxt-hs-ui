<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\layout\item\aspect-box.vue
// ----------------------------------------------------------------------------
// TestLayoutItemAspectBox
// TestLayoutItemAspectBoxTestLayoutItemAspectBox
---------------------------------------------------------------------------- */
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> AspectBox </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-4 gap-2">
        <div>
          <AspectBox rate="2:3" class="border border-main1 p-3 bg-main3">
            <div class="h-full w-full flex items-center justify-center">
              2:3
            </div>
          </AspectBox>
        </div>
        <div>
          <AspectBox rate="1:1" class="border border-main1 p-3 bg-main3">
            <div class="h-full w-full flex items-center justify-center">
              1:1
            </div>
          </AspectBox>
        </div>
        <div>
          <AspectBox rate="3:2" class="border border-main1 p-3 bg-main3">
            <div class="h-full w-full flex items-center justify-center">
              3:2
            </div>
          </AspectBox>
        </div>
        <div>
          <AspectBox rate="16:9" class="border border-main1 p-3 bg-main3">
            <div class="h-full w-full flex items-center justify-center">
              16:9
            </div>
          </AspectBox>
        </div>
      </div>
    </CardItem>
  </Card>
</template>
