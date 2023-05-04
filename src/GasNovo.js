import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import css from './css/gas.css'
import { GlobalContext } from './GlobalContext'
import{updateBd} from './crudFireBase'

const GasNovo = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const [id, setId] = React.useState(novoId)
    const dataFull = {
        data:new Date().toLocaleString('pt-BR', {dateStyle:'short'}),
        hora:new Date().toLocaleString('pt-BR', {hour:'2-digit', minute:'2-digit'})
    }
    // const [medidores, setMedidores] = React.useState({
    //     id:id,
    //     diaCriado:dataFull.data,
    //     horaCriado:dataFull.hora,
    //     l128:'',
    //     l132:'',
    //     l137:'',
    //     l141:'',
    //     l152:'',
    //     l154:'',
    //     l157:''
    // })

    // React.useEffect(()=>{
    //   window.scrollTo({top:0, left:0,behavior:'smooth'})
    //   console.log('Wadda?!')
    // },[])

    // window.scrollTo(0,0)

    // ENCONTRAR ID
    function novoId() {

        if (ctx.userLogado.gas.length > 0) {
        const numeros = Object.keys(ctx.userLogado.gas).map((item) => {
            return ctx.userLogado.gas[item].id;
        });
        return (Math.max(...numeros) + 1);
        } else {
        return 1;
        }
    }

    function save(id){

        const novoArrGas = {gas:[...ctx.userLogado.gas, medidores]}
        ctx.setUserLogado({...ctx.userLogado, gas:[...ctx.userLogado.gas, medidores]})
        updateBd(id, novoArrGas)

        navigate('/home/gas')
    }
    
    // React.useEffect(()=>{
    //     updateBd(ctx.userLogado.id, {gas:[...ctx.userLogado.gas]})
    // },[ctx.userLogado.gas])
    
    
    
    //     id:id,
    //     diaCriado:dataFull.data,
    //     horaCriado:dataFull.hora,
    const [medicao, setMedicao] = React.useState({loja:'', medicao:''})
    const [medidores, setMedidores] = React.useState({id:id, diaCriado:dataFull.data, horaCriado:dataFull.hora, medicao:[]})

    function addMedicaoDeLoja(){
        setMedidores({...medidores, medicao:[...medidores.medicao, medicao]})
        setMedicao({loja:'', medicao:''})
        document.querySelector('#numeroLoja').focus()
    }

    function excluirLinha(ind){
        const abah = medidores.medicao.filter((f, i)=>{
            if (i !== ind){
                return f
            }
        })

        setMedidores({...medidores, medicao:abah})
    }
    // console.log(medidores)
    
    return (



    <div className='ldeContent' >

        <div className='listaAddGas'>
            {
                medidores.medicao.map((m, i)=>{
                    return <div className='listaAddGasLines'>
                        <p id='listaAddGasSpan'>Loja: {m.loja} - Medição: {m.medicao}</p>
                        <i className="fa-solid fa-square-xmark" onClick={()=>excluirLinha(i)}></i>
                    </div>

                })
            }

            <div className='addGasLine'>
                <div>
                    <label htmlFor='numeroLoja'>Loja</label>
                    {/* <p>Loja</p> */}
                    <input id='numeroLoja' type='tel' maxLength={3} onChange={({target})=>setMedicao({...medicao, loja:target.value})} value={medicao.loja}></input>
                </div>

                <div>
                    <label htmlFor='gasMedicao'>Medicao</label>
                    <input id='gasMedicao' type='tel' maxLength={8} onChange={({target})=>setMedicao({...medicao, medicao:target.value})} value={medicao.medicao} ></input>
                </div>

                <div className='gasAcoes'>
                    <i className="fa-solid fa-square-plus" onClick={()=>addMedicaoDeLoja()}></i>
                </div>
            </div>

        </div>

        <fieldset className='fieldsetAcoes fieldsetFlexRow'>

            <span onClick={()=>navigate(`/home/gas`)}>cancelar</span>
            <span onClick={()=>save(ctx.userLogado.id)}>salvar</span>

        </fieldset>            

    </div>

  )
}

export default GasNovo
