import React from 'react'
import HeroSection from '../Components/HeroSection'
import HowItWork from '../Components/how_it_Work'
import Leaderboard from '../Components/Leaderboard'
import FeaturedAuctions from '../Components/FeaturedAuctions'
import UpcomingAuctions from '../Components/upcomingAuctions'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      <FeaturedAuctions />
      <UpcomingAuctions />
      <Leaderboard />
      <HowItWork /> 
      
    </div>
  )
}

export default HomePage