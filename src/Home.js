import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext' 

const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)

    if(!context.userLogado){
      navigate('/')
    }
    function nav(dest){
      navigate(dest)
    }
    
    // patch para usuarios antigos
    if(!context.userLogado.gas){
      context.setUserLogado({...context.userLogado, gas:[]})
    }


  return (
    <>
    
    {/* <Header /> */}

    <div className='homeContainer'>

        <div className='cards'>

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.ext.length+' Extintores'} onClick={()=>nav('/ext')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.lde.length+' Luzes de Emergência'}  onClick={()=>nav('/lde')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.hd.length+' Hidrantes'} onClick={()=>nav('/hd')} />

        <HomeCard spanCardClass='cardText' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.gas.length+' Medições de Gás'} onClick={()=>nav('/gas')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardInativo homeCardContainer' cardNome='Portas Corta Fogo' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Garagem' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Prestadores' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Salistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Lojistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Escoltas' />

        </div>
      
    </div>
    </>
  )
}

export default Home
