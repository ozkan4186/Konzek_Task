import React, { useState, useEffect, useRef } from "react";
import { CountryType } from "./Types/CountryType";


interface Props {
  ctry: CountryType;
  handleClick: (e: any) => void;
  setSelectedCountry: (e: any) => void;
  setIsdone: (e: any) => void;
  selectedCountry: string;
  currentColor: string;
  isdone: boolean;
  index: number;
  setCurrentColor: (e: any) => void;
}



const Country = ({
  ctry,
  handleClick,
  selectedCountry,
  currentColor,
  setSelectedCountry,
  isdone,
  setIsdone,
  index,
  setCurrentColor,
}: Props) => {
  useEffect(() => {
    if (index === 9) {
      // if (cardRef.current !== undefined) {
      cardRef.current!.style.backgroundColor = "red";
      // }
    }
  }, [index]);

  const cardRef = useRef<HTMLDivElement>();
  return (
    <div
      className="card"
      ref={cardRef as unknown as React.RefObject<HTMLDivElement>}
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
        <h5 className="card-title"> {ctry.name} </h5>
        <p className="card-text"> {ctry.code}</p>
        <p className="card-text"> {ctry.native}</p>
        <p className="card-text"> {ctry.capital} </p>
        <p className="card-text"> {ctry.emoji} </p>
        <p className="card-text"> {ctry.currency} </p>
        <p className="card-text"> {ctry.languages[0].code} </p>
      </div>
      <br /> <br />
    </div>
  );
};

export default Country;
