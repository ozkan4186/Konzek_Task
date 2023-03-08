import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

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
      
    }
  }
`;
const colors = ["red", "green", "blue", "yellow", "orange"];
interface Props {
  colors?: string[];
}

interface Country {
  name: string;
  code: string;
  native: string;
  capital: string;
  emoji: string;
 
}

// create a component that renders a select input for coutries
const CountrySelect:React.FC<Props> = ({ colors:any }) => {
   const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [country, setCountry] = useState("US");
   const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isdone, setIsdone] = useState(false)
  
  const handleClick=()=>{
    const nextColorIndex =currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1;
    setCurrentColorIndex(nextColorIndex);
  }
  
  const currentColor = colors[currentColorIndex]
  
if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const selectCountry = (country: Country) => {
    selectedCountry === country.code ? setSelectedCountry("") : setSelectedCountry(country.code);
  };

  console.log(data.countries);
  return (
    <>
    <div className="mb-2" style={{margin:"2rem"}}>
    <input type="text"  />
    </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.countries.map((ctry: Country) => (
          <div
            key={ctry.code}
            style={{
              width: "60vw",
              height: "10vh",
              padding: "0.5rem",
              marginBottom: "1rem",
              border: "1px solid gray",
              backgroundColor: ctry.code=== selectedCountry ?  "yellow"  : currentColor, 
              textDecoration: ctry.code === selectedCountry ? "underline" : "",
            }}
            onClick={handleClick}
          
          >
            {ctry.name}
            <br />
            {ctry.native}
            <br />
            {ctry.capital}
            {ctry.emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default CountrySelect;
