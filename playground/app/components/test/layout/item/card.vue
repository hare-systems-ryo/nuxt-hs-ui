<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\layout\item\card.vue
// ----------------------------------------------------------------------------
// TestLayoutItemCard
// TestLayoutItemCardTestLayoutItemCard
---------------------------------------------------------------------------- */

const valueA = ref<string | null>('2024-12-16');
const showCardItem = ref(true);
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Card </CardItem>
    <CardItem class="p-2" variant="body">
      <!--  -->
      <div class="p-4">
        <Card>
          <CardItem variant="header"> variant = body >>デフォルト背景色 >> bg-main1 </CardItem>
          <CardItem variant="body"> variant = body >>デフォルト背景色 >> bg-back </CardItem>
          <CardItem variant="footer"> variant = footer >>デフォルト背景色 >> bg-main2 </CardItem>
        </Card>
      </div>
      <!--  -->
      <div class="p-4">
        <Card class="">
          <CardItem v-model:open="showCardItem" variant="header">
            開閉機能 プロパティv-model:open にBool値をセットするとボタン表示
          </CardItem>
          <CardItem :accordion="showCardItem" variant="body">
            <div>プロパティ accordion が開閉対象</div>
          </CardItem>
          <CardItem variant="footer"> Footer </CardItem>
        </Card>
      </div>
      <!--  -->
      <div class="p-4">
        <Card class="">
          <CardItem variant="header" cross @toggle="showCardItem = !showCardItem">
            btn="cross" でバツボタン、@toggle でイベント取得
          </CardItem>
          <CardItem :accordion="showCardItem" variant="body">
            <div>プロパティ accordion が開閉対象</div>

            <Datepicker v-model:data="valueA" show-format="YYYY-MM-DD(ddd)" class="" label="ge" />
          </CardItem>
          <CardItem variant="footer"> Footer </CardItem>
        </Card>
      </div>
      <!--  -->
      <div class="p-4">
        <Card class="h-[200px]">
          <CardItem v-model:open="showCardItem" size="s" variant="header"> Card </CardItem>
          <CardItem variant="body" scroll>
            <div>Card要素に対して高さを設定している場合</div>
            <div>bool値で scroll をセットするとスクロール対象になる</div>
            <div v-for="(row, index) in new Array(20).fill(null)" :key="index" class="py-1">
              {{ index }}
            </div>
          </CardItem>
        </Card>
      </div>
      <div class="p-4">
        <Card class="">
          <CardItem v-model:open="showCardItem" size="s" variant="header"> Card </CardItem>
          <CardItem variant="body" scroll>
            <div>Card要素に対して高さを設定していない場合</div>
            <div>bool値で scroll をセットしてもスクロールしない</div>
            <div v-for="(row, index) in new Array(20).fill(null)" :key="index" class="py-1">
              {{ index }}
            </div>
          </CardItem>
        </Card>
      </div>
      <!--  -->
    </CardItem>
  </Card>
</template>
