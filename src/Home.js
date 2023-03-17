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
  const larguraTela = window.screen.width

  React.useEffect(()=>{
    if (context.userLogado.perfil.foto && context.userLogado.perfil.fotoCrop) {

      var canvas = document.querySelector('#canv')
      var ctx = canvas.getContext('2d')
      var foto = new Image()
      foto.src=context.userLogado.perfil.foto
      foto.onload=()=>{
        ctx.drawImage(foto, ...context.userLogado.perfil.fotoCrop )
    }

    if (context.userLogado.perfil.wallpaper && context.userLogado.perfil.wallpaperCrop){
      var canvasWpp = document.querySelector('#canvWpp')
      var ctxWpp = canvasWpp.getContext('2d')
      var wpp = new Image()
      wpp.src=context.userLogado.perfil.wallpaper
      wpp.onload=()=>{
        ctxWpp.drawImage(wpp, ...context.userLogado.perfil.wallpaperCrop)
      }
    }

  }
  },[])

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

      <div className='wallpaperCanvasWrapper' >

        <canvas id='canvWpp' width={larguraTela} height={larguraTela / 3}>
        </canvas>

      </div>

        {/* <img id='foto'/> */}
        <div className='fotoPerfilWrapper' >
            {/* <img className='fotoPerfil' src={kDash}></img> */}

          <canvas width='80' height='80' id='canv' >

            <p>Seu navegador não suporta Canvas</p>

          </canvas>

          {!context.userLogado.perfil.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>}


        </div>

        <div id='botaoEditarPerfil'>
          <span onClick={()=>navigate('/editprofile')}>Editar perfil</span>
        </div>

        <div className='dadosPerfil'>
          <p className='nome'>{context.userLogado.perfil.nome}</p>
          <p className='tag'>{context.userLogado.perfil.nick && '@'}{context.userLogado.perfil.nick}</p>
          <p className='bio'>{context.userLogado.perfil.quote}</p>
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
