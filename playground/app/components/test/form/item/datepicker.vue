<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\datepicker.vue
// ----------------------------------------------------------------------------
// TestFormItemDatepicker
// TestFormItemDatepickerTestFormItemDatepicker
---------------------------------------------------------------------------- */
const dateValue = ref<string | null>('2024-12-16');
const valueA = ref<string | null>(null);
const valueB = ref<string | null>(null);
const modeAll = ref<string | null>(null);
// const modeMonth = ref<string | null>(null);
const modeTime1 = ref<string | null>(null);
const modeTime2 = ref<string | null>(null);
const disabled = ref(false);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Datepicker </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div class="grid sm:grid-cols-1 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker
            v-model:data="dateValue"
            mode="all"
            :diff="valueB"
            show-format="YYYY-MM-DD(ddd) HH:mm"
            class=""
            label="ge"
          />
          <div class="">Value : {{ dateValue }}</div>
        </div>
      </div>
      <div class="grid sm:grid-cols-1 gap-1 my-1">
        <Datepicker
          v-model:data="valueA"
          :diff="valueB"
          mode="date"
          :max-date="valueB"
          show-format="YYYY-MM-DD(ddd)"
          class=""
          label="valueA"
        />
        <Datepicker
          v-model:data="valueB"
          :diff="valueA"
          mode="date"
          :min-date="valueA"
          show-format="YYYY-MM-DD(ddd)"
          class=""
          label="valueB"
        />
        <div class="">valueA : {{ valueA }}</div>
        <div class="">valueB : {{ valueB }}</div>
      </div>
      <div class="py-1"></div>
      <div class="grid gap-1 my-1">
        <Btn theme="accent1" variant="outlined" size="xs" @click="disabled = !disabled">
          {{ disabled }} -> {{ !disabled }}
        </Btn>
        <Datepicker
          v-model:data="valueB"
          :diff="valueA"
          show-format="YYYY-MM-DD(ddd)"
          :disabled="!disabled"
          class=""
          label="ge"
        />
        <!-- <Datepicker
          v-model:data="valueB"
          :diff="valueA"
          show-format="YYYY-MM-DD(ddd)"
          :disabled="disabled"
          label="ge"
        /> -->
      </div>
      <!--  -->
      <div class="grid grid-cols-2 gap-1 my-1">
        <div class="grid grid-cols-1 gap-1 my-1">
          <Datepicker v-model:data="valueB" :diff="valueA" show-format="YYYY-MM-DD(ddd)" label="readonly" readonly />
          <Datepicker v-model:data="valueB" show-format="YYYY-MM-DD(ddd)" label="disabled" disabled />
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
          <!-- <Datepicker
            v-model:data="modeMonth"
            mode="month"
            data-format="YYYY-MM-DD "
            show-format="YYYY-MM"
            label="mode:month"
          /> -->
          <!-- <div class="">modeMonth : {{ modeMonth }}</div> -->
          <Datepicker v-model:data="modeTime1" mode="time" label="mode:time" />
          <Datepicker v-model:data="modeTime2" mode="time" label="mode:time" />
          <div class="">modeTime1 : {{ modeTime1 }}</div>
          <div class="">modeTime2 : {{ modeTime2 }}</div>
        </div>
        <div class="grid grid-cols-1 gap-1 my-1"></div>
      </div>
      <!--  -->
      <Datepicker v-model:data="modeTime1" mode="time" label="mode:time">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </Datepicker>
      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
