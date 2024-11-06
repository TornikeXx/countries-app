import { CountryFields,Country } from "@/pages/home/components/list/reducer/reducer";
import { httpClient } from "..";



export const getCountries = async (): Promise<Country[]> => {
    try {
      const res = await httpClient.get("/countries");
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
  }): Promise<Country> => {
    try {
      const res = await httpClient.patch(`/countries/${id}`, { vote });
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
  }): Promise<Country> => {
    try {
      const res = await httpClient.patch(`/countries/${id}`, { population: newPopulation });
      return res.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };



export const createCountry = async (countryFields: CountryFields): Promise<Country> => {
    try {
      const res = await httpClient.post("/countries", {
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
  }): Promise<Country> => {
    try {
      const res = await httpClient.patch(`/countries/${id}`, { image: imageUrl });
      return res.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  export const deleteCountry = async (id: string): Promise<void> => {
    try {
      await httpClient.delete(`/countries/${id}`);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

