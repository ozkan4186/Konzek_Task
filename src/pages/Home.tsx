import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

import Pagination from "../components/Pagination";
import Currency from "../components/Form/Currency";
import Language from "../components/Form/Language";
import Country from "../components/Country";


// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES: any = gql`
  {
    countries {
      name
      code
      native
      capital
      emoji
      currency
      languages {
        name
        code
      }
    }
  }
`;
const colors = ["red", "green", "blue", "yellow", "orange"];

export interface LanguageType {
  name: string;
  code: string;
}

export interface CountryType {
  name: string;
  code: string;
  native: string;
  capital: string;
  emoji: string;
  size: string;
  currency: string;
  languages: LanguageType[];
}

interface valueType {
  currency: string;
  code: string;
  choice: string;
  language: string;
}

// create a component that renders a select input for coutries
const Home = () => {
  const [country, setCountry] = useState("US");
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const [dates, setDates] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [isdone, setIsdone] = useState<boolean>(false);
  const [filtercountry, setFilterCountry] = useState([]);
  const [noOfElement, setNoOfElement] = useState(3);

  const [value, setValue] = useState<valueType>({
    code: "",
    currency: "",
    choice: "",
    language: "",
  });

  useEffect(() => {
    if (data) {
      setCurrentColor(currentColor[9]);
      console.log(data.countries[9]);
    }
  }, []);

  // const selectCountry = (country:any) => {selectedCountry === country.code ? setSelectedCountry(""):      setSelectedCountry(country.code);
  // };
  //!Burası renkleri bir listeye göre teker teker gezdirip backgroundunu değiştiğim yerdir.
  const handleClick = (cntry: string) => {
    setSelectedCountry(cntry);
    const crntColor = colors[currentColorIndex];
    setCurrentColor(crntColor);
    setCurrentColorIndex(currentColorIndex + 1);
    const nextColorIndex =
      currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1;
    setCurrentColorIndex(nextColorIndex);
    console.log("nextColorIndex", nextColorIndex);
    setIsdone(true);
  };
  //!Burada apinin durumuna göre loading ve hata vermei amacıyla yaptım.
  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  //!Form özelliğinden dolayı onClick yapmadan filtreleyip submitlediğim kod kısmıdır.
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(value);
    let filter = [];
    if (value.choice === "currency") {
      filter = getFilteredCountries().filter(
        (item: any) => item.currency === value.currency
      );
    }
    if (value.choice === "languages") {
      filter = getFilteredCountries().filter(
        (item: any) => item.languages[0].code === value.language.toLowerCase()
      );
    }

    setFilterCountry(filter);
    console.log(filter);
  };

  const getFilteredCountries = () => {
    const filter = data.countries.filter(
      (item: any) => item.code === value.code
    );

    return filter;
  };
  //!Burası handleChange ile inputtaki değişiklikleri aldığım yerler.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCountry([]);
    console.log(e.target.value);
    setValue((prev) => ({
      ...prev,
      code: e.target.value,
    }));
  };
  const updateCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      currency: e.target.value,
    }));
  };

  const updateChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue((prev) => ({
      ...prev,
      choice: e.target.value,
    }));
  };

  const updateLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      language: e.target.value,
    }));
  };

  const returnedObject = () =>
    filtercountry.length > 0
      ? filtercountry
      : data.countries?.length > 0
      ? data.countries
      : [];

  //! Burasını pagination yapmak için sliceladım ve pagination componentine gönderdim.Statei 3ten başlatıp butuna basıldığında 3er gidiyor.
  const slice = returnedObject().slice(0, noOfElement);

  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-75 text-center m-auto  ">
        <div className="form-group">
          <label className="text-black" htmlFor="exampleInputEmail1">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Search"
            id="code"
            value={value.code}
            onChange={handleChange}
          />
        </div>
        <br />
        <select
          className="form-select "
          onChange={updateChoice}
          aria-label="Your Choice Select"
        >
          <option className="text-white" selected>
            Open this select menu
          </option>
          <option value="none">None</option>
          <option value="currency">Currency</option>
          <option value="languages">Language</option>
        </select>
        <br />
        {value.choice === "currency" ? (
          <Currency
            inputData={value.currency}
            updateInputData={updateCurrency}
          />
        ) : value.choice === "languages" ? (
          <Language
            inputData={value.language}
            updateInputData={updateLanguage}
          />
        ) : (
          ""
        )}

        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br /> <br /> <br />
      <div className="d-flex gap-5 justify-content-center flex-wrap w-75 m-auto ">
        {slice.map((ctry: CountryType, index: number) => (
          <Country
            ctry={ctry}
            key={index}
            index={index}
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            handleClick={handleClick}
            isdone={isdone}
            setIsdone={setIsdone}
          />
        ))}
      </div>
      <Pagination loadMore={loadMore} />
    </>
  );
};

export default Home;
