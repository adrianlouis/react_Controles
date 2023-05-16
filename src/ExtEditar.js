import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import {dataShort, mesParaNumero, mesParaString } from './funcoes/extDatas'
import { updateBd } from './crudFireBase'

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
        
        navigate('/home/ext')
    }
    

  return (

    <div  className='ldeContent'>

        <fieldset className='fieldsetFlexRow'>

            <legend>Extintor</legend>

            <div>
                <p className='cardTextoPqn'>número</p>
                <Input className='newLde' inpTipo='text' onChange={({target})=>setNum(target.value)} value={num} />
            </div>

            <div>
                <p className='cardTextoPqn'>tipo</p>
                <Select className='newLde' selectValorInicial={tipo} selectOnChange={({target})=>setTipo(target.value)} optionDisabledValue='-----' options={['A', 'B', 'C']} />
            </div>

            <div>
                <p className='cardTextoPqn'>local</p>
                <Select className='newLde' style={{width:'115px'}} selectValorInicial={local} selectOnChange={({target})=>setLocal(target.value)} optionDisabledValue='-----' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
            </div>

        </fieldset>

        <fieldset className='fieldsetFlexRow'>


            <legend>Recarga</legend>
            <div>
                <p className='cardTextoPqn'>mês da próx. recarga</p>
                <Select className='newLde' style={{width:'60px'}} selectValorInicial={mes} selectOnChange={({target})=>setMes(target.value)} optionDisabledValue=' mês ' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
            </div>

            <div>
                <p className='cardTextoPqn'>ano da próx. recarga</p>
                <Select className='newLde' style={{width:'80px'}} selectValorInicial={ano} selectOnChange={({target})=>setAno(target.value)} optionDisabledValue=' ano ' options={[ anoAtual-5, anoAtual-4, anoAtual-3, anoAtual-2, anoAtual-1 ,anoAtual, anoAtual+1, anoAtual+2, anoAtual+3, anoAtual+4, anoAtual+5 ]} />
            </div>
        
        </fieldset>

        <fieldset className='fieldsetFlexRow'>
            <legend>Reteste Hidrostático</legend>
            <div>
                <p className='cardTextoPqn'>ano do próx. reteste</p>
                <Input
                className='newLde'
                    inpTipo="tel"
                    maxLength='4'
                    value={ultRet}
                    onChange={({target}) => setUltRet(target.value)}
                    id='inputRetesteExt'
                />
            </div>
        </fieldset>

        <fieldset className='cardAvaria fieldsetFlexRow '>
            <legend>Avarias</legend>
            <textarea id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
        </fieldset>

        <fieldset className='fieldsetAcoes fieldsetFlexRow'>
            <div className='btnAcoesWrapper' onClick={()=>navigate('/home/ext')}>
                <p>voltar</p>
            </div>
            <div className='btnAcoesWrapper' onClick={()=>salvarExt()}>
                <p>salvar</p>
            </div>
        </fieldset>
    </div>


  )
}

export default ExtEditar