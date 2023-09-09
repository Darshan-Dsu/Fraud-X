import React from "react";
import "./style.css";
import SignInSide from "./components/SignInSide";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VoiceChatBot from "./components/VoiceChatBot";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignInSide />} />
        <Route path="/analysis" element={<VoiceChatBot />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
