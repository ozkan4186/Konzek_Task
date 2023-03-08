import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import Country from "./Country";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      native
      capital
      emoji
      currency
      languages {
        code
        name
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
  languages: string;
}

// create a component that renders a select input for coutries
const CountrySelect = () => {
  const [country, setCountry] = useState("US");
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  const [selectedCountry, setSelectedCountry] = useState("US");
const [currentColorIndex, setCurrentColorIndex] = useState(0);
const [currentColor, setCurrentColor] = useState<string>("")
console.log("selectedCountry",selectedCountry);
console.log("currentColorIndex",currentColorIndex);
console.log("currentColor",currentColor);
  
// const selectCountry = (country:any) => {selectedCountry === country.code ? setSelectedCountry(""):      setSelectedCountry(country.code);
// };
const handleClick = (cntry:string) => {
  setSelectedCountry(cntry);
const crntColor = colors[currentColorIndex];
setCurrentColor(crntColor);
setCurrentColorIndex(currentColorIndex+1);
  const nextColorIndex =
    currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1;
  setCurrentColorIndex(nextColorIndex);
  console.log("nextColorIndex",nextColorIndex);
  
};




  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }


  console.log(data.countries);
  return (
    <>
      <div className="mb-2" style={{ margin: "2rem" }}>
        <input type="text" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.countries.map((ctry: CountryType) => (
          <Country ctry={ctry} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} currentColor={currentColor} handleClick={handleClick}/>
        ))}
      </div>
    </>
  );
};

export default CountrySelect;
