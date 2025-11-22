import React from 'react'
import Hero from '../Components/HomePage/Hero'
import ShopByCategory from '../Components/HomePage/ShopByCategory'
import AiStylistHighlight from '../Components/HomePage/AIStylistHighlight'
import WhyChooseCruse from '../Components/HomePage/WhyChooseCruse'
import FamousProducts from '../Components/HomePage/FamousProducts'

function Home() {
  return (
    <div>
        <Hero/>
        <ShopByCategory/>
      <AiStylistHighlight/>
      <FamousProducts/>
      <WhyChooseCruse/>
    </div>
  )
}

export default Home
