import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './css/gas.css'
import { GlobalContext } from './GlobalContext'
import { updateBd } from './crudFireBase'
import Footer from './Footer'

const Gas = () => {


    const ctx = useContext(GlobalContext) 
    const navigate = useNavigate()
    const [toogle, setToogle] = React.useState(true)
    const gases = ctx.userLogado.gas.sort((a,b)=>{
        return b.id - a.id
    })

    function handleContent(content){
        const element = content.nextSibling
        const botoes = element.parentNode.nextSibling

        element.classList.contains('hideContent') ? element.classList.remove('hideContent') : element.classList.add('hideContent')
        botoes.classList.contains('hideContent') ? botoes.classList.remove('hideContent') : botoes.classList.add('hideContent')
    }

    function deletar(elem, id){
        const res = gases.filter((f)=>{
            return f.id !== elem.id
        })

        ctx.setUserLogado({...ctx.userLogado, gas:res})
        updateBd(id, {gas:res} )
        navigate('/home/gas')
    }
    
    function confDel(id, bool){
        if(bool){
            const res = gases.filter((filtro)=>{
            return filtro.id !== id
        })
        ctx.setUserLogado({...ctx.userLogado, gas:[...res]})
        }else{
            document.querySelector('#botoes'+id).classList.remove('hideContent')
            document.querySelector('#confirmarDel'+id).classList.add('hideContent')
        }
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
    <>
        {/* <NavLink to='gasnovo' className='novoRegistro' >Registrar medidores de gás</NavLink> */}
        <div className='lde'>

            {(toogle ? gases : gases.reverse()).map((item)=>{
                console.log(item)
                return <div key={item.id} className='ldeContent' >

                        <fieldset className='fieldsetFlexRow ' >
                            <legend onClick={({currentTarget})=>handleContent(currentTarget)}>{item.diaCriado} - {item.horaCriado}</legend>

                            <div className=' gasCardContent'>

                            {item.medicao.map((m, ind)=>{

                                return <div>
                                    <p className='cardTextoPqn'>L {m.loja}</p>
                                    <p>{m.medicao}</p>
                                </div>
                            })}
                            
                            </div>

                        </fieldset>

                    
                    <fieldset className='fieldsetAcoes fieldsetFlexRow'>

                        <div id={'del'+item.id} className='btnDelWrapper'>
                            {/* <span onClick={()=>navigate(`edit?id=${item.id}`)}>editar</span> */}
                            <span onClick={()=>handleExclude(item.id)}>excluir</span>
                        </div>

                        <div id={'elem'+item.id} className='btnDelWrapper' style={{display:'none'}} >
                            <span>Excluir este item?</span>
                            <span onClick={()=>handleCancel(item.id)}>Não</span>
                            <span className=' confirmExclude' onClick={()=>deletar(item, ctx.userLogado.id)}>Sim</span>
                        </div>

                    </fieldset>

                    </div>
                
            })}

        </div>

        <Footer numeroItens={ctx.userLogado.gas.length} itens={{gas:ctx.userLogado.gas}} novoItem={'gasnovo'} />
    </>
  )
}

export default Gas
