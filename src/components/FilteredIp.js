import * as React from "react";
import Box from "@mui/material/Box";
import DisplayIpData from "./DisplayIpData";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  overflow: "auto",
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FilteredIp({ open, handleClose, filterData }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="cards-list-wrapper" style={{ height: 1000 }}>
            {Object.entries(filterData).map((data, i) => (
              <DisplayIpData key={i} data={data[1]} ip={data[0]} />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
