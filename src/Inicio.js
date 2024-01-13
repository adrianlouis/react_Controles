import React from 'react';
import BtnNewPost from './components/BtnNewPost';
import styles from './Inicio.module.css';
import {
  // DEL_POST,
  GET_POSTS,
  UPDATE_DATA,
  USER_GET,
  // a,
  // simpleQuery,
} from './funcoes/Api';
import { GlobalContext } from './GlobalContext';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import CanvasPosts from './components/CanvasPosts';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const Inicio = () => {
  const navigate = useNavigate();
  const [textareaToogle, setTextareaToogle] = React.useState(false);
  const [post, setPost] = React.useState('');
  const context = React.useContext(GlobalContext);
  const userId = context.userLogado.id;
  const [posts, setPosts] = React.useState();
  // const [prof, setProf] = React.useState(null);
  // const [userCrops, setUserCrops] = React.useState([]);
  const [postModal, setPostModal] = React.useState(false);
  const [stampToDel, setStampToDel] = React.useState(null);

  const timelineOrder = async () => {
    const getPost = await GET_POSTS();
    const stamps = getPost
      .map((m) => {
        return m.timestamp;
      })
      .sort((a, b) => {
        return a - b;
      });

    let narr = [];

    stamps.reverse().forEach((el) => {
      getPost.filter((f) => {
        if (f.timestamp === el) {
          narr.push(f);
        } else {
          return '';
        }
      });
    });
    setPosts(narr);
  };

  // const getPostPhotos = async () => {
  //   const res = await simpleQuery(context.userLogado.perfil.nick);
  //   setUserCrops(res);
  //   return res;
  // };

  async function handleSave() {
    const timestamp = Timestamp.fromDate(new Date()).seconds;
    const postagem = () => {
      if (context.userLogado.posts) {
        return [
          ...context.userLogado.posts,
          { post: post, timestamp: timestamp },
        ];
      } else {
        return [{ post: post, timestamp: timestamp }];
      }
    };
    await UPDATE_DATA(userId, postagem(), 'posts');
    const user = await USER_GET(userId);
    context.setUserLogado(user);
    setPost('');
    setTextareaToogle(false);
  }

  if (context.imgTemp.foto && context.imgTemp.fCrop) {
    const canvas = document.querySelectorAll('#canva');
    canvas.forEach((el) => {
      const ctx = el.getContext('2d');
      const img = new Image();
      img.src = context.imgTemp.foto;
      img.onload = () => {
        ctx.drawImage(img, ...context.imgTemp.fCrop);
      };
    });
  }

  // const user = async () => {
  //   const perfil = await USER_GET(userId);
  //   setProf(perfil.perfil.foto);
  //   return perfil;
  // };

  function loggedUser(id) {
    const search = context.photosCash.filter((user) => {
      return user.id === id;
    });

    if (search.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getImgUrl(userId) {
    const item = context.photosCash.filter((url) => {
      return url.id === userId;
    });

    return item;
  }

  function fotopost(ind, foto, crop, uId) {
    const canvas = document.querySelector(`#canv${ind}`);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (loggedUser(uId)) {
        img.src = getImgUrl(uId)[0].url;
        img.onload = () => {
          ctx.drawImage(img, ...getImgUrl(uId)[0].crop);
        };
      } else {
        if (userId === uId) {
          // PEGAR FOTO DO USUARIO LOGADO
          const storage = getStorage();
          const gsRef = ref(
            storage,
            `gs://projectfiatlux-5a6ee.appspot.com/${userId}fotoPerfil.jpg`,
          );
          getDownloadURL(gsRef).then((url) => {
            context.setPhotosCash([
              ...context.photosCash,
              { id: userId, url: url, crop: crop },
            ]);

            img.src = url;
            img.onload = () => {
              ctx.drawImage(img, ...crop);
            };
          });
        } else {
          // PEGAR FOTO DE OUTRO USUARIO
          const storage = getStorage();
          const gsRef = ref(
            storage,
            `gs://projectfiatlux-5a6ee.appspot.com/${uId}fotoPerfil.jpg`,
          );
          getDownloadURL(gsRef).then((url) => {
            context.setPhotosCash([
              ...context.photosCash,
              { id: uId, url: url, crop: crop },
            ]);

            img.src = url;
            img.onload = () => {
              ctx.drawImage(img, ...crop);
            };
          });
        }
      }
    } else {
      return;
    }
  }

  function handlePostMenu(tstamp) {
    setPostModal(true);
    setStampToDel(tstamp);
  }

  async function handleExclude() {
    setPostModal(false);

    const itemToDel = context.userLogado.posts.filter((f) => {
      return f.timestamp !== stampToDel;
    });

    await UPDATE_DATA(userId, itemToDel, 'posts');
    const user = await USER_GET(userId);
    context.setUserLogado(user);
    timelineOrder();
  }

  function handleTextArea(v) {
    setPost(v);
  }

  React.useEffect(() => {
    timelineOrder();
    // user();
    // getPostPhotos();
  }, [textareaToogle]);

  return (
    <div>
      {!textareaToogle && (
        <div className={styles.postsWrapper}>
          <BtnNewPost
            onclick={() => {
              setTextareaToogle(!textareaToogle);
            }}
          />

          {postModal && (
            <div
              className={styles.postMenuModal}
              onClick={() => {
                setPostModal(false);
              }}
            >
              <p
                className="animeUp"
                onClick={() => {
                  handleExclude();
                }}
              >
                <i className="fa-regular fa-trash-can"></i>
                Excluir
              </p>
              <p className="animeUp">
                <i className="fa-solid fa-pencil"></i>Editar
              </p>
            </div>
          )}
          {posts &&
            posts.map((m, i) => {
              return (
                <div key={'post' + i} className={styles.cardPost}>
                  <div className={styles.postUserData}>
                    <div className={styles.canvWrapper}>
                      {/* <CanvasPosts userId={m.userId} canvasId={`canv${i}`} /> */}
                      <canvas
                        className={`${styles.fotoPerfil} canvasFotoPost`}
                        width="80"
                        height="80"
                        id={`canv${i}`}
                      ></canvas>
                      {fotopost(i, m.foto, m.crop, m.userId)}
                    </div>
                    <div className={styles.nickDate}>
                      <span
                        className={styles.userDataNick}
                        onClick={() => navigate(`/profile/user?nick=${m.name}`)}
                      >
                        @{m.name}
                      </span>
                      <span className={styles.cardSignature}>
                        {new Date(m.timestamp * 1000).toLocaleDateString(
                          'pt-Br',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit',
                          },
                        )}{' '}
                        -{' '}
                        {new Date(m.timestamp * 1000).toLocaleTimeString(
                          'pt-Br',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                        h.
                      </span>
                    </div>
                    {m.name === context.userLogado.perfil.nick ? (
                      <i
                        className={`fa-solid fa-ellipsis-vertical ${styles.menuPost}`}
                        onClick={() => {
                          handlePostMenu(m.timestamp);
                        }}
                      ></i>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className={styles.txtPost}>{m.post}</div>
                  <div className={styles.socialIcons}>
                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-regular fa-thumbs-up"></i>
                    <i className="fa-solid fa-retweet"></i>
                    <i className="fa-solid fa-thumbtack"></i>
                  </div>
                </div>
              );
            })}
          {!context.userLogado.posts && <h3>Não há postagens. . .</h3>}
        </div>
      )}

      {/* https://firebase.google.com/docs/firestore/query-data/queries?hl=pt-br#collection-group-query */}

      {textareaToogle && (
        <div className={styles.txtAreaWrapper}>
          <textarea
            className={styles.newPost}
            name=""
            id=""
            cols="30"
            rows="6"
            value={post}
            onChange={({ target }) => handleTextArea(target.value)}
          ></textarea>
          <div className={styles.iconsWrapper}>
            <div
              className={styles.iconTxtWrapper}
              onClick={() => {
                setTextareaToogle(!textareaToogle);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <p>cancelar</p>
            </div>

            <div
              className={styles.iconTxtWrapper}
              onClick={() => {
                handleSave();
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
              <p>salvar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
