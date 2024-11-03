import axios from "axios";

const addCountryToDatabase = () => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      const countries = response.data;
      const country = countries[5];

      const newCountry = {
        name: {
          ge: country.name.official,
          en: country.name.official,
        },
        capital: {
          ge: country.capital[0],
          en: country.capital[0],
        },
        population: country.population.toString(),
        image: country.flags.png,
        id: Math.random().toString(),
        vote: 0,
        deleted: false,
      };

      axios
        .post("http://localhost:3000/countries", newCountry)
        .then(() => {
          console.log("new country added to the database");
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

addCountryToDatabase();
