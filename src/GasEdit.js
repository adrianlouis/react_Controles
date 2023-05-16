import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import AcoesCriandoItem from './AcoesCriandoItem'
import { updateBd } from './crudFireBase'
import { GlobalContext } from './GlobalContext'
import styles from './Gas.module.css'
import GasEdt from './components/GasEdt'

const GasEdit = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const search = new URLSearchParams(location.search)

    const medicao = ctx.userLogado.gas.filter((f)=>{
        return f.id === Number(search.get('id'))
    })

    // const [edit, setEdit] = React.useState('')

    const [editado, setEditado] = React.useState({
        id: medicao[0].id,
        diaCriado:medicao[0].diaCriado,
        horaCriado:medicao[0].horaCriado,
        l128:medicao[0].l128,
        l132:medicao[0].l132,
        l137:medicao[0].l137,
        l141:medicao[0].l141,
        l152:medicao[0].l152,
        l154:medicao[0].l154,
        l157:medicao[0].l157
    })


    // console.log(medicao[0].medicao)

    
    // medicao[0].medicao.map((m)=>{
    //     return setD([...d,{loja:m.loja, medicao:m.medicao} ])
    // })

    function teste(){
        const arr = []
        medicao[0].medicao.map((m)=>{
            return arr.push({loja:m.loja, medicao:m.medicao})
        })
        return arr
    }


    const copia = [...medicao]
    const lojaOrdenada = copia[0].medicao.map((m)=>{return m.loja}).sort((a, b)=>{return (a-b)})
    const arrayOrdenado = []

    lojaOrdenada.map((m)=>{
        return copia[0].medicao.filter((f)=>{
            if (m === f.loja){
                // console.log(f)
                // return f
                arrayOrdenado.push(f)
            }
        })
    })

    function save(){

        const outrosGases = ctx.userLogado.gas.map((item)=>{
            if (item.id === editado.id){
                return editado 
            }else{
                return item
            }
        })

        updateBd(ctx.userLogado.id, {gas:outrosGases})
           
        ctx.setUserLogado({...ctx.userLogado, gas:[...outrosGases]})
        navigate('/home/gas')
    }

    function salvar(){
        const itens = document.querySelectorAll('#editWrap')
        const arrayNovo = []
        itens.forEach((el)=>{
            arrayNovo.push({loja:el.firstChild.value, medicao:el.firstChild.nextSibling.value}) 
        })

        const objToSave = ctx.userLogado.gas.map((m)=>{
            if (m.id === medicao[0].id){
                return {...medicao[0], medicao:arrayNovo}
            }else{
                return m
            }
        })

        updateBd(ctx.userLogado.id, {gas:objToSave} )

        ctx.setUserLogado({...ctx.userLogado, gas:objToSave})

        navigate('/home/gas')

    }
    

  return (
    // <div className='ldeContent'>

    //     <fieldset className='fieldsetFlexRow ' >
    //         <legend >{editado.diaCriado} - {editado.horaCriado}</legend>

    //         <div className=' gasCardContent '>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 128</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l128} onChange={({target})=>setEditado({...editado, l128:target.value})} />

    //             </div>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 132</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l132} onChange={({target})=>setEditado({...editado, l132:target.value})}/>

    //             </div>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 137</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l137} onChange={({target})=>setEditado({...editado, l137:target.value})}/>
    //             </div>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 141</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l141} onChange={({target})=>setEditado({...editado, l141:target.value})}/>

    //             </div>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 152</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l152} onChange={({target})=>setEditado({...editado, l152:target.value})}/>
    //             </div>

    //             <div>
    //                 <p className='cardTextoPqn'>loja 154</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l154} onChange={({target})=>setEditado({...editado, l154:target.value})}/>
    //             </div>
                
    //             <div>
    //                 <p className='cardTextoPqn'>loja 157</p>
    //                 <input id='inputGasEdit' className='newLde inputEditGas' type='tel' maxLength={8} value={editado.l157} onChange={({target})=>setEditado({...editado, l157:target.value})}/>
    //             </div>

    //         </div>

    //     </fieldset>

    //     <div id='divBotoesAcoes' >


    //         <fieldset className='fieldsetAcoes fieldsetFlexRow'>
    //             <div className='btnAcoesWrapper' onClick={()=>navigate('/home/gas')} >
    //                 <i className="fa-solid fa-angles-left" ></i>
    //                 <p>cancelar</p>
    //             </div>
    //             <div className='btnAcoesWrapper' onClick={()=>save()}>
    //                 <i className="fa-solid fa-floppy-disk" ></i>
    //                 <p>salvar</p>
    //             </div>
    //         </fieldset>
    //     </div>

    // </div>
    <div>
        <h2>Editar medições de gás</h2>
        {arrayOrdenado.map((m, ind)=>{
            return <div key={'item'+ind} className={styles.wrapperEdicaoGas}>
                {/* <input className={styles.inputEdicaoLoja} type='tel' value={m.loja} onChange={({target})=>setD([...d, {loja:target,}])} ></input>
                <input type='tel' className={styles.inputEdicaoMedicao} value={m.medicao} ></input> */}

                
                <GasEdt loja={m.loja} valor={m.medicao} />

                
                {/* <i className="fa-regular fa-trash-can"></i> */}
            </div>
        })}

        <div className={styles.editActBtn}>
            <span onClick={()=>navigate('/home/gas')} >Cancelar</span>
            <span onClick={()=>salvar()}>Salvar</span>
        </div>

    </div>
  )
}

export default GasEdit
