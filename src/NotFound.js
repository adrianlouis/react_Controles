import React from 'react'

const NotFound = () => {


    console.log(window.location)

    window.location.replace('http://www.google.com')

  return (
    <div>
      <p>Página não encontrada!</p>
      <p>Erro 404</p>
    </div>
  )
}

export default NotFound
