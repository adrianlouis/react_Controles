import React from 'react';
import useLocalStorage from './useLocalStorage';

import { db } from './firebase-config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [upload, setUpload] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [usuarios, setUsuarios] = useLocalStorage('usuarios', '');
  const [users, setUsers] = React.useState([]);
  const [userLogado, setUserLogado] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState(false);
  const [filterSelect, setFilterSelect] = React.useState('');
  const [imgTemp, setImgTemp] = React.useState({
    foto: false,
    fCrop: false,
    wpp: false,
    wCrop: false,
  });

  const [photosCash, setPhotosCash] = React.useState([]);

  const [uploadLde, setUploadLde] = React.useState(false);
  const [lde, setLde] = React.useState([]);
  const [modalFooter, setModalFooter] = React.useState(0);

  const [itensFiltrados, setItensFiltrados] = React.useState('');
  const [tipoFiltro, setTipoFiltro] = React.useState('');

  const [fbAuth, setFbAuth] = React.useState('');

  const usersCollectionRef = collection(db, 'users');

  //CREATE
  // const criarUser = async () =>{
  //     await addDoc(usersCollectionRef, newUser )
  // }

  //READ
  React.useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    };

    getUsers();
  }, []);

  //UPDATE
  // const updateUser = async (id, email) =>{
  // const userDoc = doc(db, "users", id)
  // const novosCampos = newUser
  // await updateDoc(userDoc, novosCampos)

  // }

  //DELETE
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  React.useEffect(() => {
    // if (userLogado.length === 0) {
    //   return;
    // } else {
    //   const item = usuarios.filter((filtro) => {
    //     return filtro.nome !== userLogado.nome;
    //   });
    //   setUsuarios([...item, userLogado]);
    // }

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    };

    getUsers();
  }, [userLogado]);

  return (
    <GlobalContext.Provider
      value={{
        imgTemp,
        setImgTemp,
        fbAuth,
        setFbAuth,
        users,
        setUsers,
        tipoFiltro,
        setTipoFiltro,
        modalFooter,
        setModalFooter,
        itensFiltrados,
        setItensFiltrados,
        uploadLde,
        setUploadLde,
        upload,
        setUpload,
        lde,
        setLde,
        usuarios,
        setUsuarios,
        userLogado,
        setUserLogado,
        searchInput,
        setSearchInput,
        token,
        setToken,
        photosCash,
        setPhotosCash,
        filterSelect,
        setFilterSelect,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
