import { getData } from "./getdata.js";
import { domDisplay } from "./domdisplay";

export const domEvents = (function () {
  const searchBtn = document.getElementById("search");
  const searchInput = document.getElementById("search-text");
  const unitsBtn = document.getElementById("units-btn");
  searchInput.value = 'London'

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getData.requestData(searchInput.value, unitsBtn.textContent);
    getData.requestFuture(searchInput.value, unitsBtn.textContent);
  });

  unitsBtn.addEventListener("click", () => {
    

    if (unitsBtn.textContent == "Metric") {
      unitsBtn.textContent = "Imperial";
    } else {
      unitsBtn.textContent = "Metric";
    }
     
    getData.requestData(searchInput.value, unitsBtn.textContent);
    getData.requestFuture(searchInput.value, unitsBtn.textContent);
  });

  getData.requestFuture('london', 'metric')
  getData.requestData();
})();
