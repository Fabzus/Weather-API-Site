// DOM manipulation
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const timeOfDay = document.querySelector("img.time");
const weatherIcon = document.querySelector(".icon img");

const updateUI = (data) => {
  //destructure properties
  const { cityDetails, cityWeather } = data;

  //     clasic
  //   const cityDetails = data.cityDetails;
  //   const cityWeather = data.cityWeather;

  //update details template
  details.innerHTML = `
  <h5 class="my-3">${cityDetails.EnglishName}</h5>
  <div class="my-3">${cityWeather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${cityWeather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  //update the day/night & icon
  const iconPath = `img/icons/${cityWeather.WeatherIcon}.svg`;
  weatherIcon.setAttribute("src", iconPath);

  let timeSrc = null;

  cityWeather.IsDayTime
    ? (timeSrc = "img/day.svg")
    : (timeSrc = "img/night.svg");

  timeOfDay.setAttribute("src", timeSrc);

  //remove d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//get city information
const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
