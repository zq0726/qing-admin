import { ElDialog } from 'element-plus'

export const baseProps = {
  ...ElDialog.props,
  subBtuText: {
    type: String,
    default: '确认'
  },
  width: {
    type: Number,
    default: 446
  },
  title: {
    type: String,
    default: ''
  }
}
