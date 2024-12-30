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

const CreateChannel = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={({ borderRadius: 20 }, { "& .MuiPaper-root": { borderRadius: 5 } })}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-0">
          <DialogTitle
            className="text-navy"
            sx={{
              fontWeight: "800",
              fontFamily: "Open Sans",
              fontSize: 20,
              paddingRight: 1,
            }}
          >
            Create a channel!
          </DialogTitle>
          <p className="text-sm font-extrabold text-gray-300">
            (ensure it's meaningful)
          </p>
        </div>

        <Button onClick={onClose} color="text-navy">
          <IoCloseCircleOutline color="navy" size={40} />
        </Button>
      </div>
      <form>
        <DialogContent className="flex flex-col gap-5">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Channel Name
            </label>
            <TextField
              id="name"
              variant="outlined"
              placeholder="ex: memes"
              onChange={handleInputChange}
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
              htmlFor="description"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Channel Description
            </label>
            <TextField
              id="description"
              multiline={true}
              maxRows={4}
              placeholder="ex: You can post memes"
              variant="outlined"
              onChange={handleInputChange}
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
          <button className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self">
            Create Channel
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateChannel;
