// TENTATIVA COM CONSTRUCTOR FUNCTION

export function Filtro(itens, local){

    this.avariados = function (){
        return itens.filter((f)=>{
            if (f.avaria){
                return f
            }
        })
    }

    this.naoAvariados = function (){
        return itens.filter((f)=>{
            if (!f.avaria){
                return f
            }
        })
    }

    this.crescente = function (){
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

    this.decrescente = function(){
        return this.crescente().reverse()
    }

    this.local = function(){
        return itens.filter((f)=>{
            if (f.local === local){
                return f
            }
        })
    }

    this.sinalOk = () =>{
        return itens.filter((f)=>{
            if (f.sinal === 'Ok'){
                return f
            }
        })
    }

    this.sinalNok = () =>{
        return itens.filter((f)=>{
            if (f.sinal === 'Nok'){
                return f
            }
        })
    }
    
    this.abrigoOk = () =>{
        return itens.filter((f)=>{
            if (f.abrigo === 'Ok'){
                return f
            }
        })
    }

    this.abrigoNok = () =>{
        return itens.filter((f)=>{
            if (f.abrigo === 'Nok'){
                return f
            }
        })
    }

    this.hdPecasOk=()=>{
        return itens.filter((f)=>{
            if (f.pecas.includes('Esguicho') && f.pecas.includes('Storz') && f.pecas.includes('Mangueira')){
                return f
            }
        })
    }

    this.hdPecasNok=()=>{
        return itens.filter((f)=>{
            if (!f.pecas.includes('Esguicho') || !f.pecas.includes('Storz') || !f.pecas.includes('Mangueira')){
                return f
            }
        })
    }

}

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

export function filtroNum(funcao, ctx, ind){

    if (ind === 0){
        // ORDEM CRESCENTE
        const crescente = []
    Object.keys(ctx).map((item)=>{
        return Number(ctx[item].num)}).sort((a,b)=>{
            return a - b
        }).forEach((cada)=>{
            ctx.map((item)=>{
                if (item.num === String(cada)){
                    crescente.push(item)
                }
            })
        })

        return funcao(crescente)

    }else if (ind === 1){
       //ORDEM DECRESCENTE
       const decrescente = []
    Object.keys(ctx).map((item)=>{
        return Number(ctx[item].num)}).sort((a,b)=>{
            return b - a
        }).forEach((cada)=>{
            ctx.map((item)=>{
                if (item.num === String(cada)){
                    decrescente.push(item)
                }
            })
        })

         funcao(decrescente)

    }else{
        //LIMPAR FILTROS

        return funcao('')
    }
    // return console.log(ind)
}

export function filtroLdeBateria(val, itens, ctx ){

    const res = itens.filter((f)=>{
        if (f.dur.slice(0,1) === val.slice(0,1)){
            return f
        }
    })

    return ctx.setItensFiltrados(res)
}

export function filtroAvaria(itens, ctx){
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

    if (ctx.itensFiltrados === ''){
        ctx.setItensFiltrados(avariados)
        ctx.setTipoFiltro('com avarias')
    }else if (JSON.stringify(avariados) === JSON.stringify(ctx.itensFiltrados)){
        ctx.setItensFiltrados(naoAvariados)
        ctx.setTipoFiltro('sem avarias')
    }else{
        ctx.setItensFiltrados('')
        ctx.setTipoFiltro('')

        
    }
}

export function validade(itens, ctx){
    const dataHoje = new Date()

    const elemVencidos = itens.filter((f)=>{
        const dataElem = new Date(f.val)
        if (dataElem <= dataHoje){
            return f
        }
    })

    const elemVencendo = itens.filter((f)=>{
        const dataElem = new Date(f.val)
        if (dataElem.getFullYear() === dataHoje.getFullYear() && dataElem > dataHoje){
            return f
        }
    })

    if (JSON.stringify(ctx.itensFiltrados) !== JSON.stringify(elemVencidos) && JSON.stringify(ctx.itensFiltrados) !== JSON.stringify(elemVencendo)){
         ctx.setItensFiltrados(elemVencidos)
         ctx.setTipoFiltro('com validade vencida')
        }else if(JSON.stringify(ctx.itensFiltrados) === JSON.stringify(elemVencidos)){
            ctx.setItensFiltrados(elemVencendo)
            ctx.setTipoFiltro('vencem este ano')
        }else{
            ctx.setItensFiltrados('')
            ctx.setTipoFiltro('')
    }
}

