import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import css from './css/gas.css'
import IconesBottom from './IconesBottom'
import IconsBottom from './IconsBottom'
import {ordemNumerica} from './funcoes/filtroFuncoes'
import { GlobalContext } from './GlobalContext'
import Select from './Select'
import MenuFooter from './MenuFooter'

const Gas = () => {

    const ctx = useContext(GlobalContext) 
    const navigate = useNavigate()
     
    // const funcaoNum = ()=> ordemNumerica(gases)
    const novoItem = ()=>navigate('/gasnovo')
    const [inputDisabled, setInputDisabled] = React.useState(true)
    const [inputBuscarMes, setInputBuscarMes] = React.useState('')

    const gases = ctx.userLogado.gas.sort((a,b)=>{
        return b.id - a.id
    })

    function handleContent(content){
        const element = content.nextSibling
        element.classList.contains('hideContent') ? element.classList.remove('hideContent') : element.classList.add('hideContent')
    }

    function home(){
        navigate('/home')
    }

    function sel(){
        console.log('dah')
    }

    function deletar(id){
        
        document.querySelector('#botoes'+id).classList.add('hideContent')
        document.querySelector('#confirmarDel'+id).classList.remove('hideContent')
    }
    function confDel(id, bool){
        if(bool){
            const res = gases.filter((filtro)=>{
            return filtro.id !== id
        })
        ctx.setUserLogado({...ctx.userLogado, gas:[...res]})
        }else{
            document.querySelector('#botoes'+id).classList.remove('hideContent')
            document.querySelector('#confirmarDel'+id).classList.add('hideContent')
        }
    }

    window.scrollTo(0,0)

    function funcaoNum(){
        console.log('ordenar por num')
    }


  return (
    <div className='gasContainer'>


        {ctx.userLogado.gas.map((item)=>{
            return <div key={item.id} className='gasCard' >

                    <div className='gasCardData' onClick={({currentTarget})=>handleContent(currentTarget)} >

                        <div>
                            <span>Data: </span>
                            <span>{item.diaCriado}</span>
                        </div>
                            
                        <div>
                            <span>Hora: </span>
                            <span>{item.horaCriado}</span>
                        </div>

                    </div>

                    <div className='hideContent'>

                        <div  className='gasCardContent '>

                            {item.l128 && <div className='gasCardWrapper' >
                                <span>Loja 128</span>
                                <span>{item.l128}</span>
                            </div>}

                            {item.l132 &&<div className='gasCardWrapper'>
                                <span>Loja 132</span>
                                <span>{item.l132}</span>
                            </div>}

                            {item.l137 && <div className='gasCardWrapper'>
                                <span>Loja 137</span>
                                <span>{item.l137}</span>
                            </div>}

                            {item.l141 && <div className='gasCardWrapper'>
                                <span>Loja 141</span>
                                <span>{item.l141}</span>
                            </div>}

                            {item.l152 && <div className='gasCardWrapper'>
                                <span>Loja 152</span>
                                <span>{item.l152}</span>
                            </div>}

                            {item.l154 && <div className='gasCardWrapper'>
                                <span>Loja 154</span>
                                <span>{item.l154}</span>
                            </div>}

                            {item.l157 && <div className='gasCardWrapper' >
                                <span>Loja 157</span>
                                <span>{item.l157}</span>
                            </div>}

                        </div>

                        <div id={'botoes'+item.id} className='act'>
                            {inputDisabled && <i className="fa-solid fa-pen-to-square shadow" onClick={()=>navigate(`gasedit?id=${item.id}`)} ></i>}
                            {!inputDisabled && <i className="fa-solid fa-floppy-disk shadow"  ></i>}
                            <i className="fa-solid fa-trash-can shadow" onClick={()=>deletar(item.id)} ></i>
                        </div>

                        <div id={'confirmarDel'+item.id} className='confirmarDelContainer hideContent  '>
                            <div>
                                <span>Deseja excluir este item?</span>
                            </div>

                            <div className='escolhasDel'>
                                <i className="fa-solid fa-thumbs-up shadow" onClick={()=>confDel(item.id, true)}></i>
                                <i className="fa-solid fa-thumbs-down shadow" onClick={()=>confDel(item.id, false)}></i>
                            </div>

                        </div>

                    </div>

                </div>
            
        })}


        

        <MenuFooter
            mainIcons={
                [
                    {i: <Link to='/home'><i className="fa-solid fa-house"></i></Link>},
                    {i: <Link to='/gasnovo'><i className="fa-solid fa-file-circle-plus"></i></Link>},
                    {i: <i className="fa-solid fa-magnifying-glass"></i>,
                    click: ()=>{ctx.setModalFooter(1)} },
                    {i: <i className="fa-solid fa-sliders" ></i>,
                    click: ()=>ctx.setModalFooter(2)},
                    {i:<i className="fa-solid fa-door-open"></i>}
                ]
            }

            itens={gases}

            buscarPlaceholder='data'
        />

        {/* <IconsBottom   iconesDefault={[{icone:"fa-solid fa-house", acao:home}, {icone:"fa-solid fa-file-circle-plus", acao:novoItem }]} /> */}
        {/* <IconesBottom /> */}

    </div>
  )
}

export default Gas
