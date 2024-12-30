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

const CreateCommunity = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
    banner: null,
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
      sx={({ borderRadius: 20 }, "& .Mui-Paper")}
    >
      <div className="flex justify-between">
        <DialogTitle
          className="text-navy"
          sx={{ fontWeight: "800", fontFamily: "Open Sans", fontSize: 20 }}
        >
          New Community ? Let's go !
        </DialogTitle>
        <Button onClick={onClose} color="text-navy">
          <IoCloseCircleOutline color="text-navy" size={50} />
        </Button>
      </div>
      <form>
        <DialogContent className="flex flex-col gap-5">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Community Name
            </label>
            <TextField
              id="name"
              variant="outlined"
              placeholder="ex: The Fellowship of NodeJesters"
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
              Community Description
            </label>
            <TextField
              id="description"
              multiline={true}
              maxRows={4}
              placeholder="ex: A lively community of Node.js enthusiasts who come together to share knowledge, tackle challenges, and enjoy a good laugh while exploring the world of asynchronous adventures!"
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
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <label
                htmlFor="logo"
                className="flex items-center justify-center w-24 h-24 text-white bg-blue-500 rounded-full cursor-pointer"
              >
                Community Logo
              </label>
              <input
                id="logo"
                type="file"
                name="logo"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="banner"
                className="flex items-center justify-center w-24 h-12 text-white bg-blue-500 rounded-lg cursor-pointer"
              >
                Community Banner
              </label>
              <input
                id="banner"
                type="file"
                name="banner"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button className="px-4 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self">
            Create Community
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommunity;
