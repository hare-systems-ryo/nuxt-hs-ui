/* ----------------------------------------------------------------------------
// src\runtime\composables\use-hs-modal.ts
// ----------------------------------------------------------------------------
// [ src > runtime > composables > * ]
import {} from '~/src/runtime/composables/use-hs-modal';
----------------------------------------------------------------------------- */

// [ node_modules ]
import { defineStore } from 'pinia';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
// [ NUXT ]
import { computed, watch } from 'vue';
import { useRoute } from '#app';
// [ composables ]
import { useHsToast } from '../composables/use-hs-toast';

// ----------------------------------------------------------------------------
interface State {
  state: {
    init: boolean;
    baseIndex: number;
    activeList: {
      id: string;
      zIndex: number;
      closeable: boolean;
    }[];
  };
}
// ----------------------------------------------------------------------------
export const useHsModal = defineStore('HsModal', {
  state: (): State => {
    return {
      state: {
        init: false,
        baseIndex: 500,
        activeList: [],
      },
    };
  },
  getters: {
    activeId: (state) => {
      const activeList = state.state.activeList;
      if (activeList.length === 0) return null;
      const zIndex = Math.max(...activeList.map((row) => row.zIndex));
      const data = activeList.find((row) => row.zIndex === zIndex);
      if (!data) return null;
      return data.id;
    },
  },
  actions: {
    watch() {
      const state = this.state;
      if (import.meta.server) return;
      if (state.init) return;
      state.init = true;
      const route = useRoute();
      watch(
        () => route.path,
        () => {
          state.activeList = [];
        }
      );
    },
    myzIndex(id: string) {
      const state = this.state;
      return computed(() => {
        const target = state.activeList.find((row) => row.id === id);
        if (!target) {
          return state.baseIndex;
        }
        return target.zIndex;
      });
    },
    add(id: string, closeable: boolean = false, _zIndex: undefined | number = undefined) {
      const getIndex = () => {
        if (_zIndex !== undefined) return _zIndex;
        if (this.state.activeList.length === 0) return this.state.baseIndex;
        return Math.max(...this.state.activeList.map((row) => row.zIndex)) + 2;
      };
      const zIndex = getIndex();
      this.state.activeList.push({
        id: id,
        zIndex: zIndex,
        closeable,
      });
      const toast = useHsToast();
      toast.state.pendingList.forEach((row) => {
        row.isShow = false;
      });
      return zIndex;
    },
    remove(id: string) {
      this.state.activeList = this.state.activeList.filter((row) => row.id !== id);
      if (this.state.activeList.length === 0) {
        clearAllBodyScrollLocks();
      }
    },
    removeAll() {
      this.state.activeList = [];
      clearAllBodyScrollLocks();
    },
    // ---------------------------------------------------
  },
});
