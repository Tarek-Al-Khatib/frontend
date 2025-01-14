import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../../../css/colors.css";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const InviteModerator = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime) {
      try {
        console.log("Selected date and time:", selectedDate, selectedTime);
        onClose();
      } catch (e) {
        console.log("Error in selecting date and time", e);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setSelectedDate("");
        setSelectedTime("");
        onClose();
      }}
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
            Select Interview Date & Time
          </div>
        </DialogTitle>

        <Button
          onClick={() => {
            setSelectedDate("");
            setSelectedTime("");
            onClose();
          }}
          color="text-navy"
        >
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
              htmlFor="date"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Choose a Date
            </label>
            <TextField
              id="date"
              name="date"
              type="date"
              variant="outlined"
              onChange={handleDateChange}
              value={selectedDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Set the minimum date to today
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  borderRadius: 5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="time"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Choose a Time
            </label>
            <TextField
              id="time"
              name="time"
              type="time"
              variant="outlined"
              onChange={handleTimeChange}
              value={selectedTime}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Open Sans",
                  fontWeight: "700",
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
            type="submit"
            className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
          >
            Confirm Date & Time
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InviteModerator;
