type CountriesInitalState = {
    name: string;
    capital: string;
    population: string;
    image: string;
    id: string;
    vote: number;
    deleted:boolean
}[];

type CountrieReducerAction = {
    type: "vote" | "sort" | "create" | "delete"|"restore";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?:any;
  };

export const countriesReducer = (
    countriesList:CountriesInitalState,
    action:CountrieReducerAction,
) => {

    if (action.type === "vote") {
        const uptadetCountryList = countriesList.map(country =>
            country.id === action.payload.id ? { ...country, vote: country.vote + 1 } : country
        )
        return uptadetCountryList
    }

    if (action.type === "sort") {
        const sortedCountries = [...countriesList]
            .filter(coutry => !coutry.deleted)
            .sort((a, b) => {
            return action.payload.sortType === "asc"
                ? a.vote - b.vote
                : b.vote - a.vote;
            })
        .concat(countriesList.filter(country => country.deleted))
        return sortedCountries;
    }
  
    if (action.type === "create") {
        const newCountry = {
            ...action.payload.countryFields,
            image: "https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
            vote: 0,
            id: (Number(countriesList.at(-1)?.id) + 1).toString(),
            deleted: false,
        };
    
        return [...countriesList,newCountry];
    }
    if (action.type === "delete") {
        const updatedCountriesList = countriesList.filter(country => country.id !== action.payload.id);
        const deletedCountry = countriesList.find(country => country.id === action.payload.id);
        return [...updatedCountriesList, { ...deletedCountry, deleted: true }]
    }

    if (action.type === "restore") {
        const restoredCountry = countriesList.find(country => country.id === action.payload.id);
        if (restoredCountry) {
            return [
                { ...restoredCountry, deleted: false },
                ...countriesList.filter(country => country.id !== action.payload.id)
            ];
        }
        return countriesList;
    }

    return countriesList
}
