import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'

const Home = () => {
    const navigate = useNavigate()

    function nav(dest){
        navigate(dest)
    }

  return (
    <>
    <Header />
    <div className='homeContainer'>

        <div className='cards'>


        <HomeCard spanCardClass='cardTexto' cardNome='Extintores' />

        <HomeCard spanCardClass='cardTexto' cardNome='Luzes de Emergência' onClick={()=>nav('/lde')} />

        <HomeCard spanCardClass='cardTexto' cardNome='Hidrantes' />

        <HomeCard spanCardClass='cardTexto' cardNome='Portas Corta Fogo' />

        <HomeCard spanCardClass='cardText' cardNome='Garagem' />

        <HomeCard spanCardClass='cardText' cardNome='Prestadores' />

        <HomeCard spanCardClass='cardText' cardNome='Salistas' />

        <HomeCard spanCardClass='cardText' cardNome='Lojistas' />

        <HomeCard spanCardClass='cardText' cardNome='Medidores de Gás' />

        <HomeCard spanCardClass='cardText' cardNome='Prestadores' />

        </div>
      
    </div>
    </>
  )
}

export default Home
