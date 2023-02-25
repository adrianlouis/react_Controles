import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import { mesParaNumero } from './funcoes/extDatas'
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

    // const extNovo = {id:findId(), num:num, tipo:tipo, local:local, ultRec:{...ultRec, mes:mesParaNumero(mesRec)}, ultRet:ultRet, avaria:avaria }
    const extNovo = {id:findId(), num:num, tipo:tipo, local:local, ultRec:{...ultRec, mes:mesRec.toLowerCase()}, ultRet:ultRet, avaria:avaria }

    console.log(extNovo.ultRec.mes)
    const testeData = new Date()
    testeData.setMonth(mesRec - 1)
    // console.log(testeData.toLocaleString('pt-Br', {month:'long'}))
    // console.log(new Date(testeData))


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

    
    function salvarExt(){

        const novoObjExt = {ext:[...context.userLogado.ext, extNovo]}
        updateBd(context.userLogado.id, novoObjExt)

        context.setUserLogado({...context.userLogado, ext:[extNovo, ...context.userLogado.ext]})
        
        navigate('/ext')
    }
    
    React.useEffect(()=>{
        updateBd(context.userLogado.id, {ext:[...context.userLogado.ext]})
    },[context.userLogado.ext])

    return (
    // <div>

    //     <div className='containerCriarExt'>

    //         <h1>Adicionar Extintor</h1>

    //         <div id='extNum' className='hdInfo'>
    //             <span>Número</span>
    //             <Input  inpTipo='tel' onChange={({target})=>setNum(target.value)} value={num} />
    //         </div>

    //         <div id='extTipo' className='hdInfo'>
    //             <span>Tipo</span>
    //             <Select selectValorInicial={tipo} selectOnChange={({target})=>setTipo(target.value)} optionDisabledValue='-----' options={['A', 'B', 'C']} />
    //         </div>

    //         <div id='extLocal' className='hdInfo'>
    //             <span>Local</span>
    //             <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='-----' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
    //         </div>

    //         <div id='extUltRec' className='hdInfo'>

    //             <span>Última recarga</span>
    //             <div className='extEditarDataRecarga'>
    //                 <Select selectValorInicial={mesRec} selectOnChange={({target})=>setMesRec(target.value)} optionDisabledValue=' mês ' options={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} />



    //                 <Select selectValorInicial={anoRec} selectOnChange={({target})=>setAnoRec(target.value)} optionDisabledValue=' ano ' options={[2020, 2021, 2022, 2023, 2024, 2025]} />

    //                 {/* <Input 
    //                     inpTipo='month'
    //                     value={novoMes}
    //                     onChange={({target})=>setNovoMes(target.value)}
    //                 /> */}

    //             </div>
    //         </div>

    //         <div id='extUltRet' className='hdInfo'>

    //             <span>Próximo reteste</span>
    //             <Input
    //                 inpTipo="tel"
    //                 maxLength='4'
    //                 value={ultRet}
    //                 onChange={({target}) => setUltRet(target.value)}
    //             />

    //         </div>

    //         <div id='extAvaria' className='hdInfo'>
    //             <span>Avarias</span>
    //             <textarea value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
    //         </div>

    //     </div>

    //     <AcoesCriandoItem voltar='/ext' salvar={salvarExt}/>

    // </div>


    <div  className='extCard'>

    <fieldset className='fieldsetFlexRow'>

        <legend>Extintor</legend>

        <div>
            <p className='cardTextoPqn'>número</p>
            <Input  inpTipo='tel' onChange={({target})=>setNum(target.value)} value={num} />
        </div>

        <div>
            <p className='cardTextoPqn'>tipo</p>
            <Select selectValorInicial={tipo} selectOnChange={({target})=>setTipo(target.value)} optionDisabledValue='-----' options={['A', 'B', 'C']} />
        </div>

        <div>
            <p className='cardTextoPqn'>local</p>
            <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='-----' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
        </div>

    </fieldset>

    <fieldset className='fieldsetFlexRow'>


    <legend>Data da Recarga</legend>
    <div>
    <p className='cardTextoPqn'>mês da próx. recarga</p>
    <Select selectValorInicial={mesRec} selectOnChange={({target})=>setMesRec(target.value)} optionDisabledValue=' mês ' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
    </div>

    <div>
    <p className='cardTextoPqn'>ano da próx. recarga</p>
    <Select selectValorInicial={anoRec} selectOnChange={({target})=>setAnoRec(target.value)} optionDisabledValue=' ano ' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
    </div>
    
    </fieldset>

    <fieldset className='fieldsetFlexRow'>
        <legend>Data do Reteste Hidrostático</legend>
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
                enterkeyhint='enter'
            />

        </div>
    </fieldset>

    <fieldset className='cardAvaria'>
        <legend>Avarias</legend>
        <textarea id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>

    </fieldset>

    <fieldset className='fieldsetAcoes fieldsetFlexRow'>
        <div className='btnAcoesWrapper' onClick={()=>navigate('/ext')}>
        <i className="fa-solid fa-angles-left" ></i>
            <p>voltar</p>
        </div>
        <div className='btnAcoesWrapper' onClick={()=>salvarExt()}>
        <i className="fa-solid fa-floppy-disk" ></i>
            <p>salvar</p>
        </div>

    </fieldset>
    </div>




  )
}

export default ExtNovo
