import React from 'react'

const Select = ({selectValorInicial, selectOnChange,  optionDisabledValue, options, ...props }) => {

  return (

    <>

      <select value={selectValorInicial} onChange={selectOnChange} {...props}>

        <option value='' disabled >{optionDisabledValue}</option>
        {options.map((opt, index)=>{
        return <option key={`${opt}${index}`} value={opt}>{opt}</option>
    })}
      </select>


    </>
  )
}

export default Select