import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutFunc = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
