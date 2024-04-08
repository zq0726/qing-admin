/**
 * 注册 focus 指令
 */
export const registerFocus = (app: any) => {
  app.directive('focus', {
    mounted(el: HTMLElement) {
      el.focus()
    }
  })
}
