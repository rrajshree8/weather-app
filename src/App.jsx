import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WeatherHeader from './components/WeatherHeader'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import WeatherAlerts from './components/WeatherAlerts'
import SearchBar from './components/SearchBar'
import { getWeatherTheme } from './utils/weatherThemes'
import { weatherService } from './services/weatherService'
import { mockWeatherData } from './data/mockData'


function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [hourlyData, setHourlyData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [alerts, setAlerts] = useState(mockWeatherData.alerts) // Keep mock alerts for now
  const [location, setLocation] = useState('Loading...')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [weatherTheme, setWeatherTheme] = useState('bg-sunny')

  // Load default weather data on component mount
  useEffect(() => {
    loadWeatherData('New York')
  }, [])

  // Update theme when weather changes
  useEffect(() => {
    if (currentWeather) {
      const theme = getWeatherTheme(currentWeather.condition, currentWeather.isDay)
      setWeatherTheme(theme)
      document.body.className = theme
    }
  }, [currentWeather])

  const loadWeatherData = async (city) => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current weather and forecast
      const [current, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ])
      
      setCurrentWeather(current)
      setHourlyData(forecast.hourly)
      setWeeklyData(forecast.weekly)
      setLocation(current.location)
      
    } catch (err) {
      setError(err.message)
      console.error('Error loading weather data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadWeatherDataByCoords = async (lat, lon) => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current weather and forecast by coordinates
      const [current, forecast] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(lat, lon),
        weatherService.getForecastByCoords(lat, lon)
      ])
      
      setCurrentWeather(current)
      setHourlyData(forecast.hourly)
      setWeeklyData(forecast.weekly)
      setLocation(current.location)
      
    } catch (err) {
      setError(err.message)
      console.error('Error loading weather data by coords:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSearch = async (searchLocation) => {
    if (searchLocation.trim()) {
      await loadWeatherData(searchLocation.trim())
    }
  }

  const handleCurrentLocation = async () => {
    try {
      setLoading(true)
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      
      const { latitude, longitude } = position.coords
      await loadWeatherDataByCoords(latitude, longitude)
      
    } catch (error) {
      console.error('Error getting current location:', error)
      setError('Unable to get your location. Please enable location services.')
    }
  }

  if (loading && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium">Loading weather data...</p>
        </motion.div>
      </div>
    )
  }

  if (error && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass p-8 max-w-md mx-4"
        >
          <p className="text-white text-xl font-medium mb-4">⚠️ Error</p>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => loadWeatherData('New York')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white font-medium transition-all duration-300"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${weatherTheme}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-6 max-w-7xl"
      >
        <WeatherHeader location={location} />
        
        <SearchBar 
          onLocationSearch={handleLocationSearch}
          onCurrentLocation={handleCurrentLocation}
          loading={loading}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 mb-6 border-l-4 border-red-400"
          >
            <p className="text-white">⚠️ {error}</p>
          </motion.div>
        )}

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="lg:col-span-2">
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </div>
          <div className="space-y-6">
            <WeatherAlerts alerts={alerts} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <HourlyForecast data={hourlyData} />
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <WeeklyForecast data={weeklyData} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App