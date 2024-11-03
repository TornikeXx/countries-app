

import { Link, useParams } from "react-router-dom";
import styles from "./Card-content.module.css";
import { useEffect, useReducer, useState } from "react";
import CardForm from "../Card-creating-form/Card-creating-form";
import { countriesReducer, CountryFields } from "../reducer/reducer";
import axios from "axios";

const CardContent: React.FC = () => {
  const [countriesList, dispatch] = useReducer(countriesReducer, []);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/countries")
      .then((res) => {
        dispatch({ type: "initialize", payload: { countries: res.data } });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }, []);

  type Language = "ge" | "en";
  const { lang } = useParams<{ lang: string }>();
  const currentLang: Language = (lang as Language) || "en";

  const handleVote = (id: string) => {
    const country = countriesList.find((c) => c.id === id);
    if (country) {
      axios
        .patch(`http://localhost:3000/countries/${id}`, {
          vote: country.vote + 1,
        })
        .then(() => {
          dispatch({ type: "vote", payload: { id } });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const sortCountries = (sortType: "asc" | "desc"): void => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateCountry = (countryFields: CountryFields) => {
    axios
      .post("http://localhost:3000/countries", {
        ...countryFields,
        vote: 0,
        deleted: false,
      })
      .then((res) => {
        dispatch({ type: "create", payload: { countryFields: res.data } });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteCountry = (id: string) => {
    axios
      .delete(`http://localhost:3000/countries/${id}`)
      .then(() => {
        dispatch({ type: "delete", payload: { id } });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSavePopulation = (id: string, newPopulation: string) => {
    const countryToUpdate = countriesList.find((country) => country.id === id);

    if (countryToUpdate) {
      const updatedCountry = { ...countryToUpdate, population: newPopulation };

      axios
        .put(`http://localhost:3000/countries/${id}`, updatedCountry)
        .then(() => {
          dispatch({ type: "modify", payload: { id, newPopulation } });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleImageUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        axios
          .patch(`http://localhost:3000/countries/${id}`, {
            image: newImageUrl,
          })
          .then(() => {
            dispatch({ type: "modify", payload: { id, newImageUrl } });
          })
          .catch((e) => {
            console.log(e);
          });
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <>
      <div className={styles.sorting}>
        <button onClick={() => sortCountries("asc")}>asc</button>
        <button onClick={() => sortCountries("desc")}>desc</button>
      </div>

      <div className={styles.cardsContent}>
        <CardForm onCountryCreate={handleCreateCountry} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          countriesList.map((country) => (
            <div
              key={country.id}
              className={`${styles.country} ${country.deleted ? styles.deleted : ""}`}
            >
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/${currentLang}/articles/${country.id}`}
              >
                <img
                  src={
                    country.image ||
                    "https://lp-cms-production.imgix.net/2022-12/iStock-182059497-RFC.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75"
                  }
                  alt={country.name[currentLang]}
                />
              </Link>

              <div className={styles.imgInput}>
                <input
                  type="file"
                  id={country.id}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(country.id, e)}
                  placeholder="change image"
                />
                <label htmlFor={country.id}>change image</label>
              </div>

              <div className={styles.info}>
                <h2>{country.name[currentLang]}</h2>
                <h3>{country.capital[currentLang]}</h3>
                <h4>{country.population}</h4>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    placeholder="Change population"
                    onBlur={(e) =>
                      handleSavePopulation(country.id, e.target.value)
                    }
                  />
                  <button
                    onClick={() =>
                      handleSavePopulation(country.id, country.population)
                    }
                  >
                    Save
                  </button>
                </div>

                <div className={styles.additionalButtons}>
                  <button onClick={() => handleVote(country.id)}>
                    Been Here: {country.vote}
                  </button>
                  <p onClick={() => handleDeleteCountry(country.id)}>Delete</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CardContent;
