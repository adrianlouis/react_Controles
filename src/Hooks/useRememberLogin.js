import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { db } from '../firebase-config';

const useRememberLogin = (email, senha) => {
  const lastUser = email ? email : '';
  const lastCode = senha ? senha : '';
  const usersCollectionRef = collection(db, 'users');

  const user = async () => {
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((docs) => ({ ...docs.data(), id: docs.id }));

    const userFilter = users.filter((f) => {
      console.log(f.email);
      return f.email === lastUser;
    });
    console.log(userFilter);
    return userFilter;
  };

  // console.log(user);

  return { lastUser, lastCode, user };
};

export default useRememberLogin;
