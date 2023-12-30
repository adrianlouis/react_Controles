import React from 'react';
import BtnNewPost from './components/BtnNewPost';
import styles from './Inicio.module.css';
import { UPDATE_DATA, USER_GET } from './funcoes/Api';
import { GlobalContext } from './GlobalContext';
import { Timestamp } from 'firebase/firestore';

const Inicio = () => {
  const [textareaToogle, setTextareaToogle] = React.useState(false);
  const [post, setPost] = React.useState('');
  const context = React.useContext(GlobalContext);
  const userId = context.userLogado.id;

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

  return (
    <div>
      {!textareaToogle && (
        <BtnNewPost
          onclick={() => {
            setTextareaToogle(!textareaToogle);
          }}
        />
      )}

      <div className={styles.postsWrapper}>
        {context.userLogado.posts.map((m, i) => {
          return (
            <div key={'post' + i} className={styles.cardPost}>
              <span>{m.post}</span>
              <p className={styles.cardSignature}>
                <span className={styles.postUserNick}>
                  @{context.userLogado.perfil.nick}
                </span>{' '}
                -{' '}
                {new Date(m.timestamp * 1000).toLocaleDateString('pt-Br', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })}{' '}
                -{' '}
                {new Date(m.timestamp * 1000).toLocaleTimeString('pt-Br', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          );
        })}
      </div>

      {textareaToogle && (
        <div className={styles.txtAreaWrapper}>
          <textarea
            className={styles.newPost}
            name=""
            id=""
            cols="30"
            rows="8"
            value={post}
            onChange={({ target }) => setPost(target.value)}
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
