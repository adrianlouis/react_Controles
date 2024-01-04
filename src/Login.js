import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './css/login.css';
import { GlobalContext } from './GlobalContext';
//FIREBASE CMDS
import { db } from './firebase-config';
import { collection, addDoc, getDocs } from '@firebase/firestore';
import CheckBox from './CheckBox';
import { readBD } from './crudFireBase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase-config';
import useRememberLogin from './Hooks/useRememberLogin';

const Login = () => {
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const [form, setForm] = React.useState(1);
  const [loginInput, setLoginInput] = React.useState({ nome: '', senha: '' });
  const [loginMsg, setLoginMsg] = React.useState('');
  const [regInput, setRegInput] = React.useState({
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
  });
  const [regMsg, setRegMsg] = React.useState({
    nome: false,
    email: false,
    senha: false,
    confSenha: false,
  });
  const [pwVisible, setPwVisible] = React.useState(false);
  const [toggleSenhaErro, setToggleSenhaErro] = React.useState({
    senha: false,
    confSenha: false,
  });
  const [toggleConfSenhaTexto, setToggleConfSenhaTexto] = React.useState(false);

  const [regOk, setRegOk] = React.useState({
    nome: false,
    email: false,
    senha: false,
    confSenha: false,
  });
  const [regexRegSenha, setRegexRegSenha] = React.useState({
    num: false,
    esp: false,
    tamanho: false,
  });
  const [logPWVisible, setLogPWVisible] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const { lastUser, lastCode, user } = useRememberLogin(
    localStorage.getItem('logStorageEmail'),
    localStorage.getItem('logStoragePass'),
  );

  const newUser = {
    nome: regInput.nome,
    email: regInput.email,
    senha: regInput.senha,
    perfil: {
      foto: '',
      fotoCrop: '',
      wallpaper: '',
      wallpaperCrop: '',
      nome: regInput.nome,
      nick: '',
      quote: '',
      cor: 'rgb(221, 221, 221)',
    },
    aco: [],
    ext: [],
    gar: [],
    gas: [],
    hd: [],
    lde: [],
    loj: [],
    pcf: [],
    pre: [],
    sal: [],
  };

  const usersCollectionRef = collection(db, 'users');

  // REGISTRO COM AUTH
  const registrarSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, regInput.email, regInput.senha)
      .then((userCredential) => {
        // LOGADO
        const user = userCredential.user;

        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: regInput.nome,
        })
          .then(() => {
            console.log('perfil atualizado');
          })
          .catch((error) => {
            console.log(error);
          });

        const criarUser = async () => {
          await addDoc(usersCollectionRef, newUser);
          const data = await getDocs(usersCollectionRef);
          const users = data.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          const log = users.filter((f) => {
            return f.nome === regInput.nome;
          });
          ctx.setUserLogado(...log);
          navigate('/home/ext');
        };
        criarUser();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //LOGIN COM AUTH
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginInput.nome, loginInput.senha)
      .then((userCredential) => {
        const user = userCredential.user;
        ctx.setFbAuth(user);
        userData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  async function userData() {
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((docs) => ({ ...docs.data(), id: docs.id }));

    const log = users.filter((f) => {
      return f.email === loginInput.nome;
    });

    if (log.length > 0) {
      // LEMBRAR USUARIO MARCADO
      if (remember) {
        localStorage.setItem('logStorageEmail', log[0].email);
        localStorage.setItem('logStoragePass', log[0].senha);
      } else {
        localStorage.removeItem('logStorageEmail');
        localStorage.removeItem('logStoragePass');
      }

      ctx.setUserLogado(...log);
      navigate('/home/inicio');
    } else {
      setLoginMsg('Verifique usuário e senha');
    }
  }

  // APAGAR COOKIE
  // document.cookie = `user=${loginInput.nome}&${loginInput.senha}; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`

  function handleRegistrar(e) {
    e.preventDefault();

    if (regOk.nome && regOk.email && regOk.senha && regOk.confSenha) {
      //REGISTRAR ANTIGO
      // const criarUser = async ()=>{
      //     await addDoc(usersCollectionRef, newUser)
      //     const data = await getDocs(usersCollectionRef);
      //     const users = data.docs.map((docs)=>({...docs.data(), id:docs.id}))
      //     const log = users.filter((f)=>{
      //         return f.nome === regInput.nome
      //     })
      //     ctx.setUserLogado(...log)
      //     // navigate('/home/ext')
      //     navigate('perfil')
      // }
      // criarUser()
    }
  }

  function handleInputBlur(el, n) {
    aplicarCss(el);
    //NOME
    if (n === 1) {
      const userExist = ctx.users.filter((f) => {
        return f.nome === regInput.nome;
      });

      if (userExist.length === 0 && regInput.nome !== '') {
        setRegOk({ ...regOk, nome: true });
        setRegMsg({ ...regMsg, nome: false });
      } else {
        setRegOk({ ...regOk, nome: false });
        setRegMsg({ ...regMsg, nome: true });
      }
    }

    //EMAIL
    if (n === 2) {
      const emailExist = ctx.users.filter((f) => {
        return f.email === regInput.email;
      });

      if (emailExist.length === 0 && regInput.email !== '') {
        setRegOk({ ...regOk, email: true });
        setRegMsg({ ...regMsg, email: false });
      } else {
        setRegOk({ ...regOk, email: false });
        setRegMsg({ ...regMsg, email: true });
      }
    }
  }

  React.useEffect(() => {
    setRegInput({ nome: '', email: '', senha: '', confSenha: '' });
    setRegMsg({ nome: false, email: false, senha: false });
    setRegOk({ nome: false, email: false, senha: false, confSenha: false });
    setToggleConfSenhaTexto(false);
  }, [form]);

  // VALIDAR SENHA COM REGEX
  React.useEffect(() => {
    if (regInput.senha !== '') {
      const regexNum = /([0-9])/g;
      const regexEsp = /(?=.*[!@#$%^&*])/;

      if (regInput.senha.match(regexNum)) {
        setRegexRegSenha((prev) => ({ ...prev, num: true }));
      } else {
        setRegexRegSenha((prev) => ({ ...prev, num: false }));
      }

      if (regInput.senha.match(regexEsp)) {
        setRegexRegSenha((prev) => ({ ...prev, esp: true }));
      } else {
        setRegexRegSenha((prev) => ({ ...prev, esp: false }));
      }

      if (regInput.senha.length > 7) {
        setRegexRegSenha((prev) => ({ ...prev, tamanho: true }));
      } else {
        setRegexRegSenha((prev) => ({ ...prev, tamanho: false }));
      }
    }
  }, [regInput.senha]);

  React.useEffect(() => {
    if (regexRegSenha.num && regexRegSenha.esp && regexRegSenha.tamanho) {
      setRegOk({ ...regOk, senha: true });
    } else {
      setRegOk({ ...regOk, senha: false });
    }
  }, [regexRegSenha]);

  function handleBlurSenha(el, n) {
    aplicarCss(el);

    if (n === 1) {
      if (
        (!regexRegSenha.num && regInput.senha != '') ||
        (!regexRegSenha.esp && regInput.senha != '') ||
        (!regexRegSenha.tamanho && regInput.senha != '')
      ) {
        setToggleSenhaErro({ ...toggleSenhaErro, senha: true });
      } else {
        setToggleSenhaErro({ ...toggleSenhaErro, senha: false });
      }
    }

    if (n === 2) {
      setToggleConfSenhaTexto(true);

      if (regInput.senha === regInput.confSenha) {
        setRegOk({ ...regOk, confSenha: true });
      } else {
        setToggleConfSenhaTexto(true);
      }
    }
  }

  React.useEffect(() => {
    if (toggleConfSenhaTexto) {
      if (regInput.senha === regInput.confSenha) {
        setRegOk({ ...regOk, confSenha: true });
      } else {
        setRegOk({ ...regOk, confSenha: false });
      }
    }
  }, [regInput.confSenha, regInput.senha]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoginMsg('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [loginMsg]);

  function aplicarCss(el) {
    const elem = el.parentElement.classList;
    elem.toggle('neoMorphLoginInput');
  }

  React.useEffect(() => {
    // RECUPERAR USUARIO E SENHA SALVOS NO LEMBRAR (REMEMBER)
    if (lastUser && lastCode) {
      setLoginInput({ nome: lastUser, senha: lastCode });
      setRemember(true);
    }
  }, [lastUser, lastCode]);

  return (
    <>
      {!form && (
        <div className="loginContainer">
          <h1>Controle de Dados</h1>
          {/* <button onClick={()=>navigate('/ext/extedit?id=10')}>OK</button> */}
          <span>
            Este site foi desenvolvido para a prática do framework ReactJs e tem
            como finalidade a criação, edição e consulta de dados, como acesso e
            controle da carros de uma garagem, planilha de extintores, dados
            sobre visitantes e etc. Para a utilização do sistema, cadastre-se ou
            entre com a sua conta.
          </span>
          <div>
            <button className="loginBtns" onClick={() => setForm(1)}>
              Logar
            </button>
            <button className="loginBtns" onClick={() => setForm(2)}>
              Registrar
            </button>
          </div>
        </div>
      )}

      {/* LOGIN  */}
      {form === 1 && (
        <div className="loginContainer">
          {/* <button onClick={()=>delCookie()}>Deletar Cookie</button>
            <button onClick={()=>seeCookie()}>Ver Cookie</button> */}

          {/* {setRegMsg({nome:false, email:false, senha:false, confSenha:false})} */}

          {/* //LOGIN ANTIGO  */}
          {/* <form  onSubmit={(e)=>handleLogin(e)}> */}

          <form onSubmit={(e) => handleLogin(e)}>
            <h1>Login</h1>

            <div className="regInputWrapper">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="regInput"
                type="text"
                placeholder="email"
                value={loginInput.nome}
                onChange={({ target }) =>
                  setLoginInput({ ...loginInput, nome: target.value })
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                onBlur={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
            </div>

            <div className="regInputWrapper">
              <i className="fa-solid fa-key"></i>
              <input
                className="regInput"
                type={logPWVisible ? 'text' : 'password'}
                placeholder="senha"
                value={loginInput.senha}
                onChange={({ target }) =>
                  setLoginInput({ ...loginInput, senha: target.value })
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                onBlur={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
              <i
                className={
                  logPWVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                }
                onClick={() => setLogPWVisible(!logPWVisible)}
              />
            </div>
            {/* <span>Lembrar senha</span> */}
            {/* <CheckBox itens={['Lembrar']} /> */}

            <div id="lembrarLogDiv">
              <label htmlFor="lembrarLogin">
                lembrar
                <input
                  id="lembrarLogin"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
              </label>
            </div>

            <button
              className={
                loginInput.nome !== '' && loginInput.senha !== ''
                  ? 'loginBtns'
                  : 'loginBtns btnInvalido'
              }
            >
              Entrar
            </button>

            <div className="formLinks">
              <span onClick={() => setForm(2)}>registrar</span>
              <span>esqueceu a senha?</span>
            </div>

            <span className="regInvalido">{loginMsg}</span>
          </form>
        </div>
      )}

      {/* REGISTRO  */}
      {form === 2 && (
        <div className="loginContainer">
          <form onSubmit={() => registrarSubmit}>
            {/* <form onSubmit={(event)=>handleRegistrar(event)}> */}
            <h1>Registrar</h1>
            <div className="regInputWrapper">
              <i
                className={
                  regOk.nome
                    ? 'fa-solid fa-user '
                    : 'fa-solid fa-user regInvalido'
                }
              ></i>
              <input
                className={regOk.nome ? 'regInput ' : 'regInput regInvalido'}
                type="text"
                placeholder="nome de usuário"
                value={regInput.nome}
                onChange={({ target }) =>
                  setRegInput({ ...regInput, nome: target.value })
                }
                onBlur={({ currentTarget }) =>
                  handleInputBlur(currentTarget, 1)
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
            </div>

            <div className="regInputWrapper">
              <i
                className={
                  regOk.email
                    ? 'fa-solid fa-envelope '
                    : 'fa-solid fa-envelope regInvalido'
                }
              ></i>
              <input
                className={regOk.email ? 'regInput ' : 'regInput regInvalido'}
                type="email"
                placeholder="usuario@email.com"
                value={regInput.email}
                onChange={({ target }) =>
                  setRegInput({ ...regInput, email: target.value })
                }
                onBlur={({ currentTarget }) =>
                  handleInputBlur(currentTarget, 2)
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
            </div>

            {/* //SENHA */}
            <div className="regInputWrapper">
              <i
                className={
                  regOk.senha
                    ? 'fa-solid fa-key '
                    : 'fa-solid fa-key regInvalido'
                }
              ></i>
              <input
                className={regOk.senha ? 'regInput  ' : 'regInput regInvalido'}
                type={!pwVisible ? 'password' : 'text'}
                placeholder="abc1@def"
                value={regInput.senha}
                onChange={({ target }) =>
                  setRegInput({ ...regInput, senha: target.value })
                }
                onBlur={({ currentTarget }) =>
                  handleBlurSenha(currentTarget, 1)
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
              <i
                className={
                  pwVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                }
                onClick={() => setPwVisible(!pwVisible)}
              ></i>
            </div>

            {/* //CONFSENHA */}
            <div className="regInputWrapper">
              <i
                className={
                  regOk.senha && regOk.confSenha
                    ? 'fa-solid fa-key '
                    : 'fa-solid fa-key regInvalido'
                }
              ></i>
              <input
                disabled={regOk.senha ? false : true}
                style={regOk.senha ? {} : { cursor: 'not-allowed' }}
                className={
                  regOk.confSenha ? 'regInput ' : 'regInput regInvalido'
                }
                type={!pwVisible ? 'password' : 'text'}
                placeholder="abc1@def"
                value={regInput.confSenha}
                onChange={({ target }) =>
                  setRegInput({ ...regInput, confSenha: target.value })
                }
                onBlur={({ currentTarget }) =>
                  handleBlurSenha(currentTarget, 2)
                }
                onFocus={({ currentTarget }) => aplicarCss(currentTarget)}
                required
              />
              <i
                className={
                  pwVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                }
                onClick={() => setPwVisible(!pwVisible)}
              ></i>
            </div>

            <div className="formLinks">
              <span>já é registrado?</span>
              <span onClick={() => setForm(1)}>login</span>
            </div>

            <span className="regInvalido">
              {regMsg.nome && regInput.nome !== ''
                ? 'Nome já cadastrado. '
                : ''}
            </span>
            <span className="regInvalido">
              {regMsg.email && regInput.email !== ''
                ? 'Email já cadastrado. '
                : ''}
            </span>

            {!regOk.senha && regInput.senha !== '' && (
              <>
                <span className="regInvalido">
                  {regexRegSenha.num ? '' : 'Senha precisa de número'}
                </span>
                <span className="regInvalido">
                  {regInput.senha && regexRegSenha.esp
                    ? ''
                    : 'Senha precisa de dígito especial'}
                </span>
                <span className="regInvalido">
                  {regInput.senha && regexRegSenha.tamanho
                    ? ''
                    : 'Senha precisa ao menos 8 dígitos'}
                </span>
              </>
            )}

            {toggleConfSenhaTexto && !regOk.confSenha && (
              <span className="regInvalido">Senhas não conferem</span>
            )}

            <button
              className={
                regOk.nome && regOk.email && regOk.senha && regOk.confSenha
                  ? 'loginBtns'
                  : 'loginBtns btnInvalido'
              }
              onClick={(event) => registrarSubmit(event)}
            >
              Registrar
            </button>
            {/* <button className={regOk.nome && regOk.email && regOk.senha && regOk.confSenha ? 'loginBtns' : 'loginBtns btnInvalido'} onClick={(event)=>handleRegistrar(event)} >Registrar</button> */}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
