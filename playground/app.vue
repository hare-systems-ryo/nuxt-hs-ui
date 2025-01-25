<script lang="ts" setup></script>

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
