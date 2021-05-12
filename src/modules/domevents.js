import {getData} from './getdata.js'

export const domEvents = (function () {
    const searchInput = document.getElementById("search-text");
    const searchBtn = document.getElementById("search");
    const unitsBtn = document.getElementById("units-btn");
    
  
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getData.requestData(searchInput.value, unitsBtn.textContent);
    });
  
    unitsBtn.addEventListener("click", () => {
      if (unitsBtn.textContent == "Metric") {
        unitsBtn.textContent = "Imperial";
      } else {
        unitsBtn.textContent = "Metric";
      }
      getData.requestData(searchInput.value, unitsBtn.textContent);
    });
    
 

})();