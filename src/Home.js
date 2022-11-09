import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'

const Home = () => {
    const navigate = useNavigate()
    const context = React.useContext(GlobalContext)
    const qtdLde = context.userLogado.lde.length

    if(!context.userLogado){
      navigate('/')
    }

    function nav(dest){
        navigate(dest)
    }

    // context.setUserLogado({...context.userLogado, hd:[]})

  return (
    <>
    <Header />
    <div className='homeContainer'>

        <div className='cards'>


        <HomeCard spanCardClass='cardTexto' divClass='  homeCardInativo homeCardContainer' cardNome='Extintores' />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={qtdLde+' Luzes de Emergência'}  onClick={()=>nav('/lde')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.hd.length+' Hidrantes'} onClick={()=>nav('/hd')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardInativo homeCardContainer' cardNome='Portas Corta Fogo' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Garagem' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Prestadores' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Salistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Lojistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Medidores de Gás' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Prestadores' />

        </div>
      
    </div>
    </>
  )
}

export default Home
