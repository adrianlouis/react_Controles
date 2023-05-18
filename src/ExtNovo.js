import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import {adicionarRegistro, refreshBd} from './crudFireBase'
import styles from './ExtNovo.module.css'

const ExtNovo = () => {

    const context = useContext(GlobalContext)
    const navigate= useNavigate()
    const [num, setNum] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const [mesRec, setMesRec] = React.useState('')
    const [anoRec, setAnoRec] = React.useState('')
    const ultRec = {mes:mesRec, ano:anoRec}
    const [local, setLocal] = React.useState('')
    const [ultRet, setUltRet] = React.useState('')
    const [avaria, setAvaria] = React.useState('')
    const anoAtual = new Date().getFullYear()
    const extNovo = {id:findId(), num:num, tipo:tipo, local:local, ultRec:{...ultRec, mes:mesRec.toLowerCase()}, ultRet:ultRet, avaria:avaria }

    function findId(){
        if (context.userLogado.ext.length > 0){
            const nmbr = Object.keys(context.userLogado.ext).map((item)=>{
                return context.userLogado.ext[item].id 
            })
            return (Math.max(...nmbr)+1)
        }else{
            return 1
        }
    }

    function handleSelect(el, sel){
        if (sel=== 1){
            setTipo(el.value)
        }else if(sel === 2){
            setLocal(el.value)
        }else if(sel === 3){
            setMesRec(el.value)
        }else if(sel === 4){
            setAnoRec(el.value)
        }

        el.style.color='rgb(161,161,161)'
    }

    
    async function salvarExt(idUser){

        const novoObjExt = [extNovo, ...context.userLogado.ext]

        await adicionarRegistro(idUser, extNovo, 'ext')
        await context.setUserLogado({...context.userLogado, ext:novoObjExt})

        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update)

        navigate('/home/ext')
    }

    function handleFocus(el){
        el.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }
    function handleFocusRecarga(el){
        el.parentNode.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }
    function handleBlur(el){
        el.parentNode.style.border='2px solid #3337'
    }
    function handleBlurRecarga(el){
        el.parentNode.parentNode.style.border='2px solid #3337'

    } 

    return (

    <div  className={styles.novoExtContainer}>

        <h2><i className="fa-solid fa-file-pen"/> Novo Extintor</h2>

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
                <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={mesRec} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 3)} optionDisabledValue='Mês' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
                <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={anoRec} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 4)} optionDisabledValue='Ano' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
            </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
            <i className="fa-regular fa-calendar" />
            <input onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} placeholder='Data de reteste' min='2000' max={anoAtual + 5} className={styles.inputNovoExt} type='tel' maxLength={4} onChange={({target}) => setUltRet(target.value)} ></input>
        </fieldset>

        <fieldset className={styles.fieldset} >
            <textarea placeholder='Avarias' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
        </fieldset>
        
        <div className={styles.actionBtnsCreateWrapper}>
            <span onClick={()=>navigate('/home/ext')}><i className="fa-solid fa-angle-left"/> Cancelar</span>
            <span onClick={()=>salvarExt(context.userLogado.id)}><i className="fa-regular fa-floppy-disk"/> Salvar</span>
        </div>

    </div>

  )
}

export default ExtNovo