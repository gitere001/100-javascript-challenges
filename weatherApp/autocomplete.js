document.addEventListener("DOMContentLoaded", () => {
  const autoCompleteContainer = document.querySelector(".suggestion-cities");
  const inputElement = document.querySelector(".search-bar input");

  let cities = [];

  async function fetchCities() {
    try {
      const response = await fetch("cleanCityNames.json");
      cities = await response.json();
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  fetchCities().then(() => {
    const citiesNames = cities.map((city) => city.name);

    inputElement.addEventListener("keyup", () => {
      const inputValue = inputElement.value.trim();
      let result = [];

      if (inputValue.length) {
        autoCompleteContainer.style.display = "block";
        result = citiesNames.filter((city) =>
          city.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        result = result.slice(0, 5);
        if (!result.length) {
          result.push("City not found");
        }
      } else {
        autoCompleteContainer.style.display = "none";
      }

      autoCompleteContainer.innerHTML = "";
      result.forEach((city) => {
        const cityp = document.createElement("p");
        cityp.textContent = city;
        if (city === "City not found") {
          cityp.classList.add("no-city");
        }
        autoCompleteContainer.appendChild(cityp);
      });
    });
  });
});
