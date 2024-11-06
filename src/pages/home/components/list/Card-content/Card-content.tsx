import { Link, useParams } from "react-router-dom";
import styles from "./Card-content.module.css";
import CardForm from "../Card-creating-form/Card-creating-form";
import { CountryFields } from "../reducer/reducer";
import {
  changeCountryPopulation,
  createCountry,
  deleteCountry,
  getCountries,
  updateCountryImage,
  updateVotesForCountries,
} from "@/api/countries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CardContent: React.FC = () => {
  const queryClient = useQueryClient();

  type Language = "ge" | "en";

  const { lang } = useParams<{ lang: string }>();
  const currentLang: Language = (lang as Language) || "en";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["country-list"],
    queryFn: getCountries,
  });

  const { mutate: voteMutation } = useMutation({
    mutationFn: updateVotesForCountries,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["country-list"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: createCountryMutation } = useMutation({
    mutationFn: (countryFields: CountryFields) => createCountry(countryFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["country-list"] });
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteCountryMutation } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coutry-key"] });
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updatePopulationMutation } = useMutation({
    mutationFn: changeCountryPopulation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["country-key"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: updateImageMutation } = useMutation({
    mutationFn: updateCountryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["country-key"] });
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleVote = (id: string) => {
    const country = data?.find((c) => c.id === id);
    if (country) {
      voteMutation({ id, vote: country.vote + 1 });
    }
  };

  const handleCreateCountry = (countryFields: CountryFields) => {
    createCountryMutation(countryFields);
  };

  const handleDeleteCountry = (id: string) => {
    deleteCountryMutation(id);
  };

  const handleSavePopulation = (id: string, newPopulation: string) => {
    const countryToUpdate = data?.find((country) => country.id === id);
    if (countryToUpdate) {
      updatePopulationMutation({ id, newPopulation });
    }
  };

  const handleImageUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        updateImageMutation({ id, imageUrl: newImageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={styles.sorting}>
        {/* <button onClick={() => sortCountries("asc")}>asc</button>
        <button onClick={() => sortCountries("desc")}>desc</button> */}
      </div>

      <div className={styles.cardsContent}>
        <CardForm onCountryCreate={handleCreateCountry} />
        {isError ? "error" : null}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map((country) => (
            <div
              key={country.id}
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
                  alt={country.name[currentLang]}
                />
              </Link>

              <div className={styles.imgInput}>
                <input
                  type="file"
                  id={country.id}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(country.id, e)}
                  placeholder="change image"
                />
                <label htmlFor={country.id}>change image</label>
              </div>

              <div className={styles.info}>
                <h2>{country.name[currentLang]}</h2>
                <h3>{country.capital[currentLang]}</h3>
                <h4>{country.population}</h4>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    placeholder="Change population"
                    onBlur={(e) =>
                      handleSavePopulation(country.id, e.target.value)
                    }
                  />
                  <button
                    onClick={() =>
                      handleSavePopulation(country.id, country.population)
                    }
                  >
                    Save
                  </button>
                </div>

                <div className={styles.additionalButtons}>
                  <button onClick={() => handleVote(country.id)}>
                    Been Here: {country.vote}
                  </button>
                  <p onClick={() => handleDeleteCountry(country.id)}>Delete</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CardContent;
