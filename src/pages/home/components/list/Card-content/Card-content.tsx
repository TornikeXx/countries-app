import { Link } from "react-router-dom";
import styles from "./Card-content.module.css"

interface Country {
  name: string;
  capital: string;
  population: string;
  image: string;
  id: string;
}

interface CardContentProps {
  countries: Country[];
}

const CardContent:React.FC<CardContentProps> = ({countries}) => {
  return (
      <div className={styles.cardsContent}>
      {countries.map((country, index) => (
                <Link style={{color:"black", textDecoration:'none'}} to={`/${country.id}`}>
                  <div key={index} className={styles.country}>
                      <img src={country.image} alt="" />
                      <div className={styles.info}>
                          <h2>{country.name}</h2>
                          <h3>{country.capital}</h3>
                          <h4>{country.population }</h4>
                      </div>
                  </div>
               </Link>
        ))}     
      </div>
  )

  
};

export default CardContent;
