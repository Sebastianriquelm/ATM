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

import styles from './Atmsite.module.css'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'
import WaitingAndResolve from '../WaitingAndResolve/WaitingAndResolve';


export default function AtmChecklist() {
  const [disabledInput] = useState(false)
  const [form, setForm] = useState({
    atmId: '',
    auditorname: '',
    day: '',
    ATMaccesscontrol: false,
    OperationalAccessControl: false,
    ElectricalConnections: false,
    photo1: null,
    GeneralstatusATMspace: false,
    floorState: false,
    Statewalls: false,
    photo2: null,
    photo3: null,
    Doorstatus: false,
    photo4: null,
    Stateheavens: false,
    photo5: null,
    Airconditioningstatus: false,
    lightingstatus: false,
    Furniturecondition: false,
    Statemonitoringcameras: false
    
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
      const response = await fetch(`${URL}/atm-site`, {
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
      <Header formToProcess='atm-site' />
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
                  title='Fecha Auditoria'
                  required={true}
                  name='day'
                  type="text"
                  value={form.day}
                  handleChange={handleInputChange}
                  isDisabled={disabledInput ? 'yes' : 'no'}
                />
              </div>

              <p style={{ marginBottom: 13 }}>Fotografias Obligatorias</p>

              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>ATM Frontal (Completo)</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo1"
                  photoFile={form.photo1}
                />
              </div>

              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>ATM Latera Derecho (Completo):</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo2"
                  photoFile={form.photo2}
                />
              </div>

              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>ATM Latera Izquierdo (Completo):</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo3"
                  photoFile={form.photo3}
                />
              </div>
              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>N° ATM (Legible):</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo4"
                  photoFile={form.photo4}
                />
              </div>
              <div className='itemContainer'>
                <p style={{ marginBottom: 13 }}>Estado Piso ATM:</p>
                <FileInputLabel
                  required={false}
                  handleChange={handleInputChange}
                  name="photo5"
                  photoFile={form.photo5}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Control acceso ATM'
                  name="ATMaccesscontrol"
                  checked={form.ATMaccesscontrol}
                  handleChange={handleInputChange}
                  formInfo={form.ATMaccesscontrol}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Control de Acceso operativo'
                  name="OperationalAccessControl"
                  checked={form.OperationalAccessControl}
                  handleChange={handleInputChange}
                  formInfo={form.OperationalAccessControl}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Conexiones eléctricas visibles'
                  name="ElectricalConnections"
                  checked={form.ElectricalConnections}
                  handleChange={handleInputChange}
                  formInfo={form.ElectricalConnections}
                />
                <FileInputLabel
                  required={true}
                  handleChange={handleInputChange}
                  name="photo6"
                  photoFile={form.photo6}
                />
              </div>

              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado general espacio ATM'
                  name="GeneralstatusATMspace"
                  checked={form.GeneralstatusATMspace}
                  handleChange={handleInputChange}
                  formInfo={form.GeneralstatusATMspace}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado paredes'
                  name="Statewalls"
                  checked={form.Statewalls}
                  handleChange={handleInputChange}
                  formInfo={form.Statewalls}

                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado puertas'
                  name="Doorstatus"
                  checked={form.Doorstatus}
                  handleChange={handleInputChange}
                  formInfo={form.Doorstatus}
                />

              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado cielos'
                  name="Stateheavens"
                  checked={form.Stateheavens}
                  handleChange={handleInputChange}
                  formInfo={form.Stateheavens}
                />

              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado aire acondicionado'
                  name="Airconditioningstatus"
                  checked={form.Airconditioningstatus}
                  handleChange={handleInputChange}
                  formInfo={form.Airconditioningstatus}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado iluminarias'
                  name="lightingstatus"
                  checked={form.lightingstatus}
                  handleChange={handleInputChange}
                  formInfo={form.lightingstatus}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado muebles'
                  name="Furniturecondition"
                  checked={form.Furniturecondition}
                  handleChange={handleInputChange}
                  formInfo={form.Furniturecondition}
                />

              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Estado camaras de monitoreo'
                  name="Statemonitoringcameras"
                  checked={form.Statemonitoringcameras}
                  handleChange={handleInputChange}
                  formInfo={form.Statemonitoringcameras}
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
