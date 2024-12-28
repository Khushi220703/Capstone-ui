import React from 'react'
import Menubar from '../components/Menubar'
import ImageCarousel from '../components/Caraousel'
import BestOfProducts from '../components/BestOfProducts'
const HomePage = () => {
  return (
    <div>
        <Menubar/>
        <ImageCarousel/>
        <BestOfProducts/>
    </div>
  )
}

export default HomePage
