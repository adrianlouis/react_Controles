import React from 'react'
import { GlobalContext } from './GlobalContext'

const useFiltrarLde = (filtros) => {
    const [temp, setTemp] = React.useState('')

    const context = React.useContext(GlobalContext)
    const luzes = context.userLogado.lde

    // console.log(luzes)

    const [hook, setHook] = React.useState(filtros)

    // 0 = numerico
    // 1 = autonomia
    // 2 = local
    // 3 = avarias

    function crescente(itens){
        const crescente = []
        Object.keys(itens).map((item)=>{
            return Number(itens[item].num)}).sort((a,b)=>{
                return a - b
            }).forEach((cada)=>{
                itens.map((item)=>{
                    if (item.num === String(cada)){
                        crescente.push(item)
                    }
                })
            })
            return crescente
    }

    // function dcrescente(itens){
    //     const decrescente = []
    //     Object.keys(itens).map((item)=>{
    //         return Number(itens[item].num)}).sort((a,b)=>{
    //             return b - a
    //         }).forEach((cada)=>{
    //             itens.map((item)=>{
    //                 if (item.num === String(cada)){
    //                     decrescente.push(item)
    //                 }
    //             })
    //         })
    //     return decrescente
    // }

    // FILTRO POR AUTONOMIA
    // function autonomia(itens){
    //     const res = itens.filter((fill)=>{
    //         return fill.dur === filtros[1]
    //     })
    //     return res
    // }

    // FILTRO POR LOCALIZAÇÃO
    // function local(itens){
    //     const res = itens.filter((fill)=>{
    //         return fill.local === filtros[2]
    //     })
    //     return res
    // }

    // FILTRO POR AVARIAS
    // function avarias(itens){
    //     const res = itens.filter((fill)=>{
    //         if (filtros[3] === 'Com avarias'){
    //             return fill.avaria !== ''
    //         }else if(filtros[3] === 'Sem avarias') {
    //             return fill.avaria === ''
    //         }else{
    //             return itens
    //         }
    //     })
    //     return res
    // }

    if (filtros === 'Crescente'){
        setTemp(crescente(luzes))
    }
  
    
    // console.log(filtros)


    // console.log(dcrescente(autonomia(luzes)))


return [temp]

}

export default useFiltrarLde;