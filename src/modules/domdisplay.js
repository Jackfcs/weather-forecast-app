import { getData } from "./getdata.js";
import { format } from "date-fns";

export const domDisplay = (function () {

  const searchInput = document.getElementById("search-text");
  const unitsBtn = document.getElementById("units-btn");



  function newForecastInstance(date, time, temp, icon, description) {
    let contents;
    
    contents = `
<div id="dateF">${date}</div>
<div id="timeF">${time}</div>
<div id="tempF">${temp}</div>
<img id="iconF" src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
<div id="descriptionF">${description}</div>`;

    return contents;
  }

  
  return {
    newForecastInstance,
  };
})();
