import React from 'react'

// const Select = ({selectValorInicial, selectOnChange,  optionDisabledValue, options }) => {
const Select = ({ selectValorInicial, selectOnChange,grupoLabel, options }) => {

  return (

    <>

      <select value={selectValorInicial} onChange={selectOnChange}>
        {grupoLabel.map((grupo, index)=>{
          return <optgroup key={`${grupo}${index}`} label={grupo}>
            {options[index].map((opt, index)=>{
              return <option key={`${opt}${index}`} value={opt}>{opt}</option>
            })}
          </optgroup>
        })}
        
          
       
      </select>


      {/* <select value={selectValorInicial} onChange={selectOnChange}>

        <option value='' disabled >{optionDisabledValue}</option>
        {options.map((opt, index)=>{
        return <option key={`${opt}${index}`} value={opt}>{opt}</option>
    })}
      </select> */}


    </>
  )
}

export default Select