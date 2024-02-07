import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

const SelectFilter = ({ itens }) => {
  const context = useContext(GlobalContext);

  function handleSelectFilter(value) {
    context.setFilterSelect(value);
    const res = itens.filter((f) => {
      return f.local.includes(value);
    });
    context.setItensFiltrados(value === 'Todos' ? itens : res);
  }

  return (
    <select
      style={{
        color: '#d1d1d1',
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
      }}
      name="selectFilterId"
      id="selectFilterId"
      onChange={({ target }) => handleSelectFilter(target.value)}
    >
      <option value={null}>Todos</option>
      <option value={null}>Subsolo</option>
      <option value={null}>Térreo</option>
      <option value={null}>Brigada</option>
      <option value={null}>2º Pav</option>
      <option value={null}>2º Pav A</option>
      <option value={null}>2º Pav B</option>
      <option value={null}>2º Pav C</option>
      <option value={null}>3º Pav</option>
      <option value={null}>3º Pav A</option>
      <option value={null}>3º Pav B</option>
      <option value={null}>3º Pav C</option>
      <option value={null}>4º Pav</option>
      <option value={null}>4º Pav A</option>
      <option value={null}>4º Pav B</option>
      <option value={null}>4º Pav C</option>
      <option value={null}>CMI</option>
    </select>
  );
};

export default SelectFilter;
