import React, { useContext, useRef } from 'react';
import styles from './CanvasPosts.module.css';
import { GlobalContext } from '../GlobalContext';
import { USER_GET } from '../funcoes/Api';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const CanvasPosts = ({ userId, canvasId }) => {
  const context = useContext(GlobalContext);
  const { photosCash, setPhotosCash } = context;

  async function photoCashing() {
    if (photosCash[userId]) {
      setCanvasImg(photosCash[userId].foto, photosCash[userId].crop);
    } else {
      GET_USERS_PHOTOS();
    }
  }

  async function GET_USERS_PHOTOS() {
    const response = await USER_GET(userId);
    const storage = getStorage();
    const gsRef = ref(
      storage,
      `gs://projectfiatlux-5a6ee.appspot.com/${userId}fotoPerfil.jpg`,
    );
    getDownloadURL(gsRef).then((url) => {
      setPhotosCash({
        ...photosCash,
        [userId]: {
          foto: url,
          crop: response.perfil.fotoCrop,
        },
      });
      setCanvasImg(url, response.perfil.fotoCrop);
    });
  }

  function setCanvasImg(foto, crop) {
    const canvas = document.querySelector(`#${canvasId}`);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = foto;
    img.onload = () => {
      ctx.drawImage(img, ...crop);
    };
  }

  React.useEffect(() => {
    photoCashing();
  }, []);

  return (
    <canvas
      id={canvasId}
      width="80"
      height="80"
      className={`${styles.fotoPerfil} canvasFotoPost`}
    ></canvas>
  );
};

export default CanvasPosts;
