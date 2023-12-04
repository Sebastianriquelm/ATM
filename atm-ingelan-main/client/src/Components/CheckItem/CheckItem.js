import onIcon from '../../Assets/Images/icons/INDI_FULL.png'
import offIcon from '../../Assets/Images/icons/INDI_FULL_NO.png'

import styles from './CheckItem.module.css'

export default function CheckItem(props) {
  const { on } = props

  return (
    <img
      className={styles.checkImage}
      src={on ? onIcon : offIcon}
      alt='toogle-option'
    />
  )
}