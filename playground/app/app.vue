<script setup lang="ts">
/* ----------------------------------------------------------------------------
// playground\app\app.vue
// ----------------------------------------------------------------------------
// App
// AppApp
---------------------------------------------------------------------------- */
const hsMisc = useHsMisc();

// [ ColorMode ]
// Toast/ModalBg/Dialog/WindowLoader は Teleport to="body" で実DOM上はレイアウトルートの
// 外(bodyの直下)に出るため、レイアウト側でルート要素に付けている .dark だけでは
// テレポート先まで届かない。body自身にも付与して救うが、body はSPA全体で1つしかなく
// 管理画面とも共有するため、/app 配下では colorMode の値に関わらず常に light に強制する
// (公開ページでdarkにしていても、管理画面でモーダルを開いた瞬間だけ道連れでdark化する事故を防ぐ)。
//
// @nuxtjs/color-mode の colorMode.value/.preference はSSR/クライアントの初回描画を一致させる
// 保証がなく(内部実装がstorageの値をvalueへ同期しない)、Hydration mismatchの原因になっていた。
// 明示選択の有無・値は自前のCookie(color-mode-pref)で持ち、@nuxtjs/color-modeの内部stateには
// 依存しない。未選択(Cookie未設定)時はクラス自体を付与せず、main.cssの
// `@media (prefers-color-scheme: dark)` に委ねる。これはJSを介さない純粋なCSSでの解決なので
// SSRとクライアントの初回描画が原理的に食い違わない(サーバーが端末の設定を知る必要が無い)。
const colorModePref = useCookie<'light' | 'dark' | undefined>('color-mode-pref', {
  maxAge: 60 * 60 * 24 * 365, // 1年
});

// const route = useRoute();

const bodyColorMode = computed(() => {
  // if (pConfig.app.colorMode !== 'auto') return 'light';
  // if (route.path.startsWith('/')) return 'light';
  return colorModePref.value ?? '';
});

// bodyColorMode で <body> を強制lightにしても、<html> 側は @nuxtjs/color-mode 自身の
// preference(colorModePref とは別に持っている内部状態)で dark/light が決まるため、
// 公開ページでdark選択済みのまま /app に遷移すると <html> が dark, <body> が light という
// 食い違いが起きる。main.css の `html:not(.light) body:not(.light)` のように html 側の
// 状態を参照するルールが背景色に道連れで引っ張られる実害があったため、bodyColorMode と
// 同じ条件で <html> 側も明示的に揃える。SPA内遷移でも追従させるため watch で管理し、
// /app を離れたら colorModePref の値(未選択なら 'system')に戻す。
watch(
  () => [colorModePref.value] as const,
  ([pref]) => {
    if (import.meta.server) return;
    const colorMode = useColorMode();
    colorMode.preference = pref ?? 'system';
  },
  { immediate: true }
);

onMounted(() => {
  hsMisc.init();
});

useHead({
  meta: [
    { 'http-equiv': 'refresh', content: '' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0,maximum-scale=1.0, interactive-widget=resizes-content',
    },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#183C5E' },
    { name: 'apple-mobile-web-app-title', content: 'LogiNavi' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'mobile-web-app-capable', content: 'yes' },
  ],
  bodyAttrs: {
    class: () => {
      // return '';
      return [bodyColorMode.value].join(' ');
    },
    // 未選択時は 'light dark' を指定し、フォームコントロールやスクロールバー等のUA描画も
    // 端末のカラースキームに委ねる(prefers-color-schemeと同じ考え方)。
    style: () => `color-scheme: ${bodyColorMode.value || 'light dark'};`,
  },
});
</script>

<template>
  <NuxtLayout>
    <Teleport to="body">
      <Toast />
      <WindowLoader />
      <ModalBg />
      <Dialog />
    </Teleport>
    <NuxtPage />
  </NuxtLayout>
</template>
