import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import {updateBd} from './crudFireBase'

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

    
    function salvarExt(idUser){

        const novoObjExt = [extNovo, ...context.userLogado.ext]
        context.setUserLogado({...context.userLogado, ext:novoObjExt})
        navigate('/home/ext')
        
        updateBd(idUser, {ext:novoObjExt})
    }
    

    return (

    <div  className='ldeContent'>

    <fieldset className='fieldsetFlexRow'>

        <legend>Extintor</legend>

        <div>
            <p className='cardTextoPqn'>número</p>
            <Input className='newLde' style={{width:'60px'}} inpTipo='tel' onChange={({target})=>setNum(target.value)} value={num} />
        </div>

        <div>
            <p className='cardTextoPqn'>tipo</p>
            <Select className='novoHdSelect selectOkNok' selectValorInicial={tipo} selectOnChange={({target})=>setTipo(target.value)}  options={['A', 'B', 'C']} />
        </div>

        <div>
            <p className='cardTextoPqn'>local</p>
            <Select className='novoHdSelect' selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='-----' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
        </div>

    </fieldset>

    <fieldset className='fieldsetFlexRow'>


    <legend>Recarga</legend>
    <div>
    <p className='cardTextoPqn'>mês da próx. recarga</p>
    <Select className='novoHdSelect selectOkNok' selectValorInicial={mesRec} selectOnChange={({target})=>setMesRec(target.value)} optionDisabledValue=' mês ' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
    </div>

    <div>
    <p className='cardTextoPqn'>ano da próx. recarga</p>
    <Select className='novoHdSelect selectOkNok' style={{width:'80px'}} selectValorInicial={anoRec} selectOnChange={({target})=>setAnoRec(target.value)} optionDisabledValue=' ano ' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
    </div>
    
    </fieldset>

    <fieldset className='fieldsetFlexRow'>
        <legend>Reteste Hidrostático</legend>
        <div>
            <p className='cardTextoPqn'>ano do próx. reteste</p>
            <Input
                inpTipo="tel"
                maxLength='4'
                min='2000'
                max={anoAtual+5}
                value={ultRet}
                onChange={({target}) => setUltRet(target.value)}
                id='inputRetesteExt'
                enterKeyHint='enter'
                className='newLde'
            />

        </div>
    </fieldset>

    <fieldset className='cardAvaria'>
        <legend>Avarias</legend>
        <textarea id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>

    </fieldset>

    <fieldset className='fieldsetAcoes fieldsetFlexRow'>
        <div className='btnAcoesWrapper' onClick={()=>navigate('/home/ext')}>
        {/* <i className="fa-solid fa-angles-left" ></i> */}
            <p>voltar</p>
        </div>
        <div className='btnAcoesWrapper' onClick={()=>salvarExt(context.userLogado.id)}>
        {/* <i className="fa-solid fa-floppy-disk" ></i> */}
            <p>salvar</p>
        </div>

    </fieldset>
    </div>

  )
}

export default ExtNovo