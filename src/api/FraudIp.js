import axios from "axios";

async function FraudIp() {
  const response = await axios.get(" http://127.0.0.1:2025");
  console.log("response ", response);
  return response.data;
}

export default FraudIp;
