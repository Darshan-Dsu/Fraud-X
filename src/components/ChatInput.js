import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import Button from "@mui/material/Button";

const ChatInput = ({ startRecoding, setTextInput, sendPostData }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessage("");
      setTextInput(message);
      sendPostData(message);
    }
    if (!message) startRecoding();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="Send you query..."
        sx={{
          width: 1000,
          marginX: 60,
        }}
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <>
              <Button
                sx={{
                  width: 10,
                  borderRadius: "50%",
                }}
              >
                <MicIcon
                  sx={{
                    marginX: 5,
                    padding: 0,
                  }}
                  onClick={handleSendMessage}
                  style={{ cursor: "pointer" }}
                />
              </Button>
              <Button
                sx={{
                  width: 10,
                  borderRadius: "50%",
                }}
              >
                <SendIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleSendMessage}
                />
              </Button>
            </>
          ),
        }}
      />
    </div>
  );
};

export default ChatInput;
