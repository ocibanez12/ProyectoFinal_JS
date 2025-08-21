import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { ProductContext } from '../store/ProductContext'

const Hero = ({ logo }) => {

  return (
    <div>
      <Navbar />
      <div className='hero-container'>
  <div className='hero-logo'>
    <img src={logo} alt="Logo" className='hero-img' />
    <p className='hero-text-overlay'>Tu mercado Pokémon</p>
  </div>

  <div className='hero-actions'>
    <Link to="/Productos">
      <button type='button' className='custom-btn'>
        Ver productos
      </button>
    </Link>
  </div>
</div>
      
    </div>
  )
}

export default Hero
