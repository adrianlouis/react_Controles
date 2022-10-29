import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{
    const [upload, setUpload] = React.useState(false)
    const [userLogado, setUserLogado] = React.useState([])
    // const [usuarios, setUsuarios] = React.useState([])
    const [usuarios, setUsuarios] = useLocalStorage('usuarios', '')
    // const [user, setUser] = useLocalStorage('user', '')
    const [uploadLde, setUploadLde] = React.useState(false)
    const [lde, setLde] = React.useState([])
    const [ext, setExt] = React.useState([])
    const navigate = useNavigate()
    
    
    React.useEffect(()=>{
        if (userLogado.length === 0){
            console.log('NGM LOGADO')
        }else{
            const item = usuarios.filter((filtro)=>{
                return filtro.nome !== userLogado.nome
            })
            setUsuarios([...item, userLogado ])
        }
            
    },[userLogado])
        
    console.log(usuarios)
        
        
    return <GlobalContext.Provider value={{uploadLde, setUploadLde, upload, setUpload, lde, setLde, usuarios, setUsuarios, userLogado, setUserLogado}}>{children}</GlobalContext.Provider>
}
