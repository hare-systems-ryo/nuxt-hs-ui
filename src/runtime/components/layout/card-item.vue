<script lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\card-item.vue
// ----------------------------------------------------------------------------
// CardItem
// CardItemCardItem
---------------------------------------------------------------------------- */

// [ utils ]
import { tv } from '../../utils/tv';
import { Theme } from '../../utils/theme';
import { ObjectKeyToMap } from '../../utils/object';
const cardItemTv = tv({
  slots: {
    base: [
      //
      `p-2 relative`,
      'bg-[var(--main-color)]',
    ],
    btn: [`border-[1px]`],
  },
  variants: {
    variant: {
      header: {
        base: [`flex justify-between items-center`],
      },
      body: {
        base: [``],
      },
      footer: {
        base: [`flex justify-between items-center`],
      },
    },
    scroll: {
      true: {
        base: 'overflow-y-auto overflow-x-hidden flex-1',
      },
      false: {
        base: 'flex-y-none',
      },
    },
    size: {
      xs: {
        base: [`p-1`],
        btn: ['text-sm  h-[30px] w-[30px]'],
      },
      s: {
        base: [`p-1 ps-2`],
        btn: ['text-sm h-[36px] w-[36px]'],
      },
      m: { btn: ['text-base h-[44px] w-[44px]'] },
      l: { btn: ['text-base h-[48px] w-[48px]'] },
      xl: { btn: ['text-lg  h-[60px] w-[60px]'] },
    },
    theme: ObjectKeyToMap(Theme, ''),
  },
  compoundVariants: [
    ...Object.keys(Theme).map((theme) => {
      return {
        theme: theme,
        class: {
          base: [['back1', 'white', 'warn'].includes(theme) ? `` : 'text-white '],
        },
      } as any;
    }),
  ],
});
</script>

<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\layout\card-item.vue
// ----------------------------------------------------------------------------
// CardItem
// CardItemCardItem
----------------------------------------------------------------------------- */

// [ NUXT ]
import { computed, useId } from '#imports';
// [ utils ]
import { type ClassType, ClassTypeToString } from '../../utils/class-style';
import { type ThemeColor, GetColorCode } from '../../utils/theme';
// [ composables ]
import { useHsFocus } from '../../composables/use-hs-focus';
import { useHsPinia } from '../../composables/use-pinia';
// [ Components ]
import Btn from '../form/btn.vue';
import Accordion from './accordion.vue';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface Props {
  class?: ClassType;
  variant?: 'header' | 'body' | 'footer';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  accordion?: boolean | undefined;
  theme?: ThemeColor | undefined;
  scroll?: boolean;
  open?: boolean | undefined;
  cross?: boolean;
  // btn?: "cross" | "accordion" | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  class: '',
  variant: 'body',
  size: 'm',
  theme: undefined,
  scroll: false,
  accordion: undefined,
  open: undefined,
  btn: undefined,
  cross: false,
});
type Emits = {
  ref: [e: HTMLElement];
  'update:open': [value: boolean];
  toggle: [];
};
const emit = defineEmits<Emits>();

const uid = useId();
const hsFocus = useHsFocus(useHsPinia());

// ----------------------------------------------------------------------------
const bgTheme = computed(() => {
  if (props.theme !== undefined) return props.theme;
  if (props.variant == 'header') return Theme.main1;
  if (props.variant == 'footer') return Theme.main2;
  return Theme.back1;
});
const styleMain = computed(() => {
  return [
    //
    `--main-color:${GetColorCode(bgTheme.value)};`,
  ];
});
const classTv = computed(() => {
  return cardItemTv({
    variant: props.variant,
    scroll: props.scroll,
    theme: bgTheme.value,
    size: props.size,
  });
});
const classTvBase = computed(() => {
  return classTv.value.base({
    class: ClassTypeToString(props.class),
  });
});
const classTvBtn = computed(() => {
  return classTv.value.btn();
});
const toggleOpen = () => {
  if (hsFocus.state.id !== uid) {
    hsFocus.state.id = uid;
  }
  emit('update:open', !props.open);
  emit('toggle');
};
</script>

<template>
  <template v-if="props.accordion === undefined">
    <div :ref="(e:any) => emit('ref', e)" :style="styleMain" :class="classTvBase">
      <slot />
      <Btn
        v-if="props.open !== undefined || props.cross"
        theme="white"
        variant="outlined"
        :class="classTvBtn"
        :size="props.size"
        @click.stop="toggleOpen"
      >
        <i
          v-if="props.open !== undefined && !props.cross"
          class="fa-solid fa-chevron-down"
          :class="{ 'rotate-180': props.open }"
        />
        <i v-else-if="props.cross" class="fa-solid fa-xmark" />
      </Btn>
    </div>
  </template>
  <template v-else>
    <Accordion :open="props.accordion">
      <div :ref="(e:any) => emit('ref', e)" :style="styleMain" :class="classTvBase">
        <slot />
      </div>
    </Accordion>
  </template>
</template>
