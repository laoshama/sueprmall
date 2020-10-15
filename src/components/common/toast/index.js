import Toast from './Toast'

const toast = {}

toast.install = function (Vue) {
  //  1、创建组件构造器
  const ToastConstruct = Vue.extend(Toast)

  //  2、创建组件实例
  const toast = new ToastConstruct()

  //  3、手动挂载组件实例到某个元素上
  toast.$mount(document.createElement('div'), toast)

  //  4、将组件实例添加到body元素中
  document.body.appendChild(toast.$el)

  //  5、把Toast组件实例挂载到Vue原型对象上
  Vue.prototype.$toast = toast
}

export default toast
