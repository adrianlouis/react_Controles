import React from 'react'
import css from './css/lde.css'
import {useNavigate} from 'react-router-dom'

const LdE = () => {

    const [luzes, setLuzes] = React.useState([{id: 1, num: 1, local: '4pav B', duracao: '2h', avaria: ''}, { id: 2, num: 2, local:'3pav B', duracao: '6h', avaria: 'lorem asnd aoidja is aisjdiasj diajd siaj sdij ai sdjaisdj iasjdiasjdiaj aoj sdoaj dsoajdosjd oj doajdoajs oasjd oasjdoa djoa sjdao djasaojsd oajs doajsd oajsd asjd aisjd aisdja  aosjd  dojasdoja sdaosjd aosjd '}])
    const navigate = useNavigate()

    function expandir(elem, avaria){

        if (avaria){
            if ( elem.parentNode.style.height !== '250px'){
                elem.parentNode.style.height = '250px'
            }else{
                elem.parentNode.style.height = '80px'
            }
        }else{
            if (elem.parentNode.style.height !== '125px'){
                elem.parentNode.style.height = '125px'
            }else{
                elem.parentNode.style.height = '80px'

            }
        }
    }

  return (
    <>


    {luzes.map((item)=>{
        return <div key={item.id} className='ldeContainer'>
        <div className='contSuperior'  onClick={(e)=>expandir(e.currentTarget, item.avaria)}>
            <div className='ldeUnidade' >
                <p>Núm</p>
                <p>{item.num}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Pav</p>
                <p>{item.local}</p>
            </div>
            <div className='ldeUnidade'>
                <p>Duração</p>
                <p>{item.duracao}</p>
            </div>
            </div>
            { item.avaria && <div className='contInferior'>
                <textarea disabled value={item.avaria} ></textarea>
            </div>}

            <div className='cardAcoes'>
                <span className='notReady'>Editar</span>
                <span className='notReady'>Excluir</span>
            </div>
        </div>
    })}

    <span className='fixedSpan' onClick={()=>navigate('/home')}> voltar </span>

      
    </>
  )
}

export default LdE
