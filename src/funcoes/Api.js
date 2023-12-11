import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export async function USER_GET(id) {
  const document = doc(db, 'users', id);
  const dados = await getDoc(document);
  const userData = dados.data();
  return { ...userData, id: id };
}

export async function UPDATE_DATA(userId, obj, field) {
  const document = doc(db, 'users', userId);
  await updateDoc(document, { [field]: obj });
}
