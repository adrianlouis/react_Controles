import React from 'react'
import css from './css/profile.css'
import bg from './img/mtx.jpg'

const Profile = () => {

    const [landscape, setLandscape] = React.useState('')

  return (
    <div id='profile'>


      <div className='containerAlpha'>

        <div className='alphaSwitch'>

          <span>A</span>

          <div className='switch'>
            <div className='dot'>

            </div>
          </div>

          <span>B</span>

        </div>

        <div className='dadosSwitch'>
          
        </div>

      </div>

      
    </div>
  )
}

export default Profile
