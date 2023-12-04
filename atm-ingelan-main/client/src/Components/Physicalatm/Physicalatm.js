import React, { useState } from 'react'
import Compressor from 'compressorjs';

import { Link } from 'react-router-dom';

import { URL } from '../../App';

import Header from '../Header/Header';
import TextInputLabel from '../TextInputLabel/TextInputLabel'
import CheckboxInputLabel from '../CheckboxInputLabel/CheckboxInputLabel'
import FileInputLabel from '../FileInputLabel/FileInputLabel';
import AtmIdAndLocation from '../AtmIdAndLocation/AtmIdAndLocation';
import SubmitButton from '../SubmitButton/SubmitButton';

import styles from './Physicalatm.module.css'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'
import WaitingAndResolve from '../WaitingAndResolve/WaitingAndResolve';

export default function AtmPhysicalatm() {
  const [disabledInput] = useState(false)
  const [form, setForm] = useState({
    atmId: '',
    auditorname: '',
    day: '',
    ATMscreenstatus: false,
    ATMKeyboardstatus: false,
    DamagedATMkeypads: false,
    attentionNames: false,
    attentionComments: false,
    keyboardcovers: false,
    legiblereceipt: false,
    ATMtrash: false,
    ATMpresentation: false
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
      const response = await fetch(`${URL}/Physical-Atm`, {
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
      <Header formToProcess='atm-fisico'/>
      {
        submitStatus ?
          <WaitingAndResolve status={submitStatus} handleStatus={setSubmitStatus} /> :
          <>
            <form onSubmit={onSubmitForm} className='form'>
              <AtmIdAndLocation
                atmId={form.atmId}
                auditorname={form.auditorname}
                handleInputChange={handleInputChange}
                setForm={setForm}
                form={form}
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
                  title='Estado pantalla ATM '
                  name="ATMscreenstatus"
                  checked={form.ATMscreenstatus}
                  handleChange={handleInputChange}
                  formInfo={form.ATMscreenstatus}
                />
              </div>

              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Teclado de ATM es coincidente con las instrucciones de la Pantalla'
                  required={true}
                  name='ATMKeyboardstatus'
                  value={form.ATMKeyboardstatus}
                  handleChange={handleInputChange}
                  formInfo={form.ATMKeyboardstatus}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Teclados de ATM está libre de daños:'
                  name='DamagedATMkeypads'
                  checked={form.DamagedATMkeypads}
                  handleChange={handleInputChange}
                  formInfo={form.DamagedATMkeypads}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Cuenta con cubre teclado:'
                  name="keyboardcovers"
                  checked={form.keyboardcovers}
                  handleChange={handleInputChange}
                  formInfo={form.keyboardcovers}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Imprime comprobante en forma legible'
                  name='legiblereceipt'
                  checked={form.legiblereceipt}
                  handleChange={handleInputChange}
                  formInfo={form.legiblereceipt}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='ATM o Lugar cuenta con basurero'
                  name='ATMtrash'
                  checked={form.ATMtrash}
                  handleChange={handleInputChange}
                  formInfo={form.ATMtrash}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado General de la presentación del ATM'
                  name='ATMpresentation'
                  checked={form.ATMpresentation}
                  handleChange={handleInputChange}
                  formInfo={form.ATMpresentation}
                />
              </div>
             
              <SubmitButton />
            </form>
            <Link to='/servicio-tecnico' className={styles.existBtnRight}>
              <img className={styles.imgWidth} src={exist} alt='exist' />
            </Link>
          </>
      }
    </>
  );
}