import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../../../css/colors.css";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const GiveFeedback = ({ isOpen, onClose, updateInterview }) => {
  const [feedback, setFeedback] = useState("");
  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async () => {
    if (feedback.trim() !== "") {
      try {
        console.log("Feedback submitted:", feedback);
        updateInterview({ feedback: feedback });
        onClose();
      } catch (e) {
        console.log("Error in submitting feedback", e);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": { borderRadius: 5 },
      }}
    >
      <div className="flex justify-between">
        <DialogTitle
          className="text-navy"
          sx={{ fontWeight: "800", fontFamily: "Open Sans", fontSize: 22 }}
        >
          <div className="flex items-center gap-1">
            Share Your Feedback!
            <p className="text-sm text-gray-300">(we value your input)</p>
          </div>
        </DialogTitle>

        <Button onClick={onClose} color="text-navy">
          <IoCloseCircleOutline color="navy" size={40} />
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent className="flex flex-col gap-5">
          <div className="mb-3">
            <label
              htmlFor="feedback"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Your Feedback
            </label>
            <TextField
              id="feedback"
              name="feedback"
              multiline
              minRows={4}
              placeholder="ex: I really enjoy using this platform because..."
              variant="outlined"
              onChange={handleInputChange}
              value={feedback}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Open Sans",
                  fontWeight: "500",
                  borderRadius: 5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            disabled={feedback === ""}
            type="submit"
            className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
          >
            Submit Feedback
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GiveFeedback;
