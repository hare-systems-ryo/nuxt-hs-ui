<script lang="ts" setup>
const hsMisc = useHsMisc();

onMounted(() => {
  hsMisc.Init();
});
</script>

<template>
  <NuxtLayout>
    <Teleport to="body">
      <Toast />
      <WindowLoader />
      <ModalBg />
      <Dialog />
    </Teleport>
    <NuxtPage />
  </NuxtLayout>
</template>
