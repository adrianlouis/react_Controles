import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export async function USER_GET(id) {
  const document = doc(db, 'users', id);
  const dados = await getDoc(document);
  const userData = dados.data();
  return userData;
}
