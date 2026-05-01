const cityInput = document.getElementById("input-city");
const searchBtn = document.getElementById("search-box");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-desc");

async function checkWeather(city) {

  const url = `/api/get-weather?city=${city}`;

  try {
    const response = await fetch(url); //memberikan input kepada url api nya, dan url api nya akan me response//
    const data = await response.json(); //setelah itu json yang akan menerima output nya, dan kita bisa edit sesuai dengan apa yang ingin kita hasilkan//

    if (data.cod === 200) {
      document.getElementById("weather-display").style.display = "block";
      cityName.innerText = data.name;
      weatherDesc.innerText = data.weather[0].description; //mengambil data description dari json//
      const condition = data.weather[0].main;
      weatherIcon.className = "display-icon";

      if (condition === "Clear") {
        weatherIcon.classList.add("icon-cerah");
      } else if (condition === "Clouds") {
        weatherIcon.classList.add("icon-berawan");
      } else if (condition === "Rain") {
        weatherIcon.classList.add("icon-hujan");
      } else {
        alert("kota nya kaga ketemu bree, Salah tulis lu kalik");
      } 
    }
    } catch (error) {
      console.error("Error:", error);
      alert("kayaknya servernya bermasalah bree, sory banget🙏")
    }
}

searchBtn.addEventListener("click", () => {
  if(cityInput.value != "") {
    checkWeather(cityInput.value);
    cityInput.value = "";
  } else {
    alert("nama Kota nya gada bree, coba ulangi");
  }
});


cityInput.addEventListener("keydown", (event) =>{
  if(event.key === "Enter") {
    checkWeather(cityInput.value);
    cityInput.value = "";
  }
});






