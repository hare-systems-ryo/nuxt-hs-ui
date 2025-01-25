<script setup lang="ts">
/* ----------------------------------------------------------------------------
// src\runtime\components\interactive\toast.vue
// ----------------------------------------------------------------------------
// Toast
// ToastToast
----------------------------------------------------------------------------- */

// [ vue ]
import { computed, watch } from "vue";
// [ vueuse ]
import { watchArray } from "@vueuse/core";
// ----------------------------------------------------------------------------
// [ types ]
import type { Message } from "../../types/toast";
// [ utils ]
import { Int } from "../../utils/number";
// [ composables ]
import { useHsToast } from "../../composables/use-hs-toast";
import { useHsMultiLang } from "../../composables/use-hs-multi-lang";
// [ Components ]
import Accordion from "../layout/accordion.vue";
import Card from "../layout/card.vue";
import CardItem from "../layout/card-item.vue";
import Btn from "../form/btn.vue";
// ----------------------------------------------------------------------------
// [ nac-Stroe ]
const toast = useHsToast();
const state = toast.state;
// ----------------------------------------------------------------------------
const multiLang = useHsMultiLang();
const tx = multiLang.tx;
// ----------------------------------------------------------------------------
// 要素を消し始めから完全に消すのにかかる時間（Accordionの動作時間）
const hideSpan = 300;
const showCount = computed(() => {
  const list = state.pendingList.filter((row) => row.isShow);
  return list.length;
});
// ----------------------------------------------------------------------------
watch(
  () => showCount.value,
  () => {
    setTimeout(() => {
      if (showCount.value === 0 && state.pendingList.length !== 0) {
        state.pendingList.length = 0;
      }
    }, hideSpan);
  }
);

watchArray(state.pendingList, (newList, oldList, added, removed) => {
  if (added.length === 0 && removed.length > 0) return;
  // const keyMap = newList.map((row) => row.key);
  newList.forEach((message) => {
    if (message.hideAfter !== 0) {
      setTimeout(() => {
        if (message.isShow === false) return;
        deleteMessage(message);
      }, message.hideAfter);
    }
  });
});

const deleteMessage = (message: Message) => {
  message.isShow = false;
};
const style = (message: Message) => {
  let d = Int(message.hideAfter);
  if (d < 0) d = 0;
  return {
    "animation-duration": d + "ms",
  };
};

const closeBtnStyle = [
  //
  "bg-transparent",
  "border-[1px]",
  "border-white",
  "rounded",
  "min-h-0",
  "w-[30px]",
  "h-[30px]",
  "p-0",
  "flex-none",
  "self-start",
];

// ----------------------------------------------------------------------------
</script>

<template>
  <div class="HsUiToast-base" :style="{ 'z-index': state.zindex }">
    <div
      v-show="state.pendingList.length !== 0"
      class="HsUiToast-container grid gap-1"
    >
      <template v-for="(message, index) in state.pendingList" :key="index">
        <Accordion :span="hideSpan" :open="message.isShow">
          <Card
            class="HsUiToast"
            :class="['drop-shadow-md', 'pointer-events-all']"
            @click.stop=""
            @mousedown.stop=""
            @mouseup.stop=""
          >
            <template v-if="tx(message.title).value.length > 0">
              <CardItem
                variant="header"
                class="items-center"
                :class="[`theme-${message.theme}`]"
              >
                <div class="HsUiToast-title">
                  {{ tx(message.title) }}
                </div>
                <Btn
                  :class="closeBtnStyle"
                  theme="white"
                  type="outlined"
                  @click="deleteMessage(message)"
                >
                  <i class="fas fa-times" />
                </Btn>
              </CardItem>
              <CardItem
                v-if="tx(message.message).value.length > 0"
                :class="[`theme-${message.theme}`, ['items-overflow-visible']]"
              >
                <div class="HsUiToast-message">
                  {{ tx(message.message) }}
                </div>
              </CardItem>
              <CardItem
                v-if="message.hideAfter != 0"
                :class="[
                  `theme-${message.theme}`,
                  ['overflow-visible', 'p-0', 'min-h-[8px]'],
                ]"
              >
                <div class="HsUiToast-bar-body" :class="[`${message.theme}`]">
                  <div class="HsUiToast-bar" :style="style(message)" />
                </div>
              </CardItem>
            </template>
            <template v-else>
              <CardItem
                variant="header"
                :class="[`theme-${message.theme}`, ['items-center']]"
              >
                <div class="HsUiToast-message">
                  {{ tx(message.message) }}
                </div>
                <Btn
                  :class="closeBtnStyle"
                  theme="white"
                  variant="outlined"
                  @click="deleteMessage(message)"
                >
                  <i class="fas fa-times" />
                </Btn>
              </CardItem>
              <CardItem
                v-if="message.hideAfter != 0"
                :class="[
                  `theme-${message.theme}`,
                  ['overflow-visible', 'p-0', 'min-h-[8px]'],
                ]"
              >
                <div class="HsUiToast-bar-body" :class="[`${message.theme}`]">
                  <div class="HsUiToast-bar" :style="style(message)" />
                </div>
              </CardItem>
            </template>
          </Card>
        </Accordion>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 色設定
.theme-success {
  background-color: #2bb60c !important;
  color: white !important;
  .HsUiToast-bar {
    background-color: #2bb60c !important;
  }
}

.theme-info {
  background-color: #2badd5 !important;
  color: white !important;
  .HsUiToast-bar {
    background-color: #2badd5 !important;
  }
}
.theme-warning {
  background-color: #d89400 !important;
  color: #000000 !important;
  .HsUiToast-bar {
    background-color: #d89400 !important;
  }
}
.theme-error {
  background-color: #e82a4d !important;
  color: white !important;
  .HsUiToast-bar {
    background-color: #e82a4d !important;
  }
}

.HsUiToast-base {
  pointer-events: none;
  position: fixed;
  inset: 0 0 0 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.HsUiToast-container {
  pointer-events: none;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  height: 100svh;
  max-height: 100%;
  max-height: 100svh;
  display: flex;
  flex-direction: column;

  width: 800px;
  padding: 10px 20px;
  @media screen and (min-width: #{  0 }px) and (max-width: #{ 400 - 0.1}px) {
    width: 100%;
    padding: 5px 5px;
  }

  @media screen and (min-width: #{  400 }px) and (max-width: #{ 600 - 0.1}px) {
    width: 380px;
  }
  @media screen and (min-width: #{  600 }px) and (max-width: #{ 800 - 0.1}px) {
    width: 550px;
  }
  @media screen and (min-width: #{  800 }px) and (max-width: #{ 1200 - 0.1}px) {
    width: 600px;
  }
}

.HsUiToast {
  pointer-events: all;
}
.HsUiToast-title {
  pointer-events: all;
  font-size: 20px;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-all;
}
.HsUiToast-message {
  pointer-events: all;
  font-size: 16px;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-all;
}

.HsUiToast-icon {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 30px;

    @media screen and (min-width: #{  0 }px) and (max-width: #{ 600 - 0.1}px) {
      font-size: 18px;
    }
  }
  &[data-icon="success"]::after {
    content: "\f058";
  }
  &[data-icon="info"]::after {
    content: "\f05a";
  }

  &[data-icon="warning"]::after {
    content: "\f06a";
  }

  &[data-icon="error"]::after {
    content: "\f071";
  }
}
.HsUiToast-bar-body {
  height: 6px;
  margin: 0px 2px 2px 2px;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: flex-start;
}
.HsUiToast-bar {
  margin: 1px 1px;
  border-radius: 2px;
  height: 4px;
  transition: width 10ms;
  animation-name: HsUiToast-bar-key-frame;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>

<style lang="scss">
@keyframes HsUiToast-bar-key-frame {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
