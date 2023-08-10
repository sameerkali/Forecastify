import { ChangeEvent, useState, useEffect } from "react";
import { optionType } from "../types";



const useForcast = () => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState< null >(null)

  const getForcast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metrics&appid=c93d2d185fbd745cf7638e84d7125711`
    )
      .then((res) => res.json())
      .then((data) => setForecast(data));
  };

  const onSubmit = () => {
    if (!city) return;

    getForcast(city);
  };

   const getSearchOption = (value: string | null) => {
    if (value === null) return;

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=c93d2d185fbd745cf7638e84d7125711`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };


 
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement | null>) => {
    setTerm(e.target.value?.trim());
    getSearchOption(e.target.value);
  };

return {
    term, options, forecast, onInputChange, onOptionSelect, onSubmit
}

}

export default useForcast