import React from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Wind, Droplets } from 'lucide-react'

const WeeklyForecast = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-6"
    >
      <motion.h3 
        className="text-xl font-bold text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        7-Day Forecast
      </motion.h3>
      
      <div className="space-y-4">
        {data.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
            className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-left min-w-[80px]">
                <div className="text-white font-medium">{day.day}</div>
                <div className="text-white/60 text-sm">{day.date}</div>
              </div>
              
              <motion.div 
                className="text-3xl float-animation"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {day.icon}
              </motion.div>
              
              <div className="text-left">
                <div className="text-white font-medium">{day.condition}</div>
                <div className="flex items-center gap-4 text-white/60 text-sm mt-1">
                  <div className="flex items-center gap-1">
                    <CloudRain className="w-3 h-3" />
                    <span>{day.precipitation}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{day.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-white font-bold text-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  {day.high}°
                </motion.span>
                <span className="text-white/60">/</span>
                <motion.span 
                  className="text-white/70"
                  whileHover={{ scale: 1.1 }}
                >
                  {day.low}°
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WeeklyForecast