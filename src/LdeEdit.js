import React, { useContext } from 'react'
import Input from './Input'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { GlobalContext } from './GlobalContext';
import css from './css/lde.css'
import Select from './Select';
import AcoesCriandoItem from './AcoesCriandoItem';
import { updateBd } from './crudFireBase';

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
        const ldeEditado = Object.keys(context.userLogado.lde).map((item, ind)=>{
            if (ind !== Number(index)){
                return context.userLogado.lde[item]
            }else{
                return itemEditado
            }
        })

        updateBd(context.userLogado.id, {lde:ldeEditado})

        context.setUserLogado({...context.userLogado, lde:ldeEditado})
        navigate('/lde')
    }
    
  return <div className='extCard'>

  <fieldset className='fieldsetFlexRow'>

      <legend>Luz de Emergência</legend>

      <div>
          <p className='cardTextoPqn'>número</p>
          <Input id='editarLdENum' maxLength='5' inpTipo='tel' onChange={({target})=>setNum(target.value)} value={num} />
      </div>

      <div>
          <p className='cardTextoPqn'>local</p>
          <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)}  options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']} />
      </div>

      <div>
          <p className='cardTextoPqn'>autonomia</p>
                  <Select selectValorInicial={dur} selectOnChange={({target})=>setDur(target.value)} optionDisabledValue='Autonomia' options={['1h', '2h', '3h', '4h', '5h', '6h']} />

      </div>

  </fieldset>

  <fieldset className='fieldsetAcoes fieldsetFlexRow'>
      <div className='btnAcoesWrapper'>
          <i className="fa-solid fa-pen-to-square" onClick={()=>navigate('/lde')}></i>
          <p>editar</p>
      </div>
      <div className='btnAcoesWrapper'>
          <i className="fa-solid fa-trash-can shadow" onClick={()=>salvarEdicao()}></i>
          <p>excluir</p>
      </div>

  </fieldset>

</div>
  






//   (
//     <div>
//       <div className='editarLdE' >
//         <Input id='editarLdENum' labText='Número da LdE' inpTipo='tel' onChange={({target})=>setNum(target.value)} value={num} />

//         <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)}  options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']} />

//         <label >Anotações</label>
//         <textarea onChange={({target})=>setAvaria(target.value)} value={avaria} />  
        
//         <AcoesCriandoItem voltar='/lde' salvar={salvarEdicao} />
//     </div>
//     </div>




//   )
}

export default LdeEdit
