import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <ul>
            <li class='list'>
                <a href='#'>
                    <span className='icon'><i className="fa-solid fa-magnifying-glass"></i></span>
                    <span className='text'>Buscar</span>
                </a>
            </li>
            <li class='list'>
                <a href='#'>
                    <span className='icon'><i className="fa-solid fa-square-caret-down"></i></span>
                    <span className='text'>Filtrar</span>
                </a>
            </li>
            <li class='list'>
                <a href='#'>
                    <span className='icon'></span>
                    <span className='text'>Fechar</span>
                </a>
            </li>
        </ul>
      
    </div>
  )
}

export default Footer
