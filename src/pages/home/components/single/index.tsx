import { NavLink, useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { Country } from "../list/reducer/reducer";
import axios from "axios";

const SingleArticle = () => {
  const { id, lang } = useParams();
  const [countryInfo, setCountryInfo] = useState<Country>();
  const currentLang = lang === "en" || lang === "ge" ? lang : "en";

  useEffect(() => {
    axios
      .get<Country[]>("http://localhost:3000/countries")
      .then((response) => {
        const country = response.data.find((country) => country.id === id);
        setCountryInfo(country);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const articleDoesNotExist = !countryInfo;
  if (articleDoesNotExist) {
    return <div>Country not found</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <img src={countryInfo.background} />
      <div className={styles.info}>
        <p>{countryInfo.name[currentLang]},</p>
        <p>{countryInfo.capital[currentLang]}</p>
      </div>
      <p>{countryInfo.about[currentLang]}</p>
      <NavLink to="/">
        <button>Back to Home</button>
      </NavLink>
    </div>
  );
};

export default SingleArticle;
