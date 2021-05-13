import { format } from "date-fns";
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { domDisplay } from "./domdisplay.js";

export const getData = (function () {
  const icon = document.getElementById("icon");
  const todayTemp = document.getElementById("today-temp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const feelsLike = document.getElementById("feels-like");
  const placeName = document.getElementById("place-name");
  const description = document.getElementById("description");
  const unitsBtn = document.getElementById("units-btn");
  const time = document.getElementById("time");
  const forecastContainer = document.getElementById("forecast");

  async function requestData(location = "London", units = "Metric") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=e3e5263895dd9c374cba7662f5f1dae3`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      humidity.textContent =
        "Humidity: " + Math.round(weatherData.main.humidity) + "%";
      placeName.textContent = weatherData.name;
      description.textContent = capitalise(weatherData.weather[0].description);
      icon.src =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";
      time.textContent = format(new Date(), "haaa EEEE, do MMMM");
      if (units == "Metric") {
        todayTemp.innerHTML =
          Math.round(weatherData.main.temp) +
          "<span class='smaller'>&#8451</span>";

        feelsLike.innerHTML =
          "Feels like: " + Math.round(weatherData.main.feels_like) + "&#8451";

        windSpeed.textContent =
          "Wind-Speed: " + Math.round(weatherData.wind.speed) + "mph";
      } else {
        todayTemp.innerHTML =
          Math.round(weatherData.main.temp) +
          "<span class='smaller'>&#8457</span>";

        feelsLike.innerHTML =
          "Feels like: " + Math.round(weatherData.main.feels_like) + "&#8457";

        windSpeed.textContent =
          "Wind-Speed: " + Math.round(weatherData.wind.speed) + "kph";
      }

      return weatherData;
    } catch (err) {
      //alert("Enter a valid town, city or country");
    }
  }

  //5 DAY THREE HOUR FORECAST

  async function requestFuture(location = "London", units = "Metric") {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=e3e5263895dd9c374cba7662f5f1dae3`,
      { mode: "cors" }
    );

    const weatherData = await response.json();

    forecastContainer.innerHTML = "";
    for (let i = 0; i < weatherData.list.length; i++) {
      const divInstance = document.createElement("div");
      divInstance.setAttribute("id", "div-instance");
      forecastContainer.appendChild(divInstance);
      let date;
      let time;
      if (isToday(new Date(weatherData.list[i].dt_txt))) {
        date = "Today"
        time = format(new Date(weatherData.list[i].dt_txt), "haaa")
      } else if (isTomorrow(new Date(weatherData.list[i].dt_txt))){
        date = "Tomorrow"
        time = format(new Date(weatherData.list[i].dt_txt), "haaa")
      } else {
        date = format(new Date(weatherData.list[i].dt_txt), "do MMMM");
        time = format(new Date(weatherData.list[i].dt_txt), "haaa EEEE");
      }
      let icon = weatherData.list[i].weather[0].icon;
      let description = weatherData.list[i].weather[0].description;
      let temp;
      if (units == "Metric") {
        temp = `${Math.round(
          weatherData.list[i].main.feels_like
        )}<span class='smallerF'>&#8451</span>`;
      } else {
        temp = `${Math.round(
          weatherData.list[i].main.feels_like
        )}<span class='smallerF'>&#8457</span>`;
      }
      divInstance.innerHTML = domDisplay.newForecastInstance(
        date,
        time,
        temp,
        icon,
        getData.capitalise(description)
      );
    }
    
  }

  function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  return {
    requestData,
    requestFuture,
    capitalise,
  };
})();
