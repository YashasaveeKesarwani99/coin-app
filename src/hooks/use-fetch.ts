// custom hook for fetching data along with caching it

import { useQuery } from "react-query";

export const useFetch = <T>(url: string, pageNumber: number) => {
  const fetchData = async (): Promise<T> => {
    const response = await fetch(`${url}&offset=${pageNumber}`);

    if (!response.ok) {
      throw new Error("Unable to fetch crypto info!");
    }
    return response.json();
  };

  const queryKey = [url, pageNumber];

  const { data, isLoading, error } = useQuery<T, Error>(queryKey, fetchData, {
    staleTime: 5 * 60 * 1000, // default stale time 5 mins,
    cacheTime: 10 * 60 * 1000, // default cache time 10 mins
  });

  return { data, isLoading, error };
};
