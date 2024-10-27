import { Link, useParams } from "react-router-dom";
import styles from "./Card-content.module.css";
import { useReducer } from "react";
import CardForm from "../Card-creating-form/Card-creating-form";
import { countriesReducer } from "../reducer/reducer";
import { countryInitialState } from "../reducer/state";

const CardContent: React.FC = () => {
  type Translation = {
    ge: string;
    en: string;
  };
  const [countriesList, dispatch] = useReducer(
    countriesReducer,
    countryInitialState,
  );

  const handleVote = (id: string) => {
    return () => {
      dispatch({ type: "vote", payload: { id } });
    };
  };

  const sortCountries = (sortType: "asc" | "desc"): void => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateCountry = (articleFields: {
    name: Translation;
    capital: Translation;
    population: string;
    image: string | null;
  }) => {
    dispatch({ type: "create", payload: { countryFields: articleFields } });
  };

  const handleDeleteCountry = (id: string, isDeleted: boolean) => {
    if (isDeleted) {
      dispatch({ type: "restore", payload: { id } });
    } else {
      dispatch({ type: "delete", payload: { id } });
    }
  };
  type Language = "ge" | "en";
  const { lang } = useParams<{ lang: string }>();
  const currentLang: Language = (lang as Language) || "en";
  console.log(lang);

  return (
    <>
      <div className={styles.sorting}>
        <button onClick={() => sortCountries("asc")}>asc</button>
        <button onClick={() => sortCountries("desc")}>desc</button>
      </div>

      <div className={styles.cardsContent}>
        <CardForm onCountryCreate={handleCreateCountry} />
        {countriesList.map((country, index) => (
          <div
            key={index}
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
                alt=""
              />
            </Link>
            <div className={styles.info}>
              <h2>{country.name[currentLang]}</h2>
              <h3>{country.capital[currentLang]}</h3>
              <h4>{country.population}</h4>
              <div className={styles.additionalButtons}>
                <button onClick={handleVote(country.id)}>
                  Been Here:{country.vote}
                </button>
                <p
                  onClick={() =>
                    handleDeleteCountry(country.id, country.deleted)
                  }
                >
                  {country.deleted ? "Restore" : "Delete"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardContent;
