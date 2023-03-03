import React from 'react'
import css from './css/lde.css'
import { NavLink, useNavigate} from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import { refreshBd, removerRegistro, updateBd } from './crudFireBase'


const LdE = () => {
    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()

    // function excluirLde(elem, id){
    async function  excluirLde(idUser, item, campo){
        // const item = await context.userLogado.lde.filter((f)=>{
        //     return f.id !== elem.id
        // })

        // context.setUserLogado({...context.userLogado, lde:item})
        // updateBd(id, {lde:item})

        // deletar
        await removerRegistro(idUser, item, campo)

        //refresh
        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update)

        // navigate('/home/lde')

    }

    function handleExclude(id){
        document.querySelector('#del'+id).style.display='none'
        document.querySelector('#elem'+id).style.display='flex'
    }
    function handleCancel(id){
        document.querySelector('#elem'+id).style.display='none'
        document.querySelector('#del'+id).style.display='flex'
    }

  return (
    <div className='lde'>

    <NavLink id='linkLdeNovo' to='ldenovo' className='novoRegistro' >Registrar luz de emergência</NavLink>

        {!context.itensFiltrados && context.userLogado && context.userLogado.lde.map((item, index)=>{
            return <div key={item.id} className='ldeContent'>

                <fieldset className='fieldsetFlexRow'>

                    <legend>Luz de Emergência</legend>
                    <div className='ldeWrapperDados'>

                        <div>
                            <p className='cardTextoPqn'>número</p>
                            <p>{item.num ? item.num : 'N/A'}</p>
                        </div>

                        <div>
                            <p className='cardTextoPqn'>local</p>
                            <p>{item.local ? item.local : 'N/A'}</p>
                        </div>

                        <div>
                            <p className='cardTextoPqn'>autonomia</p>
                            <p>{item.dur ? item.dur : 'N/A'}</p>
                        </div>

                    </div>
                </fieldset>

                {item.avaria && <fieldset className='fieldsetFlexRow'>

                    <legend>Avarias</legend>

                    <div>
                        <p>{item.avaria}</p>
                    </div>

                </fieldset>}

                <fieldset className='fieldsetAcoes fieldsetFlexRow'>

                    <div id={'del'+item.id} className='btnDelWrapper'><span onClick={()=>navigate(`edit/id?id=${item.id}&ind=${index}`)}>editar</span>
                    <span onClick={()=>handleExclude(item.id)}>excluir</span></div>

                    <div id={'elem'+item.id} className='btnDelWrapper' style={{display:'none'}} >
                    <span>Excluir este item?</span>
                    <span onClick={()=>handleCancel(item.id)}>Não</span>
                    <span className=' confirmExclude' onClick={()=>excluirLde(context.userLogado.id, item, 'lde')}>Sim</span></div>
                    {/* <span className=' confirmExclude' onClick={()=>excluirLde(item, context.userLogado.id)}>Sim</span></div> */}

                </fieldset>

            </div>

            
        })}

    </div> 
    
  )
}

export default LdE
