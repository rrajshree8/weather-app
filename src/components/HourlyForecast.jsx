import React from 'react'
import { motion } from 'framer-motion'
import { CloudRain } from 'lucide-react'

const HourlyForecast = ({ data }) => {
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
        24-Hour Forecast
      </motion.h3>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4 min-w-max">
          {data.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex-shrink-0 text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 min-w-[120px]"
            >
              <div className="text-white/70 text-sm font-medium mb-2">{hour.time}</div>
              
              <motion.div 
                className="text-3xl mb-3 float-animation"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {hour.icon}
              </motion.div>
              
              <div className="text-white font-bold text-lg mb-1">{hour.temperature}°</div>
              
              <div className="text-white/60 text-xs mb-3">{hour.condition}</div>
              
              {hour.precipitation > 0 && (
                <motion.div 
                  className="flex items-center justify-center gap-1 text-blue-200 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <CloudRain className="w-3 h-3" />
                  <span>{hour.precipitation}%</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HourlyForecast