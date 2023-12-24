export function dataLong(obj) {
  const objData = new Date();
  objData.setMonth(obj - 1);
  return objData.toLocaleString('pt-Br', { month: 'short' });
}

export function dataShort(obj) {
  const objData = new Date();
  objData.setMonth(obj);
  return objData.toLocaleString('pt-Br', { month: '2-digit' });
}

export function convertData(data) {
  const { mes, ano } = data;
  const options = () => {
    if (mes && ano) return { month: 'long', year: 'numeric' };
    if (!mes && ano) return { year: 'numeric' };
    if (mes && !ano) return { month: 'long' };
    if (!mes && !ano) return;
  };
  const parseDate = () => {
    if (mes || ano) {
      return new Date(
        ano ? Number(ano) : '',
        mes ? Number(mes) - 1 : '',
      ).toLocaleDateString('pt-Br', options());
    } else {
      return 'não informado';
    }
  };
  return parseDate();
}
