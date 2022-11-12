import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import InnerHeader from './InnerHeader'
import css from './css/ext.css'
import InnerFooter from './InnerFooter'
import { Link } from 'react-router-dom'

const Extintores = () => {

    const context = useContext(GlobalContext)
    if (!context.userLogado.ext){
        context.setUserLogado({...context.userLogado, ext:[] })
    }

    // const extTeste = {
    //     num:16550,
    //     classe: 'A',
    //     tipo: 'AP',
    //     local: 'Subsolo',
    //     rec: '06-22',
    //     proxRec: '06-23',
    //     ret: '06-20',
    //     proxRet: '06-25',
    //     avaria: 'Despressurizado',
    //     sinal: 'ok'
    // }

    const [toggle, setToggle] = React.useState(false)

    function toggleDetail(){
        setToggle(!toggle)
    }

    // console.log(context.userLogado)

    function excluirExtintor(elem, id){
        
        const filtrado = context.userLogado.ext.filter((filtro)=>{
            return filtro.id !== id
        })
        // console.log(filtrado)

        context.setUserLogado({...context.userLogado, ext:[...filtrado]})
    }

//     function dcrescente(itens){
       

// }
// dcrescente(context.userLogado.ext)

React.useEffect(()=>{
    if (context.userLogado.ext){

        const decrescente = []
        Object.keys(context.userLogado.ext).map((item)=>{
            return context.userLogado.ext[item].id}).sort((a,b)=>{
                return b - a
            }).forEach((cada)=>{
                context.userLogado.ext.map((item)=>{
                    if (item.id === cada){
                        decrescente.push(item)
                    }
                })
            })

       context.setUserLogado({...context.userLogado, ext:[...decrescente]})

    }
},[])

console.log(context.userLogado.ext)


  return (
    <div>
        
        <InnerHeader/>

        {context.userLogado && context.userLogado.ext.map((item)=>{
            // console.log(item)
            return <div className='cardExt'>

            <div id='extNum'  className='hdInfo' > 
                <span>Extintor tipo {item.tipo}</span>
                <p>{item.num}</p>
            </div>

            <div id='extLocal' className='hdInfo' >
                <span>Local:</span>
                <p>{item.local}</p>
            </div>

            <div id='extProxRec' className='hdInfo' >
                <span>Ult. Rec</span>
                <p>{item.ultRec.mes} - {item.ultRec.ano}</p>

            </div>

            <div id='extProxRet' className='hdInfo' >
                <span>Ult. Ret</span>
                <p>{item.ultRet}</p>
 
            </div>

            {/* <div id='extMais' className='hdInfo extDetail'>
                <span className='extDetailSpan'>não há avarias</span>
            </div> */}

            {item.avaria && <div id='extMais' className='hdInfo extDetail' onClick={toggleDetail}>
                <span className='extDetailSpan'>{toggle?'esconder avarias':'mostrar avarias'}</span>
                </div>
            }


            {item.avaria && toggle && <div id='extAvaria' className='hdInfo' >
                <span>Avarias</span>
                <p className='extSpanAvarias'>{item.avaria}</p>
                </div>
            }

            <div id='hdActions'>
                <Link to={`extedit?id=${item.id}`} className='ldeSubFooterBtn' >Editar</Link>
                {/* <Link to='/' className='ldeSubFooterBtn' >Excluir</Link> */}
                <span className='ldeSubFooterBtn' onClick={({currentTarget})=>excluirExtintor(currentTarget, item.id)}>Excluir</span>

            </div>



        </div>


        })}

        <InnerFooter  botoes={[['/extnovo', 'Novo Extintor']]} />

    </div>
  )
}

export default Extintores
