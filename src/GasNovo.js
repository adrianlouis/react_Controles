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
    }
    
    return (



    <div className='ldeContent' >

                    {/* <div className='gasCardData' onClick={({currentTarget})=>handleContent(currentTarget)} >

                        <div>
                            <span>Data: </span>
                            <span>{item.diaCriado}</span>
                        </div>
                            
                        <div>
                            <span>Hora: </span>
                            <span>{item.horaCriado}</span>
                        </div>

                    </div> */}

                    {/* <div className='extCard'> */}

                    

                    {/* <fieldset className='fieldsetFlexRow ' >
                        <legend> Criar medição </legend>
                        <div className=' gasCardContent' style={{gridTemplateColumns:'auto auto'}}>


                        <div>
                            <p className='cardTextoPqn'>loja 128</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l128} onChange={({target})=>setMedidores({...medidores, l128:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 132</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l132} onChange={({target})=>setMedidores({...medidores, l132:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 137</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l137} onChange={({target})=>setMedidores({...medidores, l137:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 141</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l141} onChange={({target})=>setMedidores({...medidores, l141:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 152</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l152} onChange={({target})=>setMedidores({...medidores, l152:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 154</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l154} onChange={({target})=>setMedidores({...medidores, l154:target.value})} />
                        </div>
                        <div>
                            <p className='cardTextoPqn'>loja 157</p>
                            <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l157} onChange={({target})=>setMedidores({...medidores, l157:target.value})} />
                        </div>

                        

                        </div>
                    </fieldset> */}

                    <div className='gasNovoMedicao'>
                        <div>
                            <label htmlFor='numeroLoja'>Loja</label>
                            <input id='numeroLoja' maxLength={3} onChange={({target})=>setMedicao({...medicao, loja:target.value})} value={medicao.loja}></input>
                        </div>
                        <div>
                            <label htmlFor='gasMedicao'>Medicao</label>
                            <input id='gasMedicao' maxLength={8} onChange={({target})=>setMedicao({...medicao, medicao:target.value})} value={medicao.medicao} ></input>
                        </div>
                        <div className='gasAcoes'>
                            <i className="fa-regular fa-square-plus" onClick={()=>addMedicaoDeLoja()}></i>
                        </div>


                    </div>

                    <div className='medicaoDisplay'>
                        {
                            medidores.medicao.map((m, i)=>{
                                return <p key={`${m.loja}${i}`}>Loja: {m.loja} Medição: {m.medicao}</p>

                            })
                        }
                    </div>

                    <fieldset className='fieldsetAcoes fieldsetFlexRow'>

                    <span onClick={()=>navigate(`/home/gas`)}>cancelar</span>
                    <span onClick={()=>save(ctx.userLogado.id)}>salvar</span>

                </fieldset>

                    
                   

                </div>

  )
}

export default GasNovo
