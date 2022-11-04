import React from 'react'

const Select = ({selectValorInicial, selectOnChange,  optionDisabledValue, options, }) => {


  return (
    <>
        <select value={selectValorInicial} onChange={selectOnChange}>
            <option value='' disabled >{optionDisabledValue}</option>
          {options.map((opt, index)=>{
            return <option key={`${opt}${index}`} value={opt}>{opt}</option>
          })}
        </select>

    </>
  )
}

export default Select
