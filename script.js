async function getWeather(searchTerm) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}/?key=AE7TSXQ5MBDURRVVYRURBBVTQ`
    );
    if (response.status == 400) {
      throw new Error("Enter a valid location!");
    } else if (!response.ok) {
      throw new Error("Error getting data!");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

const btn = document.querySelector("button");

btn.onclick = async () => {
  const search = document.querySelector("input");
  const searchTerm = search.value;
  search.textContent = "";
  const info = document.querySelector(".info");
  info.textContent = "";
  try {
    const response = await getWeather(searchTerm);
    console.log(response);
    info.textContent = `Conditions: ${
      response.currentConditions.conditions
    }\nTemperature: ${(
      ((response.currentConditions.feelslike - 32) * 5) /
      9
    ).toFixed(1)}C\nHumidity: ${
      response.currentConditions.humidity
    }\nChance to Precipitate ${response.currentConditions.precipprob}`;
  } catch (error) {
    info.textContent = error.message;
  }
};
