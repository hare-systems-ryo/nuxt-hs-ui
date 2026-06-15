<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\_select\hidden-item-toggle.vue
// ----------------------------------------------------------------------------
// _selectHiddenItemToggle
// _selectHiddenItemToggle_selectHiddenItemToggle
---------------------------------------------------------------------------- */

// [ composables ]
import { useHsPinia } from '../../../composables/use-pinia';
import { useHsMultiLang } from '../../../composables/use-hs-multi-lang';

type Props = {
  hiddenItemVisible: boolean;
};
const props = defineProps<Props>();
// [ emit ]
type Emits = {
  // ----------------------------
  'update:hiddenItemVisible': [value: boolean];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
</script>
<template>
  <Btn
    theme="accent1"
    variant="outlined"
    class="w-full bg-white"
    size="xs"
    @mousedown.stop.prevent
    @click.stop="emit('update:hiddenItemVisible', !props.hiddenItemVisible)"
  >
    <!-- -->

    <span class="me-1"> {{ tx({ ja: '非表示アイテム', en: 'Hidden options' }) }} </span>
    <i class="fas" :class="[!props.hiddenItemVisible ? 'fa-eye-slash text-error' : 'fa-eye text-success']"></i>
    <i class="fas fa-caret-right mx-1"></i>
    <i class="fas" :class="[props.hiddenItemVisible ? 'fa-eye-slash text-error' : 'fa-eye text-success']"></i>
  </Btn>
</template>
