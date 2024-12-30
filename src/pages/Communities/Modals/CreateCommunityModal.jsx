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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        className="text-navy"
        sx={{ fontWeight: "800", fontFamily: "Open Sans", fontSize: 20 }}
      >
        New Community ? Let's go !
      </DialogTitle>
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
          <div style={{ marginTop: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Community Logo
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Community Banner
            </label>
            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Create Community
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommunity;
