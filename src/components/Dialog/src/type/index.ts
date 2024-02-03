export interface DialogMethods {
  setProps: (props: any) => void
  openDialog: () => void
  closeDialog: () => void
}

/**
 * Dialog 参数
 */
export type RegisterFn = (ModalInstance: DialogMethods) => void
export type UseDialogReturnType = [RegisterFn, DialogMethods]
