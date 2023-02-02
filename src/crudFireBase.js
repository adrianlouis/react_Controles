import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config';


export function updateBd(id, obj){

    const updateUser = async (id, obj) =>{

    const userDoc = doc(db, "users", id)
    const novosCampos = obj 
    await updateDoc(userDoc, novosCampos)

    }

    updateUser(id, obj)
}