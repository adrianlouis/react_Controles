import React from 'react';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onclick }) => {
  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function handleNavlink(elem, link) {
    const links = document.querySelectorAll('#navbarPerfil li');
    context.setItensFiltrados('');

    window.scrollTo({ top: 260, behavior: 'smooth' });

    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('liVerde');
    }
    elem.classList.add('liVerde');
    navigate(link);
  }
  return (
    <div id="linksScroll" onClick={onclick}>
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
    </div>
  );
};

export default Navbar;
