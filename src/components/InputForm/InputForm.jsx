import React from 'react'
import { useState } from 'react'
import { StyleInput } from './style'

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState('')
  const { placeholder = 'Nhập text', ...rests } = props
  return (
    <StyleInput placeholder={placeholder} valueInput={valueInput} {...rests}/>
  )
}

export default InputForm