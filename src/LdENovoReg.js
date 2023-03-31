import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'

import {adicionarRegistro, refreshBd, updateBd} from './crudFireBase'


const LdENovoReg = () => {

  const context = React.useContext(GlobalContext)
  const navigate = useNavigate()
  const [num, setNum] = React.useState('')
  const [pav, setPav] = React.useState('')
  const [dur, setDur] = React.useState('')
  const [anotacao, setAnotacao] = React.useState('')

  // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    // ENCONTRAR PROXIMO ID
     function novoId(){ if (context.userLogado.lde && context.userLogado.lde.length > 0){
        const numeros = Object.keys(context.userLogado.lde).map((item)=>{
          return context.userLogado.lde[item].id
        })
        return (Math.max(...numeros)+1)
      }else{
        return 1
      }
    }
    
    // ADICIONAR LDE NO USUARIO LOGADO
    async function handleSubmit(id){

      if (num === '' && pav === '' && dur === '' && anotacao === ''){
        return
      }

      const ldeNovo = {id:novoId(), num:num, local:pav, dur:dur, avaria:anotacao}
      await adicionarRegistro(id, ldeNovo, 'lde')
      await context.setUserLogado({...context.userLogado, lde:[ldeNovo, ...context.userLogado.lde]})

      const update = await refreshBd(context.userLogado.nome)
      await context.setUserLogado(...update)
      navigate('/home/lde')

    }

    console.log(context.userLogado)
  
    function validarNumeros(elem){
      const validacao = /[0-9]/
      if (elem.value.match(validacao)){
        elem.classList.remove('naoValidado')

      }else{
        elem.classList.add('naoValidado')
      }
    }
    
  return (
    <>

<div className='ldeContent'>

<fieldset className='fieldsetFlexRow'>

    <legend>Luz de Emergência</legend>

    <div>
        <p className='cardTextoPqn'>número</p>
        <Input inpClass='newLde' id='editarLdENum' inpTipo='text' placeholder='00' onChange={({target})=>setNum(target.value)} value={num} onBlur={({currentTarget})=>{validarNumeros(currentTarget)}} />
    </div>

    <div>
        <p className='cardTextoPqn'>local</p>
        <Select className='novoHdSelect' selectValorInicial={pav} selectOnChange={({target})=>setPav(target.value)} optionDisabledValue='' options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']} />
    </div>

    <div>
        <p className='cardTextoPqn'>autonomia</p>
        <Select className='novoHdSelect autonomia' selectValorInicial={dur} selectOnChange={({target})=>setDur(target.value)} optionDisabledValue='' options={['1h', '2h', '3h', '4h', '5h', '6h']} />
    </div>

</fieldset>

<fieldset className='fieldsetFlexRow'>
  <legend>Avarias</legend>
  <textarea onChange={({target})=>setAnotacao(target.value)} value={anotacao} />  

</fieldset>

<fieldset className='fieldsetAcoes fieldsetFlexRow'>
    <div className='btnAcoesWrapper' onClick={()=>navigate('/home/lde')}>
      <i className="fa-solid fa-angles-left"></i>
      <p>cancelar</p>
    </div>
    <div className='btnAcoesWrapper' onClick={()=>handleSubmit(context.userLogado.id)}>
      <i className="fa-solid fa-floppy-disk"></i>
      <p>salvar</p>
    </div>

</fieldset>

</div>

    </>
  )
}

export default LdENovoReg
