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

    const medicao = ctx.userLogado.gas.filter((f)=>{
        return f.id === Number(search.get('id'))
    })

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

    console.log(editado)

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
    <div className='extCard'>

        <fieldset className='fieldsetFlexRow ' >
            <legend >{editado.diaCriado} - {editado.horaCriado}</legend>

            <div className=' gasCardContent '>

                <div>
                    <p className='cardTextoPqn'>loja 128</p>
                    <input id='inputGasEdit' type='tel' value={editado.l128} onChange={({target})=>setEditado({...editado, l128:target.value})} />

                </div>

                <div>
                    <p className='cardTextoPqn'>loja 132</p>
                    <input id='inputGasEdit' type='tel' value={editado.l132} onChange={({target})=>setEditado({...editado, l132:target.value})}/>

                </div>

                <div>
                    <p className='cardTextoPqn'>loja 137</p>
                    <input id='inputGasEdit' type='tel' value={editado.l137} onChange={({target})=>setEditado({...editado, l137:target.value})}/>
                </div>

                <div>
                    <p className='cardTextoPqn'>loja 141</p>
                    <input id='inputGasEdit' type='tel' value={editado.l141} onChange={({target})=>setEditado({...editado, l141:target.value})}/>

                </div>

                <div>
                    <p className='cardTextoPqn'>loja 152</p>
                    <input id='inputGasEdit' type='tel' value={editado.l152} onChange={({target})=>setEditado({...editado, l152:target.value})}/>
                </div>

                <div>
                    <p className='cardTextoPqn'>loja 154</p>
                    <input id='inputGasEdit' type='tel' value={editado.l154} onChange={({target})=>setEditado({...editado, l154:target.value})}/>
                </div>
                
                <div>
                    <p className='cardTextoPqn'>loja 157</p>
                    <input id='inputGasEdit' type='tel' value={editado.l157} onChange={({target})=>setEditado({...editado, l157:target.value})}/>
                </div>

            </div>

        </fieldset>

        <div id='divBotoesAcoes' >


            <fieldset className='fieldsetAcoes fieldsetFlexRow'>
                <div className='btnAcoesWrapper' onClick={()=>navigate('/gas')} >
                    <i className="fa-solid fa-angles-left" ></i>
                    <p>cancelar</p>
                </div>
                <div className='btnAcoesWrapper' onClick={()=>save()}>
                    <i className="fa-solid fa-floppy-disk" ></i>
                    <p>salvar</p>
                </div>
            </fieldset>
        </div>

    </div>
  )
}

export default GasEdit
