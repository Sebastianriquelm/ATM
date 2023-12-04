import CheckItem from '../CheckItem/CheckItem'

export default function CheckboxInputLabel(props) {
  const { title, name, checked, handleChange, formInfo } = props

  return (
    <label className='check-list-label margin-y'>
      {title}
      <input
        style={{display: 'none'}}
        name={name}
        type='checkbox'
        checked={checked}
        onChange={handleChange} />
      <CheckItem on={formInfo} />
    </label>
  )
}