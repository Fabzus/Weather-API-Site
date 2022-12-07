//INTERACTION W/ API

const apiKey = "cWb1FxDZFP6TrJnP3GzX7WlloK2G8L5F";
const locationURL =
  "http://dataservice.accuweather.com/locations/v1/cities/search/";
const weatherURL = "http://dataservice.accuweather.com/currentconditions/v1/";

const getCity = async (city) => {
  const query = `?apikey=${apiKey}&q=${city}`;
  const response = await fetch(locationURL + query);
  const data = await response.json();
  return data[0];
};

const getWeather = async (cityCode) => {
  const query = `?apikey=${apiKey}`;
  const response = await fetch(weatherURL + cityCode + query);
  const data = await response.json();
  return data[0];
};

// getCity("Carei")
//   .then((data) => {
//     return getWeather(data.Key);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
