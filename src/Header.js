import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import css from './css/header.css'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'

const Header = () => {
  const context = React.useContext(GlobalContext)
  const navigate = useNavigate()
  const [headerModal, setHeaderModal] = React.useState(false)
  const [filtroAplicado, setFiltroAplicado] = React.useState('sem filtro')
  const url = window.location.href
  
  function modalToggle(){
    setHeaderModal(!headerModal)
  }

  function handleMenuLink(rota){
    modalToggle()
    navigate(rota)
  }
  
  React.useEffect(()=>{
    const modal = document.querySelector('#headerModal')
    headerModal? modal.classList.add('headerModalAberto') : modal.classList.remove('headerModalAberto')

  },[headerModal])

  // modal.addEventListener('click', ()=>{
  //   console.log('addevent')
  //   modalToggle()
  // })

  
  return (
    <div className='header'>

      <div className='headerSuperior'>

        <i className="fa-solid fa-bars" onClick={modalToggle}></i>
        <span>{url === 'http://localhost:3000/home' ? 'Bem-vindo!' : ''}</span>
        {/* <span>Bem-vindo, Sr. {context.userLogado.nome}</span> */}
        
      </div>

      <div className='headerInferior'>

        <div className='headerDropdown'>
          {/* {url === 'http://localhost:3000/home'? '' : (<>
          <div className='headerContainerSelect'>
            <i className="fa-solid fa-sort"></i> <Select selectValorInicial={filtroAplicado} selectOnChange={({target})=>setFiltroAplicado(target.value)} options={['númerico', 'data']} optionDisabledValue='sem filtro' />
          </div>
        </>) } */}

          <i class="fa-solid fa-magnifying-glass"></i>


          <i className="fa-solid fa-sort"></i>
        </div>
        


      </div>

      <div id='headerModal' className='headerModal' >

        
      
        <i id='modalFechar' className="fa-solid fa-xmark" onClick={modalToggle}></i>

        <span onClick={()=>handleMenuLink('/home')}>Home</span>


        <span onClick={()=>handleMenuLink('/')}>Logout</span>
      {/* <div className='headerModalContent'>
        s
      </div> */}
      </div>

    </div>
  )
}

export default Header
