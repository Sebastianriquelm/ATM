import checkListText from "../../Assets/Images/headers/IMG_TEXT_LIST_VERI.png";
import serviceDescText from "../../Assets/Images/headers/IMG_TEXT_DESCRIP_SERV.png";
import senaleticaatm from "../../Assets/Images/headers/BTN_SEÑALETICA.png";
import senaleticaexterior from "../../Assets/Images/headers/BTN_SEÑALETICA_EXT.png";
import ingelanLogo from "../../Assets/Images/Logos/LOGO_INGELAN.png";
import grupoatm from "../../Assets/Images/Logos/LOGO_ATM.png";

import styles from './Header.module.css'

export default function Header(props) {
  const { formToProcess } = props;

  let imageSource;

  // Seleccionar la imagen basada en el formulario actual
  switch (formToProcess) {
    case 'atm-site':
      imageSource = serviceDescText;
      break;
    case 'atm-fisico':
      imageSource = checkListText;
      break;
    case 'senaletica-atm':
      imageSource = senaleticaatm;
      break;
    case 'senaletica-exterior':
      imageSource = senaleticaexterior;
      break;
    default:
      // Puedes agregar una lógica adicional o una imagen predeterminada para casos no reconocidos.
      imageSource = grupoatm;
  }

  return (
    <div className={styles.headerContainer}>
      <img className={styles.maxWidth} src={imageSource} alt='form-text' />
      <img className={styles.maxWidth} src={ingelanLogo} alt='ingelan-logo'/>
    </div>
  );
}