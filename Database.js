import axios from "axios";
import fs from "fs/promises";

const addCountryToDatabase = () => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      const countries = response.data.map((country) => ({
        name: {
          ge: country.name.common,
          en: country.name.common,
        },
        capital: {
          ge: country.capital?.[0],
          en: country.capital?.[0],
        },
        population: country.population.toString(),
        image: country.flags.png,
        id: Math.random().toString(),
        vote: 0,
        deleted: false,
      }));
      fs.writeFile("db.json", JSON.stringify({ countries }, null, 2));
    })
    .catch((error) => {
      console.log(error);
    });
};
addCountryToDatabase();
