
export interface Country {
  name: {
    ge: string;
    en: string;
  };
  capital: {
    ge: string;
    en: string;
  };
  population: string;
  image: string | null;
  id: string;
  vote: number;
  deleted: boolean;
  background: string;
  about: {
    ge: string;
    en: string;
  }
}

export type CountryFields = {
  name: { ge: string; en: string };
  capital: { ge: string; en: string };
  population: string;
  image: string | null;
};

type CountriesInitalState = Country[];

type CountrieReducerAction =
  | { type: "initialize"; payload: { countries: Country[] } }
  | { type: "vote"; payload: { id: string } }
  | { type: "sort"; payload: { sortType: "asc" | "desc" } }
  | { type: "create"; payload: { countryFields: Country } }
  | { type: "delete"; payload: { id: string } }
  | { type: "restore"; payload: { id: string } }
  | { type: "modify"; payload: { id: string; newPopulation: string } };



export const countriesReducer = (
  countriesList: CountriesInitalState,
  action: CountrieReducerAction,
): CountriesInitalState => {
  switch (action.type) {
    case "initialize":
      return action.payload.countries;

    case "vote":
      return countriesList.map(country =>
        country.id === action.payload.id
          ? { ...country, vote: country.vote + 1 }
          : country
      );

    case "sort": {
      const sortedCountries = [...countriesList]
        .filter(country => !country.deleted)
        .sort((a, b) =>
          action.payload.sortType === "asc" ? a.vote - b.vote : b.vote - a.vote
        )
        .concat(countriesList.filter(country => country.deleted));
      return sortedCountries;
    }

    case "create":
      return [...countriesList, { ...action.payload.countryFields, deleted: false, vote: 0 }];

    case "delete":
      return countriesList.filter((country) => country.id !== action.payload.id);
    

    case "restore":
      return countriesList.map(country =>
        country.id === action.payload.id ? { ...country, deleted: false } : country
      );
      case "modify":
        return countriesList.map((country) => 
          country.id === action.payload.id ? { ...country, population: action.payload.newPopulation } : country
        );
    

    default:
      return countriesList;
  }
};
