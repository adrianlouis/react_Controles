import React from 'react'
import css from './css/homeCard.css'

const HomeCard = ({cardNome, spanCardClass, divClass, ...props}) => {
  return (
    <div className={divClass} {...props} >
      <span className={spanCardClass}>{cardNome}</span>
    </div>
  )
}

export default HomeCard
