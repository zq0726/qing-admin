export interface ReturnMethods {
  openDrawer: <T = any>(data: T) => void
  closeDrawer: () => void
}

export type RegisterFn = (drawerInstance: ReturnMethods) => void

export type useDrawerInnerReturnType = [RegisterFn, ReturnMethods]

export type UseDrawerReturnType = [RegisterFn, ReturnMethods]
