<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\_select\item-label.vue
// ----------------------------------------------------------------------------
// _selectItemLabel
// _selectItemLabel_selectItemLabel
---------------------------------------------------------------------------- */

// [ tailwind ]
import { twMerge } from 'tailwind-merge';
import { computed, useId } from '#imports';
// [ composables ]
import { useHsMultiLang } from '../../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../../composables/use-pinia';
// [ utils ]
import type { SelectItem } from '../../../utils/select-item';
// ----------------------------------------------------------------------------

type Props = {
  item: SelectItem<string | number>;
  overflow?: boolean;
  readonly?: boolean;
  disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
});
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
const text = props.item.text || '';
const uid = useId();
const baseClass = computed(() => {
  return [
    twMerge(
      props.overflow ? 'whitespace-pre-line break-all' : 'truncate',
      props.disabled ? 'text-gray-600 ' : '',
      !props.disabled && props.readonly ? 'text-black' : ''
    ),
  ];
});
</script>
<template>
  <div :key="uid + text" class="min-w-0 flex-1 text-[1rem]" :class="baseClass" :title="String(props.item.text)">
    {{ tx(props.item.text) }}
  </div>
</template>
