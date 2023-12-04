import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

import { URL } from '../../App';

import Header from '../Header/Header';
import TextInputLabel from '../TextInputLabel/TextInputLabel';
import SubmitButton from '../SubmitButton/SubmitButton';
import CheckboxInputLabel from '../CheckboxInputLabel/CheckboxInputLabel';
import AtmIdAndLocation from '../AtmIdAndLocation/AtmIdAndLocation';

import styles from './Atmsignage.module.css'

import exist from '../../Assets/Images/icons/BTN_SALIR.png'
import WaitingAndResolve from '../WaitingAndResolve/WaitingAndResolve';


export default function Atmsignageservice() {
  const [disabledInput] = useState(false)
  const [form, setForm] = useState({
    atmId: '',
    auditorname: '',
    day: '',
    VisaSticker: false,
    VisaAdhesivedesign: false,
    Visastickermeetslocation: false,
    Mastercardsticker: false,
    MastercardAdhesivedesign: false,
    Mastercardstickermeetslocation: false,
    VisibleATMNumber: false,
    AtmSafetySignage: false,
    AtmSafetyMeasuresSignageStopDisc: false,
    Redbanctape: false,
    Redbanctapelocation: false,
    redbanctapemeetslength: false,
    redbancribbonmeetsdesign: false,
    GraphiconthesideofAtm: false,
    floorchart: false

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
      const response = await fetch(`${URL}/atm-signage`, {
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
      <Header formToProcess='senaletica-atm'/>
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
                  title='Adhesivo Visa '
                  name="VisaSticker"
                  checked={form.VisaSticker}
                  handleChange={handleInputChange}
                  formInfo={form.VisaSticker}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Visa Cumple con diseño actual'
                  required={true}
                  name='VisaAdhesivedesign'
                  value={form.VisaAdhesivedesign}
                  handleChange={handleInputChange}
                  formInfo={form.VisaAdhesivedesign}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Visa cumple con ubicación según manual:'
                  name='Visastickermeetslocation'
                  checked={form.Visastickermeetslocation}
                  handleChange={handleInputChange}
                  formInfo={form.Visastickermeetslocation}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Mastercard:'
                  name="Mastercardsticker"
                  checked={form.Mastercardsticker}
                  handleChange={handleInputChange}
                  formInfo={form.Mastercardsticker}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Mastercard Cumple con diseño actual'
                  name='MastercardAdhesivedesign'
                  checked={form.MastercardAdhesivedesign}
                  handleChange={handleInputChange}
                  formInfo={form.MastercardAdhesivedesign}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Adhesivo Mastercard cumple con ubicación según manual '
                  name='Mastercardstickermeetslocation'
                  checked={form.Mastercardstickermeetslocation}
                  handleChange={handleInputChange}
                  formInfo={form.Mastercardstickermeetslocation}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Cuenta con Numero de Cajero Visible'
                  name='VisibleATMNumber'
                  checked={form.VisibleATMNumber}
                  handleChange={handleInputChange}
                  formInfo={form.VisibleATMNumber}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Señalización de Medidas de Seguridad  Atm ( disco pare)'
                  name='AtmSafetySignage'
                  checked={form.AtmSafetySignage}
                  handleChange={handleInputChange}
                  formInfo={form.AtmSafetySignage}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Señalización de Medidas de Seguridad  Atm ( Disco pare) cumple con diseño e información'
                  name='AtmSafetyMeasuresSignageStopDisc'
                  checked={form.AtmSafetyMeasuresSignageStopDisc}
                  handleChange={handleInputChange}
                  formInfo={form.AtmSafetyMeasuresSignageStopDisc}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Tiene huincha Redbanc'
                  name='Redbanctape'
                  checked={form.Redbanctape}
                  handleChange={handleInputChange}
                  formInfo={form.Redbanctape}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Huincha Redbanc cumple con ubicación del manual'
                  name='Redbanctapelocation'
                  checked={form.Redbanctapelocation}
                  handleChange={handleInputChange}
                  formInfo={form.Redbanctapelocation}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Huincha redbanc cumple norma de Longitud (barra al menos deben medir la mitad de la palabra redbanc)'
                  name='redbanctapemeetslength'
                  checked={form.redbanctapemeetslength}
                  handleChange={handleInputChange}
                  formInfo={form.redbanctapemeetslength}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Huincha redbanc cumple con diseño actual'
                  name='redbancribbonmeetsdesign'
                  checked={form.redbancribbonmeetsdesign}
                  handleChange={handleInputChange}
                  formInfo={form.redbancribbonmeetsdesign}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Gráfica en lateral del Atm  publicidad'
                  name='GraphiconthesideofAtm'
                  checked={form.GraphiconthesideofAtm}
                  handleChange={handleInputChange}
                  formInfo={form.GraphiconthesideofAtm}
                />
              </div>
              <div className='itemContainer'>
                <CheckboxInputLabel
                  title='Gráfica de pisosolo posee logo o huincha redbanc ver norma gráfica es color tamaño de barras y diseño'
                  name='floorchart'
                  checked={form.floorchart}
                  handleChange={handleInputChange}
                  formInfo={form.floorchart}
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