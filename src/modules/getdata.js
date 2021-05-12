import {format} from 'date-fns'

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

  requestData("London");

  async function requestData(location, units = "Metric") {
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
        time.textContent = format(new Date(), 'haaa EEEE, do MMMM')
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

      console.log(weatherData);
      return weatherData;
    } catch (err) {
      alert("Enter a valid town, city or country");
    }
  }
console.log(format(new Date(), 'haaa EEEE, do MMMM'))
  function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
  //console.log(requestData());

  //   //5 DAY THREE HOUR FORECAST
  //   function requestData2() {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/forecast?q=london&appid=e3e5263895dd9c374cba7662f5f1dae3`,
  //       { mode: "cors" }
  //     )
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //         return response;
  //       });
  //   }

  //requestData2();

  return {
    requestData,
  };
})();
