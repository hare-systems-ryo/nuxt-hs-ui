/* ----------------------------------------------------------------------------
// src\runtime\utils\tabulator.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
----------------------------------------------------------------------------- */

// import { Sleep } from '~/com/lib/com';
import { Int } from "./number";
import { ObjectCopy } from "./object";

// [ composables ]
import { useHsMultiLang } from "../composables/use-hs-multi-lang";
import { type Theme, GetGolorCode } from "../utils/theme";

/**
 * セル内部にボタンを配置した時用
 */
export const cellMouseOut = (e: any) => {
  const elm = e.target as any;
  // テーブル自体が補足されてoverlayが複数取得できる場合がありえる
  const overlays = elm.querySelectorAll("span.overlay");
  Array.from(overlays).forEach((child: any) => {
    child.classList.remove("flash");
  });
};

/**
 * セル内部にボタンを配置した時用
 */
export const cellMouseUp = (e: any) => {
  const elm = e.target as any;
  const overlays = elm.querySelectorAll("span.overlay");
  Array.from(overlays).forEach((child: any) => {
    child.classList.remove("flash");
  });
};

/**
 * セル内部にボタンを配置した時用
 */
export const cellMouseDown = (e: any) => {
  const elm = e.target as any;
  if (elm.classList.contains("table-cell-btn") === true) {
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;
    const width = Int(elm.clientWidth) + 20;
    const overlays = elm.querySelectorAll("span.overlay");
    Array.from(overlays).forEach((child: any) => {
      child.style.top = `${-width + offsetY}px`;
      child.style.left = `${-width + offsetX}px`;
      child.style.width = `${width * 2}px`;
      child.style.height = `${width * 2}px`;
      child.classList.add("flash");
      setTimeout(() => child.classList.remove("flash"), 10000);
    });
  }
};

export interface SortItem<T> {
  key: T;
  order: 1 | -1;
}

export const ColumnsPropsDisplay = {
  headerSort: false,
  download: false,
};
export const ColumnsDisplay = (
  field: string | undefined = undefined,
  width: number | undefined = undefined
) => {
  return {
    headerSort: false,
    download: false,
    field: field,
    width: width === undefined ? undefined : String(width),
    minWidth: width === undefined ? undefined : String(width),
  };
};

export const InitEmitFunc = () => {
  return {
    // tableExcelDownload: async () => {
    //   console.error('初期化が完了していません');
    //   await Sleep(1);
    // },
    tableReBuild: () => {
      console.error("初期化が完了していません");
    },
    tableRedraw: () => {
      console.error("初期化が完了していません");
    },
    tableRefresh: () => {
      console.error("初期化が完了していません");
    },
    tableRefreshStopToggle: () => {
      console.error("初期化が完了していません");
    },
  };
};
export const TabulatorInitEmitFunc = InitEmitFunc;

export const Option = (option?: any) => {
  return Object.assign(
    {
      locale: "ja",
      langs: {
        ja: {
          columns: {},
          data: {
            loading: "Loading", // data loader text
            error: "Error", // data error text
          },
          groups: {
            item: "item", // the singular  for item
            items: "items", // the plural for items
          },
          pagination: {
            page_size: "表示件数",
            page_title: "Show Page",
            first: "", // text for the first page button
            first_title: "最初のページ", // tooltip text for the first page button
            last: "",
            last_title: "最後のページ",
            prev: "",
            prev_title: "Prev Page",
            next: "",
            next_title: "Next Page",
            all: "All",
            counter: {
              showing: "Showing",
              of: "of",
              rows: "rows",
              pages: "pages",
            },
          },
        },
        en: {
          columns: {},
          data: {
            loading: "Loading", // data loader text
            error: "Error", // data error text
          },
          groups: {
            item: "item", // the singular  for item
            items: "items", // the plural for items
          },
          pagination: {
            page_size: "Page Size ",
            page_title: "Show Page",
            first: "", // text for the first page button
            first_title: "First", // tooltip text for the first page button
            last: "",
            last_title: "Last",
            prev: "",
            prev_title: "Prev ",
            next: "",
            next_title: "Next",
            all: "All",
            counter: {
              showing: "Showing",
              of: "of",
              rows: "rows",
              pages: "pages",
            },
          },
        },
      },
      layout: "fitColumns",
      downloadConfig: {
        columnHeaders: true, // do not include column headers in downloaded table
        columnGroups: false, // do not include column groups in column headers for downloaded table
        rowGroups: false, // do not include row groups in downloaded table
        columnCalcs: false, // do not include column calcs in downloaded table
        dataTree: false, // do not include data tree in downloaded table
      },
      // pagination: true,
      // paginationSize: 20,
      // paginationSizeSelector: [20, 50, 100],
      // clipboard: true,
      // ...option,
    },
    option
  );
};
export const TabulatorFunc = {
  cellMouseOut,
  cellMouseUp,
  cellMouseDown,
  ColumnsDisplay,
  InitEmitFunc,
  Option,
};

/**
 * パス禁止文字
 */
export const ReplaceFolderName = (str: string) => {
  const specialChars = /:|\?|\.|"|<|>|\|/g; // 使用できない特殊文字
  const slash = /\//g; // 単一のスラッシュ
  const spaces = /\s{2,}/g; // 連続したスペース
  const backSlashs = /\\{2,}/g; // 連続したバックスラッシュ
  const sandwich = /(\s\\|\\\s)+(\s|\\)?/g; // バックスラッシュとスペースが交互に出てくるパターン
  const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g; // 先頭と末尾のスペース,バックスラッシュ
  const replacedStr = str
    .replace(specialChars, `-`) // 特殊文字をハイフンに置き換え
    .replace(slash, `\\`) // スラッシュをバックスラッシュに置き換え
    .replace(spaces, ` `) // 連続するスペースを一つに置き換え
    .replace(backSlashs, `\\`) // 連続するバックスラッシュを一つに置き換え
    .replace(sandwich, `\\`) // " \ \"のような"サンドイッチ"をバックスラッシュ一つに置き換え
    // →フォルダ名の先頭と末尾のスペースを削除，スペースのみのフォルダを削除
    .replace(beginningEnd, ``); // 先頭と末尾のスペース，バックスラッシュを削除
  return replacedStr;
};

export const SortIconClassName = <T>(uid: string) => {
  return (key: T) => {
    return `table-sort-${uid}-` + key;
  };
};

const headerStyle = `style="--row-height:28px;"`;
const rowStyle = `style="--row-height:28px;"`;
export const GetCellHtml = (html: string) =>
  `<div class="v-cell-container" ${rowStyle}>{replace}</div>`.replace(
    /\{replace\}/g,
    html
  );
export const GetHeaderHtml = (html: string) =>
  `<div class="v-cell-container" ${headerStyle}>{replace}</div>`.replace(
    /\{replace\}/g,
    html
  );

// ----------------------------------------------------------------------------
/** Data-Row-Table ボタン列 */
export const GetListTableBtnSetting = (arg: {
  detailUrl: string;
  mode: "select" | "detail";
  actionBtnTheme: Theme;
  componentName: string;
  TabulatorFunc: typeof TabulatorFunc;
  emit: any;
  size: string;
}) => {
  const {
    detailUrl,
    mode,
    actionBtnTheme,
    componentName,
    TabulatorFunc,
    emit,
    size,
  } = arg;
  const storeMultiLang = useHsMultiLang();
  const tx = storeMultiLang.tx;
  return {
    ...TabulatorFunc.ColumnsDisplay("", 100),
    title: ``,
    formatter: (cell: any) => {
      const row: any = cell.getRow().getData();
      // ----------------------------------------------------------------------------
      const baseUrl = detailUrl;
      const herf =
        mode === "detail"
          ? `href="${baseUrl.replace(/new/, "")}${row.pId}"`
          : "";
      // ----------------------------------------------------------------------------
      const style = [
        `border:solid 2px ${GetGolorCode(actionBtnTheme)}`,
        `color:${GetGolorCode(actionBtnTheme)}`,
        `width:100%`,
      ].join(";");
      const overlayBg = `bg-${actionBtnTheme}`;
      const caption =
        mode === "detail"
          ? tx({ ja: "詳細", en: "Detail" }).value
          : tx({ ja: "選択", en: "Select" }).value;
      const icon =
        mode === "detail"
          ? `<i class="fa-solid fa-window-restore me-1"></i>`
          : `<i class="fa-solid fa-pen-to-square me-1"></i>`;
      return GetCellHtml(`
<div class="v-cell-row" style="--row-size:${size};">
<div class="v-cell" style="width:100%">
<a class="table-cell-btn cursor-pointer" style="${style}" onclick="window.${componentName}_func(event);" ${herf}>
${icon}${caption}
<span class='overlay ${overlayBg}'></span>
</a>
</div>
</div>
    `);
    },
    cellClick: (e: any, cell: any) => {
      if ((window as any)[`${componentName}_flag`] === true) return;
      const row: any = cell.getRow().getData();
      if (e.target.classList.contains("table-cell-btn") === true) {
        emit("selected-id", row.id);
        emit("select-private-id", row.pId);
      }
    },
    cellMouseUp: TabulatorFunc.cellMouseUp,
    cellMouseOut: TabulatorFunc.cellMouseOut,
    cellMouseDown: TabulatorFunc.cellMouseDown,
  };
};
// ----------------------------------------------------------------------------

/** List用 並べ替え処理 */
export const ListOriginSortItems = <T>(arg: {
  a: T;
  b: T;
  sortCount: number;
  SortReverse: string[];
  sort: SortItem<string>[];
}) => {
  //
  const { a, b, sortCount, SortReverse, sort } = arg;
  for (let i = 0; i < sortCount; i++) {
    const row = sort[i];
    const isReverse = SortReverse.includes(row.key) === true ? -1 : 1;
    const aRow = (a as any)[row.key];
    const bRow = (b as any)[row.key];
    if (aRow === null) return 1;
    if (bRow === null) return -1;
    if (aRow > bRow) return -1 * row.order * isReverse;
    if (aRow < bRow) return 1 * row.order * isReverse;
  }
  return null;
};

/** List用 表示中ページの配列生成 */
export const ListPage = <T>(arg: {
  size: number;
  index: number;
  list: T[];
}) => {
  const { size, index, list } = arg;
  const st = index * size;
  const end = (index + 1) * size - 1;
  return list
    .map((row) => row)
    .filter((row, index) => {
      if (index < st) return false;
      if (end < index) return false;
      return true;
    }) as T[];
};

/** List用 並べ替え */
export const SortToggle = <SortKey extends string>(arg: {
  key: SortKey;
  sort: SortItem<SortKey>[];
}) => {
  const { key, sort } = arg;
  let temp = ObjectCopy(sort);
  const getActiveSortItem = (key: SortKey): SortItem<SortKey> | null => {
    const ret = temp.find((row) => row.key === key);
    if (ret) return ret;
    return null;
  };
  const item = getActiveSortItem(key);

  if (item === null) {
    temp.unshift({ key: key, order: -1 });
  } else {
    temp = temp.filter((row) => row.key !== item.key);
    if (item.order === -1) {
      temp.unshift({ key: key, order: 1 });
    }
  }
  return temp.filter((row, index) => index < 4);
};
