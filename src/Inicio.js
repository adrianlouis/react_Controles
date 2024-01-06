import React from 'react';
import BtnNewPost from './components/BtnNewPost';
import styles from './Inicio.module.css';
import {
  DEL_POST,
  GET_POSTS,
  UPDATE_DATA,
  USER_GET,
  a,
  simpleQuery,
} from './funcoes/Api';
import { GlobalContext } from './GlobalContext';
import { Timestamp } from 'firebase/firestore';

const Inicio = () => {
  const [textareaToogle, setTextareaToogle] = React.useState(false);
  const [post, setPost] = React.useState('');
  const context = React.useContext(GlobalContext);
  const userId = context.userLogado.id;
  const [posts, setPosts] = React.useState();
  const [prof, setProf] = React.useState(null);
  const [userCrops, setUserCrops] = React.useState([]);
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

  // const test = async () => {
  //   const res = await a();
  //   // console.log(res);
  //   return res;
  // };

  const getPostPhotos = async () => {
    const res = await simpleQuery(context.userLogado.perfil.nick);
    setUserCrops(res);
    return res;
  };

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

  const user = async () => {
    const perfil = await USER_GET(userId);
    // console.log(perfil.perfil.foto);
    setProf(perfil.perfil.foto);
    return perfil;
  };

  function fotopost(ind, foto, crop) {
    const canvas = document.querySelector(`#canv${ind}`);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = foto;
      img.onload = () => {
        ctx.drawImage(img, ...crop);
      };
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

    // const convert = v.replace(/[^\n]/g, 'oi');
    // console.log(convert);
  }

  React.useEffect(() => {
    timelineOrder();
    user();
    getPostPhotos();
  }, [textareaToogle]);

  return (
    <div>
      {!textareaToogle && (
        <BtnNewPost
          onclick={() => {
            setTextareaToogle(!textareaToogle);
          }}
        />
      )}

      {!textareaToogle && (
        <div className={styles.postsWrapper}>
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
                      <canvas
                        className={`${styles.fotoPerfil} canvasFotoPost`}
                        width="80"
                        height="80"
                        id={`canv${i}`}
                      ></canvas>
                      {fotopost(i, m.foto, m.crop)}
                    </div>
                    <div className={styles.nickDate}>
                      <span className={styles.userDataNick}>@{m.name}</span>
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
                  {/* <span className={styles.txtPost}>{m.post}</span> */}
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
            rows="8"
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
