import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../../../css/colors.css";
import React, { useContext, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { communityContext } from "../../../contexts/CommunityContext/CommunityContext";

const CreateChannel = ({ isOpen, onClose }) => {
  const { createCommunity } = useContext(communityContext);
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

  const handleSubmit = async () => {
    if (formData.name !== "" && formData.description !== "null") {
      const response = await createCommunity(formData);
      console.log(response);
      onClose();
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
          Create a channel!
          <p className="text-xs text-gray-300">
            Customize your community to fit in people with similar interests as
            you
          </p>
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
              htmlFor="name"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Community Name
            </label>
            <TextField
              id="name"
              name="name"
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
              name="description"
              multiline={true}
              maxRows={4}
              placeholder="ex: A lively community of Node.js enthusiasts..."
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
          <button
            type="submit"
            className="px-4 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
          >
            Create Channel
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateChannel;
