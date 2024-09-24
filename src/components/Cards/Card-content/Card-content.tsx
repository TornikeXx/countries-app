import "./Card-content.css";


interface Country {
  name: string;
  capital: string;
  population: string;
  image: string;
}

const CardContent:React.FC = () => {
  const countries:Country[] = [
    { name: "Morroco", capital: "Rabat", population: "37 million", image: "https://lp-cms-production.imgix.net/2022-12/iStock-182059497-RFC.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
    { name: "Greece", capital: "Athens", population: "10.4 million", image: "https://lp-cms-production.imgix.net/2020-11/GettyRF_663376932.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
    { name:"Italy", capital:"Rome", population:"67 million", image:"https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75"}
]
  return (
      <div className="cards-content">
              {countries.map((country, index) => (
                  <div key={index} className="country">
                      <img src={country.image} alt="" />
                      <div className="info">
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
