import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

import { URL } from '../../App';

import Header from '../Header/Header';
import TextInputLabel from '../TextInputLabel/TextInputLabel';
import SubmitButton from '../SubmitButton/SubmitButton';
import CheckboxInputLabel from '../CheckboxInputLabel/CheckboxInputLabel';
import FileInputLabel from '../FileInputLabel/FileInputLabel';
import AtmIdAndLocation from '../AtmIdAndLocation/AtmIdAndLocation';

import styles from './AtmIdentity.module.css'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'
import WaitingAndResolve from '../WaitingAndResolve/WaitingAndResolve';


export default function AtmIdentity(props) {
  const [disabledInput, setDisabledInput] = useState(false)
  const [form, setForm] = useState({
    atmId: '',
    auditorname: '',
    ATMaddress:'',  
    city:'', 
    ClientName:'', 
    Region:'',
    photo1: null,
    photo2: null,
    photo3: null
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
      const response = await fetch(`${URL}/atm-identity`, {
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
      <Header />
      {
        submitStatus ?
          <WaitingAndResolve status={submitStatus} handleStatus={setSubmitStatus} /> :
          <>
            <form className='form' onSubmit={onSubmitForm}>
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
                  title='Direccion ATM'
                  required={true}
                  name='ATMaddress'
                  type="text"
                  value={form.ATMaddress}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>

              <div className='itemContainer'>
                <TextInputLabel
                  title='Ciudad'
                  required={true}
                  name='city'
                  type="text"
                  value={form.city}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>
              <div className='itemContainer'>
                <TextInputLabel
                  title='Nombre cliente'
                  required={true}
                  name='ClientName'
                  type="text"
                  value={form.ClientName}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>
              <div className='itemContainer'>
                <TextInputLabel
                  title='Region'
                  required={true}
                  name='Region'
                  type="text"
                  value={form.Region}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>
              <p style={{ marginBottom: 13 }}>Fotos Obligatorias:</p>
              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>Foto exterior ATM:</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo1"
                  photoFile={form.photo1}
                />
                </div>

                <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>Estado general del espacio donde esta ubicado el ATM:</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo2"
                  photoFile={form.photo2}
                />
                </div>
                <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>Estado general de ATM:</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo3"
                  photoFile={form.photo3}
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
