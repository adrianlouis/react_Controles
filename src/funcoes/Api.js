import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
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

export async function GET_POSTS() {
  let postagens = [];
  const userRef = collection(db, 'users');
  const q = query(userRef);
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    // console.log(doc.id, ' => ', doc.data().posts);
    if (doc.data().posts) {
      postagens = [
        ...postagens,
        ...doc.data().posts.map((m) => {
          return {
            name: doc.data().perfil.nick,
            post: m.post,
            timestamp: m.timestamp,
          };
        }),
      ];
    } else {
      return;
    }
  });

  // console.log(postagens);
  return postagens;
}
