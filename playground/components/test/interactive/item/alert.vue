<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\interactive\item\alert.vue
// ----------------------------------------------------------------------------
// TestInteractiveItemAlert
// TestInteractiveItemAlertTestInteractiveItemAlert
----------------------------------------------------------------------------- */
import { Theme } from "../../../../../src/runtime/utils/theme";
const ThemeList = Object.keys(Theme) as Theme[];
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Alert </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-1 gap-2">
        <template v-for="(color, index) in ThemeList" :key="index">
          <Alert :theme="color"> {{ color }} </Alert>
        </template>
      </div>
    </CardItem>
  </Card>
</template>
