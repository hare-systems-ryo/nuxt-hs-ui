/* ----------------------------------------------------------------------------
components\v-ui\modal\use-ui-modal.ts
// ----------------------------------------------------------------------------
// [ components > v-ui > modal > * ]
import {} from '~/components/v-ui/modal/use-ui-modal';
----------------------------------------------------------------------------- */

// [ Nuxt ]
import { computed, watch } from 'vue';
import { useRoute } from '#imports';
import { defineStore } from 'pinia';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ----------------------------------------------------------------------------
interface State {
  state: {
    init: boolean;
    baseIndex: number;
    activeList: {
      id: string;
      zIndex: number;
    }[];
  };
}
// ----------------------------------------------------------------------------
export const useStoreModal = defineStore({
  id: 'HsUiStoreModal',
  state: (): State => {
    return {
      state: {
        init: false,
        baseIndex: 5000,
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
      // console.log('useVUiModal init', state.init);
      if (import.meta.server) return;
      if (state.init) return;
      state.init = true;
      const route = useRoute();
      // console.log(route);
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
    add(id: string) {
      const zIndex =
        this.state.activeList.length === 0
          ? this.state.baseIndex
          : Math.max(...this.state.activeList.map((row) => row.zIndex)) + 2;
      this.state.activeList.push({
        id: id,
        zIndex: zIndex,
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
