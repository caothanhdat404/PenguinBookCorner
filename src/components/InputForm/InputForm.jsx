import React from 'react'
import { Input } from 'antd'
import { useState } from 'react'

const InputForm = ({ props }) => {
  const [valueInput, setValueInput] = useState('')
//   const { placeholder = 'Nhập text' } = props
  return (
    <Input placeholder={'Nhập text'} valueInput={valueInput}/>
  )
}

export default InputForm