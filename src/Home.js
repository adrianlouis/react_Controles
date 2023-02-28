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
  const [feed, setFeed] = React.useState(1)
  const [liEscolhido,setLiEscolhido] = React.useState()

  return (
    <>
    
    <Header />

      <div id='perfil' className='perfil'>

        <img id='wallpaper'/>

        <img id='foto'/>
        <div id='botaoEditarPerfil'>
          <span>Editar perfil</span>
        </div>

        <p className='nome'>Adriano Soares</p>
        <p className='tag'>@AdrianLouis</p>
        <p className='bio'>We'll never fade</p>
      </div>

      <div id='linksScroll'>

        <ul>
          <li><NavLink to='lde'>Luzes de Emergência</NavLink></li>
          <li><NavLink to='ext'>Medição de Gás</NavLink></li>
          <li><NavLink to='hd'>Hidrantes</NavLink></li>
          <li><NavLink to='ext'>Extintores</NavLink></li>
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
