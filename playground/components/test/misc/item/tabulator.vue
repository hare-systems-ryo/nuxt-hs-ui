<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\components\test\misc\item\tabulator.vue
// ----------------------------------------------------------------------------
// TestMiscItemTabulator
// TestMiscItemTabulatorTestMiscItemTabulator
----------------------------------------------------------------------------- */

import {
  TabulatorFunc,
  GetListTableBtnSetting,
  GetHeaderHtml,
  GetCellHtml,
} from "../../../../../src/runtime/utils/tabulator";

const id = useId();

type ListRow = { id: number; text: string };
// ----------------------------------------------------------------------------
const list = ref<ListRow[]>([
  { id: 1, text: "AAA" },
  { id: 1, text: "AAA" },
  { id: 1, text: "AAA" },
  { id: 1, text: "AAA" },
]);
// ----------------------------------------------------------------------------
const tableColumns = () => {
  const ret: any = [];
  {
    const componentName = `v_app_table_default_btn_${id}`.replace(/-/g, "_");
    (window as any)[`${componentName}_flag`] = false;
    (window as any)[`${componentName}_func`] = (event: any) => {
      // console.log('cellClick', componentName);
      if (event.ctrlKey) {
        (window as any)[`${componentName}_flag`] = true;
        setTimeout(
          () => ((window as any)[`${componentName}_flag`] = false),
          200
        );
      } else {
        event.preventDefault();
        return false;
      }
    };
    ret.push({
      ...GetListTableBtnSetting({
        detailUrl: useRoute().path,
        mode: "select",
        actionBtnTheme: "link",
        componentName: componentName,
        TabulatorFunc: TabulatorFunc,
        size: "2",
        emit: () => "" as any,
      }),
      ...TabulatorFunc.ColumnsDisplay("", 100),
    });
  }
  // ----------------------------------------------------------------------------
  ret.push({
    ...TabulatorFunc.ColumnsDisplay("", 80),
    title: GetHeaderHtml(`
<div class="v-cell-row" style="--row-size:1;">
<div class="v-cell w-100 ">
pId
</div>
</div>
`),
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
  return ret;
};
</script>
<template>
  <Card class="mt-4">
    <CardItem class="" variant="header"> Alert </CardItem>
    <CardItem class="" variant="body">
      <div class="grid grid-cols-1 gap-2">
        <ClientOnly>
          <Tabulator :columns="tableColumns()" :rows="list"></Tabulator>
        </ClientOnly>
      </div>
    </CardItem>
  </Card>
</template>
