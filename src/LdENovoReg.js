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
  const tamanho = context.userLogado.lde.length
  const ldeNovo = {id:(tamanho === 0 ? 1 : context.userLogado.lde[tamanho-1].id+1), num:num, local:pav, dur:dur, avaria:anotacao}

    // ADICIONAR LDE NO USUARIO LOGADO
    function handleSubmit(){
      if (num === '' && pav === '' && dur === '' && anotacao === ''){
        return
      }

      context.setUserLogado(prev => ({...prev, lde:[ ...prev.lde, ldeNovo ]}))
      context.setUploadLde(true)
      navigate('/lde')
    }

    // console.log(num, pav, dur, anotacao)
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
      <div className='editarLdE' >
        <Input inpClass='newLde' id='editarLdENum' labText='Número da LdE' inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} onBlur={({currentTarget})=>{validarNumeros(currentTarget)}} />
        {/* <Input inpClass='newLde' id='editarLdEPav' labText='Local' inpTipo='text' autoComplete='on' onChange={({target})=>setPav(target.value)} value={pav} /> */}
        {/* <Input inpClass='newLde' id='editarLdEDur' labText='Autonomia' inpTipo='text' onChange={({target})=>setDur(target.value)} value={dur} /> */}

        <label>Local: {'  '}
        <select onChange={({target})=>setPav(target.value)}>
          <option value='Subsolo'>Subsolo</option>
          <option value='Térreo'>Térreo</option>
          <option value='2º Pav A'>2º Pavimento A</option>
          <option value='2º Pav B'>2º Pavimento B</option>
          <option value='3º Pav A'>3º Pavimento A</option>
          <option value='3º Pav B'>3º Pavimento B</option>
          <option value='4º Pav A'>4º Pavimento A</option>
          <option value='4º Pav B'>4º Pavimento B</option>
        </select>
        </label>

        <label>Autonomia: {'  '}
        <select onChange={({target})=>setDur(target.value)}>
          <option value='1h'>1h</option>
          <option value='2h'>2h</option>
          <option value='3h'>3h</option>
          <option value='4h'>4h</option>
          <option value='5h'>5h</option>
          <option value='6h'>6h</option>
        </select>
        </label>

        <label >Anotações</label>
        <textarea onChange={({target})=>setAnotacao(target.value)} value={anotacao} />  
        
        <div className='cardAcoes'>
            <span className={(num === '' && pav === '' && dur === '' && anotacao === '') ? 'notReady' : 'ldeSubFooterBtn'} onClick={handleSubmit} >Salvar</span>
            <Link className='ldeSubFooterBtn' to='/lde' >Cancelar</Link>
                
        </div>
    </div>
    </>
  )
}

export default LdENovoReg
