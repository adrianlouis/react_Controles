import React from 'react'
import css from './css/homeCard.css'

const HomeCard = ({cardNome, spanCardClass, ...props}) => {
  return (
    <div className='homeCardContainer' {...props} >
      <span className={spanCardClass}>{cardNome}</span>
    </div>
  )
}

export default HomeCard
