import { Link } from "react-router-dom";
import styles from "./Card-content.module.css"
import { useState } from "react";




const CardContent: React.FC = () => {
  const [countriesList,setCountriesList] = useState<
  {
      name: string;
      capital: string;
      population: string;
      image: string;
      id: string;
      vote: number;
  }[]
  >
  
  ([
    {
      name: "Morroco",
      capital: "Rabat",
      population: "37 million",
      image: "https://lp-cms-production.imgix.net/2022-12/iStock-182059497-RFC.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
      id: "1",
      vote: 0
    },
    {
      name: "Greece",
      capital: "Athens",
      population: "10.4 million",
      image: "https://lp-cms-production.imgix.net/2020-11/GettyRF_663376932.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
      id: "2",
      vote:0
    },
    {
      name: "Italy",
      capital: "Rome",
      population: "67 million",
      image: "https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
      id: "3",
      vote: 0
    }
  ]
  );

  const handleVote = (id:string) => {
    return () => {
      const uptadetCountryList = countriesList.map(country =>
        country.id === id ? {...country,vote:country.vote +1 }:country
      )
      setCountriesList(uptadetCountryList)
    }
  }





  const [isAscending,setIsAscending] = useState(true)
  

  const sortCountries = () => {
    const sortedCountries = [...countriesList].sort((x, y) => 
      isAscending ? x.vote - y.vote : y.vote - x.vote
    );
    setCountriesList(sortedCountries);
    setIsAscending(!isAscending)
  }


  return (
    <>
      <div className={styles.sorting}>
        <h3>Sort By:</h3>
        <h3 onClick={sortCountries}>{isAscending ? "least visited to most visited":"most visited to least visited"}</h3>
      </div>
    <div className={styles.cardsContent}>
      {countriesList.map((country, index) => (
        <div key={index} className={styles.country}>
                     <Link style={{color:"black", textDecoration:'none'}} to={`/articles/${country.id}`}>
                      <img src={country.image} alt="" />
                     </Link>
                      <div className={styles.info}>
                          <h2>{country.name}</h2>
                          <h3>{country.capital}</h3>
                          <h4>{country.population}</h4>
                          <button onClick={handleVote(country.id)}>Been Here:{ country.vote}</button>
                      </div>
                  </div>
               
        ))}     
    </div>
    </>
  )

  
};

export default CardContent;
