<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\test\misc\item\tabulator.vue
// ----------------------------------------------------------------------------
// TestMiscItemTabulator
// TestMiscItemTabulatorTestMiscItemTabulator
---------------------------------------------------------------------------- */

import { ObjectCopy } from '../../../../../../src/runtime/utils/object';
import {
  TabulatorFunc,
  // GetListTableBtnSetting,
  GetHeaderHtml,
  GetCellHtml,
} from '../../../../../../src/runtime/utils/tabulator';

// const id = useId();

type ListRow = { id: number; text: string };
// ----------------------------------------------------------------------------
const list = ref<ListRow[]>([]);
list.value.push({ id: 1, text: 'AAA' });
list.value.push({ id: 2, text: 'BBB' });
list.value.push({ id: 3, text: 'CCC' });
list.value.push({ id: 4, text: 'DDD' });

const activeId = ref<number | null>(null);
const activeRow = computed(() => {
  return list.value.find((row) => row.id === activeId.value) || null;
});
const listRefresh = () => {
  //
  // console.log(list.value);
  // list.value[2].text = "BBB+2";
  // // ----------------------------
  const temp = ObjectCopy(list.value);
  const count = temp.length;
  list.value.forEach((row) => {
    temp.push({ id: row.id + count, text: `text-${row.id + count}` });
  });
  list.value = [...temp];
  // // ----------------------------
};

// const temp = ObjectCopy(
//   list.value.map((row) => {
//     return { id: row.id + 4, text: row.text };
//   })
// );
// ----------------------------------------------------------------------------
const tableColumns = () => {
  const ret: any = [];
  // {
  // const componentName = `v_app_table_default_btn_${id}`.replace(/-/g, '_');
  // (window as any)[`${componentName}_flag`] = false;
  // (window as any)[`${componentName}_func`] = (event: any) => {
  //   // console.log('cellClick', componentName);
  //   if (event.ctrlKey) {
  //     (window as any)[`${componentName}_flag`] = true;
  //     setTimeout(() => ((window as any)[`${componentName}_flag`] = false), 200);
  //   } else {
  //     event.preventDefault();
  //     return false;
  //   }
  // };
  // ret.push({
  //   ...GetListTableBtnSetting({
  //     detailUrl: useRoute().path,
  //     mode: "select",
  //     actionBtnTheme: "link",
  //     componentName: componentName,
  //     TabulatorFunc: TabulatorFunc,
  //     size: "2",
  //     emit: () => "" as any,
  //   }),
  //   cellClick: (e: any, cell: any) => {
  //     if ((window as any)[`${componentName}_flag`] === true) return;
  //     const row: ListRow = cell.getRow().getData();
  //     activeId.value = row.id;
  //   },
  //   ...TabulatorFunc.ColumnsDisplay("", 100),
  // });
  // }
  // ----------------------------------------------------------------------------
  ret.push({
    ...TabulatorFunc.ColumnsDisplay('', 80),
    title: GetHeaderHtml(`
  <div class="v-cell-row" style="--row-size:1;">
  <div class="v-cell w-100 ">
  pId
  </div>
  </div>
  `),
    cellClick: (e: any, cell: any) => {
      // if ((window as any)[`${componentName}_flag`] === true) return;
      const row: ListRow = cell.getRow().getData();
      activeId.value = row.id;
    },
    formatter: (cell: any) => {
      const row: ListRow = cell.getRow().getData();
      // ${dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS')}
      return GetCellHtml(`
  <div class="v-cell-row" style="--row-size:1;">
  <div class="v-cell text-end pe-4 w-100">
  ${row.id}
  </div>
  </div>
      `);
    },
  });
  // ----------------------------------------------------------------------------
  ret.push({
    ...TabulatorFunc.ColumnsDisplay('', 80),
    title: GetHeaderHtml(`
  <div class="v-cell-row" style="--row-size:1;">
  <div class="v-cell w-100 ">
  Text
  </div>
  </div>
  `),
    cellClick: (e: any, cell: any) => {
      // if ((window as any)[`${componentName}_flag`] === true) return;
      const row: ListRow = cell.getRow().getData();
      activeId.value = row.id;
    },
    formatter: (cell: any) => {
      const row: ListRow = cell.getRow().getData();
      // ${dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS')}
      return GetCellHtml(`
  <div class="v-cell-row" style="--row-size:1;">
  <div class="v-cell text-end pe-4 w-100">
  ${row.text}
  </div>
  </div>
      `);
    },
  });

  // ----------------------------------------------------------------------------
  ret.push({
    ...TabulatorFunc.ColumnsDisplay('id', 80),
    cellClick: (e: any, cell: any) => {
      // if ((window as any)[`${componentName}_flag`] === true) return;
      const row: ListRow = cell.getRow().getData();
      activeId.value = row.id;
    },
  });
  ret.push({
    ...TabulatorFunc.ColumnsDisplay('text', 80),
    cellClick: (e: any, cell: any) => {
      // if ((window as any)[`${componentName}_flag`] === true) return;
      const row: ListRow = cell.getRow().getData();
      activeId.value = row.id;
    },
  });
  return ret;
};
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Tabulator </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-2 gap-1">
        <div class="">
          <div class="">選択中データ</div>
          <div class="p-1 border border-main0">
            <div v-if="activeRow !== null">
              <div class="">{{ activeRow.id }} : text</div>
              <TextBox v-model:data="activeRow.text" size="s" label="" />
            </div>
            <div v-else>ナシ</div>
          </div>

          <div class="whitespace-per-wrap max-h-[600px] overflow-y-auto">
            {{ JSON.stringify(list, null, 3) }}
          </div>
        </div>
        <div class="grid gap-y-1">
          <div class="flex items-center">
            <div class="">count:{{ list.length }}</div>
            <Btn theme="accent1" variant="outlined" size="xs" class="ms-auto bg-white" @click="listRefresh()">
              listRefresh
            </Btn>
          </div>
          <ClientOnly>
            <Tabulator :columns="tableColumns()" :rows="list"></Tabulator>
          </ClientOnly>
          <Btn theme="accent1" variant="outlined" size="xs" class="ms-auto bg-white" @click="listRefresh()">
            listRefresh
          </Btn>
        </div>
      </div>

      <div class="py-1"></div>
    </CardItem>
  </Card>
</template>
