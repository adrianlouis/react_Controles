import React, { useContext } from 'react'
import Input from './Input'
import { useNavigate, useLocation } from 'react-router-dom'
import { GlobalContext } from './GlobalContext';
// import css from './css/lde.css'
import styles from './ExtNovo.module.css'
import Select from './Select';
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
    
    function salvarEdicao(ind){
        const ldeEditado = Object.keys(context.userLogado.lde).map((item, ind)=>{
            if (ind !== Number(index)){
                return context.userLogado.lde[item]
            }else{
                return itemEditado
            }
        })

        updateBd(context.userLogado.id, {lde:ldeEditado})
        context.setUserLogado({...context.userLogado, lde:ldeEditado})
        navigate('/home/lde')
    }

    function handleFocus(el){
        el.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }
  
        function handleBlur(el){
          el.parentNode.style.border='2px solid #3337'
      }

  return <div className={styles.novoExtContainer}>
  <h2><i className="fa-solid fa-file-pen"/> Nova Luz de Emergência</h2>


  <fieldset className={styles.fieldset}>
    <i className="fa-solid fa-hashtag" />
    <input  onFocus={({currentTarget})=>handleFocus(currentTarget)} type='tel' maxLength={2} onChange={({currentTarget})=>setNum(currentTarget.value)} placeholder='00' value={num} className={styles.inputNovoExt} onBlur={({currentTarget})=>{handleBlur(currentTarget)}} />

  </fieldset>

  <fieldset className={styles.fieldset}>

    <i className="fa-solid fa-location-dot"/>
    <Select onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} value={local} selClass={styles.select} optClass={styles.option} selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='Local' options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']} />
  </fieldset>

  <fieldset className={styles.fieldset}>
  <i className="fa-solid fa-battery-three-quarters"/>
  <Select onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} value={dur} selClass={styles.select} optClass={styles.option} selectValorInicial={dur} selectOnChange={({target})=>setDur(target.value)} optionDisabledValue='Autonomia' options={['1h', '2h', '3h', '4h', '5h', '6h']} />
  </fieldset>

  <div className={styles.actionBtnsCreateWrapper}>
            <span onClick={()=>navigate('/home/lde')}><i className="fa-solid fa-angle-left"/> Cancelar</span>
            <span onClick={()=>salvarEdicao(context.userLogado.id)}><i className="fa-regular fa-floppy-disk"/> Salvar</span>
        </div>



</div>
  
  
  
  
  
  
//   <div className='extCard'>

//   <fieldset className='fieldsetFlexRow'>
  
//       <legend>Luz de Emergência</legend>
  
//       <div>
//           <p className='cardTextoPqn'>número</p>
//           <Input inpClass='newLde' id='editarLdENum' inpTipo='text' onChange={({target})=>setNum(target.value)} value={num}  />
//       </div>
  
//       <div>
//           <p className='cardTextoPqn'>local</p>
//           <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='Local' options={['Subsolo', 'Acesso subsolo A', 'Acesso subsolo B', 'Escada A', 'Escada B', 'Escada C', 'Térreo', '2º Pav A', '2º Pav B', '2º Pav Escada C', '3º Pav A', '3º Pav B', '3º Pav Escada C', '4º Pav A', '4º Pav B', '4º Pav Escada C']} />
//       </div>
  
//       <div>
//           <p className='cardTextoPqn'>autonomia</p>
//           <Select selectValorInicial={dur} selectOnChange={({target})=>setDur(target.value)} optionDisabledValue='Autonomia' options={['1h', '2h', '3h', '4h', '5h', '6h']} />
//       </div>
  
//   </fieldset>
  
//   <fieldset className='fieldsetFlexRow'>
//     <legend>Avarias</legend>
//     <textarea onChange={({target})=>setAvaria(target.value)} value={avaria} />  
  
//   </fieldset>
  
//   <fieldset className='fieldsetAcoes fieldsetFlexRow'>
//       <div className='btnAcoesWrapper' onClick={()=>navigate('/home/lde')}>
//         <i className="fa-solid fa-angles-left"></i>
//         <p>cancelar</p>
//       </div>
//       <div className='btnAcoesWrapper' onClick={()=>salvarEdicao()}>
//         <i className="fa-solid fa-floppy-disk"></i>
//         <p>salvar</p>
//       </div>
  
//   </fieldset>
  
//   </div>
  






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
