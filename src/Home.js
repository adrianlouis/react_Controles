import React from 'react'
import HomeCard from './HomeCard'
// import css from './css/home.css'
import css from './css/novoPerfil.css'
import Header from './Header'
import { NavLink, Route, Routes, useNavigate, Outlet} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'
import { updateBd } from './crudFireBase'
import Hidrantes from './Hidrantes'
import HidranteNovo from './HidranteNovo'
import LdE from './LdE'
import Extintores from './Extintores'
import Gas from './Gas'




const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)

//   window.addEventListener("scroll", event => {
//     const elem = document.querySelector('#wallpaper')
//     if (window.scrollY <= 100){
//       elem.style.opacity= ((elem.clientHeight - window.scrollY)/elem.clientHeight)+'%'

//     }
// }, { passive: true });

function handleNavlink(elem, link){
  const links = document.querySelectorAll('#navbarPerfil li')
  
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove('liVerde');
  }
  elem.classList.add('liVerde')
  navigate(link)
}

  return (
    <>
    
    {/* <Header /> */}

      <div id='perfil' className='perfil'>

        <img id='wallpaper'/>

        <img id='foto'/>
        <div id='botaoEditarPerfil'>
          <span onClick={()=>navigate('/editprofile')}>Editar perfil</span>
          
        </div>

        <div className='dadosPerfil'>

        <p className='nome'>{context.userLogado.nome}</p>
        <p className='tag'>{context.userLogado.nick}</p>
        <p className='bio'>{context.userLogado.quote}</p>
        </div>
      </div>

      <div id='linksScroll'>

        <ul id='navbarPerfil'>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/ext')}>Extintores</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/hd')}>Hidrantes</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/lde')}>Luzes de Emergência</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/gas')}>Medição de Gás</li>
        </ul>

      </div>

      {/* <div id='registros'>

        {feed===1&&<>
          <Hidrantes/>
        </>}
        {feed===2 && <>
        <LdE/>
        </>}
        {feed===3 && <>
        <Extintores/>
        </>}
        {feed===4 && <>
        <Gas/>
        </>}

        <Routes>
            <Route path='/' element={<Extintores/>} />
            <Route path='/' element={<Hidrantes/>} />
        </Routes>


      </div> */}

      <Outlet/>


    </>
  )
}

export default Home
