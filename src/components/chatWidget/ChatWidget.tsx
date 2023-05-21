import styles from './ChatWidget.module.scss'

export interface IChatWidget {
  sampleTextProp: string
}

const ChatWidget: React.FC<IChatWidget> = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>
}

export default ChatWidget
