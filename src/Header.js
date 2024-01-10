import React from 'react';
import styles from './Header.module.css';
import { GlobalContext } from './GlobalContext';
import { useSearchParams } from 'react-router-dom';
import { GET_USER_BY_NICK } from './funcoes/Api';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const Header = () => {
  const context = React.useContext(GlobalContext);
  const [params, setParams] = useSearchParams();
  const nick = params.get('nick');
  const [data, setData] = React.useState('');

  const userData = async () => {
    const dados = await GET_USER_BY_NICK(nick);
    setData(...dados);
  };
  React.useEffect(() => {
    if (data && data.perfil.wallpaper && data.perfil.wallpaperCrop) {
      const storage = getStorage();
      const gsRef = ref(
        storage,
        `gs://projectfiatlux-5a6ee.appspot.com/${data.id}wpp.jpg`,
      );
      getDownloadURL(gsRef).then((url) => {
        const canvas = document.querySelector('#canvWpp');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = url;
        img.onload = () => {
          ctx.drawImage(img, ...data.perfil.wallpaperCrop);
        };
      });
    } else {
      return;
    }

    if (data.perfil.foto && data.perfil.fotoCrop) {
      const storage = getStorage();
      const gsRef = ref(
        storage,
        `gs://projectfiatlux-5a6ee.appspot.com/${data.id}fotoPerfil.jpg`,
      );
      getDownloadURL(gsRef).then((url) => {
        const canvas = document.querySelector('#canvPic');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = url;
        img.onload = () => {
          ctx.drawImage(img, ...data.perfil.fotoCrop);
        };

        const miniCanv = document.querySelectorAll('#canvPicMini');
        miniCanv.forEach((el) => {
          const context = el.getContext('2d');
          const imgMini = new Image();
          imgMini.src = url;
          imgMini.onload = () => {
            context.drawImage(imgMini, ...data.perfil.fotoCrop);
          };
        });
      });
    }
  }, [data]);

  React.useEffect(() => {
    userData();
  }, []);

  return (
    <div className={styles.header}>
      <div className={[styles.wppCanvWrapper]}>
        <canvas
          className={styles.canv}
          id="canvWpp"
          width={window.screen.width}
          height={window.screen.width / 3}
        ></canvas>
      </div>
      {data && (
        <>
          <header className={styles.headerUserData}>
            <div className={styles.canvPicWrapper}>
              <canvas
                className={styles.canvPic}
                id="canvPic"
                width="80"
                height="80"
              ></canvas>
            </div>
            <span className={styles.nome}>{data.perfil.nome}</span>
            <span className={styles.nick}>
              @{data.perfil.nick.toLowerCase()}
            </span>
            <span className={styles.quote}>{data.perfil.quote}</span>
          </header>
          <div>
            {data.posts.map((m, i) => {
              return (
                <div className={styles.body}>
                  <div key={'post' + i} className={styles.cardPost}>
                    <div className={styles.postUserData}>
                      <div className={styles.canvWrapper}>
                        <canvas
                          className={`${styles.fotoPerfil} canvasFotoPost`}
                          width="80"
                          height="80"
                          id="canvPicMini"
                        ></canvas>
                        {/* {fotopost(i, m.foto, m.crop)} */}
                      </div>
                      <div className={styles.nickDate}>
                        <span
                          className={styles.userDataNick}
                          // onClick={() => navigate(`/profile/user?nick=${m.name}`)}
                        >
                          @{data.perfil.nick}
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
                          // onClick={() => {
                          //   handlePostMenu(m.timestamp);
                          // }}
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
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
