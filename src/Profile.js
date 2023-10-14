import React from 'react'
// import css from './css/profile.css'
import css2 from './css/login.css'
import NewUserInput from './components/NewUserInput'

const Profile = () => {

  const [perfil, setPerfil] = React.useState({
    nome:'',
    nick:'',

  })

  console.log(perfil)
  
  return (
    <div id='profile'>
      <h1>Crie seu perfil</h1>  

      <div className='perfilWrapper'>
        {/* <i className={regOk.nome?"fa-solid fa-user ":"fa-solid fa-user regInvalido"}></i> */}
        {/* <input className='regInput ' type='text' placeholder='Primeiro nome' value={perfil.nome} onChange={({target})=>setPerfil({...perfil, nome:target.value})} required/> */}
     <NewUserInput tipo='text' placeholder='nome de usuário' valor={perfil.nome} onchange={({target})=>setPerfil({...perfil, nome:target.value})}></NewUserInput>
     </div>




    </div>
  )
}

export default Profile
