import React from 'react'
import css from './css/iconsBottom.css'
import Input from './Input'
import Select from './Select'

const IconsBottom = ({  iconesDefault, modalBuscar, modalFiltro}) => {
    // console.log(modalBuscar.opt)
    const [modalSearch, setModalSearch] = React.useState(false)
    const [modalFilter, setModalFilter] = React.useState(false)
    const [inputBuscar, setInputBuscar] = React.useState('')

    function toggleSearch(){
        setModalSearch(!modalSearch)
        if(!modalSearch){
            setInputBuscar('')
        }
    }

    function toggleFilter(){
        setModalFilter(!modalFilter)
    }
    
    function handleBuscar(valor){
        console.log(valor)
        setInputBuscar(valor)
    }


  return (
    <div className='iconsBottomContainer'>

      {iconesDefault.map((item)=>{
        return <i className={item.icone} onClick={item.acao}></i>
      })}

      {modalBuscar && <i className="fa-solid fa-magnifying-glass" onClick={toggleSearch}></i>}
      {modalBuscar && <div className={modalSearch? "modalFooter ativarModal" : "modalFooter"}>
      <i className="fa-solid fa-backward" onClick={toggleSearch}></i>
        <Input inpTipo='text' value={inputBuscar} onChange={({target})=>handleBuscar(target.value)} />
      </div>}



       {modalFiltro && <> <i className="fa-solid fa-sliders" onClick={toggleFilter} ></i>

        <div className={modalFilter? 'modalFooter ativarModal' : 'modalFooter'}>
            
            <i className="fa-solid fa-backward" onClick={toggleFilter}></i>
            
            {modalFiltro.map((item)=>{
                return <i className={item.icone} onClick={item.acao} ></i>
            })}

        </div>
        </>}

    </div>
  )
}

export default IconsBottom
