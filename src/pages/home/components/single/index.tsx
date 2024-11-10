import { NavLink, useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import { getDetailedCountry } from "@/api/countries";

const SingleArticle = () => {
  const { id, lang } = useParams();
  const currentLang = lang === "en" || lang === "ge" ? lang : "en";

  const {
    data: countryInfo,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["country", id],
    queryFn: () => getDetailedCountry(id as string),
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
  });
  console.log(countryInfo);

  const articleDoesNotExist = !countryInfo;
  if (articleDoesNotExist) {
    return <div>Country not found</div>;
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

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
