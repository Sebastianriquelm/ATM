import submitImg from '../../Assets/Images/Options/BTN_ENVIAR.png'
import styles from './SubmitButton.module.css'

export default function SubmitButton() {
  return (
    <label className={styles.submitLabel}>
      <img src={submitImg} alt='submit'/>
      <input style={{display: 'none'}} type="submit" value="Send Request" />
    </label>
  )
}