import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import css from './css/gas.css'
import { GlobalContext } from './GlobalContext'
import { updateBd } from './crudFireBase'
import Footer from './Footer'
import styles from './Gas.module.css'
import BtnAcoesItens from './components/BtnAcoesItens'

const Gas = () => {


    const ctx = useContext(GlobalContext) 
    const navigate = useNavigate()
    const gases = ctx.userLogado.gas.sort((a,b)=>{
        return b.id - a.id
    })

    function deletar(elem, id){
        const res = gases.filter((f)=>{
            return f.id !== elem.id
        })

        ctx.setUserLogado({...ctx.userLogado, gas:res})
        updateBd(id, {gas:res} )
        navigate('/home/gas')
    }

    function arrOrdemCresc(arr){
        const ordem = arr.sort((a, b)=>{return (a - b)})
        return ordem
    }

  return (
    <>
        {/* <NavLink to='gasnovo' className='novoRegistro' >Registrar medidores de gás</NavLink> */}
        <div className={styles.mainContainer}>

            {(ctx.userLogado.gas && gases).map((item)=>{
                return <div key={item.id} className={styles.gasContainer} >

                    <div className={styles.title}>
                        <p className={styles.legends}>{item.diaCriado} - {item.horaCriado}</p>
                    </div>

                    <div className={styles.infos}>

                        <div>
                            <p>Loja</p>
                            <p>Medição</p>
                        </div>

                        {arrOrdemCresc(item.medicao.map((m)=>{return m.loja})).map((ordem)=>{
                            return item.medicao.map((lojas)=>{
                                if (lojas.loja == ordem ){
                                    return <div key={'medicao'+item.id+'_'+lojas.loja} className={styles.dados} >
                                        {/* <div> */}
                                            <p className={styles.legends} >{lojas.loja}</p>
                                            <p className={styles.txtValues}>{lojas.medicao}</p>
                                        {/* </div> */}
                                    </div>
                                }
                            })
                        })}

                    </div>


                    <BtnAcoesItens funcDel={()=>deletar(item,ctx.userLogado.id)} itemId={item.id} editarOnClick={()=>navigate(`edit/id?id=${item.id}`)} />
                    
                    <hr></hr>

                </div>
                
            })}

        </div>

        <Footer numeroItens={ctx.userLogado.gas.length} itens={{gas:ctx.userLogado.gas}} novoItem={'gasnovo'} />
    </>
  )
}

export default Gas
