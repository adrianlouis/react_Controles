import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'

import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { refreshPages } from './funcoes/refresh';

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{

    const [upload, setUpload] = React.useState(false)
    const [usuarios, setUsuarios] = useLocalStorage('usuarios', '')
    const [users, setUsers] = React.useState([]);
    const [userLogado, setUserLogado] = React.useState([])

    const [uploadLde, setUploadLde] = React.useState(false)
    const [lde, setLde] = React.useState([])
    const navigate = useNavigate()
    const [modalFooter, setModalFooter] = React.useState(0)

    const [itensFiltrados, setItensFiltrados] = React.useState('')  
    const [tipoFiltro, setTipoFiltro] = React.useState('')

    const usersCollectionRef = collection(db, "users" )
    
        //CREATE
        // const criarUser = async () =>{
        //     await addDoc(usersCollectionRef, newUser )
        // }
    
        //READ
        React.useEffect(()=>{

            const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const dadosFirebase = data.docs.map((docs)=>({...docs.data(), id:docs.id}))

            setUsers(data.docs.map((docs)=>({...docs.data(), id:docs.id})))

            if (document.cookie && dadosFirebase){
                const cookieSplitado = document.cookie.slice(5).split('&')
                var userPraLogar = dadosFirebase.filter((f)=>{
                    return f.nome === cookieSplitado[0]
                })
        
                setUserLogado(...userPraLogar)
                navigate(refreshPages())
            }
        }

            getUsers()


        },[]) 

        // FUNÇÃO PARA SALVAR EM LOCALSTORAGE O COMPONENTE RENDERIZADO ATUAL CASO A PÁGINA SEJA ATUALIZADA
        window.onbeforeunload = function(e)
        {
            const location = {origin:window.location.origin, path:window.location.pathname, search:window.location.search }
            localStorage.setItem('reload-url', JSON.stringify(location));
        }

    //UPDATE
    // const updateUser = async (id, email) =>{

    // const userDoc = doc(db, "users", id)
    // const novosCampos = newUser 
    // await updateDoc(userDoc, novosCampos)

    // }

    //DELETE
    const deleteUser = async (id) =>{
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
    }

// console.log(userLogado)
    
    React.useEffect(()=>{
        if (userLogado.length === 0){
            return
        }else{
            const item = usuarios.filter((filtro)=>{
                return filtro.nome !== userLogado.nome
            })
            setUsuarios([...item, userLogado ])
        }

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((docs)=>({...docs.data(), id:docs.id})))
            }
    
            getUsers() 

        },[userLogado])   
        
    return <GlobalContext.Provider value={{users, setUsers, tipoFiltro, setTipoFiltro, modalFooter, setModalFooter, itensFiltrados, setItensFiltrados, uploadLde, setUploadLde, upload, setUpload, lde, setLde, usuarios, setUsuarios, userLogado, setUserLogado}}>{children}</GlobalContext.Provider>
}
