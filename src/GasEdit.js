import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { updateBd } from './crudFireBase'
import { GlobalContext } from './GlobalContext'

const GasEdit = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    // const [gas, setGas] = React.useState('')
    const [editado, setEditado] = React.useState({
        id: '',
        diaCriado:'',
        horaCriado:'',
        l128:'',
        l132:'',
        l137:'',
        l141:'',
        l152:'',
        l154:'',
        l157:''
    })

    React.useEffect(()=>{
        const item = ctx.userLogado.gas.filter((filtro)=>{
            return filtro.id === Number(search.get('id'))
        })
        // setGas(item)
        setEditado({...editado, id:item[0].id, horaCriado:item[0].horaCriado, diaCriado:item[0].diaCriado, l128:item[0].l128, l132:item[0].l132, l137:item[0].l137, l141:item[0].l141, l152:item[0].l152, l154:item[0].l154, l157:item[0].l157})
    },[])

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
        navigate('/gas')
    }

    window.scrollTo(0,0)


  return (
    <div>
       {/* <div  className='gasCardContentEdit '>

            <div className='gasCardWrapper' >
                <span>Loja 128: </span>
                <input value={editado.l128} onChange={({target})=>setEditado({...editado, l128:target.value})} />
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 132: </span>
                <input value={editado.l132} onChange={({target})=>setEditado({...editado, l132:target.value})}/>

            </div>

            <div className='gasCardWrapper'>
                <span>Loja 137: </span>
                <input value={editado.l137} onChange={({target})=>setEditado({...editado, l137:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 141: </span>
                <input value={editado.l141} onChange={({target})=>setEditado({...editado, l141:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 152: </span>
                <input value={editado.l152} onChange={({target})=>setEditado({...editado, l152:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 154: </span>
                <input value={editado.l154} onChange={({target})=>setEditado({...editado, l154:target.value})}/>
            </div>

            <div className='gasCardWrapper' >
                <span>Loja 157: </span>
                <input value={editado.l157} onChange={({target})=>setEditado({...editado, l157:target.value})}/>
            </div>

            <AcoesCriandoItem voltar='/gas' salvar={()=>handleSave()} />

        </div> */}


        <div  className='gasCard' >

                    <div className='gasCardData'  >

                        <div>
                            <span>Data: </span>
                            <span>{editado.diaCriado}</span>
                        </div>
                            
                        <div>
                            <span>Hora: </span>
                            <span>{editado.horaCriado}</span>
                        </div>

                    </div>

                    <div>

                        <div  className='gasCardContent '>

                            <div className='gasCardWrapper' >
                                <span>Loja 128</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l128} onChange={({target})=>setEditado({...editado, l128:target.value})} />
                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 132</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l132} onChange={({target})=>setEditado({...editado, l132:target.value})} />


                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 137</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l137} onChange={({target})=>setEditado({...editado, l137:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 141</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l141} onChange={({target})=>setEditado({...editado, l141:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 152</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l152} onChange={({target})=>setEditado({...editado, l152:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 154</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l154} onChange={({target})=>setEditado({...editado, l154:target.value})} />

                            </div>

                            <div className='gasCardWrapper' >
                                <span>Loja 157</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={editado.l157} onChange={({target})=>setEditado({...editado, l157:target.value})} />

                            </div>

                            <AcoesCriandoItem voltar='/gas' salvar={()=>save()} />

                        </div>

                    </div>

                </div>


    </div>
  )
}

export default GasEdit
