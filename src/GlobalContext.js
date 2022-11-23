import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{
    const [upload, setUpload] = React.useState(false)
    const [userLogado, setUserLogado] = React.useState([])
    const [usuarios, setUsuarios] = useLocalStorage('usuarios', '')
    const [uploadLde, setUploadLde] = React.useState(false)
    const [lde, setLde] = React.useState([])
    const navigate = useNavigate()

    const [itensFiltrados, setItensFiltrados] = React.useState('')  
    
    React.useEffect(()=>{
        if (userLogado.length === 0){
            return
        }else{
            const item = usuarios.filter((filtro)=>{
                return filtro.nome !== userLogado.nome
            })
            setUsuarios([...item, userLogado ])
        }
            
    },[userLogado])   
        
    return <GlobalContext.Provider value={{itensFiltrados, setItensFiltrados, uploadLde, setUploadLde, upload, setUpload, lde, setLde, usuarios, setUsuarios, userLogado, setUserLogado}}>{children}</GlobalContext.Provider>
}
