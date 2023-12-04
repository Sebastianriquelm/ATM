import { Link } from "react-router-dom";
import ExitButton from "../ExitButton/ExitButton";

import ingelanLogo from '../../Assets/Images/Logos/LOGO_INGELAN.png'
import physicalatm from '../../Assets/Images/Options/BTN_DESC_SERV.png'
import atmsite from '../../Assets/Images/Options/BTN_LIST_VERIF.png'
import choose from '../../Assets/Images/Options/IMG_TEXT_OPCIONES.png'
import atmsignage from '../../Assets/Images/Options/BTN_SEÑALETICA.png'
import atmexteriorsignage from '../../Assets/Images/Options/BTN_SEÑALETICA_EXT.png'

import styles from './ChooseForm.module.css'

export default function ChoseForm() {
  return (
    <>
      <header>
        <img className={styles.ingelanLogo} src={ingelanLogo} alt='ingelan-logo' />
      </header>
      <section className={styles.container}>
        <img className={styles.chooseOption} src={choose} alt='atm-logo'/>
        <Link to='/servicio-tecnico/atmsite' className={styles.widthTotal}>
          <img className={styles.chooseOption} src={atmsite} alt='atmsite' />
        </Link>
        <Link to='/servicio-tecnico/atm-fisico' className={styles.widthTotal}>
          <img className={styles.chooseOption} src={physicalatm} alt='atm-fisico'/>
        </Link>
        <Link to='/servicio-tecnico/senaletica-atm' className={styles.widthTotal}>
          <img className={styles.chooseOption} src={atmsignage} alt='senaletica-atm'/>
        </Link>
        <Link to='/servicio-tecnico/senaletica-exterior' className={styles.widthTotal}>
          <img className={styles.chooseOption} src={atmexteriorsignage} alt='senaletica-exterior'/>
        </Link>
        <Link to='/servicio-tecnico/recibir-informacion' className={styles.h5Anchor}>
          <h1>Solicitar información</h1>
        </Link>
      </section>
      <ExitButton />
    </>
  )
}