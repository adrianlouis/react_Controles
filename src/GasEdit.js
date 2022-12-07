import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import { GlobalContext } from './GlobalContext'

const GasEdit = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const [gas, setGas] = React.useState('')
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
        setGas(item)
        setEditado({...editado, id:item[0].id, horaCriado:item[0].horaCriado, diaCriado:item[0].diaCriado})
    },[])

    console.log(editado)

    function handleSave(){

        const outrosGases = ctx.userLogado.gas.map((item)=>{
            if (item.id === editado.id){
                return editado 
            }else{
                return item
            }
        })
           
        ctx.setUserLogado({...ctx.userLogado, gas:[...outrosGases]})
        navigate('/gas')
    }

  return (
    <div>
       <div  className='gasCardContentEdit '>

            <div className='gasCardWrapper' >
                <span>Loja 128: </span>
                <input value={gas.l128} onChange={({target})=>setEditado({...editado, l128:target.value})} />
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 132: </span>
                <input value={gas.l132} onChange={({target})=>setEditado({...editado, l132:target.value})}/>

            </div>

            <div className='gasCardWrapper'>
                <span>Loja 137: </span>
                <input value={gas.l137} onChange={({target})=>setEditado({...editado, l137:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 141: </span>
                <input value={gas.l141} onChange={({target})=>setEditado({...editado, l141:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 152: </span>
                <input value={gas.l152} onChange={({target})=>setEditado({...editado, l152:target.value})}/>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 154: </span>
                <input value={gas.l154} onChange={({target})=>setEditado({...editado, l154:target.value})}/>
            </div>

            <div className='gasCardWrapper' >
                <span>Loja 157: </span>
                <input value={gas.l157} onChange={({target})=>setEditado({...editado, l157:target.value})}/>
            </div>

            <AcoesCriandoItem voltar='/gas' salvar={()=>handleSave()} />

        </div>
    </div>
  )
}

export default GasEdit
