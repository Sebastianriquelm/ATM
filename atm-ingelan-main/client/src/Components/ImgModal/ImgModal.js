import styles from './ImgModal.module.css'

export default function ImgModal(props) {
  const { photo, handleClick } = props
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <span onClick={handleClick} className={styles.closeButton}>&times;</span>
        <img className={styles.imgCard} src={photo && window.URL.createObjectURL(photo)} alt=''/>
      </div>
    </div>
  )
}