import kelvinToCelsius from "../utilities/convertTemperature.js";

const card = async (city) => {
  const apiKey = "937bca0df2987172c5ae4a0dca416cad";
  const baseURL = "https://api.openweathermap.org/";
  const api = `${baseURL}data/2.5/weather?q=${city}&appid=${apiKey}&lang=en`;
  const response = await fetch(api);

  if (response.status !== 200) {
    return false;
  }

  const weatherData = await response.json();

  const { name, sys, main, weather, id } = weatherData;
  const view = `
    <svg class="cursor-pointer mx-32 absolute  -mr-2" width="11" height="11" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0721 0.355072C10.0721 0.239056 9.97714 0.144135 9.86112 0.144135L8.12089 0.152045L5.49999 3.27656L2.88173 0.154682L1.13886 0.146771C1.02284 0.146771 0.927917 0.239057 0.927917 0.357709C0.927917 0.407807 0.946374 0.455268 0.978015 0.494819L4.40839 4.58173L0.978015 8.66601C0.946154 8.70466 0.928475 8.75304 0.927917 8.80312C0.927917 8.91914 1.02284 9.01406 1.13886 9.01406L2.88173 9.00615L5.49999 5.88164L8.11825 9.00351L9.85849 9.01142C9.9745 9.01142 10.0694 8.91914 10.0694 8.80048C10.0694 8.75039 10.051 8.70293 10.0193 8.66337L6.59423 4.5791L10.0246 0.492182C10.0562 0.455268 10.0721 0.40517 10.0721 0.355072Z" fill="white" hover:fill="black"/>
    </svg>

    <div class="card-details">
    <span class="country p-1 sm:text-xs bg-yellow-400 rounded text-gray-900 font-semibold">${
      sys.country
    }</span>
      <p class="city mt-1 text-base tracking-tighter mr-1">${name}</p>
      
      <p class="temperature mx-4 mt-3 text-5xl font-sans">${kelvinToCelsius(
        main.temp
      )}<span>°C</span></p>
    </div>

    <div class="card-image text-center">
    <img class="mx-2 -mt-1" src="https://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png" alt="weather">
    <p class="-mt-1">${weather[0].description}</p>
    </div>
`;

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("weather-card");
  cardContainer.className =
    "weather-card bg-indigo-800 hover:bg-blue-300 relative ring-4 ring-indigo-500  w-197px h-237px p-3 pt-20px rounded text-white hover:text-gray-900";
  cardContainer.dataset.id = id;
  cardContainer.innerHTML = view;

  return { cardContainer, id };
};

export default card;
