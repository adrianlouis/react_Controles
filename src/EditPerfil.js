import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import css from './css/novoPerfil.css'
import {GlobalContext} from './GlobalContext'



const EditPerfil = () => {

    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()

  return (
    <div>
        <div id='perfil' className='perfil'>

            <img id='wallpaper' className='editando'/>
            <i id='iconFotoEdit' className="fa-solid fa-camera"></i>
            <i id='iconWallpaperEdit' className="fa-solid fa-camera"></i>
            <img id='foto' className='editando'/>
            <div id='botaoEditarPerfil'>
                <span onClick={()=>navigate('/home/lde')}>Salvar</span>
            </div>

            <div className='dadosPerfil'>
                {/* <p className='nome'>Adriano Soares</p> */}
                <input className='newLde inputEditProfile' value={context.userLogado.nome} />
                <input className='newLde inputEditProfile' value='@louiskrad' />
                {/* <p className='tag'>@AdrianLouis</p> */}
                {/* <p className='bio'>Se eu tivesse o Sol, o afundario no oceano para poder vender velas aos mortais.</p> */}
                <textarea className='textAreaEditProfile'>Se eu tivesse o Sol, o afundario no oceano para poder vender velas aos mortais.</textarea>
            </div>
        </div>

        <NavLink className='navVoltarEditProfile' to='/home/lde'>voltar</NavLink>
    </div>
  )
}

export default EditPerfil
