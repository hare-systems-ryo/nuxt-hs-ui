<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\misc\tabulator.vue
// ----------------------------------------------------------------------------
// Tabulator
// TabulatorTabulator
---------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
// [ node_modules ]
import { TabulatorFull as Tabulator } from 'tabulator-tables';
// [ NUXT ]
import {
  ref,
  watch,
  computed,
  onMounted,
  // onUnmounted,
  onBeforeUnmount,
} from '#imports';
// ----------------------------------------------------------------------------
// [ utils ]
import { Option } from '../../utils/tabulator';
// [ composables ]
import { useHsMultiLang } from '../../composables/use-hs-multi-lang';
import { useHsPinia } from '../../composables/use-pinia';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang(useHsPinia());
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  columns: any[];
  rows: any[];
  option?: any;
};
const props = withDefaults(defineProps<Props>(), {
  // rowCountHeight: 0,
  option: () => Option(),
});
// [ emit ]
type Emits = {
  'row-click': [data: any];
  'row-dbl-click': [data: any];
  init: [flag: boolean];
  tabulator: [tabulator: any];
  'table-rebuild': [func: () => void];
  'table-redraw': [func: () => void];
  'table-refresh': [func: () => void];
  'table-refresh-stop-toggle': [func: (flag: boolean) => void];
};
const emit = defineEmits<Emits>();
// [ reactive ]
const table = ref<HTMLElement | null>(null); // reference to your table element
const tabulator = ref<any>(null); // variable to hold your table

const data = computed(() => {
  return props.rows;
});
// ----------------------------------------------------------------------------

const refreshStopFlag = ref(false);
watch(
  () => props.rows,
  () => {
    // console.log("watch rows", props.rows);
    if (table.value === null) return;
    if (isInit.value && tabulator.value !== null && !refreshStopFlag.value) {
      tabulator.value.replaceData(data.value as any);
    }
  }
  //   //   { deep: true }
);

watch(
  () => multiLang.lang,
  () => {
    // console.log(ct, 'watch multiLang', multiLang.lang);
    if (table.value === null) return;
    // console.log('watch  > prop.lang', tabulator.value);
    tabulator.value.setLocale(multiLang.lang);
    // console.log('watch  > prop.lang', tabulator.value.redraw);
    tabulator.value.redraw(true);
  }
);

// [▼ 初期化 ▼]
Tabulator.extendModule('localize', 'langs', Option().langs);
const isInit = ref(false);

watch(isInit, (value) => {
  emit('init', value);
});

watch(
  () => props.columns,
  () => {
    // console.log(ct, 'watch columns', value);
    if (table.value === null) return;
    if (isInit.value) {
      tabulator.value.setColumns(props.columns);
    }
  }
);

const initTabulator = () => {
  // console.log(ct, 'initTabulator');
  if (table.value === null) return;
  const option = {
    reactiveData: true,
    ...props.option,
    columns: props.columns,
    data: data.value,
  };
  tabulator.value = new Tabulator(table.value, option);
  tabulator.value.on('rowClick', (e: any, row: any) => {
    emit('row-click', row._row.data);
    e.stopPropagation();
  });
  tabulator.value.on('rowDblClick', (e: any, row: any) => {
    emit('row-dbl-click', row._row.data);
    e.stopPropagation();
  });
  tabulator.value.on('tableBuilding', () => (isInit.value = false));
  const beforeRows = option.data.length;
  let buildingFlag = true;
  tabulator.value.on('tableBuilt', () => {
    // console.log(ct, 'tableBuilt');
    const afterRows = props.rows.length;
    if (buildingFlag && beforeRows !== afterRows) {
      buildingFlag = false;
      tabulator.value.replaceData(props.rows as any);
    }
    isInit.value = true;
  });
  tabulator.value.on('tableDestroyed', () => (isInit.value = false));

  // 親コントロールへtableを伝達
  emit('tabulator', tabulator.value);
  // ----------------------------------------

  /** 意図的にテーブルを再描画する */
  const reBuild = () => {
    // console.log(ct, 'reBuild');
    if (tabulator.value === null || isInit.value === false) return;
    tabulator.value.destroy();
    tabulator.value = null;
    initTabulator();
  };
  emit('table-rebuild', reBuild);
  // ----------------------------------------

  /** 意図的にテーブルを再描画する   */
  const redraw = () => {
    if (tabulator.value === null || isInit.value === false) return;
    tabulator.value.redraw(true);
  };
  emit('table-redraw', redraw);
  // ----------------------------------------

  const tableRefreshStopToggle = (flag: boolean) => {
    // console.log('tableRefreshStopToggle', flag);
    refreshStopFlag.value = flag;
  };
  emit('table-refresh-stop-toggle', tableRefreshStopToggle);

  /** 意図的にテーブルデータをリフレッシュする */
  const refresh = async () => {
    if (tabulator.value === null || isInit.value === false) return;
    await tabulator.value.replaceData(data.value as any);
  };
  emit('table-refresh', refresh);
};
// ----------------------------------------

onMounted(() => {
  initTabulator();
});

onBeforeUnmount(() => {
  // console.log("onBeforeUnmount");
  if (tabulator.value === null) return;
  tabulator.value.destroy();
  tabulator.value = null;
});
// ----------------------------------------------------------------------------
</script>

<template>
  <div ref="table"></div>
</template>
