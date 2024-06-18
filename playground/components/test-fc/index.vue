<script setup lang="ts">
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
  'HsFcBtn',
] as const;
const showMenu = ref(false);
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
      <TestFcTestBtn v-if="testName === '' || testName === 'HsFcBtn'" class="mt-5" />
    </div>
  </div>
</template>
