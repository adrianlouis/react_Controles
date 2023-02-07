import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import { NavLink, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'
import LdE from './LdE'
import Hidrantes from './Hidrantes'
import { updateBd } from './crudFireBase'


const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)
  const [iconsName, setIconsName] = React.useState('')

  const [fotoEscolhida, setFotoEscolhida] = React.useState('')
  const fotoBD = context.userLogado.fotoPerfil
  const [urlFoto, setUrlFoto] = React.useState('')
  // console.log(context.userLogado.fotoPerfil)

  React.useEffect(()=>{
    if(fotoEscolhida){
      setUrlFoto(URL.createObjectURL(fotoEscolhida))
      // updateBd(context.userLogado.id, {fotoPerfil:fotoEscolhida})

      // var banana = new FileReader()
      // banana.readAsDataURL(document.querySelector('#fotoPerfil').files[0])
      // banana.onload = function (laranja){
      //   let imgData = laranja.target.result
      //   console.log(imgData)
      // }


    }
  },[fotoEscolhida])


  // console.log(urlFoto)


  
    function nav(dest){
      navigate(dest)
    }

    function escolherFoto(){
      document.querySelector('#fotoPerfil').click()
    }

    function handleFoto(){
      if (fotoBD && !urlFoto){
        return URL.createObjectURL(fotoEscolhida)
      }else if (urlFoto){
        return urlFoto
      }else{
        return
      }

    }

    function handleLike(el) {
      // el.classList === 'fa-regular fa-heart' ? console.log('sim') : console.log('nao')
      console.log(el.getAttribute('class'))
      el.getAttribute('class') === 'fa-regular fa-heart' ? el.setAttribute('class', 'fa-solid fa-heart') : el.setAttribute('class', 'fa-regular fa-heart')
    }


  return (
    <>
    
    {/* <Header /> */}

    <div className='mainContainerHome'>

      <div className='profMenu'>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>


      <div className='profilePic'>
        <div className='homeUserImg' style={{backgroundImage:`url(${handleFoto()})`}} onClick={()=>escolherFoto()}  >
        {/* <div className='homeUserImg' style={{backgroundImage:`url(${urlFoto})`}} onClick={()=>escolherFoto()}  > */}
          <i id='editIconFoto' className="fa-solid fa-pen"></i>
          <input id='fotoPerfil' type='file' onChange={({target})=>setFotoEscolhida(target.files[0])} ></input>
        </div>

        <div className='picIcons'>
          <i className="fa-regular fa-user" onMouseEnter={()=>setIconsName('amigos')} onMouseLeave={()=>setIconsName('')} ></i>
          <i className="fa-regular fa-envelope" onMouseEnter={()=>setIconsName('mensagens')} onMouseLeave={()=>setIconsName('')}></i>
          <i className="fa-regular fa-bell" onMouseEnter={()=>setIconsName('notificações')} onMouseLeave={()=>setIconsName('')}></i>
          <p className='iconsNames'>{iconsName}</p>
        </div>

      </div>

      <div className='profileNomes'>
        <span className='homeUserNome'>{(context.userLogado.nome).charAt(0).toUpperCase() + (context.userLogado.nome).slice(1)}</span>
        <span className='homeUserNick'  >@louiskrad</span>
        <span className='homeUserQuote' spellCheck={false} contentEditable>“This is why you don’t bring back fallen warriors, sooner or later they’re going to see everything they fought for’s turned to shit.”</span>
        <span>2 seguindo - 3 seguidores</span>
      </div>
    </div>






    <div className='profileScroller'>
      <div className='profileScrollerIcons'>
        <div className='profIcons'></div>
        <NavLink to='hd'><i className="fa-solid fa-fire-extinguisher" ></i></NavLink>
        <div className='profIcons'><i className="fa-solid fa-lightbulb" onClick={()=>navigate('/lde')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-gauge" onClick={()=>navigate('/gas')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-faucet" onClick={()=>navigate('/hd')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-door-closed" onClick={()=>navigate('/sala')}></i></div>
      </div>
    </div>

    <Routes>
      {/* <Route path='/' element={<LdE/>}></Route> */}
      <Route path='hd' element={<Hidrantes />}></Route>
    </Routes>

    <Outlet></Outlet>


    {/* <div className='profileScroller'>
      <div className='profileScrollerIcons'>
        <div className='profIcons'><i className="fa-solid fa-fire-extinguisher" onClick={()=>navigate('/ext')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-lightbulb" onClick={()=>navigate('/lde')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-gauge" onClick={()=>navigate('/gas')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-faucet" onClick={()=>navigate('/hd')}></i></div>
        <div className='profIcons'><i className="fa-solid fa-door-closed" onClick={()=>navigate('/sala')}></i></div>
      </div>
    </div> */}


  

    <span className='profTitles'>Última postagem:</span>

    <div className='profLastPost'>
      <span className='postNick'>{(context.userLogado.nome).charAt(0).toUpperCase() + (context.userLogado.nome).slice(1)} </span><span className='postNickComp'>@louiskrad - 04/02/23 - 23:45h</span>
      <p className='postMsg'>Durante ronda, foi encontrado um saco de lixo hospitalar na lixeira comum, do 3º Pavimento ala A, às 23:45h.</p>
      
      <div className='profLastPostFooter'>
        <div className='lastPostFooter'>
          <i className="fa-regular fa-heart" onClick={({target})=>handleLike(target)}></i>
          <i className="fa-regular fa-comment"></i>
          <i className="fa-regular fa-star"></i>
          {/* <p>04/02/23 - 23:45h</p> */}
        </div>
        <p>ver todas as postagens</p>
      </div>
      
    </div>

    <span className='profTitles'>Luzes de Emergência</span>

    <div className='profLastPost'>

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
