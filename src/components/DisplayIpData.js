import React from "react";
import TableData from "../TableData";

function DisplayIpData({ data, ip }) {
  //   console.log(Object.keys(data));
  //   const data={...data,name:}
  const highlight = ["fraud_score", "recent_abuse", "proxy", "vpn"];

  return (
    <div className="card">
      <h5 className="card-title">{ip}</h5>
      {data && (
        <h5
          className={`${Number(data.fraud_score) > 80 ? "fraud" : "highlight"}`}
          style={{ textAlign: "center" }}
        >
          Fraud Score : {data.fraud_score}
        </h5>
      )}
      {Object.entries(data).map((entry, i) => {
        const isHighlight = highlight.includes(entry[0]);

        return (
          <TableData
            key={i}
            className={isHighlight && "highlight"}
            name={entry[0]}
            data={entry[1]}
          />
        );
      })}
    </div>
  );
}

export default DisplayIpData;
