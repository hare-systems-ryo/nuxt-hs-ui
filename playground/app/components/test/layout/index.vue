<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\layout\index.vue
// ----------------------------------------------------------------------------
// TestLayout
// TestLayoutTestLayout
---------------------------------------------------------------------------- */
const router = useRouter();
const route = useRoute();
const item = ref('');

// ----------------------------------------------------------------------------
item.value = (() => {
  if (!route.query) return '';
  if ('item' in route.query) {
    return String(route.query.item);
  }
  return '';
})();
const showMenu = ref(item.value === '');
// ----------------------------------------------------------------------------
const changeTestName = (name: string) => {
  item.value = name;
  if (name === '') {
    router.replace(route.path);
  } else {
    router.replace(route.path + '?item=' + name);
  }
};
// ----------------------------------------------------------------------------

const list = [
  //
  'Accordion',
  'AspectBox',
  'Card',
  'Container',
] as const;
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="">
    <Card class="">
      <CardItem v-model:open="showMenu" variant="header" theme="main0" size="s" @click="showMenu = !showMenu">
        Test Layout [ {{ item || 'ALL' }} ]
      </CardItem>
      <CardItem class="bg-back p-2" :accordion="showMenu" variant="body">
        <div class="">
          <Btn
            theme="accent1"
            :variant="item === '' ? 'flat' : 'outlined'"
            :class="item === '' ? '' : 'bg-white'"
            class="w-full"
            @click="changeTestName('')"
          >
            ALL
          </Btn>
        </div>
        <div class="grid grid-cols-3 gap-3 mt-2">
          <template v-for="(name, index) in list" :key="index">
            <Btn
              theme="accent1"
              :variant="item === name ? 'flat' : 'outlined'"
              :class="item === name ? '' : 'bg-white'"
              @click="changeTestName(name)"
            >
              {{ name }}
            </Btn>
          </template>
        </div>
      </CardItem>
    </Card>
    <div class="">
      <TestLayoutItemCard v-if="item === '' || item === 'Card'" class="mt-5" />
      <TestLayoutItemContainer v-if="item === '' || item === 'Container'" class="mt-5" />
      <TestLayoutItemAccordion v-if="item === '' || item === 'Accordion'" class="mt-5" />
      <TestLayoutItemAspectBox v-if="item === '' || item === 'AspectBox'" class="mt-5" />
    </div>
  </div>
</template>
