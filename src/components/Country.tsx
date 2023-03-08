import React, { useState } from "react";
import { CountryType } from "./CountrySelect";


interface Props {
  ctry?: CountryType;
  handleClick:(e:any)=>void;
  setSelectedCountry:(e:any)=>void;
  setIsdone:(e:any)=>void;
  selectedCountry:string;
  currentColor:string;
  isdone:boolean;

}

const Country = ({ ctry, handleClick, selectedCountry, currentColor,setSelectedCountry,isdone,setIsdone }: Props) => {

  
  return (
    <div
      key={ctry?.code}
      style={{
        width: "60vw",
        height: "10vh",
        padding: "0.5rem",
        marginBottom: "1rem",
        border: "1px solid gray",
        cursor: "pointer",
        backgroundColor: ctry?.code === selectedCountry ? currentColor :"",
        textDecoration: ctry?.code === selectedCountry ? "underline" : "",
      }}
      onClick={()=>handleClick(ctry?.code)}
    >
      {ctry?.name}
      <br />
      {ctry?.native}
      <br />
      {ctry?.capital}
      {ctry?.emoji}
      <br />
      {ctry?.currency}
    </div>
  );
};

export default Country;
