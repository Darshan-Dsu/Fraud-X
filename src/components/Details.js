import React from "react";
import DisplayIpData from "./DisplayIpData";
import { useState, useEffect } from "react";
import FraudIp from "../api/FraudIp";

function Details() {
  const [ipData, setIpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await FraudIp();
      console.log("respone ", response);

      setIpData(response);
    };
    fetchData();
  }, []);

  return (
    <div className="cards-list-wrapper">
      {Object.entries(ipData).map((data, i) => (
        <DisplayIpData key={i} data={data[1]} ip={data[0]} />
      ))}
    </div>
  );
}

export default Details;
