import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const ViewFeedback = ({ text, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography id="simple-modal-title" variant="h6" component="h2">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewFeedback;
