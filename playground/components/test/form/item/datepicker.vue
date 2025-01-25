<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\form\item\datepicker.vue
// ----------------------------------------------------------------------------
// TestFormItemDatepicker
// TestFormItemDatepickerTestFormItemDatepicker
----------------------------------------------------------------------------- */
const valueA = ref<string | null>("2024-12-16");
const valueB = ref<string | null>(null);
const modeAll = ref<string | null>(null);
const modeMonth = ref<string | null>(null);
const modeTime = ref<string | null>(null);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Datepicker </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid grid-cols-2 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker
            v-model:data="valueA"
            :diff="valueB"
            show-format="YYYY-MM-DD(ddd)"
            class=""
            label="ge"
          />
          <Datepicker
            v-model:data="valueA"
            :diff="valueB"
            show-format="YYYY-MM-DD(ddd)"
            class=""
            label="ge"
          />
        </div>
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker
            v-model:data="valueB"
            :diff="valueA"
            show-format="YYYY-MM-DD(ddd)"
            class=""
            label="ge"
          />
          <Datepicker
            v-model:data="valueB"
            :diff="valueA"
            show-format="YYYY-MM-DD(ddd)"
            class=""
            label="ge"
          />
        </div>
      </div>
      <!--  -->
      <div class="grid grid-cols-2 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker
            v-model:data="valueB"
            :diff="valueA"
            show-format="YYYY-MM-DD(ddd)"
            label="readonly"
            readonly
          />
          <Datepicker
            v-model:data="valueB"
            show-format="YYYY-MM-DD(ddd)"
            label="disabled"
            disabled
          />
        </div>
        <div class="grid grid-cols-1 gap-1 my-1"></div>
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker
            v-model:data="modeAll"
            mode="all"
            data-format="YYYY-MM-DD HH:mm"
            show-format="YYYY-MM-DD(ddd) HH:mm"
            label="mode:all"
          />
          <div class="">modeAll : {{ modeAll }}</div>
          <Datepicker
            v-model:data="modeMonth"
            mode="month"
            data-format="YYYY-MM-DD "
            show-format="YYYY-MM"
            label="mode:month"
          />
          <div class="">modeMonth : {{ modeMonth }}</div>
          <Datepicker v-model:data="modeTime" mode="time" label="mode:time" />
          <div class="">modeTime : {{ modeTime }}</div>
        </div>
        <div class="grid grid-cols-1 gap-1 my-1"></div>
      </div>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
