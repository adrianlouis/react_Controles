import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateBd } from './crudFireBase'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'

const HidranteEdit = () => {

    const location = useLocation()
    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search)

    const itemPraEditar = context.userLogado.hd.filter((f)=>{
      return f.id === Number(search.get('id'))
    })
    
    const [num, setNum] = React.useState(itemPraEditar[0].num)
    const [local, setLocal] = React.useState(itemPraEditar[0].local)
    const [abrigo, setAbrigo] = React.useState(itemPraEditar[0].abrigo)
    const [sinal, setSinal] = React.useState(itemPraEditar[0].sinal)
    const [placa, setPlaca] = React.useState(itemPraEditar[0].placa)
    const [hdVal, setHdVal] = React.useState(itemPraEditar[0].val)
    const [avarias, setAvarias] = React.useState(itemPraEditar[0].avaria)
    const [pecas, setPecas] = React.useState(itemPraEditar[0].pecas)
    const hdEditado = {id:itemPraEditar[0].id, num:num, local:local, abrigo:abrigo, sinal:sinal, placa:placa, val:hdVal, avaria:avarias, pecas:pecas}

    function handleCheck(item){
      if (pecas.includes(item)){
        const peca = pecas.filter((f)=>{
          return f !== item
        })
        setPecas([...peca])
      }else{
        setPecas([...pecas, item])
      }
    }
    
    function salvarEditado(){

      const hidrantes = context.userLogado.hd.map((m)=>{
        if (m.id !== Number(search.get('id'))){
          return m
        }else{
          return hdEditado
        }
      })

      updateBd(context.userLogado.id, {hd:hidrantes})
      context.setUserLogado({...context.userLogado, hd:hidrantes})
      navigate('/hd')

    }
    
  return (
<>
    <div className='extCard'>
      <fieldset className='fieldsetFlexRow'>
        <legend>Hidrante</legend>
        <div>

        <p className='cardTextoPqn'>número</p>
        <Input
            id="numeroHd"
            inpClass="hdNovo"
            value={num}
            onChange={({target})=>setNum(target.value)}
          />
        </div>

        <div>
        <p className='cardTextoPqn'>local</p>
        <Select
            selectValorInicial={local}
            optionDisabledValue="local"
            options={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B']}
            selectOnChange={({target})=>setLocal(target.value)}
          />

        </div>

        <div>
          <p className='cardTextoPqn'>abrigo</p>
        <Select
            selectValorInicial={abrigo}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setAbrigo(target.value)}
          />
        </div>

      </fieldset>

      <fieldset className='fieldsetFlexRow'>
        <legend>Peças</legend>
        <div>

          <label className='pecasLabel' htmlFor='esguicho'>
          Esguicho
          <input id='esguicho' type='checkbox' value={pecas.includes('Esguicho')} checked={pecas.includes('Esguicho')} onChange={()=>handleCheck('Esguicho')}/>
          </label>

          <label className='pecasLabel' htmlFor='mangueira'>
          Mangueira
          <input id='mangueira' type='checkbox' value={pecas.includes('Mangueira')} checked={pecas.includes('Mangueira')} onChange={()=>handleCheck('Mangueira')}/>
          </label>

          <label className='pecasLabel' htmlFor='storz'>
          Storz
          <input id='storz' type='checkbox' value={pecas.includes('Storz')} checked={pecas.includes('Storz')} onChange={()=>handleCheck('Storz')} />
          </label>

        </div>

      </fieldset>

      <fieldset className='fieldsetFlexRow'>
        <legend>Sinalização</legend>
        <div>
          <p className='cardTextoPqn'>placa de sinalização</p>
          <Select
            selectValorInicial={placa}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setPlaca(target.value)}
          />
        </div>

        <div>
          <p className='cardTextoPqn'>marcação no chão</p>
          <Select
            selectValorInicial={sinal}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setSinal(target.value)}
          />
        </div>
      </fieldset>

      <fieldset className='fieldsetFlexRow'>
        <legend>Próximo Reteste Hidrostático</legend>
        <Input
            inpTipo="date"
            id="inputHdValidade"
            value={hdVal}
            onChange={({ target }) => setHdVal(target.value)}
          />
      </fieldset>

      <fieldset className='fieldsetFlexRow'>
        <legend>Avaria</legend>
        <textarea
            id="hdAvariasTxtArea"
            value={avarias}
            onChange={({target})=>setAvarias(target.value)}
          ></textarea>
      </fieldset>

      <fieldset className='fieldsetAcoes fieldsetFlexRow'>
        <div className='btnAcoesWrapper' onClick={()=>navigate('/hd')}>
          <i className="fa-solid fa-angles-left" ></i>
          <p>cancelar</p>
        </div>

        <div className='btnAcoesWrapper'  onClick={salvarEditado}>
          <i className="fa-solid fa-floppy-disk"></i>
          <p>salvar</p>
        </div>

      </fieldset>

    </div>

    </>
  )
}

export default HidranteEdit
