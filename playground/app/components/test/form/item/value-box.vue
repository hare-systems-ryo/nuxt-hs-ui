<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\item\value-box.vue
// ----------------------------------------------------------------------------
// TestFormItemValueBox
// TestFormItemValueBoxTestFormItemValueBox
---------------------------------------------------------------------------- */

// const valueA = ref<number | null>(null);
// const valueB = ref<number | null>(0.1);
// const valueC = ref<number | null>(0);
// const valueD = ref<number | null>(10);
// const valueE = ref<number | null>(10);
const digits = ref<number | null>(3);
const test = ref<number | null>(0);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> ValueBox </CardItem>
    <CardItem class="" variant="body">
      <!-- ------------------------------------------------ -->
      <div>Test</div>
      <div class="flex flex-col">
        <!-- <ValueBox v-model:data="test" size="s" label="" unit="円" digits-auto digits-point-small :digits="digits" /> -->
        <ValueBox
          v-model:data="test"
          label=""
          unit="円"
          :min="0"
          :max="100000"
          digits-point-small
          digits-auto
          :digits="digits"
          placeholder="0"
        />
        <ValueBox
          v-model:data="test"
          label=""
          unit="円"
          :min="0"
          :max="100000"
          digits-point-small
          digits-auto
          :digits="digits"
          placeholder=""
        />
        <!--
         <ValueBox v-model:data="test" size="s" label="" unit="円" :digits="digits" digits-auto /> -->
        <!-- <ValueBox v-model:data="digits" size="s" unit="円" :min="0" is-show-btn-control /> -->
      </div>

      <!--
       <div>通常</div>
      <div class="grid grid-cols-2 gap-1">
        <ValueBox v-model:data="valueA" :diff="valueB" size="s" comma="" />
        <ValueBox v-model:data="valueA" :diff="valueB" size="s" label="ラベル付き" />
      </div>
      <div class="p-1"></div>
      <div>単位表示</div>
      <ValueBox v-model:data="valueA" size="s" label="" unit="円" />
      <div class="p-1"></div>
      <div>上下ボタン(マウススクロール対応OK)</div>
      <ValueBox v-model:data="valueA" size="s" label="" unit="円" is-show-btn-control />
      <div class="p-1"></div>
      <div>上下ボタン（任意のステップ）</div>
      <ValueBox v-model:data="valueA" size="s" label="" :step="10" unit="円" is-show-btn-control />
      <div class="p-1"></div>
      <div>小数点（任意の小数点）</div>
      <div class="grid grid-cols-2 gap-1">
        <ValueBox v-model:data="valueB" size="s" label="小数点（1桁）" :digits="1" unit="円" />
        <ValueBox
          v-model:data="valueB"
          size="s"
          label="小数点 ※ステップも小数点"
          :digits="2"
          :step="0.1"
          is-show-btn-control
          unit="円"
        />
      </div>
      <div class="p-1"></div>
      <div>最大値と最小値</div>
      <div class="grid grid-cols-3 gap-1">
        <ValueBox v-model:data="valueC" size="s" label="min = 0" :step="2" unit="円" :min="0" is-show-btn-control />
        <ValueBox v-model:data="valueD" size="s" label="max = 10" :step="2" unit="円" :max="10" is-show-btn-control />
        <ValueBox
          v-model:data="valueE"
          size="s"
          label="min = 0 && max = 10"
          :step="2"
          unit="円"
          :min="0"
          :max="10"
          is-show-btn-control
        />
      </div>
      <ValueBox v-model:data="valueD" size="s" label="a">
        <template #label-prepend> prepend </template>
        <template #label-append> append </template>
        <template #header-right> <span class="text-main0">aaa</span> </template>
      </ValueBox> 
      -->

      <!-- ------------------------------------------------ -->
    </CardItem>
  </Card>
</template>
