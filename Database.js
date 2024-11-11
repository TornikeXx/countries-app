// import axios from "axios";

// const addCountryToDatabase = () => {
//   axios
//     .get("https://restcountries.com/v3.1/all")
//     .then((response) => {
//       const countries = response.data;
//       const country = countries[5];

//       const newCountry = {
//         name: {
//           ge: country.name.official,
//           en: country.name.official,
//         },
//         capital: {
//           ge: country.capital[0],
//           en: country.capital[0],
//         },
//         population: country.population.toString(),
//         image: country.flags.png,
//         id: Math.random().toString(),
//         vote: 0,
//         deleted: false,
//       };

//       axios
//         .post("http://localhost:3000/countries", newCountry)
//         .then(() => {
//           console.log("new country added to the database");
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// addCountryToDatabase();
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

// import axios from "axios";
// import fs from "fs/promises"

// const addCountryToDatabase = () => {
//   axios
//     .get("https://restcountries.com/v3.1/all")
//     .then((res) => {
//       const countries = res.data.map((country) => ({
//         name: {
//                     ge: country.name.official,
//                    en: country.name.official,
//                    },
//                    capital: {
//                      ge: country.capital?.[0],
//                      en: country.capital?.[0],
//                    },
//                    population: country.population.toString(),
//                    image: country.flags.png,
//                    id: Math.random().toString(),
//                    vote: 0,
//                    deleted: false,

//       })
//     })
//   })
// }
