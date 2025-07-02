import React from 'react'
import HeroSection from '../Components/HeroSection'
import HowItWork from '../Components/how_it_Work'
import Leaderboard from '../Components/Leaderboard'
import FeaturedAuctions from '../Components/FeaturedAuctions'
import UpcomingAuctions from '../Components/upcomingAuctions'
import { motion } from 'framer-motion'
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    },
  }),
}

const HomePage = () => {
  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <FeaturedAuctions />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <UpcomingAuctions />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <Leaderboard />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      >
        <HowItWork />
      </motion.div>
    </div>
  )
}

export default HomePage
