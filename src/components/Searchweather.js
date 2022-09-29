import React, { useState } from "react";
import "./Search.css";
import back from "../images/weat.jpg";
import moment from "moment";

export default function Searchweather() {
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState(null);
  const [temp_min, setTemp_min] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState(null);
  const [wind, setWind] = useState(null);
  const [times, setTime] = useState();

  const fetchWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5a4c70bd44e249c568ab744932178eb1`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    setTemp((data.main.temp - 273.15).toFixed(2));
    setTemp_min((data.main.temp_min - 273.15).toFixed(2));
    setTemp_max((data.main.temp_max - 273.15).toFixed(2));
    setSearch(data.name);
    setHumidity(data.main.humidity);
    setDescription(data.weather[0].description);
    setWind(data.wind.speed);
    setTime(data.sys.timezone);
  };

  let d = new Date();
  // let date = d.getDate();
  // let year = d.getFullYear();
  // let months = d.toLocaleString("default", { month: "long" });
  // let dayS = d.toLocaleString("default", { weekday: "long" });
  // let day = moment(d).format("dddd");
  let date = moment(d).format("llll");
  // time

  // let time = d.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });

  // let time = moment(d).format("DD-MM-YYYY");

  let handleSubmit = (event) => {
    event.preventDefault();

    fetchWeather();
  };

  return (
    <div className="box">
      <img src={back} alt="" />
      <div className="input-group">
        <form className="form" onSubmit={handleSubmit}>
          <input
            id="input"
            type="text"
            autoComplete="off"
            value={search}
            placeholder="Enter City"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
      </div>

      <div className="content">
        <h1 className="card-title">{search}</h1>
        {/* {{ times } ? (
          <p className="date">
            {day}, {month}, {year}
            {times}
          </p>
        ) : null} */}

        <p className="time">{date}</p>

        <h4 className="temp">{temp ? temp : null}&deg;C</h4>
        <h3 className="description">{description}</h3>
      </div>

      <div className="bottom">
        <div className="humidity">
          <h5>{humidity}%</h5>
          <h6 className="humidity">Humidity</h6>
        </div>

        <div className="minmax">
          <h5>
            {temp_min}&deg;C : {temp_max}&deg;C
          </h5>
          <h6 className="minmax">Min | Max</h6>
        </div>

        <div className="wind">
          <h5>{wind}M/hr</h5>
          <h6 className="wind">wind </h6>
        </div>
      </div>
    </div>
  );
}
