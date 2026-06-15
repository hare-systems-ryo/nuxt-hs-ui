<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\pages\index.vue
// ----------------------------------------------------------------------------
// Pages
// PagesPages
---------------------------------------------------------------------------- */
import { CalendarDate } from '@internationalized/date';
const hsMisc = useHsMisc(useHsPinia());

onMounted(() => {
  hsMisc.init();
});
const modelValue = shallowRef(new CalendarDate(2022, 1, 10));
</script>

<template>
  <Container fluid>
    <Main></Main>
    <Card class="">
      <CardItem variant="header"> Modal </CardItem>
      <CardItem variant="body">
        <UPopover arrow>
          <UButton label="Open" color="neutral" variant="subtle" />
          <template #content>
            <UCalendar v-model="modelValue" class="p-2" />
            <!-- <div class="p-4">hogehoghe</div> -->
          </template>
        </UPopover>
      </CardItem>
    </Card>
    <!-- <Breadcrumb :links="linkList"></Breadcrumb> -->
  </Container>
</template>
