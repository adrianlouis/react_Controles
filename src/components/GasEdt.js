import React from 'react'
import styles from '../Hidrantes.module.css'

const GasEdt = ({loja, valor, ...props}) => {

    const [shop, setShop] = React.useState(loja)
    const [number, setNumber] = React.useState(valor)

  return (
    <div id='editWrap' className={styles.editWrap} >
      <input className={styles.lojaInput} type='tel' {...props} value={shop} onChange={(target)=>setShop(target.value)} maxLength={3} ></input>
      <input className={styles.medicaoInput} type='tel' {...props} value={number} onChange={(target)=>setNumber(target.value)} maxLength={8} ></input>
    </div>
  )
}

export default GasEdt
