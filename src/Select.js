import React from 'react'

const Select = ({selClass, optClass, selectValorInicial, selectOnChange,  optionDisabledValue, options, ...props }) => {

  return (

    <>

      <select className={selClass} value={selectValorInicial} onChange={selectOnChange} {...props}>

        <option className={optClass} value='' disabled >{optionDisabledValue}</option>
        {options.map((opt, index)=>{
        return <option  className={optClass} key={`${opt}${index}`} value={opt}>{opt}</option>
    })}
      </select>

 
    </>
  )
}

export default Select