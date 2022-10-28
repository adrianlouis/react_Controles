import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'

const LdENovoReg = () => {

  const context = React.useContext(GlobalContext)
  const navigate = useNavigate()
  const [num, setNum] = React.useState('')
  const [pav, setPav] = React.useState('')
  const [dur, setDur] = React.useState('')
  const [anotacao, setAnotacao] = React.useState('')
  const [merge, setMerge] = React.useState(false)
  const ldeNovo = {id:context.userLogado.lde.length+1 ,num:num, local:pav, dur:dur, avaria:anotacao}

    // ADICIONAR LDE NO USUARIO LOGADO
    function handleSubmit(){
      context.setUserLogado(prev => ({...prev, lde:[ ...prev.lde, ldeNovo ]}))
      setMerge(true)
      navigate('/lde')
    }

    // ADICIONAR USUARIO LOGADO NA LISTA DE USUARIOS
    React.useEffect(()=>{

      if (merge){
        const item = context.usuarios.filter((filtro)=>{
          return context.userLogado.nome !== filtro.nome
        })
        
        context.setUsuarios(([ ...item, context.userLogado]))
        context.setUpload(true)
      }
      
    },[context.userLogado])

  return (
    <>
      <div className='editarLdE' >
        <Input id='editarLdENum' labText='Número da LdE' inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} />
        <Input id='editarLdEPav' labText='Pavimento' inpTipo='text' autoComplete='on' onChange={({target})=>setPav(target.value)} value={pav} />
        <Input id='editarLdEDur' labText='Duração' inpTipo='text' onChange={({target})=>setDur(target.value)} value={dur} />
        <label >Anotações</label>
        <textarea onChange={({target})=>setAnotacao(target.value)} value={anotacao} />  
        
        <div className='cardAcoes'>
            <span className='notReady' onClick={handleSubmit} >Salvar</span>
            <Link className='ldeSubFooterBtn' to='/lde' >Cancelar</Link>
                
        </div>
    </div>
    </>
  )
}

export default LdENovoReg
