import React, { useState } from "react";
import { CountryType } from "../pages/Home";


interface Props {
  ctry?: CountryType;
  handleClick: (e: any) => void;
  setSelectedCountry: (e: any) => void;
  setIsdone: (e: any) => void;
  selectedCountry: string;
  currentColor: string;
  isdone: boolean;
}

const Country = ({ctry,handleClick,selectedCountry,currentColor,setSelectedCountry,isdone,setIsdone,}: Props) => {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        cursor: "pointer",
        backgroundColor: ctry?.code === selectedCountry ? currentColor : "",
        textDecoration: ctry?.code === selectedCountry ? "underline" : "",
      }}
      key={ctry?.code}
      onClick={() => handleClick(ctry?.code)}
    >
      <img
        className="card-img-top"
        src="http://demethosman.com/wp-content/uploads/2020/02/gokyuzu.jpg"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title"> {ctry?.name} </h5>
        <p className="card-text"> {ctry?.native}</p>
        <p className="card-text"> {ctry?.capital} </p>
        <p className="card-text"> {ctry?.emoji} </p>
        <p className="card-text"> {ctry?.currency} </p>
      </div>
    </div>
  );
};

export default Country;
