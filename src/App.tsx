import { ChangeEvent, useState, useEffect } from "react";
import "./index.css";
import { optionType } from "./types/index";

const App = () => {
  // declare two state variables, term and options
  const [term, setTerm] = useState<string>();
  const [options, setOptions] = useState<[] | undefined>(undefined);
  const [city, setCity] = useState<optionType | null>(null);

const getForcast = (city:optionType) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metrics&appid=c93d2d185fbd745cf7638e84d7125711`)
   .then(res => res.json()).then(data => console.log({data}))
}

const onSubmit = () => {
  if(!city) return
  getForcast(city)
}

  // getSearchOption function fetches data from the API and sets the options state variable
  const getSearchOption = (value: string | null) => {
    if (value === null) return;
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=c93d2d185fbd745cf7638e84d7125711`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };
  useEffect(()=>{
    if(city){
      setTerm(city.name);
      setOptions([])
    }
  }, [city])

  // onOptionSelect function logs the name of the selected option
  const onOptionSelect = (option: optionType) => {
    setCity(option)
  };

  // onInputChange function sets the term state variable and calls getSearchOption
  const onInputChange = (e: ChangeEvent<HTMLInputElement | null>) => {
    setTerm(e.target.value?.trim());
    getSearchOption(e.target.value);
  };

  // return the rendered UI
  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        <section
          className="bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700 w-full md:max-w-[500px] p-4 flex flex-col 
      text-center items-center justify-center md:px-10 lg:px-24 h-full lg:h-[500px] "
        >
          <h1 className="text-4xl font-thin">
            weather <span className="font-black ">Forcast</span>
          </h1>
          <p className="text-sm mt-2">
            Enter below a place you want to know the weather of the select an
            option from dropdown.
          </p>
          <div className="relative md:mt-4 mt-10">
            <input
              type="text"
              value={term}
              onChange={onInputChange}
              className="px-2 py-1  rounded-l-md  border-2 border-white mt-4 "
            />
            <ul className="absolute top-9 bg-white ml-1 rounded-b-md mt-4 ">
              {options?.map((option: optionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 curser-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={onSubmit} className="px-4 rounded-r-md border-2 border-zinc-100  hover:text-zinc-500 text-zinc-100 pc-2 py-1 cursor-pointer">
              Search
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
