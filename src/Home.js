import React from 'react'
import HomeCard from './HomeCard'
import css from './css/home.css'
import Header from './Header'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from './GlobalContext'
//FIREBASE CMDS
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate()
  const context = React.useContext(GlobalContext)
  const [newUser, setNewUser] = React.useState({name:'', email:'', planos:[...context.userLogado.hd]})
  //FIREBASE CMDS
  const [users, setUsers] = React.useState([]);
  const usersCollectionRef = collection(db, "users" )

  //CREATE
  const criarUser = async () =>{
    await addDoc(usersCollectionRef, newUser )
  }

  //READ
  React.useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((docs)=>({...docs.data(), id:docs.id})))
    }

    getUsers() 

  },[])

  //UPDATE
  const updateUser = async (id, email) =>{

    const userDoc = doc(db, "users", id)
    const novosCampos = newUser 
    await updateDoc(userDoc, novosCampos)

  }

  //DELETE
  const deleteUser = async (id) =>{
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

 

    if(!context.userLogado){
      navigate('/')
    }
    function nav(dest){
      navigate(dest)
    }
    
    // patch para usuarios antigos
    if(!context.userLogado.gas){
      context.setUserLogado({...context.userLogado, gas:[]})
    }

  return (
    <>
    
    {/* <Header /> */}

    <div className='homeContainer'>


        <div className='cards'>

        <input type='text' placeholder='Nome...' onChange={({target})=>setNewUser({...newUser, name:target.value})} />
        <input type='text' placeholder='Email...' onChange={({target})=>setNewUser({...newUser, email:target.value})} />

        <button onClick={criarUser}>SALVAR</button>

      <ul>
        {users.map((m, i)=>{
          return <div  key={m.name+i}>
          <li>{m.name}</li>
          <li>{m.email}</li>
          <button onClick={()=>{updateUser(m.id, m.email)}}>mudar email</button>
          <button onClick={()=>deleteUser(m.id)}>deletar</button>
          </div>
        })}
      </ul>

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.ext.length+' Extintores'} onClick={()=>nav('/ext')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.lde.length+' Luzes de Emergência'}  onClick={()=>nav('/lde')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.hd.length+' Hidrantes'} onClick={()=>nav('/hd')} />

        <HomeCard spanCardClass='cardText' divClass='homeCardAtivo homeCardContainer' cardNome={context.userLogado.gas.length+' Medições de Gás'} onClick={()=>nav('/gas')} />

        <HomeCard spanCardClass='cardTexto' divClass='homeCardInativo homeCardContainer' cardNome='Portas Corta Fogo' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Garagem' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Prestadores' />

        <HomeCard spanCardClass='cardText' divClass='homeCardAtivo homeCardContainer' cardNome='Salistas' onClick={()=>nav('/sala')} />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Lojistas' />

        <HomeCard spanCardClass='cardText' divClass='homeCardInativo homeCardContainer' cardNome='Escoltas' />

        </div>
      
    </div>
    </>
  )
}

export default Home
