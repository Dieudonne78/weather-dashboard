import { useState } from 'react' 
import './App.css' 
import SearchBar from './components/SearchBar'  
import WeatherCard from './components/WeatherCard'  

function App() {
  // State to store data coming from the SearchBar component
  const [dataFromSearch, setDataFromSearch] = useState('')

  // Function that updates the state with data received from SearchBar
  const gettingData = (data) => {
    setDataFromSearch(data)
  }

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 md:p-8 lg:p-12">
      {/* SearchBar component with a prop to send data back to App */}
      <SearchBar sendDataToApp={gettingData} />
      {/* WeatherCard component receiving data to display */}
      <WeatherCard dataToDisplay={dataFromSearch} />
    </div>
  )
}

export default App;
