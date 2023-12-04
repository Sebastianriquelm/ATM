import { useState } from 'react'
import { URL } from '../../App'
import TextInputLabel from '../TextInputLabel/TextInputLabel'
import styles from './AtmIdAndLocation.module.css'

export default function AtmIdAndLocation(props) {
  const {atmId, handleInputChange, location, setForm, form} = props
  const [disabledInput, setDisabledInput] = useState(false)
  const getAtmLocation = async () => {
    if (!form.atmId) return
    try {
      const response = await fetch(`${URL}/atm/${atmId}`)
      const { location } = await response.json()
      if (location) {
        setForm(prev => ({...prev, location: location}))
        setDisabledInput(true)
      } else {
        setDisabledInput(false)
        setForm(prev => ({...prev, location: ''}))
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='itemContainer'>              
        <TextInputLabel
          title='ID ATM:'
          required={true}
          name='atmId'
          type="number"
          value={atmId}
          handleChange={handleInputChange}
        />
        <button className={styles.button} type='button' onClick={getAtmLocation}>Validar ID</button>
      </div>
      <div className='itemContainer'>              
        <TextInputLabel
          title='Ubicación Atm'
          required={true}
          name='location'
          type="text"
          value={location}
          handleChange={handleInputChange}
          isDisabled={disabledInput ? 'yes' : 'no'}
        />
      </div>
      
    </>
  )
}