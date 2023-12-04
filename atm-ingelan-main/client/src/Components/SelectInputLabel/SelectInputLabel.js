import styles from './SelectInputLabel.module.css'

export default function SelectInputLabel(props) {
  const {title, required, name, handleChange, optionsArray} = props
  const options = optionsArray.map(option => <option key={option.value} className={styles.options} value={option.value}>{option.display}</option>)

  return (
    <label className={styles.labelInput}>
      {title}
      <select
        className={styles.select}
        required={required}
        name={name}
        onChange={handleChange}
      >
        {options}
      </select>
    </label>
  )
}