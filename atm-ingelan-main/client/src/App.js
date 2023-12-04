import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css'

import AtmChecklist from './Components/Atmsite/Atmsite'
import Physicalatm from './Components/Physicalatm/Physicalatm'
import ChoseForm from "./Components/ChooseForm/ChooseForm"
import Home from "./Components/Home/Home"
import GetServiceData from "./Components/GetServiceData"
import AtmIdentity from "./Components/AtmIdentity/AtmIdentity"
import Atmsignageservice from './Components/atmsignage/Atmsignage'
import Exteriorsignage from "./Components/exteriorsignage/exteriorsignage"

const URL =  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/servicio-tecnico' element={ <ChoseForm/> }/>
        <Route path='/servicio-tecnico/atmsite' element={ <AtmChecklist/> }/>
        <Route path='/servicio-tecnico/atm-fisico' element={ <Physicalatm/> }/>
        <Route path='/servicio-tecnico/atm-identificador' element={ <AtmIdentity/> }/>
        <Route path='/servicio-tecnico/senaletica-atm' element={ <Atmsignageservice/> }/>
        <Route path='/servicio-tecnico/senaletica-exterior' element={ <Exteriorsignage/> }/>
        <Route path='/servicio-tecnico/recibir-informacion' element={ <GetServiceData/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export { App, URL }
