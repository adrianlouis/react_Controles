import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import {dataShort, mesParaNumero, mesParaString } from './funcoes/extDatas'
import { updateBd } from './crudFireBase'
import styles from './ExtNovo.module.css'

const ExtEditar = () => {

    const context = useContext(GlobalContext);
    const location = useLocation()
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search)
    const anoAtual = (new Date().getFullYear())

    const [id, setId] = React.useState('')
    const [num , setNum ] = React.useState('')
    const [tipo , setTipo ] = React.useState('')
    const [local , setLocal ] = React.useState('')
    const [mes , setMes ] = React.useState('')
    const [ano , setAno ] = React.useState('')
    const [ultRet , setUltRet ] = React.useState('')
    const [avaria , setAvaria ] = React.useState('')
    const editado = { id:id, num:num, tipo:tipo, local:local, ultRec:{mes, ano}, ultRet:ultRet, avaria:avaria }

    const testeData = new Date()
    testeData.setMonth(0)
    // console.log(testeData.toLocaleString('pt-Br', {month:'long'}))
    // console.log((new Date()).setMonth(11).toLocaleString('pt-Br'))  
    // console.log(context.userLogado)
    const {ext} = context.userLogado

    React.useEffect(()=>{
        const item = context.userLogado.ext.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })

        const {id, num, tipo, local, ultRec:{mes, ano}, ultRet, avaria} = item[0]
        // const mesEmString = mes? mesParaString(mes).slice(0,3) : ''
        // const dataConvertida = new Date()
        // dataConvertida.setMonth(mes-1)
        // console.log(dataConvertida)

        

        setId(id)
        setNum(num)
        setTipo(tipo)
        setLocal(local)
        setMes(mes)
        setAno(ano)
        setUltRet(ultRet)
        setAvaria(avaria)

    },[])

    function salvarExt(){

        const extEditado = {...editado, ultRec:{...editado.ultRec, mes:mes}}
        const res = ext.map((m)=>{
            if (m.id !== extEditado.id){
                return m
            }else{
                return extEditado
            }
        })

        updateBd(context.userLogado.id, {ext:res})

        context.setUserLogado({...context.userLogado, ext:[...res]})

        if(context.itensFiltrados && context.itensFiltrados.length > 1){
            const filtr = context.itensFiltrados.map((m)=>{
                if (m.id !== Number(search.get('id'))){
                    return m
                }else{
                    return extEditado
                }
            })

            context.setItensFiltrados(filtr)
            
        }else if(context.itensFiltrados && context.itensFiltrados.length === 1){
            context.setItensFiltrados([extEditado])
        }

        navigate('/home/ext')
    }






    function handleFocus(el){
        el.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }

    function handleBlur(el){
        el.parentNode.style.border='2px solid #3337'
    }
    function handleBlurRecarga(el){
        el.parentNode.parentNode.style.border='2px solid #3337'
    } 

    function handleFocusRecarga(el){
        el.parentNode.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }

    function handleSelect(el, sel){
        if (sel=== 1){
            setTipo(el.value)
        }else if(sel === 2){
            setLocal(el.value)
        }else if(sel === 3){
            setMes(el.value)
        }else if(sel === 4){
            setAno(el.value)
        }

        el.style.color='rgb(161,161,161)'
    }
    

  return (


    <div  className={styles.novoExtContainer}>

    <h2><i className="fa-regular fa-pen-to-square"/> Editar Extintor</h2>

    <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-hashtag" />
        <input onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} placeholder='Número' className={styles.inputNovoExt} type='tel' maxLength={5} onChange={({target})=>setNum(target.value)} value={num} ></input>
    </fieldset>

    <fieldset className={styles.fieldset}>
        <i className="fa-solid fa-fire-extinguisher" />
        <Select id='selTipo' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} optionDisabledValue={'Tipo'} selClass={styles.select} optClass={styles.option} selectValorInicial={tipo} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 1)}  options={['A', 'B', 'C']} />
    </fieldset>

    <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-location-dot" />
        <Select onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} selClass={styles.select} optClass={styles.option} selectValorInicial={local} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 2)} optionDisabledValue='Local' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
    </fieldset>

    <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-calendar-day" />
        <div className={styles.wrapperSelectRecarga}>
            <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={mes} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 3)} optionDisabledValue='Mês' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
            <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={ano} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 4)} optionDisabledValue='Ano' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
        </div>
    </fieldset>

    <fieldset className={styles.fieldset}>
        <i className="fa-regular fa-calendar" />
        <input value={ultRet} onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} placeholder='Data de reteste' min='2000' max={anoAtual + 5} className={styles.inputNovoExt} type='tel' maxLength={4} onChange={({target}) => setUltRet(target.value)} ></input>
    </fieldset>

    <fieldset className={`${styles.fieldset} ${styles.textareaWrapper}`} >
        <textarea spellCheck='false' className={styles.textarea} placeholder='Avarias' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
    </fieldset>

    <div className={styles.actionBtnsCreateWrapper}>
        <span onClick={()=>navigate('/home/ext')}><i className="fa-solid fa-angle-left"/> Cancelar</span>
        <span onClick={()=>salvarExt(context.userLogado.id)}><i className="fa-regular fa-floppy-disk"/> Salvar</span>
    </div>

    </div>


  )
}

export default ExtEditar