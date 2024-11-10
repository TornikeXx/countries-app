import {
  CountryFields,
  Country,
} from "@/pages/home/components/list/reducer/reducer";
import { httpClient } from "..";

export const getCountries = async ({
  sort = "vote",
  page,
  limit,
}: {
  sort?: string;
  page: number;
  limit: number;
}) => {
  try {
    const res = await httpClient.get(`/countries?_sort=${sort}&_page=${page}&_per_page=${limit}`);
    // console.log(res.data.data)
    return res.data;
    
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getDetailedCountry = async (id: string) => {
  try {
    const res = await httpClient.get<Country>(`/countries/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};

export const updateVotesForCountries = async ({
  id,
  vote,
}: {
  id: string;
  vote: number;
}) => {
  try {
    const res = await httpClient.patch<Country>(`/countries/${id}`, { vote });
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const changeCountryPopulation = async ({
  id,
  newPopulation,
}: {
  id: string;
  newPopulation: string;
}) => {
  try {
    const res = await httpClient.patch<Country>(`/countries/${id}`, {
      population: newPopulation,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const createCountry = async (countryFields: CountryFields) => {
  try {
    const res = await httpClient.post<Country>("/countries", {
      ...countryFields,
      vote: 0,
      deleted: false,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const updateCountryImage = async ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) => {
  try {
    const res = await httpClient.patch<Country>(`/countries/${id}`, {
      image: imageUrl,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const deleteCountry = async (id: string) => {
  try {
    await httpClient.delete<void>(`/countries/${id}`);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
