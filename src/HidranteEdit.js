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
    const hdEditado = {id:id, num:num, local:local, abrigo:abrigo, sinal:sinal, val:hdVal, avaria:avarias, pecas:peca}

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
        setAvarias(item[0].avaria)
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
    
    

  return (
    // <div className='hdPageEdit'>
<>

    <div className='hdCard'>
      <div id="hdNum" className="hdInfo">
          <span>Hidrante</span>
          <Input
            labText="N??mero do hidrante"
            labClass="hdLabel"
            id="numeroHd"
            inpClass="hdNovo"
            value={num}
            onChange={({target})=>setNum(target.value)}
          />
        </div>

        <div id="hdLocal" className="hdInfo">
          <span>Local</span>

          <Select
            selectValorInicial={local}
            optionDisabledValue="local"
            options={['Subsolo', 'T??rreo', '2?? Pav A', '2?? Pav B', '3?? Pav A', '3?? Pav B', '4?? Pav A', '4?? Pav B']}
            selectOnChange={({target})=>setLocal(target.value)}
          />
        </div>

        <div id="hdAbrigo" className="hdInfo">
          <span>Abrigo</span>
          <Select
            selectValorInicial={abrigo}
            optionDisabledValue="Abrigo"
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setAbrigo(target.value)}
          />
        </div>

        <div id="hdSinal" className="hdInfo">
          <span>Sinaliza????o</span>
          <Select
            selectValorInicial={sinal}
            optionDisabledValue="Sinaliza????o"
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setSinal(target.value)}
          />
        </div>

        <div id="hdPecas" className="hdInfo">
          <CheckBox
            itens={["Storz", "Esguicho", "Mangueira"]}
            cbHandleChange={handleChange}
            itensAtuais = {peca}
          />
        </div>

        <div id="hdValidade" className="hdInfo">
          <span>Validade das Mangueiras</span>
          <Input
            inpTipo="date"
            id="inputHdValidade"
            value={hdVal}
            onChange={({ target }) => setHdVal(target.value)}
          />
        </div>

        <div id="hdAvarias" className="hdInfo">
          <p>Avarias</p>
          <textarea
            id="hdAvariasTxtArea"
            value={avarias}
            onChange={({target})=>setAvarias(target.value)}
          ></textarea>
        </div>

        <div  id='hdActions'>
           {/* <button onClick={salvarEditado}>Salvar</button> */}
           {/* <Link className='ldeSubFooterBtn' to='/hd' onClick={salvarEditado} >Salvar</Link> */}
           <i class="fa-solid fa-angles-left" onClick={()=>navigate('/hd')}></i>
           <i class="fa-solid fa-floppy-disk" onClick={salvarEditado}></i>
           {/* <Link className='ldeSubFooterBtn' to='/hd'>Voltar</Link> */}
        </div>
    </div>


    </>


      //   <Input inpTipo='text' labText='N??mero do hidrante'  value={num} onChange={({target})=>setNum(target.value)} />

      //   <label>Local</label>
      //   <Select selectValorInicial={local} optionDisabledValue='Local' options={['Subsolo', 'T??rreo', '2?? Pav A', '2?? Pav B', '3?? Pav A', '3?? Pav B', '4?? Pav A', '4?? Pav B']} selectOnChange={({target})=>setLocal(target.value)} />

      //   <label>Abrigo</label>
      //   <Select selectValorInicial={abrigo} optionDisabledValue='Abrigo' options={['Ok', 'Nok']} selectOnChange={({target})=>setAbrigo(target.value)} />

      //   <label>Sinaliza????o</label>
      //   <Select selectValorInicial={sinal} optionDisabledValue='Sinaliza????o' options={['Ok', 'Nok']} selectOnChange={({target})=>setSinal(target.value)} />

      //   <Input labText='??ltimo Reteste' inpTipo='date' id="inputHdValidade" value={hdVal} onChange={({ target }) => setHdVal(target.value)} />

      //   <label htmlFor='avarias'>Avarias:
      //   </label>
      //   <textarea id='avarias' value={avarias} onChange={({target})=>setAvarias(target.value)}></textarea>

      //   <CheckBox
      //       itens={["Storz", "Esguicho", "Mangueira"]}
      //       cbHandleChange={handleChange}
      //       itensAtuais = {peca}
      //     />

      // <div className='hdActions'>
      //     <button onClick={salvarEditado}>Salvar</button>
      //     <Link to='/hd'>Voltar</Link>
      // </div>


    // </div>
  )
}

export default HidranteEdit
