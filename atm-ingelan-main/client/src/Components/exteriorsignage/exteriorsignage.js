import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

import { URL } from '../../App';

import Header from '../Header/Header';
import TextInputLabel from '../TextInputLabel/TextInputLabel';
import SubmitButton from '../SubmitButton/SubmitButton';
import CheckboxInputLabel from '../CheckboxInputLabel/CheckboxInputLabel';
import AtmIdAndLocation from '../AtmIdAndLocation/AtmIdAndLocation';

import styles from './exteriorsignage.module.css'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'
import WaitingAndResolve from '../WaitingAndResolve/WaitingAndResolve';


export default function Exteriorsignage() {
  const [disabledInput] = useState(false)
  const [form, setForm] = useState({
    atmId: '',
    auditorname: '',
    day:'',
    RedbancOutdoorSignage: false,
    Exteriorwallsignage: false,
    Exteriorsignageselfadhesivelogo: false,
    Exteriorsignageselfadhesivelogook: false,
    comments: '',
    techniciansName: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    if (target.type === 'file') {
      const value = target.files[0]
      new Compressor(value, {
        quality: 0.1,
        success(result) {
          setForm(prev => ({ ...prev, [name]: result }))
        },
        error(err) {
          console.error(err.message);
        },
      });
    }
    else {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(form).forEach(data => {
      const key = data[0]
      const value = data[1]
      formData.append(key, value)
    })
    try {
      setSubmitStatus('loading')
      const response = await fetch(`${URL}/exterior-signage`, {
        method: 'post',
        body: formData
      })

      if (response.ok) setSubmitStatus('success')
      else setSubmitStatus('error')
    } catch (error) {
      console.error('error', error);
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <Header formToProcess='senaletica-exterior'/>
      {
        submitStatus ?
        <WaitingAndResolve status={submitStatus} handleStatus={setSubmitStatus}/> : 
        <>
          <form onSubmit={onSubmitForm} className='form'>
            <AtmIdAndLocation
              atmId = {form.atmId}
              auditorname = {form.auditorname}
              handleInputChange = {handleInputChange}
              setForm = {setForm}
              form = {form}
            />
            <div className='itemContainer'>
                <TextInputLabel
                  className={styles.textInputLabel}
                  title='Fecha Auditoria'
                  required={true}
                  name='day'
                  type="text"
                  value={form.day}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Señaletica Exterior REDBANC en puertas '
                  name="RedbancOutdoorSignage"
                  checked={form.RedbancOutdoorSignage}
                  handleChange={handleInputChange}
                  formInfo={form.RedbancOutdoorSignage}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Señaletica Exterior PALETA MURO'
                  required={true}
                  name='Exteriorwallsignage'
                  value={form.Exteriorwallsignage}
                  handleChange={handleInputChange}
                  formInfo={form.Exteriorwallsignage}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Visa cumple con ubicación según manual:'
                  name='Exteriorsignageselfadhesivelogo'
                  checked={form.Exteriorsignageselfadhesivelogo}
                  handleChange={handleInputChange}
                  formInfo={form.Exteriorsignageselfadhesivelogo}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Mastercard:'
                  name="Exteriorsignageselfadhesivelogook"
                  checked={form.Exteriorsignageselfadhesivelogook}
                  handleChange={handleInputChange}
                  formInfo={form.Exteriorsignageselfadhesivelogook}
                />
              </div>
              <SubmitButton />
            </form>
            <Link to='/' className={styles.existBtnRight}>
              <img className={styles.imgWidth} src={exist} alt='exist' />
            </Link>
          </>
      }
    </>
  );
}