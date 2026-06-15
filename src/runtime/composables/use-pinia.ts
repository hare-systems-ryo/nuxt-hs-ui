/* ----------------------------------------------------------------------------
// src\runtime\composables\use-pinia.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-pinia';
----------------------------------------------------------------------------- */

import { useNuxtApp } from '#imports';

export const useHsPinia: any = () => useNuxtApp().$pinia;
