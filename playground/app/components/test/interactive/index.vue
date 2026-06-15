<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\interactive\index.vue
// ----------------------------------------------------------------------------
// TestInteractive
// TestInteractiveTestInteractive
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
  'Alert',
  'BlockLoading',
  'Dialog',
  'Modal',
  'Toast',
  'WindowLoader',
] as const;
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="">
    <Card class="">
      <CardItem
        v-model:open="showMenu"
        variant="header"
        theme="main0"
        size="s"
        class="cursor-pointer"
        @click="showMenu = !showMenu"
      >
        Test Interactive [ {{ item || 'ALL' }} ]
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
      <TestInteractiveItemAlert v-if="item === '' || item === 'Alert'" class="mt-5" />
      <TestInteractiveItemBlockLoading v-if="item === '' || item === 'BlockLoading'" class="mt-5" />
      <TestInteractiveItemDialog v-if="item === '' || item === 'Dialog'" class="mt-5" />
      <TestInteractiveItemModal v-if="item === '' || item === 'Modal'" class="mt-5" />
      <TestInteractiveItemToast v-if="item === '' || item === 'Toast'" class="mt-5" />
      <TestInteractiveItemWindowLoader v-if="item === '' || item === 'WindowLoader'" class="mt-5" />
    </div>
  </div>
</template>
