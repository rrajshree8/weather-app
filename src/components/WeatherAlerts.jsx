import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Info, AlertCircle } from 'lucide-react'

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 border-red-400/50 text-red-100'
      case 'moderate': return 'bg-yellow-500/20 border-yellow-400/50 text-yellow-100'
      case 'low': return 'bg-blue-500/20 border-blue-400/50 text-blue-100'
      default: return 'bg-gray-500/20 border-gray-400/50 text-gray-100'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return AlertTriangle
      case 'moderate': return AlertCircle
      case 'low': return Info
      default: return Info
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-6"
    >
      <motion.h3 
        className="text-xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Weather Alerts
      </motion.h3>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const IconComponent = getSeverityIcon(alert.severity)
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`alert-card p-4 rounded-xl border backdrop-blur-sm severity-${alert.severity}`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                </motion.div>
                
                <div className="flex-1">
                  <div className="font-semibold mb-1">{alert.title}</div>
                  <div className="text-sm opacity-90 mb-2">{alert.description}</div>
                  
                  <div className="flex items-center gap-4 text-xs opacity-75">
                    <div>
                      Until: {new Date(alert.endTime).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div>
                      Areas: {alert.areas.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default WeatherAlerts