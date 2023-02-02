import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'

import js from './img/silverhand.jpg'

const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)
  const [fotoPerfil, setFotoPerfil] = React.useState('')


    if(!context.userLogado){
      navigate('/')
    }
    function nav(dest){
      navigate(dest)
    }

    function escolherFoto(){
      document.querySelector('#fotoPerfil').click()
    }

    function handleFotoPerfil(elem){
      console.log(elem.files[0])

      // setFotoPerfil(elem.value)
      // elem.style.backgroundImage=`url(${fotoPerfil})`

      // document.querySelector('#fototeste').src = elem.files[0] 

    }


  return (
    <>
    
    {/* <Header /> */}

    <div className='mainContainerHome'>

      <div className='profilePic'>
        <div className='homeUserImg' onClick={()=>escolherFoto()}  ><i id='editIconFoto' className="fa-solid fa-pen"></i><input id='fotoPerfil' type='file' onChange={({target})=>handleFotoPerfil(target)} ></input> </div>
        
      </div>

      {/* <img id='fototeste' src=''></img> */}

      <div className='profileNomes'>
        <span className='homeUserNome'>{(context.userLogado.nome).charAt(0).toUpperCase() + (context.userLogado.nome).slice(1)}</span>
        <span className='homeUserNick'  >@louiskrad</span>
        <span className='homeUserQuote' spellCheck={false} contentEditable>“This is why you don’t bring back fallen warriors, sooner or later they’re going to see everything they fought for’s turned to shit.”</span>
      </div>
      {/* <i className="fa-solid fa-users"></i> */}
    </div>

    <div className='profileScroller'>
      <div className='profileScrollerIcons'>
        <div className='profIcons'><i className="fa-solid fa-fire-extinguisher" onClick={()=>navigate('/ext')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-lightbulb" onClick={()=>navigate('/lde')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-gauge" onClick={()=>navigate('/gas')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-faucet" onClick={()=>navigate('/hd')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-door-closed" onClick={()=>navigate('/sala')}></i></div>
        
        {/* <div className='profIcons'><i className="fa-solid fa-truck"></i></div>
        <div className='profIcons'><i className="fa-solid fa-car-rear"></i></div>
        <div className='profIcons'><i className="fa-solid fa-trowel"></i></div>
        <div className='profIcons'><i className="fa-solid fa-screwdriver-wrench"></i></div> */}
        
        
        
        
        
       
        
        
      </div>
    </div>

    <div className='homeContainer'>


        <div className='cards'>

        {/* <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo' cardNome={<i className="fa-solid fa-user"></i>} onClick={()=>nav('/perfil')} /> */}

        {/* <input type='text' placeholder='Nome...' onChange={({target})=>setNewUser({...newUser, name:target.value})} />
        <input type='text' placeholder='Email...' onChange={({target})=>setNewUser({...newUser, email:target.value})} />

        <button onClick={criarUser}>SALVAR</button> */}

      {/* <ul>
        {users.map((m, i)=>{
          return <div  key={m.name+i}>
          <li>{m.name}</li>
          <li>{m.email}</li>
          <button onClick={()=>{updateUser(m.id, m.email)}}>mudar email</button>
          <button onClick={()=>deleteUser(m.id)}>deletar</button>
          </div>
        })}
      </ul> */}

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.ext.length+' Extintores'} onClick={()=>nav('/ext')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.lde.length+' Luzes de Emergência'}  onClick={()=>nav('/lde')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.hd.length+' Hidrantes'} onClick={()=>nav('/hd')} />

        <HomeCard spanCardClass='cardText' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.gas.length+' Medições de Gás'} onClick={()=>nav('/gas')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardInativo homeCardContainer' cardNome='Portas Corta Fogo' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Garagem' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Prestadores' />

        <HomeCard spanCardClass='cardText' divClass='homeCardAtivo homeCardContainer' cardNome='Salistas' onClick={()=>nav('/sala')} />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Lojistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Escoltas' />

        </div>
      
    </div>
    </>
  )
}

export default Home
