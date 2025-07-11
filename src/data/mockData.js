export const mockWeatherData = {
  location: "New York, NY",
  current: {
    location: "New York, NY",
    temperature: 72,
    condition: "Sunny",
    description: "Clear skies with abundant sunshine",
    humidity: 45,
    windSpeed: 8,
    windDirection: "NW",
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 75,
    dewPoint: 50,
    cloudCover: 10,
    isDay: true,
    icon: "☀️",
    lastUpdated: new Date().toISOString()
  },
  hourly: [
    { time: "12:00", temperature: 72, condition: "Sunny", icon: "☀️", precipitation: 0 },
    { time: "13:00", temperature: 74, condition: "Sunny", icon: "☀️", precipitation: 0 },
    { time: "14:00", temperature: 76, condition: "Partly Cloudy", icon: "⛅", precipitation: 0 },
    { time: "15:00", temperature: 78, condition: "Partly Cloudy", icon: "⛅", precipitation: 0 },
    { time: "16:00", temperature: 77, condition: "Partly Cloudy", icon: "⛅", precipitation: 0 },
    { time: "17:00", temperature: 75, condition: "Cloudy", icon: "☁️", precipitation: 10 },
    { time: "18:00", temperature: 73, condition: "Cloudy", icon: "☁️", precipitation: 15 },
    { time: "19:00", temperature: 71, condition: "Light Rain", icon: "🌧️", precipitation: 40 },
    { time: "20:00", temperature: 69, condition: "Light Rain", icon: "🌧️", precipitation: 35 },
    { time: "21:00", temperature: 68, condition: "Partly Cloudy", icon: "⛅", precipitation: 5 },
    { time: "22:00", temperature: 66, condition: "Clear", icon: "🌙", precipitation: 0 },
    { time: "23:00", temperature: 64, condition: "Clear", icon: "🌙", precipitation: 0 }
  ],
  weekly: [
    { 
      day: "Today", 
      date: "Dec 15", 
      high: 78, 
      low: 64, 
      condition: "Sunny", 
      icon: "☀️", 
      precipitation: 0,
      humidity: 45,
      windSpeed: 8
    },
    { 
      day: "Tomorrow", 
      date: "Dec 16", 
      high: 75, 
      low: 62, 
      condition: "Partly Cloudy", 
      icon: "⛅", 
      precipitation: 10,
      humidity: 55,
      windSpeed: 12
    },
    { 
      day: "Sun", 
      date: "Dec 17", 
      high: 73, 
      low: 59, 
      condition: "Cloudy", 
      icon: "☁️", 
      precipitation: 20,
      humidity: 65,
      windSpeed: 15
    },
    { 
      day: "Mon", 
      date: "Dec 18", 
      high: 68, 
      low: 55, 
      condition: "Light Rain", 
      icon: "🌧️", 
      precipitation: 70,
      humidity: 80,
      windSpeed: 18
    },
    { 
      day: "Tue", 
      date: "Dec 19", 
      high: 71, 
      low: 58, 
      condition: "Partly Cloudy", 
      icon: "⛅", 
      precipitation: 15,
      humidity: 60,
      windSpeed: 10
    },
    { 
      day: "Wed", 
      date: "Dec 20", 
      high: 74, 
      low: 61, 
      condition: "Sunny", 
      icon: "☀️", 
      precipitation: 0,
      humidity: 50,
      windSpeed: 8
    },
    { 
      day: "Thu", 
      date: "Dec 21", 
      high: 76, 
      low: 63, 
      condition: "Sunny", 
      icon: "☀️", 
      precipitation: 0,
      humidity: 45,
      windSpeed: 6
    }
  ],
  alerts: [
    {
      id: 1,
      type: "Heat Advisory",
      severity: "moderate",
      title: "Heat Advisory in Effect",
      description: "Temperatures may reach up to 95°F today. Stay hydrated and avoid prolonged outdoor activities.",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      areas: ["New York", "Manhattan", "Brooklyn"]
    },
    {
      id: 2,
      type: "UV Warning",
      severity: "high",
      title: "High UV Index",
      description: "UV index will be very high today. Wear sunscreen and protective clothing when outdoors.",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      areas: ["New York Metro Area"]
    }
  ]
}

export const weatherConditions = {
  "Sunny": { icon: "☀️", color: "#FFA500" },
  "Partly Cloudy": { icon: "⛅", color: "#87CEEB" },
  "Cloudy": { icon: "☁️", color: "#B0C4DE" },
  "Light Rain": { icon: "🌧️", color: "#4682B4" },
  "Heavy Rain": { icon: "🌧️", color: "#191970" },
  "Thunderstorm": { icon: "⛈️", color: "#483D8B" },
  "Snow": { icon: "❄️", color: "#F0F8FF" },
  "Fog": { icon: "🌫️", color: "#D3D3D3" },
  "Clear": { icon: "🌙", color: "#191970" }
} 