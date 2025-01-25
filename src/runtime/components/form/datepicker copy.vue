<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\form\datepicker.vue
// ----------------------------------------------------------------------------
// Datepicker
// DatepickerDatepicker
----------------------------------------------------------------------------- */

// [ node-modules ]
import dayjs from "dayjs";
import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import { Japanese as ja } from "flatpickr/dist/l10n/ja";
import { english as en } from "flatpickr/dist/l10n/default";
// [ vueuse ]
import { useMounted } from "@vueuse/core";
// [ NUXT ]
import {
  reactive,
  ref,
  watch,
  computed,
  useId,
  onMounted,
  nextTick,
  onUnmounted,
} from "#imports";
// [ utils ]
import type { ClassType } from "../../utils/class-style";
import { GetTimeShiftValue, Dayjs, DayjsInit } from "../../utils/dayjs";
// [ composables ]
import { useHsFocus } from "../../composables/use-hs-focus";
import { useHsToast } from "../../composables/use-hs-toast";
import { useHsMultiLang } from "../../composables/use-hs-multi-lang";
// [ Components ]
import InputFrame from "./input-frame.vue";

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
DayjsInit();
const hsFocus = useHsFocus();
const Toast = useHsToast();
const multiLang = useHsMultiLang();
// ----------------------------------------------------------------------------
// [ vueuse ]
const isMounted = useMounted();
// ----------------------------------------------------------------------------
// flatpickr
const MonthSelectPlugin: any = monthSelectPlugin;
const timeDateFormat = "YYYY-MM-DD HH:mm:ss.SSS";
const timeOutputDateFormat = "HH:mm:ss.SSS";
const timeShowDateFormat = "HH:mm";
// ----------------------------------------------------------------------------
// [ Props ]
type Props = {
  // ----------------------------------------------------------------------------
  // Input 種類別
  textAlign?: "left" | "center" | "right";
  mode?: "all" | "date" | "time" | "month";
  /** mode=time の場合、[HH:mm:ss.SSS] に固定 */
  dataFormat?: string;
  /** mode=time の場合、[HH:mm] に固定 */
  showFormat?: string;
  minDate?: string | null;
  maxDate?: string | null;
  hideDeleteBtn?: boolean;
  hideTodayBtn?: boolean;
  disableMobile?: boolean;
  hasShift?: boolean;
  // ----------------------------------------------------------------------------
  data: string | null;
  diff?: string | null | undefined;
  tabindex?: string | undefined;
  // ----------------------------------------------------------------------------
  class?: ClassType;
  classHeader?: ClassType;
  classInput?: ClassType;
  // ----------------------------------------------------------------------------
  // 状態
  //   focus?: boolean;
  focusColor?: string;
  //   change?: boolean;
  changeColor?: string;
  error?: boolean;
  errorColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  readonly?: boolean;
  // ----------------------------------------------------------------------------
  // 表示
  label?: string;
  // 表示-副情報
  require?: boolean;
  requireText?: string;
  warn?: string;
  warnTimeOut?: number;
  // ----------------------------------------------------------------------------
  // 設定
  size?: "s" | "m" | "l";
  // ----------------------------------------------------------------------------
  uiText?: {
    error: {
      inputRangeTitle: string;
      inputRangeMessage: string;
    };
  };
};
const props = withDefaults(defineProps<Props>(), {
  // ----------------------------------------------------------------------------
  // Input 種類別
  textAlign: "left",
  mode: "date",
  dataFormat: "",
  showFormat: "",
  minDate: null,
  maxDate: null,
  hideDeleteBtn: false,
  disableMobile: false,
  hasShift: true,
  // ----------------------------------------------------------------------------
  diff: undefined,
  tabindex: undefined,
  // ----------------------------------------------------------------------------
  class: "",
  classHeader: "",
  classInput: "",
  // ----------------------------------------------------------------------------
  // 状態
  //   focus: false,
  focusColor: "shadow-[inset_0px_0px_1px_2px_#0d8ee4]",
  //   change: false,
  changeColor: "shadow-[inset_0px_0px_1px_2px_#fd9831be]",
  error: false,
  errorColor: "shadow-[inset_0px_0px_1px_2px_#d80000dc]",
  disabled: false,
  disabledColor: "",
  readonly: false,
  // ----------------------------------------------------------------------------
  // 表示
  label: "",
  // 表示-副情報
  require: false,
  requireText: "必須",
  warn: "",
  warnTimeOut: 300,
  // ----------------------------------------------------------------------------
  // 設定
  size: "m",
  // ----------------------------------------------------------------------------
  uiText: () => {
    return {
      error: {
        inputRangeTitle: "入力値エラー",
        inputRangeMessage: "入力範囲外です",
      },
    };
  },
});
// [ emit ]
// ----------------------------------------------------------------------------
// [ emit ]
type Emits = {
  ref: [element: HTMLElement];
  focus: [elm: HTMLElement];
  blur: [elm: HTMLElement];
  // ----------------------------
  "update:data": [value: string | null];
  "value-change": [after: string | null, before: string | null];
  // ----------------------------
  "reset-piceker-func": [func: any];
  // ----------------------------
};
const emit = defineEmits<Emits>();
// ----------------------------------------------------------------------------
// [ getCurrentInstance ]
const uid = useId();

// ----------------------------------------------------------------------------
// [ reactive ]

interface State {
  picker: any;
  // FormControl値
  date: Date | null;
  // text: string;
  option: any;
}
const state = reactive<State>({
  // text: '',
  picker: null,
  date: null,
  option: {
    dateFormat: "Z",
    locale: ja,
    time_24hr: true,
    minDate: undefined,
    maxDate: undefined,
    plugins: [],
  },
});
// ----------------------------------------------------------------------------

onMounted(() => {
  state.option.maxDate =
    dayjs(props.maxDate).isValid() === true
      ? dayjs(props.maxDate).toISOString()
      : undefined;
  state.option.minDate =
    dayjs(props.minDate).isValid() === true
      ? dayjs(props.minDate).toISOString()
      : undefined;
});
const shiftM = GetTimeShiftValue(Dayjs());
const getShiftDayjs = (date: any) => {
  if (props.hasShift && shiftM !== 0) {
    return dayjs(date).subtract(shiftM, "minute");
  }
  return dayjs(date);
};

const inputBoxClass = computed(() => {
  if (props.textAlign === "left") {
    return "display-left";
  } else if (props.textAlign === "center") {
    return "display-center";
  } else {
    return "display-right";
  }
});
const displayText = computed(() => {
  const lang = multiLang.state.lang;
  dayjs.locale(lang);
  if (props.data === null) {
    return "";
  } else if (props.mode === "time") {
    return getShiftDayjs(dayjs().format("YYYY-MM-DD ") + props.data).format(
      timeShowDateFormat
    );
  } else {
    return getShiftDayjs(props.data).format(props.showFormat);
  }
});

// ----------------------------------------------------------------------------
watch(
  computed(() => {
    return [props.minDate, props.maxDate, multiLang.state.lang];
  }),
  () => {
    // console.log('computed', props.minDate, props.maxDate, isMounted.value);
    if (!isMounted.value) return;
    setTimeout(() => {
      resetPicekr();
    }, 1);
  }
);

const checkDate = (date: any) => {
  // console.log(props.minDate);
  const d = getShiftDayjs(date);
  if (props.minDate !== "" && d.isBefore(props.minDate)) {
    // console.log('最小日付を下回っています', props.data, props.minDate);
    return false;
  } else if (props.maxDate !== "" && d.isAfter(props.maxDate)) {
    // console.log('最大日付を下回っています', props.data, props.maxDate);
    return false;
  }
  return true;
};

const keyDown = (event: any) => {
  const before = props.data;
  // console.log('keyDown', state.picker);
  if (event.key === "Enter") {
    datePickerToday();
    return;
  }
  if (event.key === "Backspace") {
    iconEventDelete();
    return;
  }
  let move = 0;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    move--;
  }
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    move++;
  }
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    // Flatpickerにフォーカスを奪われるキーイベントはフォーカスを取り戻す予約
    setTimeout(() => {
      // console.log('フォーカス戻す');
      if (inputElement.value != null) {
        inputElement.value.focus();
      }
    }, 150);
  }
  if (move !== 0) {
    let m =
      props.data == null ? getShiftDayjs(dayjs()) : getShiftDayjs(props.data);
    if (move < 0) {
      m = m.subtract(1, "d");
    } else {
      m = m.add(1, "d");
    }
    if (props.data !== "") {
      if (checkDate(m) === false) {
        // console.log('行き過ぎ');
        return false;
      }
    } else if (move < 0) {
      m = getShiftDayjs(props.maxDate).subtract(1, "d");
    } else {
      m = getShiftDayjs(props.minDate).add(1, "d");
    }
    emit("update:data", m.format(props.dataFormat));
    nextTick(() => {
      emit("value-change", m.format(props.dataFormat), before);
    });
    return false;
  }
};

// ----------------------------------------------------------------------------
// [ flatpicker関連 ]
const initFlatPickerOption = () => {
  if (props.mode === "all" || props.mode === "time") {
    state.option.enableTime = true;
    if (props.mode === "time") {
      state.option.noCalendar = true;
    }
  }
  if (props.mode === "month") {
    state.option.disableMobile = true;
  }
  if (props.disableMobile) {
    state.option.disableMobile = true;
  }
  if (props.mode === "month") {
    state.option.plugins = [
      new MonthSelectPlugin({
        shorthand: true, // デフォルトはfalse
        dateFormat: "m.y", // デフォルトは"F Y"
        altFormat: "F Y", // デフォルトは"F Y"
        theme: "dark", // デフォルトは"light"
      }),
    ];
  }
};

const onOpen = () => {
  focusState.isOpenFlatpickr = true;
};

const onClose = () => {
  focusState.isOpenFlatpickr = false;
  focusState.isClosingFlatpickr = true;
  setTimeout(() => {
    focusState.isClosingFlatpickr = false;
  }, 200);
};

const onChange = (selectedDates: any) => {
  // console.log('onChange');
  let value = null;
  if (selectedDates.length === 0) {
    value = null;
  } else {
    const d = selectedDates[0];
    if (d == null) {
      value = null;
    } else {
      value = d;
    }
  }
  updateValue(value);
};

const generateFlatPickerOption = () => {
  // console.log('generatePicker', elmInput.value);
  if (inputElement.value != null) {
    dayjs.locale(multiLang.state.lang);
    switch (multiLang.state.lang) {
      case "ja":
        state.option.locale = ja;
        break;
      case "en":
        state.option.locale = en;
        break;
      default:
        state.option.locale = en;
        break;
    }
    state.picker = flatpickr(inputElement.value, state.option);
    state.picker.config.onChange.push(onChange);
    state.picker.config.onOpen.push(onOpen);
    state.picker.config.onClose.push(onClose);
    setValue();
  }
};
const flag = ref(false);

const resetPicekr = () => {
  if (flag.value) return;
  try {
    flag.value = true;
    state.picker.destroy();
    state.picker = false;
    focusState.isOpenFlatpickr = false;
    dayjs.locale(multiLang.state.lang);
    if (props.minDate !== null) {
      state.option.minDate =
        dayjs(props.minDate).isValid() === true
          ? dayjs(props.minDate).toISOString()
          : undefined;
    } else {
      state.option.minDate = null;
    }
    if (props.maxDate !== null) {
      state.option.maxDate =
        dayjs(props.maxDate).isValid() === true
          ? dayjs(props.maxDate).toISOString()
          : undefined;
    } else {
      state.option.maxDate = null;
    }
    generateFlatPickerOption();
  } catch (error) {
    console.error("resetPicekr()", error);
  } finally {
    flag.value = false;
  }
};
emit("reset-piceker-func", resetPicekr);
watch(
  () => props.data,
  () => {
    setValue();
  }
);

const setValue = () => {
  // console.log('setValue');
  try {
    if (props.data == null) {
      state.picker.setDate(null);
      state.date = null;
      return;
    }
    const date =
      props.mode === "time"
        ? dayjs().format("YYYY-MM-DD ") + props.data
        : props.data;
    const d = getShiftDayjs(date);
    // console.log('setValue', date);
    if (d.isValid() === true) {
      if (checkDate(props.data) === true) {
        state.date = d.toDate();
        state.picker.setDate(state.date);
        return;
      }
    }
    throw new Error("変換失敗");
  } catch (err) {
    console.error(err);
    state.picker.setDate(null);
    state.date = null;
    updateValue(null);
  }
};
//  アイコン系イベント
const datePickerToggle = () => {
  if (props.readonly === true) return;
  if (props.disabled === true) return;
  if (state.picker === null) return;
  if (focusState.isClosingFlatpickr) return;
  hsFocus.state.id = uid;
  state.picker.open();
};

const datePickerToday = () => {
  if (props.readonly === true) return;
  if (props.disabled === true) return;
  if (state.date !== null) return;
  let inputValue = dayjs();
  if (props.mode === "month") {
    inputValue = inputValue.startOf("month");
  }
  const d = getShiftDayjs(inputValue);
  if (checkDate(d.format("YYYY-MM-DD")) === false) {
    Toast.Warning(
      props.uiText.error.inputRangeMessage,
      props.uiText.error.inputRangeTitle,
      props.warnTimeOut
    );
    return;
  }
  if (props.mode === "time") {
    updateValue(inputValue.format(timeDateFormat));
  } else {
    updateValue(inputValue.format(props.dataFormat));
  }
};

const updateValue = async (text: string | null) => {
  // console.log('updateValue', text);
  const before = props.data;
  if (text === null || text.length === 0) {
    emit("update:data", null);
    await nextTick();
    emit("value-change", null, before);
    return;
  }
  if (props.mode === "all") {
    emit("update:data", dayjs(text).format(props.dataFormat));
    nextTick(() => {
      emit("value-change", dayjs(text).format(props.dataFormat), before);
    });
  } else if (props.mode === "time") {
    emit("update:data", dayjs(text).format(timeOutputDateFormat));
    nextTick(() => {
      emit("value-change", dayjs(text).format(timeOutputDateFormat), before);
    });
  } else {
    // 時間情報を削除する
    emit(
      "update:data",
      dayjs(dayjs(text).format("YYYY-MM-DD")).format(props.dataFormat)
    );
    nextTick(() => {
      emit(
        "value-change",
        dayjs(dayjs(text).format("YYYY-MM-DD")).format(props.dataFormat),
        before
      );
    });
  }
};

const iconEventDelete = () => {
  const before = props.data;
  if (props.readonly === true) return;
  if (props.disabled === true) return;
  if (state.date != null) {
    emit("update:data", null);
    nextTick(() => {
      emit("value-change", null, before);
    });
  }
};

// [ ref ]
const inputElement = ref();
onMounted(() => {
  emit("ref", inputElement.value as HTMLInputElement);
});

const setRef = (elm: any) => {
  inputElement.value = elm;
  emit("ref", elm);
};

// [ focus, blur ]

interface FocusState {
  isOpenFlatpickr: boolean;
  isClosingFlatpickr: boolean;
}

const focusState = reactive<FocusState>({
  isOpenFlatpickr: false,
  isClosingFlatpickr: false,
});

/**
 * コントロールのFocus判定
 */
const computedActivate = computed(() => {
  if (props.disabled === true) return false;
  if (props.readonly === true) return false;
  if (hsFocus.state.id !== uid) return false;
  if (focusState.isOpenFlatpickr) return true;
  return false;
});

/**
 * focus, blur イベント
 */
watch(computedActivate, (value) => {
  if (value === true) {
    // クリックでの遷移の場合に
    // 一つ前のコントロールのblurイベントよりも早くfocusが発生しないようにする対策で10ミリ秒処理をずらす
    setTimeout(() => {
      emit("focus", inputElement.value);
    }, 10);
  } else {
    emit("blur", inputElement.value);
  }
});

onMounted(() => {
  initFlatPickerOption();
  generateFlatPickerOption();
});
onUnmounted(() => {
  if (state.picker != null) {
    state.picker.destroy();
    state.picker = null;
  }
});
const tabindex = computed(() => {
  if (props.disabled === true) return -1;
  return props.tabindex;
});

// 更新の有無判定
const isChangeData = computed(() => {
  if (props.diff === undefined) return false;
  if (props.diff === null && props.data === "") return false;
  if (props.diff === "" && props.data === null) return false;
  if (props.diff !== props.data) return true;
  return false;
});

//  ---------------------------------------------------------------------------------
</script>

<template>
  <InputFrame
    :class="props.class"
    :class-header="props.classHeader"
    :class-input="[props.classInput]"
    :focus="computedActivate"
    :focus-color="props.focusColor"
    :change="isChangeData"
    :change-color="props.changeColor"
    :error="props.error"
    :error-color="props.errorColor"
    :disabled="props.disabled"
    :disabled-color="props.disabledColor"
    :readonly="props.readonly"
    :label="props.label"
    :require="props.require"
    :require-text="props.requireText"
    :warn="props.warn"
    :warn-time-out="props.warnTimeOut"
    :size="props.size"
  >
    <template v-if="!props.readonly" #left-icons="{ disabled: iconDisabled }">
      <div
        :class="
          !iconDisabled
            ? 'cursor-pointer hover:bg-accent1/[0.1] active:bg-accent1/[0.2]'
            : ''
        "
        @click="datePickerToggle()"
      >
        <i
          :class="
            props.mode === 'time'
              ? 'fa-regular fa-clock'
              : 'fa-solid fa-calendar-days'
          "
        ></i>
      </div>
    </template>
    <div
      class="nac-c-input-p"
      :class="[
        { disabled: props.disabled, readonly: props.readonly },
        inputBoxClass,
      ]"
      @click="datePickerToggle()"
    >
      <input
        :ref="(e) => setRef(e)"
        type="text"
        class="flatpickr-body"
        :disabled="props.disabled"
        :tabindex="tabindex"
        @keydown="keyDown"
      />
      <span>{{ displayText }}</span>
      <span
        v-if="
          props.data === null &&
          !props.hideTodayBtn &&
          !props.readonly &&
          !props.disabled
        "
        class="today"
        @click.stop="datePickerToday()"
      >
        {{ props.mode === "time" ? "Now" : "Today" }}
      </span>
    </div>
    <template
      v-if="!props.hideDeleteBtn && !props.readonly"
      #right-icons="{ disabled: iconDisabled }"
    >
      <div
        :class="
          !iconDisabled
            ? 'text-error cursor-pointer hover:bg-error/[0.1] active:bg-error/[0.2]'
            : ''
        "
        @click="iconEventDelete()"
      >
        <i class="fa-solid fa-delete-left"></i>
      </div>
    </template>
  </InputFrame>
</template>

<style lang="scss" scoped>
.nac-c-input-p {
  width: 100%;
  height: 100%;
  padding: 0 4px;
  &:not(.readonly) {
    cursor: pointer;
  }

  .today {
    margin: 0 0 0 4px;
    border-radius: 4px;
    border: solid 1px #f68708;
    background-color: rgb(255, 246, 237);
    color: #e26f2c;
    font-size: 12px;
    padding: 1px 4px;
  }

  .flatpickr-body {
    position: absolute;
    opacity: 0 !important;
    top: 0px;
    height: 40px;
    height: 100%;
    width: 40px;
    left: 0;
    z-index: -1;
    pointer-events: none;
  }
}

:deep(.flatpickr-mobile) {
  position: absolute;
  opacity: 0;
}
.nac-c-input-p {
  display: flex;
  align-items: center;
  &.display-left {
    justify-content: flex-start;
  }

  &.display-center {
    justify-content: center;
  }

  &.display-right {
    justify-content: flex-end;
  }
}

.disabled {
  .nac-c-input-p {
    cursor: default;
    .today {
      display: none;
    }
  }
}
</style>
