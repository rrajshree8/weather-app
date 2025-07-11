import React, { useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const SearchBar = ({ onLocationSearch, onCurrentLocation, loading, currentLocation }) => {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [fetching, setFetching] = useState(false)

  // Update search input when currentLocation changes
  React.useEffect(() => {
    if (currentLocation) {
      setSearch(currentLocation)
    }
  }, [currentLocation])

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([])
      return
    }
    setFetching(true)
    try {
      const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      })
      setSuggestions(res.data)
    } catch (err) {
      setSuggestions([])
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearch(value)
    setShowSuggestions(value.length > 0)
    fetchSuggestions(value)
  }

  const handleSuggestionClick = (city) => {
    setSearch(city)
    setShowSuggestions(false)
    onLocationSearch(city)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      onLocationSearch(search)
      setShowSuggestions(false)
    }
  }

  const handleClear = () => {
    setSearch('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleCurrentLocationClick = async () => {
    await onCurrentLocation()
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full p-4 pr-12 rounded-xl bg-white/30 text-rgba(60, 0, 80, 0.18) placeholder-rgba(60, 0, 80, 0.18)/70 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
          placeholder="Search for a city..."
          value={search}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(search.length > 0)}
          autoComplete="off"
        />
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-all duration-200"
            disabled={loading}
          >
            <svg 
              className="w-5 h-5 text-rgba(60, 0, 80, 0.18)" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-white/30 hover:bg-white/40 border border-white/30 rounded-xl text-rgba(60, 0, 80, 0.18) font-medium transition-all duration-300"
        disabled={loading}
      >
        Search
      </button>
      <button
        type="button"
        className="p-3 bg-white/30 hover:bg-white/40 border border-white/30 rounded-xl text-rgba(60, 0, 80, 0.18) font-medium transition-all duration-300"
        onClick={handleCurrentLocationClick}
        disabled={loading}
      >
        <span role="img" aria-label="location">📍</span>
      </button>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-2 w-full bg-white/90 rounded-xl shadow-lg z-10 text-purple-900 max-h-60 overflow-auto">
          {suggestions.map((city, idx) => (
            <li
              key={city.lat + city.lon + idx}
              className="px-4 py-2 cursor-pointer hover:bg-purple-100 rounded-xl"
              onClick={() => handleSuggestionClick(`${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`)}
            >
              {city.name}{city.state ? `, ${city.state}` : ''}, {city.country}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && fetching && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white/90 rounded-xl shadow-lg z-10 text-purple-900 px-4 py-2">Loading...</div>
      )}
    </form>
  )
}

export default SearchBar