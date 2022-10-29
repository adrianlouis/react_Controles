import React, { useContext } from 'react'
import Input from './Input'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { GlobalContext } from './GlobalContext';

const LdeEdit = () => {

    const location = useLocation()
    const context = useContext(GlobalContext)
    const [id, setId] = React.useState() 
    const [num, setNum] = React.useState() 
    const [local, setLocal] = React.useState()
    const [dur, setDur] = React.useState()
    const [avaria, setAvaria] = React.useState()
    const itemEditado = {id:id, num:num, local:local, avaria:avaria, dur:dur}
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search)
    const index = search.get('ind')
    
    React.useEffect(()=>{
        const item = context.userLogado.lde.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })
        setId(item[0].id)
        setNum(item[0].num)
        setLocal(item[0].local)
        setDur(item[0].dur)
        setAvaria(item[0].avaria)
    },[])
    
    function salvarEdicao(){
        const teste = Object.keys(context.userLogado.lde).map((item, ind)=>{
            if (ind !== Number(index)){
                return context.userLogado.lde[item]
            }else{
                return itemEditado
            }
        })
        context.setUserLogado({...context.userLogado, lde:teste})
        navigate('/lde')
    }
    
  return (
    <div>
      <div className='editarLdE' >
        <Input id='editarLdENum' labText='Número da LdE' inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} />
        <Input id='editarLdEPav' labText='Local' inpTipo='text' autoComplete='on' onChange={({target})=>setLocal(target.value)} value={local} />
        <Input id='editarLdEDur' labText='Autonomia' inpTipo='text' onChange={({target})=>setDur(target.value)} value={dur} />
        <label >Anotações</label>
        <textarea onChange={({target})=>setAvaria(target.value)} value={avaria} />  
        <div className='cardAcoes'>
            <span className='ldeSubFooterBtn' onClick={salvarEdicao} >Salvar</span>
            <Link className='ldeSubFooterBtn' to='/lde' >Cancelar</Link>
        </div>
    </div>
    </div>
  )
}

export default LdeEdit
