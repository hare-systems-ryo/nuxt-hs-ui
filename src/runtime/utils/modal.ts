/* ----------------------------------------------------------------------------
// src\runtime\utils\modal.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/modal';
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

// type OptionalFunction<T> = ((state?: T) => undefined | boolean) | ((state?: T) => Promise<undefined | boolean>);
type OptionalFunction<T> =
  | ((state?: T) => void)
  | ((state?: T) => boolean)
  | ((state?: T) => Promise<boolean>)
  | ((state?: T) => Promise<void>);

type OptionalAfterFunction<T> = (state?: T) => Promise<void> | void;

export interface ModalControl<T = any> {
  show: () => Promise<undefined>;
  /**
   * showBefore モーダルが開く前に実行される関数
   * - true をreturnするとモーダルを開く処理は中止される
   */
  showBefore: OptionalFunction<T> | null;
  showAfter: OptionalAfterFunction<T> | null;
  // close: () => undefined;
  close: () => Promise<undefined>;
  /**
   * closeBefore モーダルが閉じる前に実行される関数
   * - true をreturnするとモーダルを閉じる処理は中止される
   */
  closeBefore: OptionalFunction<T> | null;
  closeAfter: OptionalAfterFunction<T> | null;
  // 状態管理
  isShow: boolean;
  // データ保持
  state: T;
}

export const InitModalControl = <T = any>(state?: T): ModalControl<T> => {
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
    state: state || null,
  } as ModalControl;
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
        if ((await m.showBefore(m.state)) === true) {
          console.info('モーダルのShow動作はキャンセルされました');
          return;
        }
      }
      m.isShow = true;
      if (!m.showAfter) return;
      await nextTick();
      await m.showAfter(m.state);
    };
    m.close = async () => {
      if (m.closeBefore) {
        if ((await m.closeBefore(m.state)) === true) {
          console.info('モーダルのClose動作はキャンセルされました');
          return;
        }
      }
      m.isShow = false;
      await nextTick();
      if (!m.closeAfter) return;
      await m.closeAfter(m.state);
      return;
    };
  });
};
