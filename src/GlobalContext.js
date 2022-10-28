import React from 'react'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{
    const [upload, setUpload] = React.useState(false)
    const [userLogado, setUserLogado] = React.useState([])
    const [usuarios, setUsuarios] = React.useState([])
    const [perfil, setPerfil] = React.useState()
    const [lde, setLde] = React.useState([])
    const [ext, setExt] = React.useState([])

    // SALVAR NOVOS USUARIOS PARA LOCALSTORAGE
    React.useEffect(()=>{
        if (upload){
            window.localStorage.setItem('usuarios', JSON.stringify(usuarios))
            console.log('EFFEITO DE SALVAR ATIVADO NOVOS PARA LOCALSTORAGE')
        }

        setUpload(false)

    },[usuarios])

    // CARREGAR USUARIOS DO LOCALSTORAGE PARA O SISTEMA 
React.useEffect(()=>{
    if (window.localStorage.getItem('usuarios')){
        setUsuarios(JSON.parse(window.localStorage.getItem('usuarios')))
    }
},[])


    return <GlobalContext.Provider value={{upload, setUpload, lde, setLde, usuarios, setUsuarios, userLogado, setUserLogado}}>{children}</GlobalContext.Provider>
}
