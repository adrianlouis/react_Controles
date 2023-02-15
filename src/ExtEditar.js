import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import {mesParaNumero, mesParaString } from './funcoes/extDatas'
import { updateBd } from './crudFireBase'

const ExtEditar = () => {

    const context = useContext(GlobalContext);
    const location = useLocation()
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search)

    const [id, setId] = React.useState('')
    const [num , setNum ] = React.useState('')
    const [tipo , setTipo ] = React.useState('')
    const [local , setLocal ] = React.useState('')
    const [mes , setMes ] = React.useState('')
    const [ano , setAno ] = React.useState('')
    const [ultRet , setUltRet ] = React.useState('')
    const [avaria , setAvaria ] = React.useState('')
    const editado = { id:id, num:num, tipo:tipo, local:local, ultRec:{mes, ano}, ultRet:ultRet, avaria:avaria }
    const {ext} = context.userLogado

    React.useEffect(()=>{
        const item = context.userLogado.ext.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })

        const {id, num, tipo, local, ultRec:{mes, ano}, ultRet, avaria} = item[0]
        const mesEmString = mesParaString(mes).slice(0,3)

        setId(id)
        setNum(num)
        setTipo(tipo)
        setLocal(local)
        setMes(mesEmString)
        setAno(ano)
        setUltRet(ultRet)
        setAvaria(avaria)

    },[])

    function salvarExt(){

        const extEditado = {...editado, ultRec:{...editado.ultRec, mes: mesParaNumero(mes)}}
        const res = ext.map((m)=>{
            if (m.id !== extEditado.id){
                return m
            }else{
                return extEditado
            }
        })

        updateBd(context.userLogado.id, {ext:res})

        context.setUserLogado({...context.userLogado, ext:[...res]})
        
        context.setItensFiltrados('')
        navigate('/ext')
    }
    
  return (

    <div  className='extCard'>

        <fieldset className='fieldsetFlexRow'>

            <legend>Extintor</legend>

            <div>
                <p className='cardTextoPqn'>número</p>
                <Input  inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} />
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
                <Select selectValorInicial={mes} selectOnChange={({target})=>setMes(target.value)} optionDisabledValue=' mês ' options={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} />
            </div>

            <div>
                <p className='cardTextoPqn'>ano da próx. recarga</p>
                <Select selectValorInicial={ano} selectOnChange={({target})=>setAno(target.value)} optionDisabledValue=' ano ' options={[2020, 2021, 2022, 2023, 2024, 2025]} />
            </div>
        
        </fieldset>

        <fieldset className='fieldsetFlexRow'>
            <legend>Data do Reteste Hidrostático</legend>
            <div>
                <p className='cardTextoPqn'>ano do próx. reteste</p>
                <Input
                    inpTipo="tel"
                    maxLength='4'
                    value={ultRet}
                    onChange={({target}) => setUltRet(target.value)}
                    id='inputRetesteExt'
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

export default ExtEditar