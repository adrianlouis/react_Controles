import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'

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


    const extNovo = {id:findId(), num:num, tipo:tipo, local:local, ultRec:ultRec, ultRet:ultRet, avaria:avaria }

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
        context.setUserLogado({...context.userLogado, ext:[...context.userLogado.ext, extNovo]})
        navigate('/ext')
    }

  return (
    <div>

        <div className='containerCriarExt'>

            <h1>Adicionar Extintor</h1>

            <div id='extNum' className='hdInfo'>
                <span>Número</span>
                <Input  inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} />
            </div>

            <div id='extTipo' className='hdInfo'>
                <span>Tipo</span>
                <Select selectValorInicial={tipo} selectOnChange={({target})=>setTipo(target.value)} optionDisabledValue='-----' options={['A', 'B', 'C']} />
            </div>

            <div id='extLocal' className='hdInfo'>
                <span>Local</span>
                <Select selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='-----' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B', 'CMI']} />
            </div>

            <div id='extUltRec' className='hdInfo'>

                <span>Última recarga</span>
                <div className='extEditarDataRecarga'>
                    <Select selectValorInicial={mesRec} selectOnChange={({target})=>setMesRec(target.value)} optionDisabledValue=' mês ' options={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} />
                    <Select selectValorInicial={anoRec} selectOnChange={({target})=>setAnoRec(target.value)} optionDisabledValue=' ano ' options={[2020, 2021, 2022, 2023, 2024, 2025]} />
                </div>
            </div>

            <div id='extUltRet' className='hdInfo'>

                <span>Último reteste</span>
                <Input
                    inpTipo="number"
                    min='2015'
                    max='2035'

                    value={ultRet}
                    onChange={({target}) => setUltRet(target.value)}
                />

            </div>

            <div id='extAvaria' className='hdInfo'>
                <span>Avarias</span>
                <textarea value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
            </div>

        </div>

        <AcoesCriandoItem voltar='/ext' salvar={salvarExt}/>

    </div>
  )
}

export default ExtNovo
