const weatherKey = "1fcb756b740eae171bab75c2e81e6e0f",
  forcastKey = "2388442352fed89a8e02c067ae59abd5";
let city = "ירושלים",
  units = "metric",
  speed = 0,
  cityName = document.getElementById("city-name"),
  feelsLike = document.getElementById("feels-like"),
  humidity = document.getElementById("humidity"),
  windSpeed = document.getElementById("wind-speed"),
  temp = document.getElementById("temp"),
  description = document.getElementById("description"),
  CurrentDateAndTime = document.getElementById("current-date-and-time");

document.querySelector(".cels").addEventListener("click", () => {
  units = "metric";
  getCurrentWeather(city);
  document.querySelector(".cels").classList.add("bold-text");
  document.querySelector(".ferin").classList.remove("bold-text");
});

document.querySelector(".ferin").addEventListener("click", () => {
  units = "Imperial";
  getCurrentWeather(city);
  document.querySelector(".ferin").classList.add("bold-text");
  document.querySelector(".cels").classList.remove("bold-text");
});

document.getElementById("search").addEventListener("click", () => {
  city = document.getElementById("city").value;
  city === "" ? emptyFieldMsg() : getCurrentWeather(city);
  document.getElementById("city").value = "";
});

async function getCurrentWeather(city) {
  document.querySelector(".cels").classList.add("bold-text");
  document.getElementById("city").placeholder = "שם העיר ...";
  const cityData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=${units}&lang=he`
  );
  const data = await cityData.json();

  const forcastData = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${forcastKey}&units=${units}&lang=he`
  );
  const data2 = await forcastData.json();

  if (data.cod == "404") {
    document.getElementById("city").style.border = "1px solid #bb2124";
    document.getElementById("city").placeholder = "שם עיר לא קיים !!";
  } else {
    document.querySelector(".forcast").innerHTML = "";

    let cityDate = new Date(data2.list[0].dt * 1000).toLocaleDateString("heb", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let cityTime = new Date(
      data.dt * 1000 + data.timezone * 1000
    ).toLocaleTimeString("he", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

    document.getElementById(
      "weather-icon"
    ).style.backgroundImage = `url(./images/${data.weather[0].icon}.png)`;

    cityName.innerText = data.name;
    feelsLike.innerText = `מרגיש כמו: ${data.main.feels_like.toFixed(1)}°${
      units == "metric" ? "C" : "F"
    }
    `;
    humidity.innerText = `לחות: ${data.main.humidity}%`;

    if (units === "metric") {
      speed = data.wind.speed * 3.6;
      windSpeed.innerText = `מהירות רוח ${speed.toFixed(1)} קמ"ש`;
    } else {
      speed = data.wind.speed;
      windSpeed.innerText = `מהירות רוח ${speed.toFixed(1)} מייל /שעה`;
    }

    temp.innerText = data.main.temp.toFixed(1);
    description.innerText = data.weather[0].description;
    CurrentDateAndTime.innerText = `${cityDate} | ${cityTime}`;

    for (let i = 1; i <= 5; i++) {
      document.querySelector(".forcast").innerHTML += `        
        <div>
          <h5>${new Date(data2.list[i].dt * 1000).toLocaleDateString("heb", {
            weekday: "long",
          })}</h5>
          <img src="./images/${data2.list[i].weather[0].icon}.png"/>
          <h4>${Math.round(data2.list[i].temp.min)}° / ${Math.round(
        data2.list[i].temp.max
      )}°</h4>
          <h5>${data2.list[i].weather[0].description}</h5>
        </div>`;
    }
  }
}

function emptyFieldMsg() {
  document.getElementById("city").style.border = "1px solid #bb2124";
  document.getElementById("city").placeholder = "שדה זה חובה !!!";
}

document.getElementById("city").addEventListener("keypress", () => {
  document.getElementById("city").style.border = "none";
});

getCurrentWeather(city);
