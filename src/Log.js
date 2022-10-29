import React from 'react'
import Button from './Button'
import css from './css/log.css'
import Input from './Input'
import {validarRegSenha, validarConfSenha, validarRegNome, validarRegEmail} from './funcoes/login'
import {useNavigate} from "react-router-dom"
import { GlobalContext } from './GlobalContext'


const Log = () => {

    const context = React.useContext(GlobalContext)
    const [nome, setNome] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [listaUser, setListaUser] = React.useState([])
    const [erroLogin, setErroLogin] = React.useState(null)
    const [formAtivo, setFormAtivo] = React.useState(false)
    const [regNome, setRegNome] = React.useState('')
    const [regEmail, setRegEmail] = React.useState('')
    const [regSenha, setRegSenha] = React.useState('')
    const [confSenha, setConfSenha] = React.useState('')
    const user = {nome:nome, senha: senha}
    const regUser = { cadNome:regNome, cadEmail:regEmail, cadSenha:regSenha, cadConfSenha:confSenha}
    const [regValidacoes, setRegValidacoes] = React.useState({vNome: false, vEmail:false, vSenha:false, vConfSenha:false})
    const navigate = useNavigate();
    const newUser = {nome: regNome, email:regEmail, senha:regSenha, lde:[]}
    const [deltree, setDeltree] = React.useState(false)

    // window.localStorage.clear()

    // REGISTRAR
    function submit(e){
      e.preventDefault()
      if (regValidacoes.vNome && regValidacoes.vEmail && regValidacoes.vSenha && regValidacoes.vConfSenha){
        context.setUsuarios([...context.usuarios, {...newUser}])
        context.setUserLogado(newUser)
        // context.setUpload(true)
        navigate('/home')
      }
    }

    function logar(e){
      e.preventDefault()

      const item = context.usuarios.filter((filtro)=>{
        return filtro.nome === user.nome && filtro.senha === user.senha
      })

      if (item.length === 0){
        setErroLogin('usuário ou senha não confere')
      }else{
        // LOGADO 
        setErroLogin(`Olá, Sr(a). ${item[0].nome}!`)
        context.setUserLogado(...item)
        setTimeout(() => {
          navigate('/home')
        }, 500);
      }
    }

    // React.useEffect(()=>{
    //   const nabucodonosor = document.querySelectorAll('.morpheus')
    //   smith(nabucodonosor)
    // },[])
    // function smith(v){
      
    //   for (let i = 0; i < v.length; i++) {
    //     v[i].style.display='none';
        
    //   }
    //   v[0].style.display='block'
      
    //   setTimeout(() => {
    //     v[0].style.display='none'
    //     v[1].style.display='block'
    //   }, 5000);
    //   setTimeout(() => {
    //     v[1].style.display='none'
    //     v[2].style.display='block'
    //   }, 10000);
    //   setTimeout(() => {
    //     v[2].style.display='none'
    //     v[3].style.display='block'
    //   }, 15000);
    //   setTimeout(() => {
    //     v[3].classList.add('helloTrinity')
    //   }, 20000);
    //   setTimeout(() => {
    //     document.querySelector('.enterTheMatrix').style.display='none'
    //   }, 25000);

    // }


    React.useEffect(()=>{
      const time = setTimeout(() => {
          setErroLogin(null)
      }, 4000);

      return ()=> clearTimeout(time)
    },[erroLogin])
    
    React.useEffect(()=>{
      if(listaUser.length !== 0){
      window.localStorage.setItem('controleUsers', JSON.stringify(listaUser))
    }
  },[ listaUser ])

  function alternarForm(){
    formAtivo? setFormAtivo(false) : setFormAtivo(true)

    if (!formAtivo){
      document.querySelector('#formLogin').classList.add('mudarForm')
      setTimeout(() => {
        document.querySelector('#formRegistro').classList.remove('mudarForm')
      }, 350);
      
    }else{
      document.querySelector('#formRegistro').classList.add('mudarForm')
      setTimeout(() => {

        document.querySelector('#formLogin').classList.remove('mudarForm')
      }, 350);

    }
  }

  function handleChange(elem, setter){
    setter(elem.value)
  }

  function valSenha(res) {
    setRegValidacoes({...regValidacoes, ...res})
  }

  function valConfSenha(res){
    setRegValidacoes({...regValidacoes, ...res})
  }

  function valRegNome(res){
    setRegValidacoes({...regValidacoes, ...res})
  }

  function valRegEmail(res){
    setRegValidacoes({...regValidacoes, ...res})
  }

  React.useEffect(()=>{
   if(regUser.cadConfSenha === '' || regUser.cadSenha !== regUser.cadConfSenha){
     setRegValidacoes({...regValidacoes, vConfSenha:false})
     document.querySelector('#confSenha').classList.remove('inputValido')
    }else{
     document.querySelector('#confSenha').classList.add('inputValido')
     setRegValidacoes({...regValidacoes, vConfSenha:true})
   }


   if (regSenha.length >= 8){
    document.querySelector('#erro3').style.display='none'
}else{
    document.querySelector('#erro3').style.display='block'
}

var charNumerico = /([0-9])/g
    if (regSenha.match(charNumerico)){
        document.querySelector('#erro1').style.display='none'
    }else{
        document.querySelector('#erro1').style.display='block'
    }

var charEspecial = /(?=.*[!@#$%^&*])/
    if (regSenha.match(charEspecial)){
        document.querySelector('#erro2').style.display='none'
    }else{
        document.querySelector('#erro2').style.display='block'
    }

  },[regUser.cadSenha])


  return (
    <div className='logContainer'>
      <form id='formLogin' >
        <Input labText='Nome de usuário' labClass='labelNome' id='inpNome' inpTipo='text' onChange={({target})=>handleChange(target, setNome)} value={nome} />
        <Input labText='Senha' labClass='labelSenha' id='inpSenha' inpTipo='password'  onChange={({target})=>handleChange(target, setSenha)} value={senha}  />
        <Button btnId='formBtn' btnText='Logar' btnClass='btnForm' onClick={(event)=>{logar(event)}}  />
        <span>esqueceu a senha? clique <strong>aqui</strong></span>
        <span>não possui conta? <strong onClick={alternarForm}>registre</strong></span>
        <span className='deltree' onClick={()=>{!deltree?setDeltree(true):window.localStorage.clear()}} >{!deltree? 'excluir os dados salvos?' : 'Tem certeza?'}</span>
        <span className='erroLogin'>{erroLogin}</span>

      </form>

      <form id='formRegistro' className='mudarForm'>
        <Input labText='Nome de usuário' id='regNome' inpTipo='text' onChange={({target})=>handleChange(target, setRegNome)} value={regNome} onBlur={()=>valRegNome(validarRegNome(regUser.cadNome, listaUser))} />
        <Input labText='Email' id='regEmail' inpTipo='text' onChange={({target})=>handleChange(target, setRegEmail)} value={regEmail} onBlur={()=>valRegEmail(validarRegEmail(regUser.cadEmail, listaUser))} />
        <Input labText='Senha' id='regSenha' inpTipo='password' onChange={({target})=>handleChange(target, setRegSenha)} value={regSenha} onBlur={()=>valSenha(validarRegSenha(regUser.cadSenha))} onFocus={()=>document.querySelector('.errosInputsLogin').style.display='block'} />
        <Input labText='Confirmar a senha' id='confSenha' inpTipo='password' onChange={({target})=>handleChange(target, setConfSenha)} value={confSenha} onBlur={()=>valConfSenha(validarConfSenha(regUser.cadSenha, regUser.cadConfSenha))} />
        <Button btnId='formRegBtn' btnText='Cadastrar' btnClass='btnForm' onClick={submit} />
        <span>já possui conta? <strong onClick={alternarForm}>login</strong></span>

        <div className='errosInputsLogin'>

          <p id='erro1'>senha precisa pelo menos um número</p>
          <p id='erro2'>senha precisa pelo menos um char especial</p>
          <p id='erro3'>senha precisa pelo menos oito chars</p>
          <p id='erro4'>senhas não conferem</p>
          <p id='erro5'>email já cadastrado</p>
          <p id='erro6'>nome de usuário já cadastrado</p>

        </div>

        {/* <p>Nome: {regNome}</p>
        <p>Email: {regEmail}</p>
        <p>Senha: {regSenha}</p>
        <p>confSenha: {confSenha}</p> */}
        {/* <span>{regUser.cadSenha}</span> */}
        

      </form>



      {/* MATRIX  */}

      {/* <div className='enterTheMatrix'>
        <span className='morpheus'>Wake up, Neo. . .</span>
        <span className='morpheus'>The Matrix has you. . .</span>
        <span className='morpheus'>Follow the white rabbit.</span>
        <span className='morpheus'>Knock, knock, Neo.</span>
      </div> */}

    </div>
  )
}

export default Log
