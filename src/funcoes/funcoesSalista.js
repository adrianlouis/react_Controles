var boo = false

export function virarCardSalista(el){
    boo = !boo
    const frente = el.children[0]
    const costas = el.children[1]

    if (boo){
        frente.style.transform='rotateY(180deg)'
        costas.style.transform='rotateY(0)'
    }else{
        frente.style.transform='rotateY(0)'
        costas.style.transform='rotateY(180deg)'
    }

}