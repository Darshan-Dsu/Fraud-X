import React, { useState } from "react";
import annyang from "annyang";
import ChatInput from "./ChatInput";
import Box from "@mui/material/Box";
import ChatData from "./ChatData";
import axios from "axios";
import { Typography } from "@mui/material";
import { createContext } from "react";

export const filterContext = createContext();
export const VoiceChatBot = ({ ipData }) => {
  const [chat, setChatData] = useState([]);
  const [aiData, setAiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function stopRecording() {
    if (annyang) {
      annyang.removeCallback("result", handleSpeechResult);
      annyang.abort();
    }
  }

  function startRecoding() {
    annyang.start();

    if (annyang) {
      annyang.start();
      annyang.addCallback("result", handleSpeechResult);
    }
  }

  async function sendPostData(query) {
    console.log("queru ", query);
    const response = await axios.post("http://127.0.0.1:2025/bard_response", {
      question: query,
    });
    console.log("bard res ", response.data);
    setAiData((prev) => [...prev, response.data.bard_response]);
    if (Object.keys(response.data.bard_response_ip).length > 0)
      setFilteredData([response.data.bard_response_ip]);
  }

  const handleSpeechResult = (userSaid) => {
    // setText(userSaid);
    setChatData((prev) => [...prev, userSaid]);
    setTimeout(stopRecording, 1000);
  };

  const setTextInput = (query) => {
    setChatData((prev) => [...prev, query]);
  };

  return (
    <filterContext.Provider value={filteredData}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
        }}
      >
        <Box
          sx={{
            border: "1px solid black",
            width: 1000,
            // maxHeight: "calc(100vh - 100px)",
            maxHeight: 600,
            height: "100%",
            overflow: "auto",
            borderRadius: "10px",
            fontFamily: "inherit",
            minHeight: "150px",
          }}
        >
          {chat.length === 0 && (
            <Typography
              variant="p"
              sx={{
                paddingX: 50,
                marginTop: 10,
              }}
            >
              No Chat Data Available
            </Typography>
          )}
          {chat.length > 0 && (
            <ChatData aiData={aiData} ipData={ipData} chat={chat} />
          )}
        </Box>
        <Box>
          <ChatInput
            startRecoding={startRecoding}
            sendPostData={sendPostData}
            setTextInput={setTextInput}
          />
        </Box>
      </Box>
    </filterContext.Provider>
  );
};

export default VoiceChatBot;
