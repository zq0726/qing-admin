import { ElButton, ElImage, ElTag } from 'element-plus'
import { h } from 'vue'

const render = {
  renderButton: (text: string) => {
    return h(ElButton, { type: 'primary' }, [h('text', text)])
  },

  renderTag: (text: string, color: string) => {
    return h(ElTag, { color, style: { color: 'white' } }, () => text)
  },
  renderImage: (src: string) => {
    const style = {
      display: 'flex',
      'align-center': 'center',
      'justify-content': 'center'
    }
    return h(
      'div',
      {
        style: style
      },
      [h(ElImage, { src, fit: 'cover', style: { width: '30px', height: '30px' } })]
    )
  }
}

export { render }
