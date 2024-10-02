import styles from "./Card-content.module.css"

interface Country {
  name: string;
  capital: string;
  population: string;
  image: string;
}

interface CardContentProps {
  countries: Country[];
}

const CardContent:React.FC<CardContentProps> = ({countries}) => {
  return (
      <div className={styles.cardsContent}>
              {countries.map((country, index) => (
                  <div key={index} className={styles.country}>
                      <img src={country.image} alt="" />
                      <div className={styles.info}>
                          <h2>{country.name}</h2>
                          <h3>{country.capital}</h3>
                          <h4>{country.population }</h4>
                      </div>
                  </div>
        ))}     
      </div>
  )

  
};

export default CardContent;
