import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import Country from "./Country";

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

export interface CountryType {
  name: string;
  code: string;
  native: string;
  capital: string;
  emoji: string;
  size: string;
  currency: string;
  languages: {
    name: string;
    code: string;
  };
}

interface valueType {
  currency:string;
  code:string;
  choice:string;
  language:string;
}

// create a component that renders a select input for coutries
const CountrySelect = () => {
  const [country, setCountry] = useState("US");
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const [dates, setDates] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [isdone, setIsdone] = useState<boolean>(false);
  const [filtercountry, setFilterCountry] = useState([]);

  const [value, setValue] = useState<valueType>({
    code: "",
    currency: "",
    choice: "",
    language:""
  });

  useEffect(() => {
    setDates(data);
  }, [data]);

  // const selectCountry = (country:any) => {selectedCountry === country.code ? setSelectedCountry(""):      setSelectedCountry(country.code);
  // };
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

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(value);

    const filter = data.countries
      .filter((item: any) => item.code === value.code)
      .filter((item: any) => item[value.choice] === ( value.choice === 'currency' ? value.currency : value.choice ==='languages' ? value.language: ""));
    setFilterCountry(filter);
    console.log(filter);
  };
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

  const returnedObject = () =>
    filtercountry.length > 0
      ? filtercountry
      : data.countries?.length > 0
      ? data.countries
      : [];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            onChange={handleChange}
            value={value.code}
            id="code"
          />
        </label>
        <label>
          Group By:
          <select onChange={updateChoice}>
            <option value="NONE">None</option>
            <option value="currency">Currency</option>
            <option value="languages">Language</option>
          </select>
        </label>
        <label>
          Currency:
          <input type="text" onChange={updateCurrency} value={value.currency} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <br /> <br /> <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {returnedObject().map((ctry: CountryType, index: number) => (
          <Country
            ctry={ctry}
            key={index}
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
            currentColor={currentColor}
            handleClick={handleClick}
            isdone={isdone}
            setIsdone={setIsdone}
          />
        ))}
      </div>
    </>
  );
};

export default CountrySelect;
