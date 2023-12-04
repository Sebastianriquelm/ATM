import { useState } from "react"
import { URL } from "../../App"

import styles from '../GetServiceData/GetServiceData.module.css'

export default function GetTableData(props) {
  const {dates, atmId, serviceType} = props

  const [data, setData] = useState('')
  const [serviceData, setServiceData] = useState(null)
  const [photoFiles, setPhotoFiles] = useState([])

  const handleChange = event => {
    const { value } = event.target
    setData(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch(`${URL}/api/get-service-data/${atmId}/${data}/${serviceType}`)
      .then(response => response.json())
      .then(json => {
        setServiceData(Object.entries(json[0]))
        setPhotoFiles(json[1])
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleImgError = event => {
    event.target.style.display = 'none'
  }

  const tableRows = (dataType, data) => {
    const dataTypeToClient = {
      'atm_id': 'ATM ID',
      'day': 'Día',
      'place': 'Lugar',
      'electric_connection': 'Conexión eléctrica',
      'anti_vandal_pipe': 'Tubería antivandálica',
      'paint_state': 'Estado de la pintura',
      'trash': 'Basurero',
      'floor_state': 'Estado del piso',
      'keys_delivered': 'Entrega de llaves',
      'communication_furniture_signage': 'Señalética del mueble de comunicación',
      'side_signals': 'Señalética lateral',
      'redbanc_signals': 'Señaléticas redbanc',
      'comments': 'Obervaciones',
      'technicians_name': 'Técnico en terreno',
      'operational_upon_arrival': 'Operativo al llegar',
      'temperature_in_celsius': 'Temperatura en C°',
      'sonda_or_redbanc_attention': 'Sonda o Redbanc',
      'attention_names': 'Nombre del consultor',
      'attention_comments': 'Comentarios del consultor',
      'network_wire_state': 'Estado del cable de red',
      'local_voltage_fn': 'Voltaje local Fase Neutro',
      'local_voltage_ft': 'Voltaje local Fase Tierra',
      'local_voltage_nt': 'Voltaje local Neutro Tierra',
      'conditioner_fn': 'Acondicionador Fase Neutro',
      'conditioner_ft': 'Acondicionador Fase Tierra',
      'conditioner_nt': 'Acondicionador Neutro Tierra',
      'other_voltages_fn': 'Voltajes otro punto Fase Neutro',
      'other_voltages_ft': 'Voltajes otro punto Fase Tierra',
      'other_voltages_nt': 'Voltajes otro punto Neutro Tierra'
    }
    const booleanStringFormat = bool => bool ? 'Bien' : 'Mal'
    return (
      <tr key={dataType}>
          <td>{dataTypeToClient[dataType] || dataType}</td>
          <td className="text-end">{typeof data === 'boolean' ? booleanStringFormat(data) : data}</td>
      </tr>
    )
    
  }

  const getPhotoRouteByCoincidence = photoNumber => `/Images/${photoFiles.find(photo => photo.includes(photoNumber))}`

  return (
    <>
      <h5 style={{textAlign: 'center'}}>Escoge la fecha del servicio</h5>
      <form onSubmit={handleSubmit} className={`form ${styles.form}`} style={{display: "flex", flexDirection: "column", gap: 17}}>
        <label className={styles.label}>
          Fecha: {' '}
          <select onChange={handleChange} value={data} required>
            <option value='' disabled>Selecciona una fecha</option>
            {dates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
        </label>
        <button>Ver información</button>
      </form>
      { serviceData &&
        <>
          <table className="form">
            <thead>
              <tr>
                <th>Type</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              { serviceData.map(dataEntrie => tableRows(dataEntrie[0], dataEntrie[1])) }
            </tbody>
          </table>
          <div className={styles.imageContainer}>
            {serviceType === 'check_list' ?
              <>
                <h3>Conexiones eléctricas</h3>
                <img src={getPhotoRouteByCoincidence('photo1.')} alt='Foto no encontrada'/>
                <h3>Tubería antivandálica</h3>
                <img src={getPhotoRouteByCoincidence('photo2.')} alt='Foto no encontrada'/>
                <h3>Estado de la pintura</h3>
                <img src={getPhotoRouteByCoincidence('photo3.')} alt='Foto no encontrada'/>
                <img src={getPhotoRouteByCoincidence('photo4.')} alt='Foto no encontrada'/>
                <h3>Estado del piso</h3>
                <img src={getPhotoRouteByCoincidence('photo5.')} alt='Foto no encontrada'/>
                <h3>Entrega de llaves</h3>
                <img src={getPhotoRouteByCoincidence('photo6.')} alt='Foto no encontrada'/>
                <h3>Señalética lateral</h3>
                <img src={getPhotoRouteByCoincidence('photo7.')} alt='Foto no encontrada'/>
                <h3>Fotos extra</h3>
                <img src={getPhotoRouteByCoincidence('photo8.')} alt='Sin fotos extra'/>
                <img onError={handleImgError} src={getPhotoRouteByCoincidence('photo9.')} alt='Foto no encontrada'/>
                <img onError={handleImgError} src={getPhotoRouteByCoincidence('photo10.')} alt='Foto no encontrada'/>
              </>
             :
             <>
              <h3>Operativo o no al momento de llegar</h3>
              <img src={getPhotoRouteByCoincidence('photo1.')} alt='Foto no encontrada'/>
              <h3>Estado del cable de red</h3>
              <img src={getPhotoRouteByCoincidence('photo2.')} alt='Foto no encontrada'/>
              <h3>Voltaje local Fase Neutro</h3>
              <img src={getPhotoRouteByCoincidence('photo3.')} alt='Foto no encontrada'/>
              <h3>Voltaje local Fase Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo4.')} alt='Foto no encontrada'/>
              <h3>Voltaje local Neutro Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo5.')} alt='Foto no encontrada'/>
              <h3>Acondicionador Fase Neutro</h3>
              <img src={getPhotoRouteByCoincidence('photo6.')} alt='Foto no encontrada'/>
              <h3>Acondicionador Fase Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo7.')} alt='Foto no encontrada'/>
              <h3>Acondicionador Neutro Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo8.')} alt='Foto no encontrada'/>
              <h3>Voltajes otro punto Fase Neutro</h3>
              <img src={getPhotoRouteByCoincidence('photo9.')} alt='Foto no encontrada'/>
              <h3>Voltajes otro punto Fase Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo10.')} alt='Foto no encontrada'/>
              <h3>Voltajes otro punto Neutro Tierra</h3>
              <img src={getPhotoRouteByCoincidence('photo11.')} alt='Foto no encontrada'/>
              <h3>Fotos extra</h3>
              <img src={getPhotoRouteByCoincidence('photo12.')} alt='Sin Fotos extra'/>
              <img onError={handleImgError} src={getPhotoRouteByCoincidence('photo13.')} alt='Foto no encontrada'/>
              <img onError={handleImgError} src={getPhotoRouteByCoincidence('photo14.')} alt='Foto no encontrada'/>
             </>            
            }
          </div>
        </>
      }
    </>
  )
}