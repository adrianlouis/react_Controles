import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import css from './css/ext.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { dataLong } from './funcoes/extDatas'
import { refreshBd, removerRegistro } from './crudFireBase'

const Extintores = () => {

    const context = useContext(GlobalContext)
    const reverso = [...context.userLogado.ext].reverse()
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
        
    }
    const navigate = useNavigate()

    async function excluirExtintor(idUser, item, campo){
        await removerRegistro(idUser, item, campo)
        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update)
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

  
        {reverso.map((item)=>{
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
                    <div className='btnAcoesWrapper' onClick={()=>excluirExtintor(context.userLogado.id, item, 'ext')}>
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
