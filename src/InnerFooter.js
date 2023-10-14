import React from 'react'
import { Link } from 'react-router-dom'

const InnerFooter = ({botoes}) => {
  return (
    <div className='ldeSubFooter'>
      {botoes.map((item)=>{
        return <Link className='ldeSubFooterBtn' to={item[0]} onClick={item[2]}  >{item[1]}</Link>
        // return <span>{item[0]} {item[1]} </span>
        // console.log(item)
      })}
      
    </div>
  )
}

export default InnerFooter
