import { Link } from 'react-router-dom'

import successImg from '../../Assets/Images/headers/MSN_CORRECTO_ENVIO.png'
import errorImg from '../../Assets/Images/headers/MSN_ERROR_ENVIO.png'
import backButton from '../../Assets/Images/icons/BTN_ATRAS.png'

import ExitButton from '../ExitButton/ExitButton'

import styles from './WaitingAndResolve.module.css'

export default function WaitingAndResolve(props) {
  const { status, handleStatus } = props

  if (status === 'loading') return (
    <div className={styles.messageContainer}>
      <p className={styles.waitingMessage}>Porfavor espera mientras procesamos la información...</p>
    </div>
  )
  if (status === 'error') return (
    <div className={styles.messageContainer} onClick={() => handleStatus('')}>
      <img className={styles.messageImg} src={errorImg} alt='error' />
      <p className={styles.text}>Recuerda que debes usar un ID válido para el Atm. Si el problema persiste contacta a soporte.</p>
      <img src={backButton} alt='back'/>
    </div>
  )
  if (status === 'success') return (
    <div className={styles.messageContainer}>
      <Link to='/servicio-tecnico'>
        <img className={styles.messageImg} src={successImg} alt='success' />
      </Link>
      <ExitButton />
    </div>
  )
}