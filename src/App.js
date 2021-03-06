import React, {useState} from 'react';
import './App.css';
const api={
  key: "5fd0fb0ff72c8069ef63675f1cc5b1d8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if(event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result); 
        setQuery('');
        console.log(result);
      });

    }
  }
  const  dateBuild = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` 

}
  return (
    <div className="app">
      <div className="heading">
      <h2>Weather App</h2>
      </div>
      <main>
        <div className = "searchBox">
          <input 
            type="text"
            className="searchBar"
            placeholder="Search.."
            onChange={e => setQuery(e.target.value)} 
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="locationBox">
  <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuild(new Date())}</div>
        <div className="weatherBox">
          <div className="temp">
           {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
      ) : ('')}
      </main>

    </div>
  );
}

export default App;
