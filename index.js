// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
const btn = document.querySelector("button");

//Default Location
let target = "Amravati";

//Function to fetch data and Weather ApI
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=3754415dd6f94ee48f0101233231301&q=${target}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    //Destructuring
    const {
      current: {
        temp_c,
        condition: { text },
      },
      location: { name, localtime },
    } = data;

    //Calling update function
    updateDom(temp_c, name, localtime, text);
  } catch (error) {
    alert("Location Not Found !");
  }
};

//Function to update the DOM
function updateDom(temperate, city, time, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperateField.innerText = temperate;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`;
  weatherField.innerText = text;
  // console.log(text);
  toChangeTheEmoji(text);

  //   emojiField.src = emoji;
  //   let newEmoji = toChangeTheEmoji(text);
  //   console.log(newEmoji);
}
fetchData(target);

//Function to search the location
function search(e) {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
}

//Adding event Listerner to the form
form.addEventListener("submit", search);
btn.addEventListener("submit", search);

//according to condition name change it's img src
function toChangeTheEmoji(condition) {
  let newCondition = condition.split(" ")[0];

  if (condition === "Fog") {
    emojiField.src = "fog.gif";
  } else if (condition === "Mist") {
    emojiField.src = "misst.gif";
  } else if (condition === "Sunny") {
    emojiField.src = "sunny.gif";
  } else if (condition === "Partly cloudy") {
    emojiField.src = "partycloud.gif";
  } else if (condition === "Clear") {
    emojiField.src = "clear.gif";
  } else if (condition === "Moderate or heavy rain shower") {
    emojiField.src = "rainshower.gif";
  } else if (condition === "Heavy snow") {
    emojiField.src = "snow.gif";
  } else if (condition === "Overcast") {
    emojiField.src = "overcast.gif";
  } else if (condition === "Rainy") {
    emojiField.src = "rainy.gif";
  } else if (condition === "Light rain") {
    emojiField.src = "rainy.gif";
  } else if (newCondition === "Freezing") {
    emojiField.src = "freeze.gif";
  } else if (newCondition === "Patchy") {
    emojiField.src = "partysnow.gif";
  }
}

//Function to get the name by it's number
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      return "Dont's know";
  }
}
