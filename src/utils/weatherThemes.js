export const getWeatherTheme = (condition, isDay = true) => {
  const themes = {
    'Sunny': 'bg-sunny',
    'Clear': isDay ? 'bg-sunny' : 'bg-night',
    'Partly Cloudy': 'bg-cloudy',
    'Cloudy': 'bg-cloudy',
    'Overcast': 'bg-cloudy',
    'Light Rain': 'bg-rainy',
    'Heavy Rain': 'bg-rainy',
    'Thunderstorm': 'bg-stormy',
    'Snow': 'bg-snowy',
    'Fog': 'bg-cloudy',
    'Mist': 'bg-cloudy',
    'Haze': 'bg-cloudy'
  }
  
  return themes[condition] || 'bg-cloudy'
}

export const getWeatherGradient = (condition, isDay = true) => {
  const gradients = {
    'Sunny': 'from-orange-400 via-yellow-400 to-pink-400',
    'Clear': isDay 
      ? 'from-blue-400 via-purple-400 to-pink-400'
      : 'from-purple-900 via-blue-900 to-indigo-900',
    'Partly Cloudy': 'from-blue-400 via-cyan-400 to-teal-400',
    'Cloudy': 'from-gray-400 via-gray-500 to-gray-600',
    'Overcast': 'from-gray-500 via-gray-600 to-gray-700',
    'Light Rain': 'from-blue-500 via-blue-600 to-blue-700',
    'Heavy Rain': 'from-blue-700 via-blue-800 to-blue-900',
    'Thunderstorm': 'from-purple-700 via-purple-800 to-purple-900',
    'Snow': 'from-blue-100 via-blue-200 to-blue-300',
    'Fog': 'from-gray-300 via-gray-400 to-gray-500',
    'Mist': 'from-gray-300 via-gray-400 to-gray-500',
    'Haze': 'from-yellow-300 via-yellow-400 to-orange-400'
  }
  
  return gradients[condition] || 'from-gray-400 via-gray-500 to-gray-600'
}

export const getWeatherIcon = (condition, isDay = true) => {
  const icons = {
    'Sunny': '☀️',
    'Clear': isDay ? '☀️' : '🌙',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Overcast': '☁️',
    'Light Rain': '🌧️',
    'Heavy Rain': '🌧️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Fog': '🌫️',
    'Mist': '🌫️',
    'Haze': '🌫️'
  }
  
  return icons[condition] || '☁️'
}

export const getWeatherDescription = (condition, temperature) => {
  const descriptions = {
    'Sunny': [
      'Perfect day for outdoor activities!',
      'Bright and beautiful sunshine',
      'Clear skies and warm temperatures',
      'Great visibility and pleasant conditions'
    ],
    'Clear': [
      'Crystal clear skies',
      'Perfect stargazing weather',
      'Peaceful and calm conditions',
      'Excellent visibility'
    ],
    'Partly Cloudy': [
      'Mix of sun and clouds',
      'Pleasant with occasional shade',
      'Comfortable outdoor conditions',
      'Variable cloud coverage'
    ],
    'Cloudy': [
      'Overcast with gray skies',
      'Soft, diffused lighting',
      'Mild and stable conditions',
      'Good for indoor activities'
    ],
    'Light Rain': [
      'Gentle rainfall in the area',
      'Fresh and clean air',
      'Perfect for staying cozy indoors',
      'Light precipitation expected'
    ],
    'Heavy Rain': [
      'Significant rainfall expected',
      'Stay indoors and stay dry',
      'Reduced visibility conditions',
      'Heavy precipitation ongoing'
    ],
    'Thunderstorm': [
      'Stormy weather with lightning',
      'Seek shelter immediately',
      'Dramatic weather conditions',
      'Electrical activity detected'
    ],
    'Snow': [
      'Winter wonderland conditions',
      'Snow-covered landscapes',
      'Bundle up and stay warm',
      'Beautiful but cold weather'
    ],
    'Fog': [
      'Reduced visibility due to fog',
      'Drive carefully and slowly',
      'Mysterious and ethereal conditions',
      'Low-hanging clouds present'
    ]
  }
  
  const conditionDescriptions = descriptions[condition] || ['Current weather conditions']
  return conditionDescriptions[Math.floor(Math.random() * conditionDescriptions.length)]
}