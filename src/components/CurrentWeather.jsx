import React from 'react'
import { motion } from 'framer-motion'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  CloudRain,
  Navigation
} from 'lucide-react'

const CurrentWeather = ({ data }) => {
  const weatherStats = [
    { label: 'Feels Like', value: `${data.feelsLike}°C`, icon: Thermometer },
    { label: 'Humidity', value: `${data.humidity}%`, icon: Droplets },
    { label: 'Wind Speed', value: `${data.windSpeed} km/h`, icon: Wind },
    { label: 'Wind Direction', value: data.windDirection, icon: Navigation },
    { label: 'Pressure', value: `${data.pressure} hPa`, icon: Gauge },
    { label: 'Visibility', value: `${data.visibility} km`, icon: Eye },
    { label: 'UV Index', value: data.uvIndex, icon: Sun },
    { label: 'Cloud Cover', value: `${data.cloudCover}%`, icon: CloudRain },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass p-8 h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h2 
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Current Weather
          </motion.h2>
          <motion.p 
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
          </motion.p>
        </div>
        <motion.div 
          className="text-6xl float-animation"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          {data.icon}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="text-7xl font-bold text-white mb-2 pulse-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {data.temperature}°
          </motion.div>
          <div className="text-white/80 text-lg font-medium">{data.condition}</div>
          <div className="text-white/60 text-sm mt-1">{data.description}</div>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {weatherStats.slice(0, 4).map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <div className="flex items-center gap-2">
                <stat.icon className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">{stat.label}</span>
              </div>
              <span className="text-white font-medium">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {weatherStats.slice(4).map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <stat.icon className="w-6 h-6 text-white/70 mx-auto mb-2" />
            <div className="text-white font-medium text-sm">{stat.value}</div>
            <div className="text-white/60 text-xs mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default CurrentWeather