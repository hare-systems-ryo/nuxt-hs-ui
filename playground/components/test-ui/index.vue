<script setup lang="ts">
/* ----------------------------------------------------------------------------
playground\components\test-ui\index.vue
// ----------------------------------------------------------------------------
TestUi
TestUiTestUi
----------------------------------------------------------------------------- */

const router = useRouter();
const route = useRoute();
const testName = ref('');
const changeTestName = (name: string) => {
  testName.value = name;
  router.replace(route.path + '?testName=' + name);
};
onMounted(() => {
  if ('testName' in route.query && route.query.testName !== undefined) {
    const hash = String(route.query.testName);
    testName.value = hash;
  } else {
    testName.value = '';
  }
});

const list = [
  //
  'FileSelect',
  'Modal',
  'Dialog',
  'BlockLoading',
  'Toast',
  'WindowLoader',
  'Accordion',
] as const;
const showMenu = ref(false);
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="">
    <HsUiCard class="">
      <HsUiCardItem
        v-model:is-open="showMenu"
        variant="header"
        class="bg-main0 text-white"
        @bg-click="showMenu = !showMenu"
      >
        Test Form Control [ {{ testName || 'ALL' }} ]
      </HsUiCardItem>
      <HsUiCardItem class="bg-back p-2" :accordion="showMenu" variant="body">
        <div class="">
          <HsFcBtn
            theme="accent1"
            :variant="testName === '' ? 'flat' : 'outlined'"
            class="w-full bg-white"
            @click="changeTestName('')"
          >
            ALL
          </HsFcBtn>
          {{ showMenu }}
        </div>
        <div class="grid grid-cols-3 gap-3 mt-2">
          <template v-for="(name, index) in list" :key="index">
            <HsFcBtn
              theme="accent1"
              class="bg-white"
              :variant="testName === name ? 'flat' : 'outlined'"
              @click="changeTestName(name)"
            >
              {{ name }}
            </HsFcBtn>
          </template>
        </div>
      </HsUiCardItem>
    </HsUiCard>
    <div class="">
      <!-- <TestUiTestFileSelect v-if="testName === '' || testName === 'FileSelect'" class="mt-5" /> -->
      <TestUiTestModal v-if="testName === '' || testName === 'Modal'" class="mt-5" />
      <TestUiTestDialog v-if="testName === '' || testName === 'Dialog'" class="mt-5" />
      <TestUiTestBlockLoading v-if="testName === '' || testName === 'BlockLoading'" class="mt-5" />
      <TestUiTestToast v-if="testName === '' || testName === 'Toast'" class="mt-5" />
      <TestUiTestWindowLoader v-if="testName === '' || testName === 'WindowLoader'" class="mt-5" />
      <TestUiTestAccordion v-if="testName === '' || testName === 'Accordion'" class="mt-5" />
    </div>
  </div>
</template>
