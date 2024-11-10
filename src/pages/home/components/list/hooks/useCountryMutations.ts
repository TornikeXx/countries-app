import {
  changeCountryPopulation,
  createCountry,
  deleteCountry,
  updateCountryImage,
  updateVotesForCountries,
} from "@/api/countries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CountryFields } from "../reducer/reducer";

export const useCountryMutations = (refetch: () => void) => {
  const queryClient = useQueryClient();

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
  return {
    voteMutation,
    createCountryMutation,
    deleteCountryMutation,
    updatePopulationMutation,
    updateImageMutation,
  };
};
