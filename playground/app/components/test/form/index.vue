<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\form\index.vue
// ----------------------------------------------------------------------------
// TestForm
// TestFormTestForm
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
  'Btn',
  'CheckBox',
  'CheckList',
  'Datepicker',
  'InputFrame',
  'Radio',
  'Select',
  'TextBox',
  'Textarea',
  'ValueBox',
] as const;
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="">
    <Card class="">
      <CardItem v-model:open="showMenu" variant="header" theme="main0" size="s" @click="showMenu = !showMenu">
        Test Form [ {{ item || 'ALL' }} ]
      </CardItem>
      <CardItem class="bg-back p-2" :accordion="showMenu" variant="body">
        <div class="">
          <Btn
            theme="accent1"
            :variant="item === '' ? 'flat' : 'outlined'"
            :class="item === '' ? '' : 'bg-white'"
            class="w-full"
            @click.stop="changeTestName('')"
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
      <TestFormItemBtn v-if="item === '' || item === 'Btn'" class="mt-5" />
      <TestFormItemTextBox v-if="item === '' || item === 'TextBox'" class="mt-5" />
      <TestFormItemTextarea v-if="item === '' || item === 'Textarea'" class="mt-5" />
      <TestFormItemValueBox v-if="item === '' || item === 'ValueBox'" class="mt-5" />
      <TestFormItemDatepicker v-if="item === '' || item === 'Datepicker'" class="mt-5" />
      <TestFormItemInputFrame v-if="item === '' || item === 'InputFrame'" class="mt-5" />
      <TestFormItemCheckBox v-if="item === '' || item === 'CheckBox'" class="mt-5" />
      <TestFormItemRadio v-if="item === '' || item === 'Radio'" class="mt-5" />
      <TestFormItemSelect v-if="item === '' || item === 'Select'" class="mt-5" />
      <TestFormItemCheckList v-if="item === '' || item === 'CheckList'" class="mt-5" />
    </div>
  </div>
</template>
