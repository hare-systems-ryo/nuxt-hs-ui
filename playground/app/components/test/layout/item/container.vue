<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\layout\item\container.vue
// ----------------------------------------------------------------------------
// TestLayoutItemContainer
// TestLayoutItemContainerTestLayoutItemContainer
---------------------------------------------------------------------------- */
</script>
<template>
  <div class="py-2 -mx-2 bg-yellow-100">
    <Container fluid>
      <Card class="">
        <CardItem variant="body">
          <!--  -->
          Container fluid
          <!--  -->
        </CardItem>
      </Card>
    </Container>
    <div class="py-4"></div>
    <Container>
      <Card class="">
        <CardItem variant="body">
          <!--  -->
          Container not fluid
          <!--  -->
        </CardItem>
      </Card>
    </Container>
  </div>
</template>
