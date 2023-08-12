import React from 'react'
import css from './css/novoPerfil.css'
import {useNavigate, Outlet} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'

import styles from './Home.module.css'

const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)
  const larguraTela = window.screen.width
  const storage = getStorage()
  const [loading, setLoading] = React.useState(false)
  const [loadingWpp, setLoadingWpp] = React.useState(false)

  React.useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      }else{
        return 
      }
    })

    const loadFoto = async () => {
      setLoading(true)

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
      .then((url)=>{
        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        var img = new Image()
        img.src = url
        img.onload=()=>{
          setLoading(false) 

          const crop = () =>{
            if (context.userLogado.perfil.fotoCrop){
              return context.userLogado.perfil.fotoCrop
            }else{
              return [0, 0, 80, 80]
            }
          }

          const cropDaFoto = crop()
          ctx.drawImage(img, ...cropDaFoto)
          context.setUserLogado(prev => { return {...prev, tempFoto:img, tempFotoCrop:cropDaFoto, perfil:{...context.userLogado.perfil, foto:img, fotoCrop:crop()}}})  
          
        }
      })
      .catch((error)=>{
        if (error.code === 'storage/object-not-found'){
          context.setUserLogado(prev => { return {...prev, tempFoto:false, tempFotoCrop:false, perfil:{...context.userLogado.perfil, foto:false, fotoCrop:false}}})  
          setLoading(false)
        }
        console.log(error)
      })
      
    }

    if (context.imgTemp.foto && context.imgTemp.fCrop){
      const canvas = document.querySelector('#canv')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = context.imgTemp.foto
      img.onload=()=>{
        ctx.drawImage(img, ...context.imgTemp.fCrop)
      }

    }

    if (context.imgTemp.wpp && context.imgTemp.wCrop){
      const canvas = document.querySelector('#canvWpp')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = context.imgTemp.wpp
      img.onload=()=>{
        ctx.drawImage(img, ...context.imgTemp.wCrop)
      }
    }

    const carregarFoto = async () => {
      setLoading(true)

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
      .then((url)=>{
        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        var img = new Image()
        img.src = url
        img.onload=()=>{
          setLoading(false) 
          ctx.drawImage(img, ...context.userLogado.perfil.fotoCrop)
          context.setImgTemp(prev => {return {...prev, foto:url, fCrop:context.userLogado.perfil.fotoCrop}})
        }
      })
      .catch((error)=>{
        if (error.code === 'storage/object-not-found'){
          console.log('ERRO AO CARREGAR IMAGEM DO FIREBASE STORAGE')
          setLoading(false)
        }
      })
      
    }


    const carregarWallpaper = async () => {
      setLoadingWpp(true)

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}wpp.jpg`)

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
      .then((url)=>{
        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        var img = new Image()
        img.src = url
        img.onload=()=>{
          setLoadingWpp(false) 
          ctx.drawImage(img, ...context.userLogado.perfil.wallpaperCrop) 
          context.setImgTemp(prev => {return {...prev, wpp:url, wCrop:context.userLogado.perfil.wallpaperCrop}})
        }
      })
      .catch((error)=>{
        if (error.code === 'storage/object-not-found'){
          console.log('ERRO AO CARREGAR WALLPAPER DO FIREBASE STORAGE')
          setLoadingWpp(false)
        }
      })

    }


    if(!context.imgTemp.foto && !context.imgTemp.fCrop && context.userLogado.perfil.foto){
    // if(!context.imgTemp.foto && !context.imgTemp.fCrop && context.userLogado.perfil.foto){
      carregarFoto()
    }
    if(!context.imgTemp.wpp && !context.imgTemp.wCrop && context.userLogado.perfil.wallpaper){
      carregarWallpaper()
    }

    //SALVAR COR ESCOLHIDA
    if (context.userLogado.perfil.cor){
      document.querySelector(':root').style.setProperty('--corEscolhida', context.userLogado.perfil.cor)
    }



    // NOVO HEADER / PAPEL DE PAREDE, FOTO, ETC 
    const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)

    //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
    getDownloadURL(fotoRef).then((url)=>{
      // console.log(url)
      // document.querySelector('#testeImagem').src=url
    })




        
  },[])

function handleNavlink(elem, link){
  const links = document.querySelectorAll('#navbarPerfil li')
  context.setItensFiltrados('')
  
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove('liVerde');
  }
  elem.classList.add('liVerde')
  navigate(link)
}

// const testeRef = React.useRef()
// const refLinksScroll = React.useRef()

// React.useEffect(()=>{
//   window.addEventListener('scroll', ()=>{
//     if (refLinksScroll.current.getBoundingClientRect().top < 1){
//       console.log('chegou em Top 0')
//     }else{
//       return
//     }
// },[])
// })

// React.useEffect(()=>{

// },[])



window.onscroll = () => {
  const div = document.querySelector('#perfilWrapper')
  const foto = document.querySelector('#canv')
  const wallpaper = document.querySelector('#wppCanvasWrapper')
  const canvWpp = document.querySelector('#canvWpp')
  const posTela = window.scrollY
  const wcw = document.querySelector('.wallpaperCanvasWrapper')

  if (posTela <= 70){
    const valor = 1 - (posTela / 135)
    foto.style.transform = `scale(${valor}) translate(25px, -40px)`
    foto.style.width='80px'
    foto.style.height='80px'

    wallpaper.style.zIndex=0
    canvWpp.style.filter='brightness(100%) blur(0px)'
  }else{
    // mask.style.top=0
    wallpaper.style.zIndex=1
    canvWpp.style.filter='brightness(30%) blur(5px)'
  }

  if (posTela >= 223){
    document.querySelector('#headerProfName').style.visibility='visible'
    document.querySelector('#headerProfName').style.opacity='1'

  }else{
    document.querySelector('#headerProfName').style.visibility='hidden'
    document.querySelector('#headerProfName').style.opacity='0'
  }

  
}




// em Home.module.css posso modificar a altura da classe .wpp para que a imagem
// do canvas do wpp fique centralizado, como no twitter mobile. 
  return (
    // <div >
    
    //   <div id='perfil' className='perfil'  >

    //   <div className='wallpaperCanvasWrapper' >

    //     <canvas id='canvWpp' width={larguraTela} height={larguraTela / 3}>
    //     </canvas>

    //     {loadingWpp && <div className='loadingWpp'></div>}

    //   </div>

    //     <div className='fotoPerfilWrapper' >

    //       {loading && <div className='loadingFoto'></div>}

    //       <canvas width='80' height='80' id='canv' >
    //         <p>Seu navegador não suporta Canvas</p>
    //       </canvas>

    //       {!context.imgTemp.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>}

    //     </div>

    //     <div id='botaoEditarPerfil'>
    //       <span onClick={()=>navigate('/editprofile')}>Editar perfil</span>
    //     </div>

    //     <div className='dadosPerfil'>
    //       {/* <p className='nome'>{context.userLogado.perfil.nome}</p> */}
    //       <p className='nome'>{context.userLogado.perfil.nome}</p>
    //       <p className='tag'>{context.userLogado.perfil.nick && '@'+context.userLogado.perfil.nick}</p>
    //       <p className='bio'>{context.userLogado.perfil.quote}</p>
    //     </div>
        
    //   </div>

    //   <div id='linksScroll' >

    //     <ul id='navbarPerfil'>
    //       <li className='liVerde' onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/ext')}>Extintores</li>
    //       <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/hd')}>Hidrantes</li>
    //       <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/lde')}>Luzes de Emergência</li>
    //       <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/gas')}>Medição de Gás</li>
    //     </ul>

    //   </div>

    //   <Outlet/>

    // </div>


    <div>

      <div id='wppCanvasWrapper' className={styles.wpp}>
        <canvas className={styles.canv} id='canvWpp' width={larguraTela } height={larguraTela / 3} ></canvas>
      </div>

      <span id='headerProfName' className={styles.headerProfName}>@{context.userLogado.perfil.nick}</span>

      <div id='perfilWrapper' className={styles.perfil} >
        <canvas  className={styles.fotoPerfil} width='80' height='80' id='canv' ></canvas>
        <p className={styles.nomePerfil}>{context.userLogado.perfil.nome}</p>
        <p className={styles.nicknamePerfil} >{context.userLogado.perfil.nick &&  '@'+context.userLogado.perfil.nick}</p>
        <span className={styles.btnEditPerfil} onClick={()=>navigate('/editprofile')}>Editar perfil</span>
        <p className={styles.quote}>{context.userLogado.perfil.quote}</p>
      </div>

      <div id='linksScroll' >

        <ul id='navbarPerfil'>
          <li className='liVerde' onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/ext')}>Extintores</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/hd')}>Hidrantes</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/lde')}>Luzes de Emergência</li>
          <li onClick={({currentTarget})=>handleNavlink(currentTarget, '/home/gas')}>Medição de Gás</li>
        </ul>

      </div>
      <Outlet/>



    </div>

  )
}

export default Home
