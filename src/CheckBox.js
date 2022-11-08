import React from 'react'

  const CheckBox = ({ cbHandleChange, itens, itensAtuais, ...props}) => {
  const array = itensAtuais

  return (
    <>
      {itens.map((item, index)=>{
          return <label key={item} htmlFor={item}>
          <input  id={item} type='checkbox' value={item} checked={array && array.includes(item)} {...props} onChange={cbHandleChange} />
          {' '}{item}
        </label>
          
      })}
    </>
  )
}

export default CheckBox
