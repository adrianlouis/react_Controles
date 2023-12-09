import React, { useContext } from 'react';
// import css from './css/profile.css'
import styles from './Profile.module.css';
import { USER_GET } from './funcoes/Api';
import { GlobalContext } from './GlobalContext';

const Profile = () => {
  const ctx = useContext(GlobalContext);
  const [user, setUser] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  async function handleData(id) {
    const userData = await USER_GET(id);
    setLoading(false);
    setUser(userData);
    // console.log(userData);
    // return userData;
  }

  React.useEffect(() => {
    setUser(handleData(ctx.userLogado.id));
  }, [ctx.userLogado.id]);

  return (
    <div className={styles.perfil}>
      <h3>Dados salvos atuais</h3>
      <div className={styles.savedItensWrap}>
        {!loading && (
          <>
            <div className={styles.cardSavedItens}>
              <div className={`${styles.iconWrapper} animateLeft`}>
                <i className="fa-solid fa-fire-extinguisher"></i>
                <p>{user.ext ? user.ext.length : '0'}</p>
              </div>
              <span className={`${styles.cardSpan} animateLeft`}>Extintor</span>
            </div>

            <div className={styles.cardSavedItens}>
              <div className={`${styles.iconWrapper} animateLeft`}>
                <i className="fa-solid fa-faucet"></i>
                <p>{user.hd ? user.hd.length : '0'}</p>
              </div>
              <span className={`${styles.cardSpan} animateLeft`}>Hidrante</span>
            </div>
            <div className={styles.cardSavedItens}>
              <div className={`${styles.iconWrapper} animateLeft`}>
                <i className="fa-solid fa-lightbulb"></i>
                <p>{user.lde ? user.lde.length : '0'}</p>
              </div>
              <span className={`${styles.cardSpan} animateLeft`}>
                Luz de Emergência
              </span>
            </div>
          </>
        )}

        {loading && (
          <>
            <div className={styles.cardSavedItens}></div>
            <div className={styles.cardSavedItens}></div>
            <div className={styles.cardSavedItens}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
