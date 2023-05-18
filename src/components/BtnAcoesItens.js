import React from 'react'
import styles from './BtnAcoesItens.module.css'

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
    <div id='btnAcoesItens' className={styles.container}>

        <div id={`btnContainer${itemId}`} className={styles.wrapper} >
            <div  onClick={editarOnClick}>
            {/* <div className='btnAcoesWrapper btnVerde' onClick={editarOnClick}> */}
                <p><i className="fa-regular fa-pen-to-square"/> editar</p>
            </div>
            <div >
            {/* <div className='btnAcoesWrapper btnVermelho'  > */}
                <p onClick={({currentTarget})=>handleDel(currentTarget)}><i className="fa-regular fa-trash-can"/> excluir</p>
            </div>
        </div>

        <div id={`btnConfirm${itemId}`} className={styles.wrapperConfirmDel} style={{display:'none'}} >
            <span>Excluir este item?</span>
            <span onClick={({currentTarget})=>handleCancel(currentTarget, itemId)}>Não</span>
            <span onClick={funcDel}>Sim</span>
        </div>

    </div>
  )
}

export default BtnAcoesItens
