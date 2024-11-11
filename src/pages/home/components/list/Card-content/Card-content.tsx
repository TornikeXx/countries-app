import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./Card-content.module.css";
import CardForm from "../Card-creating-form/Card-creating-form";
import { CountryFields } from "../reducer/reducer";
import { getCountries } from "@/api/countries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCountryMutations } from "../hooks/useCountryMutations";
import React from "react";

const CardContent: React.FC = () => {
  type Language = "ge" | "en";
  const { lang } = useParams<{ lang: string }>();
  const currentLang: Language = (lang as Language) || "en";
  const parentRef = React.useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "vote";

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["country-list", sort],
    queryFn: ({ pageParam }) =>
      getCountries({ sort, page: pageParam, limit: 10 }),

    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },

    initialPageParam: 1,
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
  });

  const Country = data ? data?.pages.flatMap((d) => d.data) : [];

  const virtualizer = useVirtualizer({
    count: hasNextPage ? Country.length + 1 : Country.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 700,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  React.useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= Country.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    Country.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  const {
    voteMutation,
    createCountryMutation,
    deleteCountryMutation,
    updatePopulationMutation,
    updateImageMutation,
  } = useCountryMutations(refetch);
  console.log(hasNextPage)

  const handleVote = (id: string) => {
    const country = Country?.find((c) => c.id === id);
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
    const countryToUpdate = Country?.find((country) => country.id === id);
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

  const handleToggleSortOrder = () => {
    const newSort = sort === "vote" ? "-vote" : "vote";
    setSearchParams({ sort: newSort });
  };
  console.log(hasNextPage);

  return (
    <>
      <div className={styles.sorting}>
        <button onClick={handleToggleSortOrder}>
          {sort === "vote" ? "Asc" : "Desc"}
        </button>
      </div>

      <div
        className={styles.cardsContent}
        ref={parentRef}
        style={{ overflowY: "auto", height: "100vh", display: "grid" }}
      >
        <div style={{ marginRight: "", left: 0 }}>
          <CardForm onCountryCreate={handleCreateCountry} />
        </div>

        {isError ? "Error loading data" : null}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{ height: virtualizer.getTotalSize(), position: "relative" }}
          >
            {virtualItems.map((virtualItem) => {
              const country = Country[virtualItem?.index];

              return (
                <div
                  key={country.id}
                  className={`${styles.country} ${country.deleted ? styles.deleted : ""}`}
                  style={{
                    position: "absolute",
                    top: virtualItem.start,
                  }}
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
                    <label htmlFor={country.id}>Change image</label>
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
                      <p onClick={() => handleDeleteCountry(country.id)}>
                        Delete
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {hasNextPage && !isLoading && (
          <button onClick={() => fetchNextPage()} disabled={isLoading}>
            Load more
          </button>
        )}
        {/* {isFetching && !isFetchingNextPage ? 'Background Updating...' : null} */}
      </div>
    </>
  );
};

export default CardContent;
