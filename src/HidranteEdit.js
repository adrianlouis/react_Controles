import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateBd } from './crudFireBase'
import { GlobalContext } from './GlobalContext'
import Input from './Input'
import Select from './Select'
import styles from './ExtNovo.module.css'

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
    // const [hdVal, setHdVal] = React.useState(itemPraEditar[0].val)
    const [hdVal, setHdVal] = React.useState({mes:itemPraEditar[0].val.mes, ano:itemPraEditar[0].val.ano})
    const [avarias, setAvarias] = React.useState(itemPraEditar[0].avaria)
    const [pecas, setPecas] = React.useState(itemPraEditar[0].pecas)
    const hdEditado = {id:itemPraEditar[0].id, num:num, local:local, abrigo:abrigo, sinal:sinal, placa:placa, val:{mes:hdVal.mes, ano:itemPraEditar[0].val.ano}, avaria:avarias, pecas:pecas}
    const anoAtual = new Date().getFullYear()
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
    
    function salvarEditado(idUser){

      const hidrantes = context.userLogado.hd.map((m)=>{
        if (m.id !== Number(search.get('id'))){
          return m
        }else{
          return hdEditado
        }
      })

      updateBd(idUser, {hd:hidrantes})
      context.setUserLogado({...context.userLogado, hd:hidrantes})
      navigate('/home/hd')

    }

    function handleBlur(el){
      el.parentNode.style.border='2px solid #3337'
    }
    function handleFocus(el){
      el.parentNode.style.border='2px solid rgb(166, 243, 166)'
    }

    function handleSelect(el, sel){
      if (sel=== 1){
        setHdVal({...hdVal, mes:el.value})
      }else if (sel===2){
        setHdVal({...hdVal, ano:el.value})
      }else if (sel===3){
        setLocal(el.value)
      }

      el.style.color='rgb(161,161,161)'
    }

    function handleMouseLeave(el){
      el.style.border='2px solid #3337'
    }

    function handleMouseEnter(el){
      el.style.border='2px solid rgb(166,243,166)'
    }

    function handleBlurDatas(el){
      el.parentNode.parentNode.style.border='2px solid #3337'
  } 

  function handleFocusDatas(el){
      el.parentNode.parentNode.style.border='2px solid rgb(166, 243, 166)'
  }


    
  return (
<>
    {/* <div className='ldeContent'>
      <fieldset className='fieldsetFlexRow'>
        <legend>Hidrante</legend>
        <div>

        <p className='cardTextoPqn'>número</p>
        <Input
            id="numeroHd"
            inpClass="newLde"
            value={num}
            onChange={({target})=>setNum(target.value)}
            type='tel'
          />
        </div>

        <div>
        <p className='cardTextoPqn'>local</p>
        <Select
            selectValorInicial={local}
            optionDisabledValue="local"
            options={['Subsolo', 'Térreo', '2º Pav A', '2º Pav B', '3º Pav A', '3º Pav B', '4º Pav A', '4º Pav B']}
            selectOnChange={({target})=>setLocal(target.value)}
            className='novoHdSelect'
          />

        </div>

        <div>
          <p className='cardTextoPqn'>abrigo</p>
        <Select
            selectValorInicial={abrigo}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setAbrigo(target.value)}
            className='novoHdSelect selectOkNok'
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
            className='novoHdSelect selectOkNok'
          />
        </div>

        <div>
          <p className='cardTextoPqn'>marcação no chão</p>
          <Select
            selectValorInicial={sinal}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setSinal(target.value)}
            className='novoHdSelect selectOkNok'
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
        <div className='btnAcoesWrapper' onClick={()=>navigate('/home/hd')}>
          <i className="fa-solid fa-angles-left" ></i>
          <p>cancelar</p>
        </div>

        <div className='btnAcoesWrapper'  onClick={()=>salvarEditado(context.userLogado.id)}>
          <i className="fa-solid fa-floppy-disk"></i>
          <p>salvar</p>
        </div>

      </fieldset>

    </div> */}

    <div  className={styles.novoExtContainer}>

      <h2><i className="fa-regular fa-pen-to-square"/> Editar Hidrante</h2>

      <fieldset className={styles.fieldset}>
          <i className="fa-solid fa-hashtag" />
          <input onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} placeholder='Número' className={styles.inputNovoExt} type='tel' maxLength={5} onChange={({target})=>setNum(target.value)} value={num} ></input>
      </fieldset>

      {/* <fieldset className={styles.fieldset}>
          <i className="fa-solid fa-fire-extinguisher" />
          <Select id='selTipo' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} optionDisabledValue={'Tipo'} selClass={styles.select} optClass={styles.option} selectValorInicial={tipo} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 1)}  options={['A', 'B', 'C']} />
      </fieldset> */}

      <fieldset className={styles.fieldset} >
          <i className="fa-solid fa-location-dot" />
          <Select onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} selClass={styles.select} optClass={styles.option} selectValorInicial={local} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 3)} optionDisabledValue='Local' options={['Subsolo', 'Térreo', 'Brigada', '2º Pav A', '2º Pav B', '2º Pav C', '3º Pav A', '3º Pav B', '3º Pav C', '4º Pav A', '4º Pav B', '4º Pav C', 'CMI']} />
      </fieldset>

      <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-store" />
        <Select
          onBlur={({currentTarget})=>handleBlur(currentTarget)}
          onFocus={({currentTarget})=>handleFocus(currentTarget)}
          optClass={styles.option}
          selectValorInicial={abrigo}
          options={["Ok", "Nok"]}
          selectOnChange={({target})=>setAbrigo(target.value)}
          selClass={styles.select}
        />
      </fieldset>

      <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-sign-hanging" />
          <Select
            onBlur={({currentTarget})=>handleBlur(currentTarget)}
            onFocus={({currentTarget})=>handleFocus(currentTarget)}
            selClass={styles.select}
            optClass={styles.option}
            selectValorInicial={placa}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setPlaca(target.value)}
          />
      </fieldset>

      <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-paint-roller" />
        <Select
            onBlur={({currentTarget})=>handleBlur(currentTarget)}
            onFocus={({currentTarget})=>handleFocus(currentTarget)}
            selectValorInicial={sinal}
            options={["Ok", "Nok"]}
            selectOnChange={({target})=>setSinal(target.value)}
            selClass={styles.select}
            optClass={styles.option}
          />
      </fieldset>

      <fieldset onClick={({currentTarget})=>handleMouseEnter(currentTarget)} onMouseLeave={({currentTarget})=>handleMouseLeave(currentTarget)} className={`${styles.fieldset} ${styles.pecasHidrante}`} >
        <div>

          <label className='pecasLabel' htmlFor='esguicho'>
          <input id='esguicho' type='checkbox' value={pecas.includes('Esguicho')} checked={pecas.includes('Esguicho')} onChange={()=>handleCheck('Esguicho')}/> Esguicho</label>

          <label className='pecasLabel' htmlFor='mangueira'>
          <input id='mangueira' type='checkbox' value={pecas.includes('Mangueira')} checked={pecas.includes('Mangueira')} onChange={()=>handleCheck('Mangueira')}/> 2 Mangueiras</label>

          <label className='pecasLabel' htmlFor='storz'>
          <input id='storz' type='checkbox' value={pecas.includes('Storz')} checked={pecas.includes('Storz')} onChange={()=>handleCheck('Storz')} /> Storz</label>

        </div>
      </fieldset>

      <fieldset className={styles.fieldset} >
        <i className="fa-solid fa-calendar-day" />
        <div className={styles.wrapperSelectRecarga}>
            <Select onFocus={({currentTarget})=>handleFocusDatas(currentTarget)} onBlur={({currentTarget})=>handleBlurDatas(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={hdVal.mes}  selectOnChange={({currentTarget})=>handleSelect(currentTarget, 1)} optionDisabledValue='Mês' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
            <Select className={styles.selectRec} optClass={styles.option} selectValorInicial={hdVal.ano} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 2)} optionDisabledValue='Ano' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
        </div>
    </fieldset>

    <fieldset className={`${styles.fieldset} ${styles.textareaWrapper}`} >
        <textarea spellCheck='false' className={styles.textarea} placeholder='Avarias . . .' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} id='hdAvariasTxtArea' value={avarias} onChange={({target})=>setAvarias(target.value)}></textarea>
    </fieldset>







      {/* <fieldset className={styles.fieldset} >
          <i className="fa-solid fa-calendar-day" />
          <div className={styles.wrapperSelectRecarga}>
              <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={mes} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 3)} optionDisabledValue='Mês' options={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']} />
              <Select onBlur={({currentTarget})=>handleBlurRecarga(currentTarget)} onFocus={({currentTarget})=>handleFocusRecarga(currentTarget)} className={styles.selectRec} optClass={styles.option} selectValorInicial={ano} selectOnChange={({currentTarget})=>handleSelect(currentTarget, 4)} optionDisabledValue='Ano' options={[anoAtual-3, anoAtual-2, anoAtual-1, anoAtual, anoAtual+1]} />
          </div>
      </fieldset> */}

      {/* <fieldset className={styles.fieldset}>
          <i className="fa-regular fa-calendar" />
          <input value={ultRet} onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} placeholder='Data de reteste' min='2000' max={anoAtual + 5} className={styles.inputNovoExt} type='tel' maxLength={4} onChange={({target}) => setUltRet(target.value)} ></input>
      </fieldset> */}

      {/* <fieldset className={`${styles.fieldset} ${styles.textareaWrapper}`} >
          <textarea spellCheck='false' className={styles.textarea} placeholder='Avarias' onBlur={({currentTarget})=>handleBlur(currentTarget)} onFocus={({currentTarget})=>handleFocus(currentTarget)} id='hdAvariasTxtArea' value={avaria} onChange={({target})=>setAvaria(target.value)}></textarea>
      </fieldset> */}

      <div className={styles.actionBtnsCreateWrapper}>
          <span onClick={()=>navigate('/home/hd')}><i className="fa-solid fa-angle-left"/> Cancelar</span>
          <span onClick={()=>salvarEditado(context.userLogado.id)}><i className="fa-regular fa-floppy-disk"/> Salvar</span>
      </div>

    </div>

    </>
  )
}

export default HidranteEdit
