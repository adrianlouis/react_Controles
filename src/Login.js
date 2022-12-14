import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './css/login.css'
import { GlobalContext } from './GlobalContext'

const Login = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const [form, setForm] = React.useState(false)
    const [loginInput, setLoginInput] = React.useState({nome:'', senha:''})
    const [loginMsg, setLoginMsg] = React.useState('')
    const [regInput, setRegInput] = React.useState({nome:'', email:'', senha:'', confSenha:''})
    const [regMsg, setRegMsg] = React.useState({nome:false, email:false, senha:false, confSenha:false})
    const [pwVisible, setPwVisible] = React.useState(false)
    const [toggleSenhaErro, setToggleSenhaErro] = React.useState({senha:false, confSenha:false})
    const [ toggleConfSenhaTexto ,setToggleConfSenhaTexto] = React.useState(false)
    const {usuarios} = ctx

    const [regOk, setRegOk] = React.useState({nome:false, email:false, senha:false, confSenha:false})
    const [regexRegSenha, setRegexRegSenha] = React.useState({num:false, esp:false, tamanho:false})
    const [logPWVisible, setLogPWVisible] = React.useState(false)

    function handleInputBlur(el, n){
        aplicarCss(el)
        //NOME
        if (n === 1){
            const userExist = usuarios.filter((filtro)=>{
                return filtro.nome === regInput.nome
            })

            if (userExist.length === 0 && regInput.nome !== ''){
                setRegOk({...regOk, nome:true})
                setRegMsg({...regMsg, nome:false})
            }else{
                setRegOk({...regOk, nome:false})
                setRegMsg({...regMsg, nome:true})
            }
        }

        //EMAIL
        if (n === 2){
            const emailExist = usuarios.filter((filtro)=>{
                return filtro.email === regInput.email
            })

            if (emailExist.length === 0 && regInput.email !== ''){
                setRegOk({...regOk, email:true})
                setRegMsg({...regMsg, email:false})
            }else{
                setRegOk({...regOk, email:false})
                setRegMsg({...regMsg, email:true})
            }
        }
    }

    React.useEffect(()=>{
        setLoginInput({nome:'', senha:''})
        setRegInput({nome:'', email:'', senha:'', confSenha:''})
        setRegMsg({nome:false, email:false, senha:false})
        setRegOk({nome:false, email:false, senha:false, confSenha:false})
    },[form])

    // VALIDAR SENHA COM REGEX
    React.useEffect(()=>{
        if (regInput.senha !== ''){

            const regexNum = /([0-9])/g 
            const regexEsp = /(?=.*[!@#$%^&*])/
            
            if (regInput.senha.match(regexNum)){
                setRegexRegSenha((prev)=>({...prev, num:true}))
            }else{
                setRegexRegSenha((prev)=>({...prev, num:false}))
            }

            if (regInput.senha.match(regexEsp)){
                setRegexRegSenha((prev)=>({...prev, esp:true}))
            }else{
                setRegexRegSenha((prev)=>({...prev, esp:false}))
            }
            
            if (regInput.senha.length > 7){
                setRegexRegSenha((prev)=>({...prev, tamanho:true}))
            }else{
                setRegexRegSenha((prev)=>({...prev, tamanho:false}))
            }

           
        }
        
    },[regInput.senha])

    React.useEffect(()=>{
        if(regexRegSenha.num && regexRegSenha.esp && regexRegSenha.tamanho){
            setRegOk({...regOk, senha:true})
        }else{
            setRegOk({...regOk, senha:false})
        }
    },[regexRegSenha])

    function handleLogin(e){
        e.preventDefault()
        const ftr = usuarios.filter((filtro)=>{
            return filtro.nome === loginInput.nome
        })

        if(ftr.length === 1 && ftr[0].senha === loginInput.senha ){
            ctx.setUserLogado(...ftr)
            navigate('/home')
        }
        if(ftr.length === 1 && ftr[0].senha !== loginInput.senha){
            setLoginMsg('Senha errada')
        }
        if(ftr.length === 0){
            setLoginMsg('Usu??rio n??o encontrado')
        }
        
        
        // else{
        //     setLoginMsg('Usu??rio n??o encontrado')
        // }
    }

    function handleRegistrar(){
       
        if (regOk.nome && regOk.email && regOk.senha && regOk.confSenha){
            ctx.setUsuarios([...ctx.usuarios, {nome:regInput.nome, email:regInput.email, senha:regInput.senha, aco:[], ext:[], gar:[], gas:[], hd:[], lde:[], loj:[], pcf:[], pre:[], sal:[] }])
        }
    }

    function handleBlurSenha(el, n){
        aplicarCss(el)

        if (n===1){
            if (!regexRegSenha.num && regInput.senha != '' || !regexRegSenha.esp && regInput.senha != '' || !regexRegSenha.tamanho && regInput.senha != ''){
                setToggleSenhaErro({...toggleSenhaErro, senha:true})
            }else{
                setToggleSenhaErro({...toggleSenhaErro, senha:false})
            }
        }

        if(n===2){
            setToggleConfSenhaTexto(true)

            if (regInput.senha === regInput.confSenha){
                setRegOk({...regOk, confSenha:true})
            }else{
                setToggleConfSenhaTexto(true)
            }
        }
    }

React.useEffect(()=>{
    if (toggleConfSenhaTexto){
        if (regInput.senha === regInput.confSenha){
            setRegOk({...regOk, confSenha:true})
        }else{
            setRegOk({...regOk, confSenha:false})
        }
    }
},[regInput.confSenha, regInput.senha])

React.useEffect(()=>{
    const timer = setTimeout(() => {
        setLoginMsg('')
    }, 5000);

    return ()=> clearTimeout(timer)
},[loginMsg])

function aplicarCss(el){
    const elem = el.parentElement.classList
    elem.toggle('neoMorphLoginInput')
}

  return (
    <>

        {!form && <div className='loginContainer'>
            <h1>Controle de Dados</h1>
            <span>Este site foi desenvolvido para a pr??tica do framework ReactJs e tem como finalidade a cria????o, edi????o e consulta de dados, como acesso e controle da carros de uma garagem, planilha de extintores, dados sobre visitantes e etc.
            Para a utiliza????o do sistema, cadastre-se ou entre com a sua conta.</span>
            <div>

            <button className='loginBtns' onClick={()=>setForm(1)} >Logar</button>
            <button className='loginBtns' onClick={()=>setForm(2)} >Registrar</button>
            </div>
        </div>}

        {form === 1 && <div className='loginContainer'>
            <form>
            <h1>Login</h1>
                <div className='regInputWrapper'>
                    <i className="fa-solid fa-user"></i>
                    <input className='regInput' type='text' placeholder='nome de usu??rio' value={loginInput.nome} onChange={({target})=>setLoginInput({...loginInput, nome:target.value})} onFocus={({currentTarget})=>aplicarCss(currentTarget)} onBlur={({currentTarget})=>aplicarCss(currentTarget)} required />
                </div>

                <div className='regInputWrapper'>
                    <i className='fa-solid fa-key'></i>
                    <input className='regInput' type={logPWVisible?'text':'password'} placeholder='senha' value={loginInput.senha} onChange={({target})=>setLoginInput({...loginInput, senha:target.value})} onFocus={({currentTarget})=>aplicarCss(currentTarget)} onBlur={({currentTarget})=>aplicarCss(currentTarget)} required />
                    {!logPWVisible && <i className="fa-solid fa-eye-slash" onClick={()=>setLogPWVisible(!logPWVisible)}></i>}
                    {logPWVisible && <i className="fa-solid fa-eye" onClick={()=>{setLogPWVisible(!logPWVisible)}}></i>}

                </div>

                <div className='formLinks'>
                    <span>esqueceu a senha?</span>
                    <span onClick={()=>setForm(2)} >registrar</span>
                </div>

                <button className={loginInput.nome !== '' && loginInput.senha !== '' ? 'loginBtns' : 'loginBtns btnInvalido'} onClick={(e)=>handleLogin(e)} >Entrar</button>



                <span className='regInvalido'>{loginMsg}</span>
            </form>
        </div> }

        {form === 2 && <div className='loginContainer'>
            
            <form>
            <h1>Registrar</h1>
                <div className='regInputWrapper'>
                    <i className={regOk.nome?"fa-solid fa-user ":"fa-solid fa-user regInvalido"}></i>
                    <input className={regOk.nome?'regInput ':'regInput regInvalido'} type='text' placeholder='usu??rio' value={regInput.nome} onChange={({target})=>setRegInput({...regInput, nome:target.value})} onBlur={({currentTarget})=>handleInputBlur(currentTarget, 1)} onFocus={({currentTarget})=>aplicarCss(currentTarget)} required/>
                </div>

                <div className='regInputWrapper'>
                    <i className={regOk.email?"fa-solid fa-envelope ":"fa-solid fa-envelope regInvalido"}></i>
                    <input className={regOk.email?'regInput ':'regInput regInvalido'} type='email' placeholder='usuario@email.com' value={regInput.email} onChange={({target})=>setRegInput({...regInput, email:target.value})} onBlur={({currentTarget})=>handleInputBlur(currentTarget, 2)} onFocus={({currentTarget})=>aplicarCss(currentTarget)} required />
                </div>

{/* //SENHA */}
                <div className='regInputWrapper'>
                    <i className={regOk.senha?"fa-solid fa-key ":"fa-solid fa-key regInvalido"}></i>
                    <input className={regOk.senha?'regInput  ':'regInput regInvalido'} type={!pwVisible?'password':'text'} placeholder='abc1@def' value={regInput.senha} onChange={({target})=>setRegInput({...regInput, senha:target.value})} onBlur={({currentTarget})=>handleBlurSenha(currentTarget, 1)} onFocus={({currentTarget})=>aplicarCss(currentTarget)} required />
                    {!pwVisible && <i className="fa-solid fa-eye-slash" onClick={()=>setPwVisible(!pwVisible)}></i>}
                    {pwVisible && <i className="fa-solid fa-eye" onClick={()=>{setPwVisible(!pwVisible)}}></i>}
                </div>
                
{/* //CONFSENHA */}
                <div className='regInputWrapper'>
                    <i className={regOk.senha && regOk.confSenha?'fa-solid fa-key ':'fa-solid fa-key regInvalido'}></i>
                    <input disabled={regOk.senha?false:true} style={regOk.senha? {}: {cursor:'not-allowed'}} className={regOk.confSenha?'regInput ':'regInput regInvalido'} type={!pwVisible?'password':'text'} placeholder='abc1@def' value={regInput.confSenha} onChange={({target})=>setRegInput({...regInput, confSenha:target.value})} onBlur={({currentTarget})=>handleBlurSenha(currentTarget, 2)} onFocus={({currentTarget})=>aplicarCss(currentTarget)} required />
                    {!pwVisible && <i className="fa-solid fa-eye-slash" onClick={()=>setPwVisible(!pwVisible)}></i>}
                    {pwVisible && <i className="fa-solid fa-eye" onClick={()=>{setPwVisible(!pwVisible)}}></i>}
                </div>

                <div className='formLinks'>
                    <span>j?? ?? registrado?</span>
                    <span onClick={()=>setForm(1)} >login</span>
                </div>

                <span className='regInvalido'>{regMsg.nome && regInput.nome !== '' ? 'Nome j?? cadastrado. ':''}</span>
                <span className='regInvalido'>{regMsg.email && regInput.email !== '' ? 'Email j?? cadastrado. ':''}</span>

                {!regOk.senha && regInput.senha !== '' && <><span className='regInvalido'>{regexRegSenha.num ? '':'Senha precisa de n??mero'}</span>
                <span className='regInvalido'>{regInput.senha && regexRegSenha.esp?'':'Senha precisa de d??gito especial'}</span>
                <span className='regInvalido'>{regInput.senha && regexRegSenha.tamanho?'':'Senha precisa ao menos 8 d??gitos'}</span></>}

                {toggleConfSenhaTexto && !regOk.confSenha && <span className='regInvalido'>Senhas n??o conferem</span>}
                
                <button className={regOk.nome && regOk.email && regOk.senha && regOk.confSenha ? 'loginBtns' : 'loginBtns btnInvalido'} onClick={()=>handleRegistrar()} >Registrar</button>

            </form>

        </div>}


    </>
  )
}

export default Login
