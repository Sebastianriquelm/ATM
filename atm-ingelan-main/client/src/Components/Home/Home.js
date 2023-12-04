import { Link } from "react-router-dom";

import ingelanLogo from "../../Assets/Images/Logos/LOGO_INGELAN.png"
import atmLogo from "../../Assets/Images/Logos/AUDITORIA_ATM.png";
import welcomeImg from "../../Assets/Images/headers/TEXT_1.png";
import tapHereImg from "../../Assets/Images/headers/TEXT_2.png";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <Link to='/servicio-tecnico/atm-identificador'>
      <section>
        <img className={styles.ingelanLogo} src={ingelanLogo} alt='ingelan-logo' />
        <div className={styles.homeContainer}>
          <img className={styles.atmLogo} src={welcomeImg} alt='welcome'/>
          <img className={styles.atmLogo} src={atmLogo} alt="atm-logo" />
          <img className={styles.atmLogo} src={tapHereImg} alt='tap here'/>
        </div>
      </section>
    </Link>
  )
}