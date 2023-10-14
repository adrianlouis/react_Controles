import React from 'react'

const Input = ({labClass, id, labText, inpClass, inpTipo, ...props}) => {
  return (
    <>
    <label className={labClass} htmlFor={id} >{labText}
    </label>
      <input className={inpClass} id={id} type={inpTipo} {...props}  />

    </>
  )
}

export default Input
