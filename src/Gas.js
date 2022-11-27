import React from 'react'
import css from './css/gas.css'
import IconesBottom from './IconesBottom'

const Gas = () => {

    const data = new Date()
console.log(data)
  return (
    <div className='gasContainer'>
        <div className='gasCard'>
            {/* <span>asd</span> */}

            <div className='gasCardWrapper'>
                <span>Data: </span>
                <span>26/11/22</span>
            </div>

            <div className='gasCardWrapper'>
                <span>Loja 128: </span>
                <span>1235134</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 132: </span>
                <span>614345</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 137: </span>
                <span>1235251</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 141: </span>
                <span>757456</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 152: </span>
                <span>1713775</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 154: </span>
                <span>3452345</span>
            </div>
            
            <div className='gasCardWrapper'>
                <span>Loja 157: </span>
                <span>614363</span>
            </div>
            
            
            
        </div>

        {/* <IconesBottom /> */}

    </div>
  )
}

export default Gas
