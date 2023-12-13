import { useState } from "react"
import { URL } from '../../App'

import ExitButton from "../ExitButton/ExitButton"
import GetTableData from "../GetTableData"

import styles from "./GetServiceData.module.css"

export default function GetServiceData() {

  const [form, setForm] = useState({
    atmId: '',
    serviceType: ''
  })
  const [data, setData] = useState(null)
  const [showNextForm, setShowNextForm] = useState(false)
  const [noData, setNoData] = useState(false)

  function handleChange(event) {
    const { value, name } = event.target
    setForm(prev => ({...prev, [name]: value}))
    setShowNextForm(false)
    setNoData(false)
  }

  function keyDownHandler(event) {
    const { key } = event
    if (key === 'Backspace' || key === 'Delete') return
    if (isNaN(+key) || key === ' ') event.preventDefault()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const { atmId, serviceType } = form
    fetch(`${URL}/api/get-service-data/${atmId}/${serviceType}`)
      .then(response => response.json())
      .then(json => {
        if (json.length < 1) return setNoData(true)
        setNoData(false)
        setData(json.map(row => row.day))
        setShowNextForm(true)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <h5 className="text-center">Validar ATM y servicio</h5>
      <form onSubmit={handleSubmit} className={`form ${styles.form}`} style={{display: "flex", flexDirection: "column", gap: 17}}>
        <label className={styles.label}>
          ID: {' '}
          <input name="atmId" value={form.atmId} onChange={handleChange} onKeyDown={keyDownHandler} type="number" pattern="[0-9]+" required/>
        </label>
        <label className={styles.label}>
          Tipo de servicio: {' '}
          <select name="serviceType" value={form.serviceType} onChange={handleChange} required>
            <option value="" disabled>Tipo de servicio</option>
            <option value="atm_site">ATM Site</option>
            <option value="physical_atm">ATM fisico</option>
            <option value="atm_signage">Señaletica ATM</option>
            <option value="exterior_signage">Señaletica exterior</option>
          </select>
        </label>
        <button>Ver fechas</button>
      </form>
      {data && showNextForm && <GetTableData dates={data} atmId={form.atmId} serviceType={form.serviceType}/>}
      {noData && <h5 className="text-center">Sin datos</h5>}
      <ExitButton />
    </>
  )
}