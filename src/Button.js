import React from 'react'

const Button = ({btnId, btnText, btnClass, ...props}) => {
  return (
    <>
      <button id={btnId} className={btnClass} {...props} >{btnText}</button>
    </>
  )
}

export default Button
