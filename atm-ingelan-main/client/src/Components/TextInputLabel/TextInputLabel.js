import styles from './TextInputLabel.module.css'

export default function TextInputLabel(props) {
  const { title, required, name, type, value, handleChange, isDisabled } = props

  return (
    <label className={styles.labelInput}>
      {title}
      <input
        className={styles.inputText}
        required={required}
        name={name}
        type={type}
        value={value}
        disabled={isDisabled === 'yes'}
        onChange={handleChange} />
    </label>
  )
}