import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { filterContext } from "./VoiceChatBot";
import FilteredIp from "./FilteredIp";

export default function ChatData({ chat, aiData }) {
  const filterData = useContext(filterContext);
  console.log("filter ", filterData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {chat.map((text, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 2,
          }}
        >
          <p>
            <strong>User - </strong> {text}
          </p>
          <p style={{ alignSelf: "flex-end" }}>
            <strong>AI - </strong>{" "}
            {aiData[index] === undefined ? (
              <i>getting data...</i>
            ) : (
              aiData[index]
            )}
          </p>

          <hr />
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <a href="/details" target="_blank">
          <Button
            sx={{
              marginBottom: 4,
            }}
            variant="contained"
          >
            All IP Info
          </Button>
        </a>

        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            marginBottom: 4,
          }}
          disabled={filterData.length <= 0 ? true : false}
        >
          Filtered IP
        </Button>
        {filterData.length > 0 && (
          <FilteredIp
            open={open}
            filterData={filterData[0]}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Box>
  );
}
