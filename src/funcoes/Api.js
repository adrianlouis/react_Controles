import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

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

export async function GET_CANVAS_PROFILE_PIC(userId) {
  const storage = getStorage();
  const gsRef = ref(
    storage,
    `gs://projectfiatlux-5a6ee.appspot.com/${userId}fotoPerfil.jpg`,
  );
  return getDownloadURL(gsRef).then((url) => {
    if (url) {
      return url;
    } else {
      return '';
    }
  });
}

export async function GET_POSTS() {
  let postagens = [];
  const userRef = collection(db, 'users');
  const q = query(userRef);
  const querySnap = await getDocs(q);

  querySnap.forEach((doc) => {
    // console.log(doc.id, ' => ', doc.data().posts);
    if (doc.data().posts) {
      // const urlPhoto = doc.data().perfil.foto
      //   ? await GET_CANVAS_PROFILE_PIC(doc.id)
      //   : '';

      postagens = [
        ...postagens,
        ...doc.data().posts.map((m) => {
          return {
            name: doc.data().perfil.nick,
            foto: doc.data().perfil.foto,
            crop: doc.data().perfil.fotoCrop,
            post: m.post,
            timestamp: m.timestamp,
            userId: doc.id,
          };
        }),
      ];
    } else {
      return;
    }
  });

  return postagens;
}

// export async function a() {
//   const nickRef = collection(db, 'users');
//   const q = query(nickRef, where('avaria', '==', true));
//   const qSnap = await getDocs(q);
//   const nickArr = [];
//   qSnap.forEach((doc) => {
//     nickArr.push(doc.data());
//   });
//   return nickArr;
// }

export async function simpleQuery(nick) {
  const ref = collection(db, 'users');
  const q = query(ref, where('perfil.nick', '!=', nick));

  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({
      nick: doc.data().perfil.nick,
      foto: doc.data().perfil.foto,
      crop: doc.data().perfil.fotoCrop,
    });
  });
  return arr;
}

export async function GET_USER_BY_NICK(nick) {
  const ref = collection(db, 'users');
  const q = query(ref, where('perfil.nick', '==', nick));

  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
}

// DELETAR TODO O ARRAY
// export async function DEL_POST(userId) {
//   const userRef = doc(db, 'users', userId);
//   await updateDoc(userRef, {
//     posts: deleteField(),
//   });
// }
