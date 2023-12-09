import React from 'react';

const useEditGas = (valor) => {
  const [value, setValue] = React.useState(valor);
  console.log(value);

  function onChange({ target }) {
    setValue(target.value);
  }

  return {
    value,
    onChange,
  };
};

export default useEditGas;
