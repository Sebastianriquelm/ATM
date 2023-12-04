import { Link } from 'react-router-dom'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'

import styles from './ExitButton.module.css'
import checkList from '../../Assets/Images/Options/BTN_LIST_VERIF.png'
export default function ExitButton() {
  return (
    <Link to='/' className={styles.existBtnRight}>
        <img className={styles.imgWidth} src={exist} alt='exist'/>
    </Link>
  )
}