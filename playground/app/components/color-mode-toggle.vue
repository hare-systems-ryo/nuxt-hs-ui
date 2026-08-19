<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\components\color-mode-toggle.vue
// ----------------------------------------------------------------------------
// ColorModeToggle
// ColorModeToggleColorModeToggle
---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------

// 公開ページ限定のカラーモード切り替えボタン。
// colorMode.preference を切り替えるだけで、実際の適用範囲(dark/lightクラスの付与先)は
// default.vue / auth.vue レイアウト側で公開ページのサブツリーに限定している。
// (管理画面 app.vue レイアウトは常時 light 固定のため、このボタンはここでしか出さない)
// search-key-word: LayoutsWebColorModeToggleLayoutsWebColorModeToggle
---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
  Copyright (c)  INSPIRE
----------------------------------------------------------------------------- */

// app.vue の bodyColorMode と同じCookie(color-mode-pref)を参照する。
// @nuxtjs/color-modeのcolorMode.value/.preferenceは使わない(理由はapp.vue側のコメント参照)。
// 未選択時はfalse(月アイコン=「ダークに切り替え」)を表示する。実際の見た目はCSSの
// prefers-color-schemeで端末設定に追従しているが、アイコンは「明示選択した場合の次の状態」を
// 表すシンプルな2値のままにしている。
const colorModePref = useCookie<'light' | 'dark' | undefined>('color-mode-pref', {
  maxAge: 60 * 60 * 24 * 365,
});
const isDark = computed(() => colorModePref.value === 'dark');
const toggle = () => {
  colorModePref.value = isDark.value ? 'light' : 'dark';
  useColorMode().preference = colorModePref.value;
};
</script>

<template>
  <button
    type="button"
    class="flex-cc size-9 rounded border border-transparent text-white hover:border-white/40 hover:bg-white/10"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    data-tippy="Color Mode"
    @click="toggle"
  >
    <i class="fa-solid" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
  </button>
</template>
