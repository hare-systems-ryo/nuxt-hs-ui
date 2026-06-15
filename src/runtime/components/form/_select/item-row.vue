<script setup lang="ts" generic="IdType extends string|number">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\select-img-icon.vue
// ----------------------------------------------------------------------------
// SelectImgIcon
// SelectImgIconSelectImgIcon
---------------------------------------------------------------------------- */

// [ utils ]
import type { ClassType } from '../../../utils/class-style';
import type { SelectItem } from '../../../utils/select-item';
import { Theme, GetColorCode } from '../../../utils/theme';

// [ composables ]
import { useHsPinia } from '../../../composables/use-pinia';
import { useHsMultiLang } from '../../../composables/use-hs-multi-lang';
import SelectItemContainer from './item-container.vue';
// ----------------------------------------------------------------------------
type ListRow = SelectItem<IdType> & {
  _key: string;
};
type Props = {
  list: SelectItem<IdType>[];
  item: ListRow;
  index: number;
  activeId: IdType | null;
  hasLabel: boolean;
  img?: boolean;
  classImg: ClassType;
  classImgTag: ClassType;
  imgMode: 'cover' | 'contain';
  disabled?: boolean;
  readonly?: boolean;
};

const props = withDefaults(defineProps<Props>(), {});
// [ emit ]
type Emits = {
  // ----------------------------
  'update:selectOpen': [isOpen: boolean];
  'value-change': [after: IdType | null, before: IdType | null];
  focus: [];
  blur: [];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------
const multiLang = useHsMultiLang(useHsPinia());
const tx = multiLang.tx;
const activeColorCode = GetColorCode(Theme.accent1);
const groupLabel = tx(props.item.groupLabel ?? '');
</script>

<template>
  <div class="w-full">
    <div
      v-if="
        props.item.groupId !== undefined && (props.index === 0 || props.list[index - 1]?.groupId !== props.item.groupId)
      "
      class="my-1 py-1 px-2 font-semibold bg-dark/5 border-dark/40 border"
    >
      {{ groupLabel }}
    </div>
    <div
      :key="props.item.id"
      class="HsSelectItem cursor-pointer flex items-center w-full p-2 rounded border mb-px "
      :class="[
        props.item.id === props.activeId ? ' border-accent1' : 'border-transparent',
        props.hasLabel ? 'ml-2' : '',
      ]"
      :style="`--color-bg: ${activeColorCode}10;`"
      @click="emit('update:selectOpen', false)"
    >
      <SelectItemContainer
        :item="props.item"
        :value="props.activeId"
        :img="props.img"
        :activated="props.img"
        :class-img="props.classImg"
        :class-img-tag="props.classImgTag"
        :img-mode="props.imgMode"
        :disabled="props.disabled"
        :readonly="props.readonly"
        type="item"
      />
    </div>
  </div>
</template>
