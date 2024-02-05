import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase-config';
import Footer from './Footer';

import styles from './Home.module.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from './components/Navbar';
import BtnNewPost from './components/BtnNewPost';
import SearchItens from './components/SearchItens';

const Home = () => {
  const navigate = useNavigate();
  const local = useLocation();
  const path = local.pathname.slice(6);
  const storage = getStorage();
  const context = React.useContext(GlobalContext);
  const larguraTela = window.screen.width;
  const [loading, setLoading] = React.useState(false);
  const [loadingWpp, setLoadingWpp] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [menuLabel, setMenuLabel] = React.useState('');
  const [newItem, setNewItem] = React.useState(false);
  const [searchToogle, setSearchToogle] = React.useState(false);

  React.useEffect(() => {
    switch (local.pathname) {
      case '/home/ext':
        setMenuLabel('Extintores');
        break;
      case '/home/hd':
        setMenuLabel('Hidrantes');
        break;
      case '/home/gas':
        setMenuLabel('Medição de gases');
        break;
      case '/home/lde':
        setMenuLabel('Luzes de emergência');
        break;
      default:
        setMenuLabel('');
        break;
    }

    context.setSearchInput(false);
    context.setItensFiltrados('');
  }, [local]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        return;
      }
    });

    const loadFoto = async () => {
      setLoading(true);

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`);

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
        .then((url) => {
          var canvas = document.querySelector('#canv');
          var ctx = canvas.getContext('2d');
          var img = new Image();
          img.src = url;
          img.onload = () => {
            setLoading(false);

            const crop = () => {
              if (context.userLogado.perfil.fotoCrop) {
                return context.userLogado.perfil.fotoCrop;
              } else {
                return [0, 0, 80, 80];
              }
            };

            const cropDaFoto = crop();
            ctx.drawImage(img, ...cropDaFoto);
            context.setUserLogado((prev) => {
              return {
                ...prev,
                tempFoto: img,
                tempFotoCrop: cropDaFoto,
                perfil: {
                  ...context.userLogado.perfil,
                  foto: img,
                  fotoCrop: crop(),
                },
              };
            });
          };
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            context.setUserLogado((prev) => {
              return {
                ...prev,
                tempFoto: false,
                tempFotoCrop: false,
                perfil: {
                  ...context.userLogado.perfil,
                  foto: false,
                  fotoCrop: false,
                },
              };
            });
            setLoading(false);
          }
          console.log(error);
        });
    };

    if (context.imgTemp.foto && context.imgTemp.fCrop) {
      const canvas = document.querySelector('#canv');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = context.imgTemp.foto;
      img.onload = () => {
        ctx.drawImage(img, ...context.imgTemp.fCrop);
      };
    }

    if (context.imgTemp.wpp && context.imgTemp.wCrop) {
      const canvas = document.querySelector('#canvWpp');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = context.imgTemp.wpp;
      img.onload = () => {
        ctx.drawImage(img, ...context.imgTemp.wCrop);
      };
    }

    const carregarFoto = async () => {
      setLoading(true);

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`);

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
        .then((url) => {
          var canvas = document.querySelector('#canv');
          var ctx = canvas.getContext('2d');
          var img = new Image();
          img.src = url;
          img.onload = () => {
            setLoading(false);
            ctx.drawImage(img, ...context.userLogado.perfil.fotoCrop);
            context.setImgTemp((prev) => {
              return {
                ...prev,
                foto: url,
                fCrop: context.userLogado.perfil.fotoCrop,
              };
            });
          };
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            console.log('ERRO AO CARREGAR IMAGEM DO FIREBASE STORAGE');
            setLoading(false);
          }
        });
    };

    const carregarWallpaper = async () => {
      setLoadingWpp(true);

      //REFERENCIA AO ARQUIVO
      const fotoRef = ref(storage, `/${context.userLogado.id}wpp.jpg`);

      //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
      getDownloadURL(fotoRef)
        .then((url) => {
          var canvas = document.querySelector('#canvWpp');
          var ctx = canvas.getContext('2d');
          var img = new Image();
          img.src = url;
          img.onload = () => {
            setLoadingWpp(false);
            ctx.drawImage(img, ...context.userLogado.perfil.wallpaperCrop);
            context.setImgTemp((prev) => {
              return {
                ...prev,
                wpp: url,
                wCrop: context.userLogado.perfil.wallpaperCrop,
              };
            });
          };
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            console.log('ERRO AO CARREGAR WALLPAPER DO FIREBASE STORAGE');
            setLoadingWpp(false);
          }
        });
    };

    if (
      !context.imgTemp.foto &&
      !context.imgTemp.fCrop &&
      context.userLogado.perfil.foto
    ) {
      carregarFoto();
    }
    if (
      !context.imgTemp.wpp &&
      !context.imgTemp.wCrop &&
      context.userLogado.perfil.wallpaper
    ) {
      carregarWallpaper();
    }

    //SALVAR COR ESCOLHIDA
    if (context.userLogado.perfil.cor) {
      document
        .querySelector(':root')
        .style.setProperty('--corEscolhida', context.userLogado.perfil.cor);
    }

    // NOVO HEADER / PAPEL DE PAREDE, FOTO, ETC
    const fotoRef = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`);

    //PEGAR URL DO DOWNLOAD E APLICAR EM <CANVAS>
    getDownloadURL(fotoRef).then((url) => {});
  }, []);

  React.useEffect(() => {
    const path = local.pathname.slice(6);
    if (path.length > 3) {
      setNewItem(false);
    } else {
      setNewItem(true);
    }
  }, [local.pathname]);

  // function handleNavlink(elem, link) {
  //   const links = document.querySelectorAll('#navbarPerfil li');
  //   context.setItensFiltrados('');

  //   window.scrollTo({ top: 260, behavior: 'smooth' });

  //   for (let i = 0; i < links.length; i++) {
  //     links[i].classList.remove('liVerde');
  //   }
  //   elem.classList.add('liVerde');
  //   navigate(link);
  // }

  window.onscroll = () => {
    const arroba = document.querySelector('#headerProfName');
    const menu = document.querySelector('#menu');
    const foto = document.querySelector('#canv');
    const wallpaper = document.querySelector('#wppCanvasWrapper');
    const canvWpp = document.querySelector('#canvWpp');
    const posTela = window.scrollY;
    const navBar = document.querySelector('#navbarPerfil');

    if (posTela <= 70) {
      const valor = 1 - posTela / 135;
      foto.style.transform = `scale(${valor}) translate(25px, -40px)`;
      foto.style.width = '80px';
      foto.style.height = '80px';

      wallpaper.style.zIndex = 0;
      canvWpp.style.filter = 'brightness(100%) blur(0px)';
    } else {
      // mask.style.top=0
      wallpaper.style.zIndex = 5;
      canvWpp.style.filter = 'brightness(50%) blur(5px)';
    }

    if (posTela >= 175) {
      arroba.style.visibility = 'visible';
      arroba.style.opacity = '1';
      arroba.style.transform = 'translateY(.5rem )';
      menu.style.visibility = 'visible';
      menu.style.opacity = '1';
      menu.style.transform = 'translateY(.3rem )';

      navBar.style.transform = 'translateY(0px )';
      navBar.style.visibility = 'hidden';
      navBar.style.opacity = '0';
      // navBar.style.display = 'none';
    } else {
      menu.style.visibility = 'hidden';
      menu.style.opacity = '0';
      menu.style.transform = 'translateY(0px )';
      arroba.style.transform = 'translateY(0px )';
      arroba.style.visibility = 'hidden';
      arroba.style.opacity = '0';
      navBar.style.visibility = 'visible';
      navBar.style.opacity = '1';
      navBar.style.transform = 'translateY(.3rem )';
      navBar.style.color = 'pink';
      // navBar.style.display = 'flex';
    }
  };

  function minHeaderNav(link) {
    navigate(link);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  async function handleSaveSheet() {
    const mensal = new Date();
    const mes = mensal.toLocaleDateString('pt-br', {
      month: 'long',
    });
    const ano = mensal.toLocaleDateString('pt-br', {
      year: '2-digit',
    });
    const url = local.pathname.slice(6);
    const sheet = context.userLogado[url];
    const document = doc(db, 'users', context.userLogado.id);
    const dados = await getDoc(document);
    const userData = dados.data();
    await updateDoc(document, {
      saved: { ...userData.saved, [url]: { [mes + ano]: sheet } },
    });
  }

  function handleAction() {
    const path = local.pathname.slice(6);
    switch (path) {
      case 'hd':
        navigate('hd/hdnovo');
        break;
      case 'ext':
        navigate('ext/extnovo');
        break;
      case 'lde':
        navigate('lde/ldenovo');
        break;
      case 'gas':
        navigate('gas/gasnovo');
        break;
      default:
        setNewItem(false);
        break;
    }
  }

  return (
    <div>
      <div id="wppCanvasWrapper" className={styles.wpp}>
        <canvas
          className={styles.canv}
          id="canvWpp"
          width={larguraTela}
          height={larguraTela / 3}
        ></canvas>
      </div>
      <div className={styles.minHeader}>
        <span
          id="headerProfName"
          className={styles.headerProfName}
          onClick={() => navigate('/home/perfil')}
        >
          {/* NOME FUNCIONAL @louiskrad */}
          {!openMenu && `@${context.userLogado.perfil.nick}`}
        </span>
        <i class={`fa-solid fa-fire-extinguisher ${styles.headerProfName}`}></i>
        <div
          id="menu"
          style={{ visibility: openMenu ? 'hidden' : 'visible' }}
          className={styles.menu}
          // onClick={() => handleMenu()}
        >
          {/* TO-DO: NAVIGATE PARA PEGAR URL E POR SOMBRA OU BG NOS ICONES DO HEADER  */}
          <i
            style={{
              color: path === 'ext' ? 'aquamarine' : '#d1d1d155',
              transform: path === 'ext' ? 'scale(1.2)' : 'scale(1)',
            }}
            className={`${
              path !== 'ext' ? styles.iconHover : ''
            } fa-solid fa-fire-extinguisher`}
            onClick={() => {
              minHeaderNav('/home/ext');
            }}
          ></i>
          <i
            style={{
              color: path === 'hd' ? 'aquamarine' : '#d1d1d155',
              transform: path === 'hd' ? 'scale(1.2)' : 'scale(1)',
            }}
            className={`${
              path !== 'hd' ? styles.iconHover : ''
            } fa-solid fa-faucet`}
            onClick={() => {
              minHeaderNav('/home/hd');
            }}
          ></i>
          <i
            style={{
              color: path === 'lde' ? 'aquamarine' : '#d1d1d155',
              transform: path === 'lde' ? 'scale(1.2)' : 'scale(1)',
            }}
            className={` ${
              path !== 'lde' ? styles.iconHover : ''
            } fa-solid fa-bolt`}
            onClick={() => {
              minHeaderNav('/home/lde');
            }}
          ></i>
          <i
            style={{
              color: path === 'gas' ? 'aquamarine' : '#d1d1d155',
              transform: path === 'gas' ? 'scale(1.2)' : 'scale(1)',
            }}
            class={`${
              path !== 'gas' ? styles.iconHover : ''
            } fa-solid fa-gauge-high`}
            onClick={() => {
              minHeaderNav('/home/gas');
            }}
          ></i>
          {/* <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={() => handleMenu()}
          ></i> */}
          <i
            onClick={() => navigate('/editprofile')}
            className="fa-solid fa-gear"
          ></i>
          {/* <span>menu</span> */}
        </div>

        {openMenu && (
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={styles.menuOpened}
          >
            {/* <p>{menuLabel}</p> */}
            <p onClick={() => navigate('/home/perfil')}>
              <i className="fa-solid fa-house"></i> Home
            </p>
            {/* <p onClick={() => context.setSearchInput(!context.searchInput)}>
              {!context.searchInput ? 'Buscar ' + menuLabel : 'Fechar Buscar'}
            </p> */}
            {/* <p onClick={() => handleSaveSheet()}>Salvar {menuLabel} atual</p> */}
            {/* <p>Visualizar {menuLabel} salvos</p> */}
            <p>
              <i className="fa-solid fa-car"></i> Acesso à garagem
            </p>
            <p>
              <i className="fa-solid fa-id-card"></i> Liberações
            </p>
            <p>Colaboradores</p>
            <p onClick={() => setOpenMenu(!openMenu)}>Fechar</p>
          </div>
        )}
      </div>
      <div id="perfilWrapper" className={styles.perfil}>
        <div>
          <canvas
            className={`${styles.fotoPerfil}`}
            width="80"
            height="80"
            id="canv"
          ></canvas>
        </div>

        <span
          id="headerProfName"
          className={styles.headerProfName}
          onClick={() => navigate('/home/perfil')}
        >
          @{context.userLogado.perfil.nick}
        </span>

        <p
          className={styles.nomePerfil}
          onClick={() => navigate('/home/perfil')}
        >
          {context.userLogado.perfil.nome}
        </p>
        <p className={styles.nicknamePerfil}>
          {context.userLogado.perfil.nick &&
            '@' + context.userLogado.perfil.nick}
        </p>
        <span
          onClick={() => navigate('/editprofile')}
          className={styles.btnEditPerfil}
        >
          <i className="fa-solid fa-gear"></i>
        </span>
        <p className={styles.quote}>{context.userLogado.perfil.quote}</p>
      </div>
      {/* <div id="linksScroll">
        <ul id="navbarPerfil">
          <li
            className="liVerde"
            onClick={({ currentTarget }) =>
              handleNavlink(currentTarget, '/home/ext')
            }
          >
            Extintores
          </li>
          <li
            onClick={({ currentTarget }) =>
              handleNavlink(currentTarget, '/home/hd')
            }
          >
            Hidrantes
          </li>
          <li
            onClick={({ currentTarget }) =>
              handleNavlink(currentTarget, '/home/lde')
            }
          >
            Luzes de Emergência
          </li>
          <li
            onClick={({ currentTarget }) =>
              handleNavlink(currentTarget, '/home/gas')
            }
          >
            Medição de Gás
          </li>
        </ul>
      </div> */}
      {newItem && !context.searchInput && (
        <>
          <BtnNewPost onclick={() => handleAction()} />
        </>
      )}{' '}
      <Navbar onclick={() => setNewItem(true)} />
      <Outlet />
      {context.searchInput && <SearchItens />}
      <Footer />
    </div>
  );
};

export default Home;
