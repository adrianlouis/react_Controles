import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CheckBox from './CheckBox'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'

const HidranteEdit = () => {

    const location = useLocation()
    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search)

    const [id, setId] = React.useState('')
    const [num, setNum] = React.useState('')
    const [local, setLocal] = React.useState('')
    const [abrigo, setAbrigo] = React.useState('')
    const [sinal, setSinal] = React.useState('')
    const [hdVal, setHdVal] = React.useState('')
    const [avarias, setAvarias] = React.useState('')
    const [peca, setPeca] = React.useState([])
    const hdEditado = {id:id, num:num, local:local, abrigo:abrigo, sinal:sinal, val:hdVal, avarias:avarias, pecas:peca}


    React.useEffect(()=>{
        const item = context.userLogado.hd.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })

        setId(item[0].id)
        setNum(item[0].num)
        setLocal(item[0].local)
        setAbrigo(item[0].abrigo)
        setSinal(item[0].sinal)
        setHdVal(item[0].val)
        setAvarias(item[0].avarias)
        setPeca(item[0].pecas) 

    },[])

    function handleChange({ target }) {
        if (target.checked) {
          setPeca([...peca, target.value]);
        } else {
          setPeca(peca.filter((item) => item !== target.value));
        }
      }

    function salvarEditado(){
        const outrosHd = context.userLogado.hd.filter((filtro)=>{
            return filtro.id !== Number(search.get('id'))
        })

        context.setUserLogado({...context.userLogado, hd:[hdEditado, ...outrosHd]})
        navigate('/hd')
    }
    
    // console.log(context.userLogado)
    console.log(peca)

  return (
    <div className='hdPageEdit'>
        <Input labText='Hidrante nº'  value={num} onChange={({target})=>setNum(target.value)} />
        <Select selectValorInicial={local} optionDisabledValue='Local' options={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B']} selectOnChange={({target})=>setLocal(target.value)} />
        <Select selectValorInicial={abrigo} optionDisabledValue='Abrigo' options={['Ok', 'Nok']} selectOnChange={({target})=>setAbrigo(target.value)} />
        <Select selectValorInicial={sinal} optionDisabledValue='Sinalização' options={['Ok', 'Nok']} selectOnChange={({target})=>setSinal(target.value)} />
        <Input labText='Último Reteste' inpTipo='date' id="inputHdValidade" value={hdVal} onChange={({ target }) => setHdVal(target.value)} />
        <label htmlFor='avarias'>Avarias:
        </label>
        <textarea id='avarias' value={avarias} onChange={({target})=>setAvarias(target.value)}></textarea>

        <CheckBox
            itens={["Storz", "Esguicho", "Mangueira"]}
            cbHandleChange={handleChange}
            itensAtuais = {peca}
          />

    <div className='hdActions'>
        <button onClick={salvarEditado}>Salvar</button>
        <Link to='/hd'>Voltar</Link>
    </div>
    </div>
  )
}

export default HidranteEdit
