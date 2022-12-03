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

    const user = {nome:nome, senha: senha}

    const [listaUser, setListaUser] = React.useState([])
    const [erroLogin, setErroLogin] = React.useState(null)
    const [formAtivo, setFormAtivo] = React.useState(false)

    const [regNome, setRegNome] = React.useState('')
    const [regEmail, setRegEmail] = React.useState('')
    const [regSenha, setRegSenha] = React.useState('')
    const [confSenha, setConfSenha] = React.useState('')
    const regUser = { cadNome:regNome, cadEmail:regEmail, cadSenha:regSenha, cadConfSenha:confSenha}

    const [errosCriacaoDeSenha, setErrosCriacaoDeSenha] = React.useState(['símbolo', 'número', '8 dígitos'])
    const [regValidacoes, setRegValidacoes] = React.useState({vNome: false, vEmail:false, vSenha:false, vConfSenha:false})

    const navigate = useNavigate();
    const newUser = {nome: regNome, email:regEmail, senha:regSenha, lde:[], hd:[], ext:[], gas:[], pcf:[], gar:[], pre:[], sal:[], loj:[], aco:[]}
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
        console.log(context.userLogado)

          context.setUserLogado(...item)

        setErroLogin(`Bem-vindo, ${item[0].nome}!`)


        setTimeout(() => {
          navigate('/home')
        }, 500);
      }
    }

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
      setRegNome('')
      setRegEmail('')
      setRegSenha('')
      setConfSenha('')
      setNome('')
      setSenha('')
      setRegValidacoes({vNome: false, vEmail:false, vSenha:false, vConfSenha:false})
      setTimeout(() => {
        document.querySelector('#formRegistro').classList.remove('mudarForm')
      }, 350);
      
    }else{
      document.querySelector('#formRegistro').classList.add('mudarForm')
      setRegNome('')
      setRegEmail('')
      setRegSenha('')
      setConfSenha('')
      setNome('')
      setSenha('')
      setRegValidacoes({vNome: false, vEmail:false, vSenha:false, vConfSenha:false})
      setTimeout(() => {
        
        document.querySelector('#formLogin').classList.remove('mudarForm')
      }, 350);

    }
  }
  
  // VALIDAR REGISTRO DE NOME
  function validarinputNomeRegistrar(){
    if(context.usuarios.length > 0){
      context.usuarios.map((item)=>{
        if (item.nome === regNome){
          setRegValidacoes({...regValidacoes, vNome:false })
          document.querySelector('#regNome').classList.add('erroLogin')
          document.querySelector('#repNome').style.display='block'
          document.querySelector('#regNome').classList.add('animarErro')
                setTimeout(() => {
                  document.querySelector('#regNome').classList.remove('animarErro')
                }, 300);
        }else{
          setRegValidacoes({...regValidacoes, vNome:true })
          document.querySelector('#regNome').classList.remove('erroLogin')
          document.querySelector('#repNome').style.display='none'
        }
      })
    }else{
      setRegValidacoes({...regValidacoes, vNome:true })
    }
  }

  // VALIDAR REGISTRO DE EMAIL
  function validarInputEmailRegistrar(){
    if(regEmail !== '' && context.usuarios.length > 0){

      context.usuarios.map((item)=>{
        if (item.email === regEmail){
          setRegValidacoes({...regValidacoes, vEmail:false})
          document.querySelector('#regEmail').classList.add('erroLogin')
          document.querySelector('#repEmail').style.display='block'
          document.querySelector('#regEmail').classList.add('animarErro')
                setTimeout(() => {
                  document.querySelector('#regEmail').classList.remove('animarErro')
                }, 300);
        }else{
          setRegValidacoes({...regValidacoes, vEmail:true})
          document.querySelector('#regEmail').classList.remove('erroLogin')
          document.querySelector('#repEmail').style.display='none'
        }
      })
    }else{
      setRegValidacoes({...regValidacoes, vEmail:true})
      // return
    }
  }

  // VALIDAR REGISTRO DE SENHA
  function validarSenhaRegistrar(){
    const charNumerico = /([0-9])/g
    const charEspecial = /(?=.*[!@#$%^&*])/ 
    const containerDeErro = document.querySelector('.containerErrosCadastro')
    
    if (regSenha.length >= 8 && regSenha.match(charNumerico) && regSenha.match(charEspecial)){
      document.querySelector('#regSenha').classList.remove('erroLogin')
      setRegValidacoes(prev=>({...prev, vSenha:true}))
      containerDeErro.style.display='none'
      document.querySelector('#tipErros').style.display='none'
      
    }else{
      document.querySelector('#tipErros').style.display='block'
      document.querySelector('#regSenha').classList.add('erroLogin')
      setRegValidacoes(prev=>({...prev, vSenha:false}))
      containerDeErro.style.display='block'
      document.querySelector('#regSenha').classList.add('animarErro')

                setTimeout(() => {
                  document.querySelector('#regSenha').classList.remove('animarErro')
                }, 300);
    }
  }

  // VALIDAR CONFIRMAÇÃO DE SENHA PARA REGISTRO
  function conferirSenhaRegistrar(){
    const msgErro = document.querySelector('#erroSenhaDiferentes')
    const inputConfirmarSenha = document.querySelector('#confSenha')

    if (regSenha === confSenha){
      msgErro.style.display='none'
      inputConfirmarSenha.classList.remove('erroLogin')
      setRegValidacoes(prev=>({...prev, vConfSenha:true}))
      document.querySelector('#formRegBtn').classList.remove('registrarNegado')
    }else{
      if(inputConfirmarSenha.value!==''){
        msgErro.style.display='block'
      }
      inputConfirmarSenha.classList.add('erroLogin')
      setRegValidacoes(prev=>({...prev, vConfSenha:false}))
      document.querySelector('#formRegBtn').classList.add('registrarNegado')
      
    }
  }

  React.useEffect(()=>{
    if (confSenha !== ''){
      conferirSenhaRegistrar()
    }
  },[regSenha, confSenha])
  

  function senhaVisivel(elem){
    if(elem.previousElementSibling.getAttribute('type') !== 'text'){
      elem.previousElementSibling.setAttribute('type', 'text')
      document.querySelector('.visivelOuNao').innerText='o.o'
      
    }else{
      elem.previousElementSibling.setAttribute('type', 'password')
      document.querySelector('.visivelOuNao').innerText='-.-'

    }
  }

  // HABILITAR BOTAO CADASTRAR (Submit no registro)
  React.useEffect(()=>{
    if (regValidacoes.vNome && regValidacoes.vEmail && regValidacoes.vSenha && regValidacoes.vConfSenha){
      document.querySelector('#formRegBtn').classList.remove('registrarNegado')
    }else{
      document.querySelector('#formRegBtn').classList.add('registrarNegado')
    }
  },[regValidacoes])

  return (
    <>

      <div className='logContainer'>
        <form id='formLogin' >
          <Input labText='Nome de usuário' labClass='labelNome' id='inpNome' inpTipo='text' onChange={({target})=>setNome(target.value)} value={nome} />
          {' '}
          <Input labText='Senha' labClass='labelSenha' id='inpSenha' inpTipo='password'  onChange={({target})=>setSenha(target.value)} value={senha}  />
          <Button btnId='formBtn' btnText='Logar' btnClass='btnForm' onClick={(event)=>{logar(event)}}  />
          {erroLogin && <span className='msgErroLogin'>{erroLogin}</span>}
          <span>esqueceu a senha? clique <strong>aqui</strong></span>
          <span>não possui conta? <strong onClick={alternarForm}>registre</strong></span>
          <span className='deltree' onClick={()=>{!deltree?setDeltree(true):window.localStorage.clear()}} >{!deltree? 'excluir os dados salvos?' : 'Tem certeza?'}</span>

        </form>

        <form id='formRegistro' className='mudarForm'>
          <div className='divRegInputs'>
            <Input placeholder='MeuNome' labText='Nome de usuário' id='regNome' inpTipo='text' onChange={({target})=>setRegNome(target.value)} value={regNome} onBlur={validarinputNomeRegistrar}  />
            <p id='repNome'>nome de usuário já cadastrado</p>
          </div>

          <div className='divRegInputs'>
            <Input placeholder='seunome@email.com' labText='Email' id='regEmail' inpTipo='text' onChange={({target})=>setRegEmail(target.value)} value={regEmail} onBlur={validarInputEmailRegistrar} />
            <p id='repEmail'>email já cadastrado</p>
          </div>

          <div className='divRegInputs'>
            <Input labText='Senha' id='regSenha' inpTipo='password' onChange={({target})=>setRegSenha(target.value)} value={regSenha} onBlur={validarSenhaRegistrar}  />


            {/* {regSenha && <span className='visivelOuNao' onClick={({currentTarget})=>{senhaVisivel(currentTarget)}} >o.o</span>} */}
            
            <div className='containerErrosCadastro'>
              {/* <p>precisa ter <span id='erroSenhaNumero'>número</span> <span id='erroSenhaCharEspecial'>símbolo</span> <span id='erroSenhaTamanho'>8 dígitos</span>  </p>  */}
              <span id='tipErros'>precisar ter número, símbolo e 8 dígitos</span>
             
              
            </div>

          </div>

          <div id='confirmarSenha' className='divRegInputs'>
            <Input labText='Confirmar a senha' id='confSenha' inpTipo='password' onChange={({target})=>setConfSenha(target.value)} value={confSenha} onBlur={conferirSenhaRegistrar} />
              <p id='erroSenhaDiferentes'>suas senhas não conferem</p>
          </div>


          <span className='spanLinkRegParaLogin'>já possui conta? <strong onClick={alternarForm}>login</strong></span>
            <Button btnId='formRegBtn' btnText='Cadastrar' btnClass='btnForm ' onClick={submit} />



        </form>
      </div>
    </>
  )
}

export default Log
