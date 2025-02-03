

import { Aboutus } from '@/components/Aboutus'
import Areas from '@/components/Areas'
import Book from '@/components/Book'
import HeroCarousel2 from '@/components/Carousel2'
import ConsultationForm from '@/components/Consultation'
import EasyStep from '@/components/EasyStep'
import Parallax from '@/components/Parallex'
import Review from '@/components/Review'
import React from 'react'

const Carousel = () => {
  return (
    <div>
      {/* <HeroCarousel/> */}
      <HeroCarousel2/>
     <Aboutus/>
     <Areas/>
     <EasyStep/>
     <Book/>
     <Review/>
     <ConsultationForm/>
     <Parallax/>
    </div>
  )
}

export default Carousel
