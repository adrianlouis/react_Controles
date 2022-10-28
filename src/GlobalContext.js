import React from 'react'
import { useNavigate } from 'react-router-dom'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{
    const [upload, setUpload] = React.useState(false)
    const [userLogado, setUserLogado] = React.useState([])
    const [usuarios, setUsuarios] = React.useState([])
    const [perfil, setPerfil] = React.useState()
    const [lde, setLde] = React.useState([])
    const [ext, setExt] = React.useState([])
    const navigate = useNavigate()

    // SALVAR NOVOS USUARIOS PARA LOCALSTORAGE
    React.useEffect(()=>{
        if (upload === true){
            window.localStorage.setItem('usuarios', JSON.stringify(usuarios))
            setUpload(false)
            navigate('/lde')
        }
    },[upload])

    // CARREGAR USUARIOS DO LOCALSTORAGE PARA O SISTEMA 
    React.useEffect(()=>{
        if (window.localStorage.getItem('usuarios')){
            setUsuarios(JSON.parse(window.localStorage.getItem('usuarios')))
        }
    },[])

    return <GlobalContext.Provider value={{upload, setUpload, lde, setLde, usuarios, setUsuarios, userLogado, setUserLogado}}>{children}</GlobalContext.Provider>
}
