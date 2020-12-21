import React from 'react'
import Tilt from 'react-tilt'
import face from './face.png'
import './Logo.css'


export const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br4 shadow-4" options={{ max : 75 }} style={{ height: 100, width: 100 }} >
      <div className="Tilt-inner pa3"><img src={face} alt='logo'></img></div>
      </Tilt>
    </div>
  )
}