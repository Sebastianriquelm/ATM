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
      //atm_site
      'atm_id': 'ATM ID',
      'day': 'Fecha Auditoria',
      'auditorname': 'Nombre Auditor',
      'atmaccesscontrol': 'Estado acceso al cajero',
      'operationalaccesscontrol': 'Control Acceeso operativo',
      'electricalconnections': 'Conexión eléctrica visibles',
      'generalstatusatmspace': 'Estado donde se ubica ATM',
      'floorstate': 'Estado del piso',
      'statewalls': 'Estado de las paredes',
      'doorstatus': 'Estado de las puertas',
      'stateheavens': 'Estado del cielo',
      'airconditioningstatus': 'Estado Aire acondicionado',
      'lightingstatus': 'Estado luminaria',
      'furniturecondition': 'Estado muebles',
      'statemonitoringcameras': 'Estado general Camaras de monitoreo',
      //physical_at,
      'atmscreenstatus': 'Estado pantalla ATM',
      'atmkeyboardstatus': 'Teclado ATM cumple estandares',
      'damagedatmkeypads': 'Teclado ATM presenta daños',
      'keyboardcovers': 'Cuenta con cubre teclado',
      'legiblereceipt': 'ATM imprime comprobante legible',
      'atmtrash': 'Cuenta con Basurero',
      'atmpresentation': 'Presentacion general ATM es optima',
      //atm_signage
      'visa_sticker': 'Adhesivo visa es legible',
      'visa_adhesive_design': 'Adhesivo visa cumple diseño actual',
      'visa_sticker_meets_location': 'Adhesivo visa cumple ubicacion según manual',
      'mastercard_sticker': 'Adhesivo mastercard es legible',
      'mastercard_adhesive_design': 'Adhesivo mastercard cumple diseño actual',
      'mastercard_sticker_meets_location': 'Adhesivo mastercard cumple ubicacion según manual',
      'visible_atm_number': 'Numero de ATM es visible',
      'atm_safety_signage': 'Señalizacion de medidas de seguridad',
      'atm_safety_measures_signage_stopdisc': 'Señalizacion de medidas de seguridad cumple estandares segun manual actual',
      'redbanc_tape': 'Cuenta con huincha redbanc',
      'redbanc_tape_location': 'Huincha redbanc cumple ubicacion según manual',
      'redbanc_tape_meets_length': 'Huincha redbanc cumple norma de longitud segun manual',
      'redbanc_ribbon_meets_design': 'Huincha redbanc cumple con diseño actual',
      'graphic_on_the_side_of_atm': 'Gráfica lateral ATM (Publicidad) posee logo o huincha redbanc',
      'floor_chart': 'Grafica de piso cumple norma grafica',
      //exterior_signage
      'redbanc_outdoor_signage': 'Estado Señaletica exterior redbanc (Puertas)',
      'exterior_wall_signage': 'Estado señaletica exterior (Paleta muro)',
      'exterior_signage_selfadhesive_logo': 'Estado señaletica exterior autoadhesivos de logo o huincha en ventanas y puertas ',
      'exterior_signage_selfadhesive_logo_ok': 'Señaletica Exterior autoadhesivos de logo o huincha en ventanas y puertas cumple lo establecido en manual'

    }
    const booleanStringFormat = bool => bool ? 'Optimo' : 'Deficiente'
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
            {serviceType === 'atm_site' ?
              <>
                <h3>ATM Frontal</h3>
                <img src={getPhotoRouteByCoincidence('photo1.')} alt='Foto no encontrada'/>
                <h3>ATM Latera Derecho</h3>
                <img src={getPhotoRouteByCoincidence('photo2.')} alt='Foto no encontrada'/>
                <h3>ATM Latera Izquierdo</h3>
                <img src={getPhotoRouteByCoincidence('photo3.')} alt='Foto no encontrada'/>
                <h3>N° ATM </h3>
                <img src={getPhotoRouteByCoincidence('photo4.')} alt='Foto no encontrada'/>
                <h3>Estado del piso</h3>
                <img src={getPhotoRouteByCoincidence('photo5.')} alt='Foto no encontrada'/>
                <h3>Conexiones eléctricas</h3>
                <img src={getPhotoRouteByCoincidence('photo6.')} alt='Foto no encontrada'/>
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
             
             </>            
            }
          </div>
        </>
      }
    </>
  )
}