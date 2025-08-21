import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { ProductContext } from '../store/ProductContext'
import HomeCategory from '../components/HomeCategory'

const Home = () => {
  const { logo } = useContext(ProductContext)

  if (!logo) {
    return <p>Cargando logo...</p>
  }

  return (
    <div>
      <Hero logo={logo} />
      <HomeCategory />
      <Footer />
    </div>
  )
}

export default Home
