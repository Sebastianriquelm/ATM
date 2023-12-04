import styles from './FileInputLabel.module.css'

import takePhoto from '../../Assets/Images/Options/tomar_foto.png'
import uploadPhoto from '../../Assets/Images/Options/subir_foto.png'
import showPhoto from '../../Assets/Images/Options/ver_foto.png'
import { useState } from 'react'
import ImgModal from '../ImgModal/ImgModal'

export default function FileInputLabel(props) {
  const { required, handleChange, name, photoFile } = props
  const [showModal, setShowModal] = useState(false)

  const requiredInput = required && !photoFile

  const handleClick = () => {
    setShowModal(prev => !prev)
  }

  return (
    <div className={styles.fileLabels}>
      <label className={styles.fileLabel}>
        <img className={styles.buttonImage} src={takePhoto} alt='Tomar foto'/>
        <input
          // style={{visibility: 'hidden'}}
          className={styles.hiddenInput}
          required={requiredInput}
          onChange={handleChange}
          type="file"
          name={name}
          accept='image/*'
          capture
        />
      </label>
      <label className={styles.fileLabel}>
        <img className={styles.buttonImage} src={uploadPhoto} alt='Subir foto'/>
        <input
          style={{visibility: 'hidden'}}
          className={styles.hiddenInput}
          required={requiredInput}
          onChange={handleChange}
          type="file"
          name={name}
          accept='image/*'
        />
      </label>
      {photoFile && <img onClick={handleClick} className={styles.buttonImage} src={showPhoto} alt='Ver foto'/>}
      {showModal && <ImgModal photo={photoFile} handleClick={handleClick} />}
    </div>
  )
}