import React from "react";
// import "./style.css";
import "./style.css";

function TableData({ name, data, className }) {
  let isFraud = false;
  if (name === "fraud_score") {
    console.log("name ", name, data);
    if (Number(data) > 80) {
      isFraud = true;
    }
  }

  if (name === "fraud_score") return;
  return (
    <div className={`card-cell ${className}  ${isFraud ? "fraud" : ""}`}>
      <b className="card-cell-key">{name}</b>
      <div className="card-cell-value">{data.toString()}</div>
    </div>
  );
}

export default TableData;
