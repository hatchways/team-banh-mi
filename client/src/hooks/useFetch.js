import { useState, useEffect } from "react";

/**
 * Given a URL and an options object, produce an object with the parsed data, a
 * loading indicator (boolean), and an error object (null if no error occured).
 *
 * @param {string} url - URL string of the resource where to make the API call.
 * @param {object} options - Fetch Options object.
 * @returns {object}
 * @property {any|null} data - The data received and parsed from making the API
 * call. Defaults to null if no data was recieved.
 * @property {object|null} error - The error object recieved if an error
 * occured during the API request or the parsing of the data. If no error
 * occured, defaults to 'null'.
 * @property {boolean} loading - True while the API request is in process.
 * False if the request is completed (successfully or not).
 */
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  try {
    useEffect(() => {
      const makeFetchRequest = async () => {
        const response = await fetch(url, options);
        const responseData = await response.json();
        return responseData;
      };
      const result = makeFetchRequest();
      setLoading(false);
      setError(null);
      setData(result);
    }, [setData, url, options]);
    return { data, error, loading };
  } catch (error) {
    setLoading(false);
    setError(error);
    setData(null);
  }
};

export default useFetch;
