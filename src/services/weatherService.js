import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const weatherService = {
  // Get current weather by city name
  async getCurrentWeather(city) {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      return this.transformCurrentWeather(response.data)
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw new Error('Failed to fetch current weather data')
    }
  },

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      return this.transformCurrentWeather(response.data)
    } catch (error) {
      console.error('Error fetching current weather by coords:', error)
      throw new Error('Failed to fetch current weather data')
    }
  },

  // Get 5-day forecast
  async getForecast(city) {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      return this.transformForecast(response.data)
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw new Error('Failed to fetch forecast data')
    }
  },

  // Get forecast by coordinates
  async getForecastByCoords(lat, lon) {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      return this.transformForecast(response.data)
    } catch (error) {
      console.error('Error fetching forecast by coords:', error)
      throw new Error('Failed to fetch forecast data')
    }
  },

  // Transform OpenWeather current weather data to our format
  transformCurrentWeather(data) {
    const isDay = this.isDay(data.sys.sunrise, data.sys.sunset)
    const weatherIcon = this.getWeatherIcon(data.weather[0].main, isDay)
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      windDirection: this.getWindDirection(data.wind.deg),
      pressure: Math.round(data.main.pressure),
      visibility: Math.round(data.visibility / 1609.34), // Convert to miles
      uvIndex: 0, // OpenWeather doesn't provide UV in basic plan
      feelsLike: Math.round(data.main.feels_like),
      dewPoint: Math.round(data.main.temp - ((100 - data.main.humidity) / 5)),
      cloudCover: data.clouds.all,
      isDay,
      icon: weatherIcon,
      lastUpdated: new Date().toISOString()
    }
  },

  // Transform OpenWeather forecast data to our format
  transformForecast(data) {
    const hourlyData = data.list.slice(0, 12).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].main,
      icon: this.getWeatherIcon(item.weather[0].main, this.isDay(item.sys?.sunrise, item.sys?.sunset)),
      precipitation: Math.round((item.pop || 0) * 100)
    }))

    // Group by days for weekly forecast
    const dailyData = this.groupByDays(data.list)
    
    return {
      hourly: hourlyData,
      weekly: dailyData
    }
  },

  // Group forecast data by days
  groupByDays(forecastList) {
    const dailyMap = new Map()
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000)
      const dayKey = date.toDateString()
      
      if (!dailyMap.has(dayKey)) {
        dailyMap.set(dayKey, {
          date: date,
          temps: [],
          conditions: [],
          precipitations: [],
          humidities: [],
          windSpeeds: []
        })
      }
      
      const dayData = dailyMap.get(dayKey)
      dayData.temps.push(item.main.temp)
      dayData.conditions.push(item.weather[0].main)
      dayData.precipitations.push(item.pop || 0)
      dayData.humidities.push(item.main.humidity)
      dayData.windSpeeds.push(item.wind.speed)
    })

    return Array.from(dailyMap.values()).slice(0, 7).map((day, index) => {
      const high = Math.round(Math.max(...day.temps))
      const low = Math.round(Math.min(...day.temps))
      const avgPrecip = Math.round((day.precipitations.reduce((a, b) => a + b, 0) / day.precipitations.length) * 100)
      const avgHumidity = Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length)
      const avgWind = Math.round(day.windSpeeds.reduce((a, b) => a + b, 0) / day.windSpeeds.length)
      
      // Get most frequent condition
      const conditionCounts = {}
      day.conditions.forEach(condition => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1
      })
      const mostFrequentCondition = Object.keys(conditionCounts).reduce((a, b) => 
        conditionCounts[a] > conditionCounts[b] ? a : b
      )

      return {
        day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day.date.toLocaleDateString([], { weekday: 'short' }),
        date: day.date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        high,
        low,
        condition: mostFrequentCondition,
        icon: this.getWeatherIcon(mostFrequentCondition, true),
        precipitation: avgPrecip,
        humidity: avgHumidity,
        windSpeed: avgWind
      }
    })
  },

  // Get weather icon based on condition
  getWeatherIcon(condition, isDay = true) {
    const iconMap = {
      'Clear': isDay ? '☀️' : '🌙',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    }
    
    return iconMap[condition] || '☁️'
  },

  // Check if it's day or night
  isDay(sunrise, sunset) {
    const now = Math.floor(Date.now() / 1000)
    return sunrise && sunset ? now >= sunrise && now < sunset : true
  },

  // Convert wind degree to direction
  getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }
}