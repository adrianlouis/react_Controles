import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import css from './css/gas.css'
import { GlobalContext } from './GlobalContext'
import { updateBd } from './crudFireBase'
import Footer from './Footer'
import styles from './Hidrantes.module.css'
import BtnAcoesItens from './components/BtnAcoesItens'

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

    function testeOrd(i){
        const arrItens = []
        i.forEach(el => {
            arrItens.push(el.medicao.map((m)=>{
                return Number(m.loja)
            }))
        });

        const ordenado = arrItens.map((m)=>{
            return  m.sort((a,b)=>{return a-b})
        })

        return ordenado
    }

    function testeOrdenados(arr){
        const ordem = arr.sort((a, b)=>{return (a - b)})
        return ordem
    }

    // console.log(testeOrd(ctx.userLogado.gas))


  return (
    <>
        {/* <NavLink to='gasnovo' className='novoRegistro' >Registrar medidores de gás</NavLink> */}
        <div className='lde'>

            {(ctx.userLogado.gas && gases).map((item)=>{
                return <div key={item.id} className={styles.container} >

                    <div>
                        <span><i className="fa-solid fa-calendar-day"></i> {item.diaCriado} - <i className="fa-regular fa-clock"></i> {item.horaCriado}h</span>
                    </div>

                    <div className={styles.infos}>

                  

                        {testeOrdenados(item.medicao.map((m)=>{return m.loja})).map((ordem)=>{
                            return item.medicao.map((lojas)=>{
                                if (lojas.loja == ordem ){
                                    return <div key={'medicao'+item.id+'_'+lojas.loja} className={styles.dados} >
                                            <span className={styles.dadosLoja}><i className="fa-solid fa-shop" /> {lojas.loja} </span>
                                            <span className={styles.dadosMedicao}><i className="fa-solid fa-gauge-high"></i> {lojas.medicao}</span>
                                    </div>
                                }
                            })
                        })}

                    </div>

                    {/* {(item.medicao).map((m, ind)=>{
                        return <div key={'medicao'+m.id}>
                            <span>Loja: {m.loja} - {m.medicao}</span>
                        </div>
                    })} */}

                    <BtnAcoesItens funcDel={()=>deletar(item,ctx.userLogado.id)} itemId={item.id} editarOnClick={()=>navigate(`edit/id?id=${item.id}`)} />
                    

                </div>
                
            })}

        </div>

        <Footer numeroItens={ctx.userLogado.gas.length} itens={{gas:ctx.userLogado.gas}} novoItem={'gasnovo'} />
    </>
  )
}

export default Gas
