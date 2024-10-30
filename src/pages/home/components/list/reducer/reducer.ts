interface Country {
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
}
type Translation = {
  ge: string;
  en: string;
};

type CountriesInitalState = Country[];

export type CountryFields = {
  name: Translation;
  capital: Translation;
  population: string;
  image: string | null;
};

type CountrieReducerAction =
  | { type: "vote"; payload: { id: string } }
  | { type: "sort"; payload: { sortType: "asc" | "desc" } }
  | { type: "create"; payload: { countryFields: CountryFields } }
  | { type: "delete"; payload: { id: string } }
  | { type: "restore"; payload: { id: string } };

export const countriesReducer = (
  countriesList: CountriesInitalState,
  action: CountrieReducerAction,
): CountriesInitalState => {
  if (action.type === "vote") {
    const uptadetCountryList = countriesList.map(
      (country) =>
        country.id === action.payload.id
          ? { ...country, vote: country.vote + 1 }
          : country,
      // console.log(action.payload)
    );
    return uptadetCountryList;
  }

  if (action.type === "sort") {
    const sortedCountries = [...countriesList]
      .filter((coutry) => !coutry.deleted)
      .sort((a, b) => {
        return action.payload.sortType === "asc"
          ? a.vote - b.vote
          : b.vote - a.vote;
      })
      .concat(countriesList.filter((country) => country.deleted));
    return sortedCountries;
  }

  if (action.type === "create") {
    const newCountry: Country = {
      ...action.payload.countryFields,
      vote: 0,
      id: (Number(countriesList.at(-1)?.id) + 1).toString(),
      deleted: false,
    };
    console.log(action.payload);
    // console.log(newCountry)

    return [...countriesList, newCountry];
  }

  if (action.type === "delete") {
    const updatedCountriesList = countriesList.filter(
      (country) => country.id !== action.payload.id,
    );
    const deletedCountry = countriesList.find(
      (country) => country.id === action.payload.id,
    );

    if (deletedCountry) {
      return [...updatedCountriesList, { ...deletedCountry, deleted: true }];
    }

    return updatedCountriesList;
  }

  if (action.type === "restore") {
    const restoredCountry = countriesList.find(
      (country) => country.id === action.payload.id,
    );
    if (restoredCountry) {
      return [
        { ...restoredCountry, deleted: false },
        ...countriesList.filter((country) => country.id !== action.payload.id),
      ];
    }
    return countriesList;
  }

  return countriesList;
};
