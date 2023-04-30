import React from 'react'

const BtnAcoesItens = ({funcDel, editarOnClick, itemId}) => {


    function handleDel(el){
        el.parentElement.parentElement.style.display='none'
        el.parentElement.parentElement.nextSibling.style.display='flex'
    }
    function handleCancel(el) {
        el.parentElement.style.display='none'
        el.parentElement.previousSibling.style.display='flex'
    }

  return (
    <div className='botoesPadrao'>

        <div id={`btnContainer${itemId}`} style={{display:'flex'}}>
            <div className='btnAcoesWrapper btnVerde' onClick={editarOnClick}>
                <p>editar</p>
            </div>
            <div className='btnAcoesWrapper btnVermelho'  >
                <p onClick={({currentTarget})=>handleDel(currentTarget)}>excluir</p>
            </div>
        </div>

        <div id={`btnConfirm${itemId}`} style={{display:'none'}}>
            <span>Excluir este item?</span>
            <span onClick={({currentTarget})=>handleCancel(currentTarget, itemId)}>Não</span>
            <span onClick={funcDel}>Sim</span>
        </div>

    </div>
  )
}

export default BtnAcoesItens
