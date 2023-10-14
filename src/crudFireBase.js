import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase-config';


const usersCollectionRef = collection(db, "users" )



export function updateBd(id, obj){

    const updateUser = async (id, obj) =>{

    const userDoc = doc(db, "users", id)
    const novosCampos = obj 
    await updateDoc(userDoc, novosCampos)

    }

    updateUser(id, obj)
}



export async function adicionarRegistro(id, obj, field){
    const add = async ()=>{
        const document = doc(db, 'users', id)
        await updateDoc(document, {[field]: arrayUnion(obj)})

    }

    await add(id, obj)
}

export async function removerRegistro(id, obj, field){
    const remove = async ()=>{
        const document = doc(db, 'users', id)
        await updateDoc(document, {[field]: arrayRemove(obj)})
    }

    await remove(id, obj)
}

export async function refreshBd(user){

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((docs) => ({...docs.data(), id:docs.id}))
        const updated = users.filter((f)=>{
            return f.nome === user
        })
        return updated
    }
    
    return await getUsers()
}

export async function checkBd(dadoProcurado, idUser) {

    const check = async () => {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((docs) => ({...docs.data(), id:docs.id}))
        const log = users.filter((f)=>{
            return (f.nome === dadoProcurado && f.id !== idUser)
        })
        return log
    }

    return await check()
}

