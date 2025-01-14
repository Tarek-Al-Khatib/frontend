import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import "../../../css/colors.css";

const AlertModal = ({
  text,
  open,
  handleClose,
  yesButton = null,
  noButton = null,
}) => {
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
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography
          id="simple-modal-title"
          variant="h6"
          component="h2"
          className="text-navy"
        >
          {text}
        </Typography>
        <div className="flex justify-center gap-3 mt-2">
          {yesButton && (
            <button
              onClick={yesButton}
              className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
            >
              Yes
            </button>
          )}

          {noButton && (
            <button
              onClick={noButton}
              className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
            >
              No
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default AlertModal;
