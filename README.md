# Weather App

A beautiful, responsive weather application built with React and Vite, featuring stunning animations and real-time weather data.

## Features

- **Real-time Weather Data**: Current conditions, hourly forecasts, and 7-day outlook
- **Location Services**: Search by city name or use current location
- **Weather Alerts**: Important weather warnings and advisories
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Beautiful Animations**: Smooth transitions and engaging micro-interactions
- **Dynamic Theming**: Background changes based on weather conditions
- **Glass Morphism UI**: Modern, elegant design with glass effects

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory and add your API keys:
```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment

This application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up your environment variables in Vercel dashboard
3. Deploy with a single click

## Features Overview

### Current Weather Display
- Large temperature display with weather icon
- Detailed weather metrics (humidity, wind speed, pressure, etc.)
- Real-time updates with timestamp

### Hourly Forecast
- 24-hour weather predictions
- Temperature trends
- Precipitation chances
- Scrollable horizontal layout

### 7-Day Forecast
- Weekly weather outlook
- High/low temperatures
- Weather conditions and icons
- Additional details (humidity, wind, precipitation)

### Weather Alerts
- Color-coded severity levels
- Detailed descriptions
- Affected areas
- Alert duration

### Search and Location
- City name search functionality
- Current location detection
- Loading states and error handling

## API Integration

The app integrates with:
- **OpenWeather API** - Weather data and forecasts
- **Gemini API** - Enhanced weather insights and descriptions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.