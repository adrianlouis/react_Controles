// RETORNA ITENS COM AVARIAS E SEM AVARIAS
export  function itemAvariado(itens){
    const avariados = itens.filter((f)=>{
        if (f.avaria){
            return f
        }
    })

    const naoAvariados = itens.filter((f)=>{
        if (!f.avaria){
            return f
        }
    })

    return [avariados, naoAvariados]
}

// RETORNA ITENS ORDENADOS POR LOCAL ESCOLHIDO NO SELECT
export  function itemPorLocal(itens, local){
    const res = itens.filter((f)=>{
        if (f.local === local){
            return f
        }
    })
    return res
}

// RETORNA ITENS IGUAIS O VALOR DO INPUT BUSCAR
export function buscar(itens, v){
    const filtro = itens.filter((f)=>{
        return f.num === v
    })
    return filtro
}

// RETORNA ITENS COM ORDEM CRESCENTE OU DECRESCENTE
export function ordemCrescenteDecrescente(itens){
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
        
        const decrescente = []
        Object.keys(itens).map((item)=>{
            return Number(itens[item].num)}).sort((a,b)=>{
                return  b - a
            }).forEach((cada)=>{
                itens.map((item)=>{
                    if (item.num === String(cada)){
                        decrescente.push(item)
                    }
                })
            })

            return [crescente, decrescente]
            // console.log(decrescente)
        // context.setItensFiltrados(crescente)
}