import React from 'react'
import HeroSection from '../components/HeroSection'
import AddCustom from '../components/AddCustom'

const Customize = () => {
  return (
      <div className='absolute text-white z-999 top-20'>
        <div>
            <h1><HeroSection text={2}/></h1>
            <div className='md:w-[80vw] w-full  relative  left-5  md:left-21 h-full flex justify-center'><AddCustom /></div>
        </div>
    </div>
  )
}

export default Customize