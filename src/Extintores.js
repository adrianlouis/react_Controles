import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { dataLong, mesParaString } from './funcoes/extDatas'
import { readBD, updateBd } from './crudFireBase'

const Extintores = () => {

    const context = useContext(GlobalContext)
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
        
    }
    const navigate = useNavigate()

    function excluirExtintor(id, idUser){
        
        const filtrado = context.userLogado.ext.filter((filtro)=>{
            return filtro.id !== id
        })
        
        context.setUserLogado({...context.userLogado, ext:[...filtrado]})
        updateBd(idUser, {ext:filtrado})


    }

function tipoClasse(tipo){
    if (tipo === 'A'){
        return 'AP'
    }else if (tipo === 'B'){
        return 'PQS'
    }else if (tipo === 'C') {
        return 'CO²'
    }
}

  return (
    <>

        <NavLink to='extnovo' className='novoRegistro' >Registrar extintor</NavLink>
        {/* <button onClick={()=>readBD()}>LER BD</button> */}

  
        {context.userLogado.ext.map((item)=>{
            return <div key={item.id+'ext'} className='ldeContent'>

                <fieldset className='fieldsetFlexRow'>

                    <legend>Extintor {item.num ? 'Nº '+item.num : 'sem número'}</legend>

                    <div className='ldeWrapperDados'>
                        
                    <div>
                        <p className='cardTextoPqn'>tipo</p>
                        <p>{item.tipo? item.tipo : 'N/A'}</p>
                    </div>

                    <div>
                        <p className='cardTextoPqn'>classe </p>
                        <p>{item.tipo?tipoClasse(item.tipo):'N/A'} </p>
                    </div>

                    <div>
                        <p className='cardTextoPqn'>local</p>
                        <p>{item.local?item.local:'N/A'}</p>
                    </div>

                    </div>
                </fieldset>

                <fieldset className='fieldsetFlexRow'>
                <legend>Datas</legend>
                <div>
                    <p className='cardTextoPqn'>próx. recarga</p>
                    <p>{item.ultRec.mes? dataLong(item.ultRec.mes)+(item.ultRec.ano? ' de ' : '') : '' } {item.ultRec.ano ? Number(item.ultRec.ano) + 1 : ''}</p>
                    {!item.ultRec.mes && !item.ultRec.ano && <p>N/A</p>}
                </div>

                <div>
                    <p className='cardTextoPqn'>próx. reteste</p>
                    <p>{item.ultRet?item.ultRet:'N/A'}</p>
                </div>
                </fieldset>

                {item.avaria && <fieldset className='fieldsetFlexRow'>
                    <legend>Avarias</legend>
                    <p >{item.avaria} </p>

                </fieldset>}

                <fieldset className='fieldsetAcoes fieldsetFlexRow'>
                    <div className='btnAcoesWrapper' onClick={()=>navigate(`extedit?id=${item.id}`)}>
                        {/* <i className="fa-solid fa-pen-to-square" ></i> */}
                        <p>editar</p>
                    </div>
                    <div className='btnAcoesWrapper' onClick={()=>excluirExtintor(item.id, context.userLogado.id)}>
                        {/* <i className="fa-solid fa-trash-can" ></i> */}
                        <p>excluir</p>
                    </div>

                </fieldset>
            </div>
        })}

    </>
  )
}

export default Extintores
