import { useState } from 'react'
import { URL } from '../../App'
import TextInputLabel from '../TextInputLabel/TextInputLabel'
import styles from './AtmIdAndLocation.module.css'

export default function AtmIdAndLocation(props) {
  const {atmId,  handleInputChange, auditorname, setForm, form} = props
  const [disabledInput, setDisabledInput] = useState(false)
  const getAtmLocation = async () => {
    if (!form.atmId) return
    try {
      const response = await fetch(`${URL}/atm_validation/${atmId}`)
      const { auditorname } = await response.json()
      if (auditorname) {
        setForm(prev => ({...prev, auditorname: auditorname}))
        setDisabledInput(true)
      } else {
        setDisabledInput(false)
        setForm(prev => ({...prev, auditorname: ''}))
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='itemContainer'>              
        <TextInputLabel
          title='N° de cajero:'
          required={true}
          name='atmId'
          type="number"
          value={atmId}
          handleChange={handleInputChange}
        />
        <button className={styles.button} type='button' onClick={getAtmLocation}>Validar N° cajero</button>
      </div>
      <div className='itemContainer'>              
        <TextInputLabel
          title='Nombre Auditor'
          required={true}
          name='auditorname'
          type="text"
          value={auditorname}
          handleChange={handleInputChange}
          isDisabled={disabledInput ? 'yes' : 'no'}
        />
      </div>
     
    </>
  )
}