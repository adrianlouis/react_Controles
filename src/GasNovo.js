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

        const novoArrGas = {gas:[...ctx.userLogado.gas, medidores]}
        updateBd(ctx.userLogado.id, novoArrGas)
        console.log(medidores)

        ctx.setUserLogado({...ctx.userLogado, gas:[...ctx.userLogado.gas, medidores]})
        navigate('/gas')
    }
    
    React.useEffect(()=>{
        updateBd(ctx.userLogado.id, {gas:[...ctx.userLogado.gas]})
    },[ctx.userLogado.gas])
    


    
    return (


    

    // <div  className='gasCard' >

    //                 <div className='gasCardData'  >

    //                     <div>
    //                         <span>Data: </span>
    //                         <span>{medidores.diaCriado}</span>
    //                     </div>
                            
    //                     <div>
    //                         <span>Hora: </span>
    //                         <span>{medidores.horaCriado}</span>
    //                     </div>

    //                 </div>

    //                 <div>

    //                     <div  className='gasCardContent '>

    //                         <div className='gasCardWrapper' >
    //                             <span>Loja 128</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l128} onChange={({target})=>setMedidores({...medidores, l128:target.value})} />
    //                         </div>

    //                         <div className='gasCardWrapper'>
    //                             <span>Loja 132</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l132} onChange={({target})=>setMedidores({...medidores, l132:target.value})} />


    //                         </div>

    //                         <div className='gasCardWrapper'>
    //                             <span>Loja 137</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l137} onChange={({target})=>setMedidores({...medidores, l137:target.value})} />

    //                         </div>

    //                         <div className='gasCardWrapper'>
    //                             <span>Loja 141</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l141} onChange={({target})=>setMedidores({...medidores, l141:target.value})} />

    //                         </div>

    //                         <div className='gasCardWrapper'>
    //                             <span>Loja 152</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l152} onChange={({target})=>setMedidores({...medidores, l152:target.value})} />

    //                         </div>

    //                         <div className='gasCardWrapper'>
    //                             <span>Loja 154</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l154} onChange={({target})=>setMedidores({...medidores, l154:target.value})} />

    //                         </div>

    //                         <div className='gasCardWrapper' >
    //                             <span>Loja 157</span>
    //                             <input className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l157} onChange={({target})=>setMedidores({...medidores, l157:target.value})} />

    //                         </div>

    //                         <AcoesCriandoItem voltar='/gas' salvar={()=>save()} />

    //                     </div>

    //                 </div>

    //             </div>

    <div className='extCard'>

        <fieldset className='fieldsetFlexRow ' >
            <legend >Criar marcação de gás</legend>

            <div className=' gasCardContent '>

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
                    <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l137} onChange={({target})=>setMedidores({...medidores, l137:target.value})} />                </div>

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
                    <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l154} onChange={({target})=>setMedidores({...medidores, l154:target.value})} />                </div>
                
                <div>
                    <p className='cardTextoPqn'>loja 157</p>
                    <input id='inputGasEdit' className='novoGasInput' type='tel' placeholder='00000000' maxLength={8} value={medidores.l157} onChange={({target})=>setMedidores({...medidores, l157:target.value})} />                </div>

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

export default GasNovo
