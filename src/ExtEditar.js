import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import InnerFooter from './InnerFooter'
import Input from './Input'
import Select from './Select'

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

    React.useEffect(()=>{
        const item = context.userLogado.ext.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })

        const {id, num, tipo, local, ultRec:{mes, ano}, ultRet, avaria} = item[0]

        setId(id)
        setNum(num)
        setTipo(tipo)
        setLocal(local)
        setMes(mes)
        setAno(ano)
        setUltRet(ultRet)
        setAvaria(avaria)


    },[])

    console.log(editado)
    console.log(context.userLogado.ext)

    function salvarExt(){
        const outrosExtintores = context.userLogado.ext.filter((filtro)=>{
            return filtro.id !== id 
        })

        context.setUserLogado({...context.userLogado, ext:[...outrosExtintores, {...editado}]})
        navigate('/ext')
    }

    
  return (
    <div>

      <div className='containerCriarExt'>

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
                <Select selectValorInicial={mes} selectOnChange={({target})=>setMes(target.value)} optionDisabledValue=' mês ' options={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} />
                <Select selectValorInicial={ano} selectOnChange={({target})=>setAno(target.value)} optionDisabledValue=' ano ' options={[2020, 2021, 2022, 2023, 2024, 2025]} />
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
                <textarea value={avaria} onChange={({target})=>setAvaria(target.value)}>

                </textarea>
            </div>

            <div id='botoesEdicao' className='hdInfo'>
            <i class="fa-solid fa-angles-left" onClick={()=>navigate('/ext')}></i>
            <i class="fa-solid fa-floppy-disk" onClick={salvarExt}></i>
            </div>

        </div>

        {/* <InnerFooter botoes={[['/ext', 'salvar', salvarExt],[ '/ext', 'voltar']]}  /> */}

    </div>
  )
}

export default ExtEditar