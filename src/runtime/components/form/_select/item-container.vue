<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\_select\item-container.vue
// ----------------------------------------------------------------------------
// _selectItemContainer
// _selectItemContainer_selectItemContainer
---------------------------------------------------------------------------- */

import { computed } from '#imports';

import type { ClassType } from '../../../utils/class-style';
// [ utils ]
import type { SelectItem } from '../../../utils/select-item';

import SelectItemLabel from './item-label.vue';
// import SelectItemState from './item-state.vue';
import SelectImgIcon from '../select-img-icon.vue';
// [ composables ]
import { useHsPinia } from '../../../composables/use-pinia';
import { useHsMultiLang } from '../../../composables/use-hs-multi-lang';

type Props = {
  item: SelectItem<string | number> & {
    _key: string;
  };
  value?: string | number | null;
  img?: boolean;
  activated: boolean;
  classImg?: ClassType;
  classImgTag?: ClassType;
  imgMode?: 'cover' | 'contain';
  disabled?: boolean;
  readonly?: boolean;
  type: 'display' | 'item';
};
const props = defineProps<Props>();
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
const labels = computed(() => {
  return {
    deleted: tx({ ja: '削除済', en: 'Deleted' }).value,
    hidden: tx({ ja: '非表示', en: 'Hidden' }).value,
  };
});
// ----------------------------------------------------------------------------
</script>
<template>
  <!-- item.imgUrl &&  -->
  <SelectImgIcon
    v-if="props.img"
    :key="item._key + 'img'"
    class="flex-none"
    :img-url="item.imgUrl"
    :class-img="props.classImg"
    :class-img-tag="props.classImgTag"
    :img-mode="props.imgMode"
  />
  <SelectItemLabel
    v-if="props.type === 'display'"
    :key="item._key + 'label'"
    :item="item"
    overflow
    :disabled="props.disabled"
    :readonly="props.readonly"
  />
  <SelectItemLabel v-if="props.type === 'item'" :key="item._key + 'label'" :item="item" overflow />
  <div :key="item._key + 'state'" class="flex items-center gap-1 ml-auto">
    <div v-if="props.item.deleted" class="text-error text-[0.7em] leading-[1em] p-1 mr-1 border border-error rounded">
      {{ labels.deleted }}
    </div>
    <div v-if="props.item.hidden" class="text-error text-[0.7em] leading-[1em] p-1 mr-1 border border-error rounded">
      {{ labels.hidden }}
    </div>
  </div>
  <div v-if="item.appendIcon" :key="item._key + 'appendIcon'" class="mr-1">
    <i :class="item.appendIcon"></i>
  </div>
  <div v-if="props.type === 'item'" class="text-accent1 text-[1em] leading-[1em] w-5 ml-auto text-center">
    <i v-if="props.item.id === value" class="fa-solid fa-check"></i>
  </div>
</template>
