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
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)
  const larguraTela = window.screen.width
  const storage = getStorage()
  const [loading, setLoading] = React.useState(false)
  const [loadingWpp, setLoadingWpp] = React.useState(false)
  // const {tempFoto, tempFotoCrop} = context.userLogado

  React.useEffect(()=>{

    if (context.userLogado.perfil.foto && context.userLogado.perfil.fotoCrop) {

      if (!context.userLogado.tempFoto){
        // loading. . . 
        setLoading(true)
        // baixar imagem do firebase e usar no canvas
        getDownloadURL(ref(storage, '/'+`${context.userLogado.id}fotoPerfil.jpg`)).then((url)=>{
        
          var canvas = document.querySelector('#canv')
          var ctx = canvas.getContext('2d')
          var img = new Image()
          img.src = url
          img.onload=()=>{
            ctx.drawImage(img, ...context.userLogado.perfil.fotoCrop)
            setLoading(false)
            context.setUserLogado(prev => { return {...prev, tempFoto:img, tempFotoCrop:context.userLogado.perfil.fotoCrop}})
          }
        })
      }else{

        // usar imagem em userlogado no canvas
        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(context.userLogado.tempFoto, ...context.userLogado.tempFotoCrop)
      }
    }

    if (context.userLogado.perfil.wallpaper && context.userLogado.perfil.wallpaperCrop){
      if (!context.userLogado.tempWpp){
        setLoadingWpp(true)
          getDownloadURL(ref(storage, '/'+`${context.userLogado.id}wpp.jpg`)).then((url2)=>{
            var canvas2 = document.querySelector('#canvWpp')
            var ctx2 = canvas2.getContext('2d')
            var wpp = new Image()
            wpp.src = url2
            wpp.onload=()=>{
              ctx2.drawImage(wpp, ...context.userLogado.perfil.wallpaperCrop)
              setLoadingWpp(false)
              context.setUserLogado(prev=>{ return {...prev, tempWpp:wpp, tempWppCrop:context.userLogado.perfil.wallpaperCrop}})
            }
          })
      }else{
        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(context.userLogado.tempWpp, ...context.userLogado.tempWppCrop)
      }
    }

    //SALVAR COR ESCOLHIDA
    if (context.userLogado.perfil.cor){
      document.querySelector(':root').style.setProperty('--corEscolhida', context.userLogado.perfil.cor)

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
    
      <div id='perfil' className='perfil'>

      <div className='wallpaperCanvasWrapper' >

        <canvas id='canvWpp' width={larguraTela} height={larguraTela / 3}>
        </canvas>

        {loadingWpp && <div className='loadingWpp'></div>}

      </div>

        <div className='fotoPerfilWrapper' >

          {loading && <div className='loadingFoto'></div>}

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
          <li className='liVerde' onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/ext')}>Extintores</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/hd')}>Hidrantes</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/lde')}>Luzes de Emergência</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/gas')}>Medição de Gás</li>
        </ul>

      </div>

      <Outlet/>


    </>
  )
}

export default Home
