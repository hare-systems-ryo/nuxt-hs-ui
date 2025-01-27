/* ----------------------------------------------------------------------------
com\lib\modal.ts
// ----------------------------------------------------------------------------
// [ com > lib > * ]
import {} from '~/com/lib/modal';
----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
// [ com > lib > * ]
import type { ModalControl } from '~/com/lib/modal';
import { InitModalControl, InitModals } from '~/com/lib/modal';
----------------------------------------------------------------------------- */

/** --------------------------------------------
使用方法

import { ModalControl, InitModalControl, InitModals } from '@/lib-front/modal-control';

interface Modal {
  test1: ModalControl<{
    isLock: boolean;
    id: number;
  }>;
  //test2子コンポーネント側で閉じる部分の制御する
  test2: ModalControl;
}

const modal = reactive<Modal>({
  test1: InitModalControl<Modal['test1']['state']>({
    state: { isLock: false, id: 1 },
    //asyncもOK
    showBefore: (state) => {
      //ここに制御を入れてtrueを返せば中断できる
      return state.isLock;
    },
    showAfter: (state) => {
    },
    //asyncもOK
    closeBefore: (state) => {
      //ここに制御を入れてtrueを返せば中断できる
      return state.isLock;
    },
    closeAfter: (state) => {
    },
  }),
  test2: InitModalControl(),
});

onMounted(() => {
  InitModals(modal, nextTick);
});

-------------------------------------------- */

type OptionalFunction<T> = ((state: T) => undefined | boolean) | ((state: T) => Promise<undefined | boolean>) | null;
export interface ModalControl<T = any> {
  /**
   * showBefre,showAfter がasync付きならasync付き関数になります。
   */
  show: (() => undefined) | (() => Promise<undefined>);
  /**
   * showBefore モーダルが開く前に実行される関数
   * - true をreturnするとモーダルを開く処理は中止される
   */
  showBefore: OptionalFunction<T>;
  showAfter: OptionalFunction<T>;
  /**
   * closeBefore,closeAfter がasync付きならasync付き関数になります。
   */
  // close: () => undefined;
  close: (() => undefined) | (() => Promise<undefined>);
  /**
   * closeBefore モーダルが閉じる前に実行される関数
   * - true をreturnするとモーダルを閉じる処理は中止される
   */
  closeBefore: OptionalFunction<T>;
  closeAfter: OptionalFunction<T>;
  // 状態管理
  isShow: boolean;
  // データ保持
  state: T;
}

export const InitModalControl = <T = any>(arg?: {
  state?: T;
  /**
   * showBefore モーダルが開く前に実行される関数
   * - true をreturnするとモーダルを開く処理は中止される
   */
  showBefore?: OptionalFunction<T>;
  showAfter?: OptionalFunction<T>;
  /**
   * closeBefore モーダルが閉じる前に実行される関数
   * - true をreturnするとモーダルを閉じる処理は中止される
   */
  closeBefore?: OptionalFunction<T>;
  closeAfter?: OptionalFunction<T>;
}): ModalControl<T> => {
  // if (arg === undefined) arg = {};
  const noneInitMessage = 'が初期化されていません';
  return {
    show: () => console.log('[show]' + noneInitMessage),
    showBefore: null,
    showAfter: null,
    close: () => console.log('[close]' + noneInitMessage),
    closeBefore: null,
    closeAfter: null,
    isShow: false,
    state: null,
    ...arg,
  } as ModalControl;
};

const isAsync = (func: any) => {
  try {
    if (func === null) return false;
    if (func === undefined) return false;
    if (!('constructor' in func)) return false;
    return func.constructor.name === 'AsyncFunction';
  } catch {
    return false;
  }
};

/**
 * modalオブジェクトの初期化
 * @param modal ModalControlが含まれるReactiveオブジェクト
 * @param nextTick Vue の nextTick関数
 */
export const InitModals = (modal: any, nextTick: any) => {
  Object.keys(modal).forEach((key) => {
    const m: ModalControl = (modal as any)[key];
    m.show = async () => {
      if (m.showBefore) {
        if (isAsync(m.showBefore)) {
          if ((await m.showBefore(m.state)) === true) {
            console.info('モーダルのShow動作はキャンセルされました');
            return;
          }
        } else if (m.showBefore(m.state) === true) {
          console.info('モーダルのShow動作はキャンセルされました');
          return;
        }
      }
      m.isShow = true;
      if (!m.showAfter) return;
      await nextTick();
      if (isAsync(m.showAfter)) {
        await m.showAfter(m.state);
      } else {
        m.showAfter(m.state);
      }
    };
    m.close = async () => {
      if (m.closeBefore) {
        if (isAsync(m.closeBefore)) {
          if ((await m.closeBefore(m.state)) === true) {
            console.info('モーダルのClose動作はキャンセルされました');
            return;
          }
        } else if (m.closeBefore(m.state) === true) {
          console.info('モーダルのClose動作はキャンセルされました');
          return;
        }
      }
      m.isShow = false;
      await nextTick();
      if (!m.closeAfter) return;
      if (isAsync(m.closeAfter)) {
        await m.closeAfter(m.state);
      } else {
        m.closeAfter(m.state);
      }
      return undefined;
    };
  });
};
