import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

const useSearch = (menuLabel) => {
  const ctx = useContext(GlobalContext);
  const [value, setValue] = React.useState('');
  const [label, setLabel] = React.useState('');
  const [found, setFound] = React.useState('');
  const [length, setLength] = React.useState('');

  React.useEffect(() => {
    if (menuLabel) {
      switch (menuLabel) {
        case 'Extintores':
          setLabel('ext');
          break;
        case 'Hidrantes':
          setLabel('hd');
          break;
        case 'Luzes de emergência':
          setLabel('lde');
          break;
        case 'Medição de gases':
          setLabel('gas');
          break;
        default:
          setLabel('');
          break;
      }
    }

    if (label && (label === 'ext' || 'hd' || 'lde')) {
      const res = ctx.userLogado[label].filter((f) => {
        return f.num.includes(value);
      });
      if (res.length >= 1) {
        setFound(res);
        setLength(res.length);
      } else {
        setFound(ctx.userLogado[label]);
        setLength(res.length);
      }
    } else {
      setFound(ctx.userLogado[label]);
      setLength('0');
    }
  }, [menuLabel, ctx.userLogado, label, value]);

  return { value, setValue, found, length };
};

export default useSearch;
