import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AcoesCriandoItem from './AcoesCriandoItem'
import css from './css/gas.css'
import { GlobalContext } from './GlobalContext'

const GasNovo = () => {

    const ctx = useContext(GlobalContext)
    const navigate = useNavigate()
    const [id, setId] = React.useState(novoId)
    const dataFull = {
        data:new Date().toLocaleString('pt-BR', {dateStyle:'short'}),
        hora:new Date().toLocaleString('pt-BR', {hour:'2-digit', minute:'2-digit'})
    }
    const [medidores, setMedidores] = React.useState({
        id:id,
        diaCriado:dataFull.data,
        horaCriado:dataFull.hora,
        l128:'',
        l132:'',
        l137:'',
        l141:'',
        l152:'',
        l154:'',
        l157:''
    })

    // React.useEffect(()=>{
    //   window.scrollTo({top:0, left:0,behavior:'smooth'})
    //   console.log('Wadda?!')
    // },[])

    window.scrollTo(0,0)

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

    function save(){
        ctx.setUserLogado({...ctx.userLogado, gas:[...ctx.userLogado.gas, medidores]})
        navigate('/gas')
    }

    


    
    return (
    // <div className='medidoresContainer'>
    //     <label htmlFor='l128'>
    //     Loja 128
    //     </label>
    //   <input id='l128' value={medidores.l128} onChange={({target})=>setMedidores({...medidores, l128:target.value})} ></input>
    //     <label htmlFor='l132'>
    //         Loja 132 
    //     </label>
    //     <input id='l132' value={medidores.l132} onChange={({target})=>setMedidores({ ...medidores, l132:target.value })}></input>
    //     <label htmlFor='l137'>
    //         Loja 137
    //     </label>
    //   <input id='l137' value={medidores.l137} onChange={({target})=>setMedidores({ ...medidores, l137:target.value })}></input>
    //     <label htmlFor='l141'>
    //         Loja 141
    //     </label>
    //   <input id='l141' value={medidores.l141} onChange={({target})=>setMedidores({ ...medidores, l141:target.value })}></input>
    //     <label htmlFor='l152'>
    //         Loja 152
    //     </label>
    //   <input id='l152' value={medidores.l152} onChange={({target})=>setMedidores({ ...medidores, l152:target.value })}></input>
    //     <label htmlFor='l154'>
    //         Loja 154
    //     </label>
    //   <input id='l154' value={medidores.l154} onChange={({target})=>setMedidores({ ...medidores, l154:target.value })}></input>
    //     <label htmlFor='l157'>
    //         Loja 157
    //     </label>
    //   <input id='l157' value={medidores.l157} onChange={({target})=>setMedidores({ ...medidores, l157:target.value })}></input>


    //     <AcoesCriandoItem voltar='/gas' salvar={save} />

    // </div>

    // <div className='gasNovoContainer'>

    //     <div className='gasNovoCard'>
    //       <div className='gasNovoHora'>
    //         Criado em: 08/12/22 - 06:00h
    //       </div>

    //       <div className='gasNovoMedidores'>

          


    //       <div className='gasNovoUnd'>
    //       <p>Loja 128</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 132</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 137</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 141</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 152</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 154</p>
    //       <p>123456</p>
    //       </div>
    //       <div className='gasNovoUnd'>
    //       <p>Loja 157</p>
    //       <p>123456</p>
    //       </div>

    //       </div>
    //     </div>
    // </div>


    

    <div  className='gasCard' >

                    <div className='gasCardData'  >

                        <div>
                            <span>Data: </span>
                            <span>{medidores.diaCriado}</span>
                        </div>
                            
                        <div>
                            <span>Hora: </span>
                            <span>{medidores.horaCriado}</span>
                        </div>

                    </div>

                    <div>

                        <div  className='gasCardContent '>

                            <div className='gasCardWrapper' >
                                <span>Loja 128</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l128} onChange={({target})=>setMedidores({...medidores, l128:target.value})} />
                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 132</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l132} onChange={({target})=>setMedidores({...medidores, l132:target.value})} />


                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 137</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l137} onChange={({target})=>setMedidores({...medidores, l137:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 141</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l141} onChange={({target})=>setMedidores({...medidores, l141:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 152</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l152} onChange={({target})=>setMedidores({...medidores, l152:target.value})} />

                            </div>

                            <div className='gasCardWrapper'>
                                <span>Loja 154</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l154} onChange={({target})=>setMedidores({...medidores, l154:target.value})} />

                            </div>

                            <div className='gasCardWrapper' >
                                <span>Loja 157</span>
                                <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l157} onChange={({target})=>setMedidores({...medidores, l157:target.value})} />

                            </div>

                            <AcoesCriandoItem voltar='/gas' salvar={()=>save()} />

                        </div>

                    </div>

                </div>

  )
}

export default GasNovo
