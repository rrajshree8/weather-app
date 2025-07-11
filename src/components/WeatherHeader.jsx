import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

const WeatherHeader = ({ location }) => {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  const currentDate = new Date().toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-4 pulse-glow heading-rgba(60, 0, 80, 0.18)/40"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Weather App
      </motion.h1>
      
      <motion.div 
        className="flex items-center justify-center gap-2 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <MapPin className="w-5 h-5 text- rgba(60, 0, 80, 0.18)" />
        <span className="text-lg font-medium rgba(60, 0, 80, 0.18)">{location}</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-center gap-6 rgba(60, 0, 80, 0.18)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{currentTime}</span>
        </div>
        <span className="text-sm">{currentDate}</span>
      </motion.div>
    </motion.div>
  )
}

export default WeatherHeader