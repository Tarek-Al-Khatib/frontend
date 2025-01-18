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

const CreateChannel = ({ isOpen, onClose, communityId }) => {
  const { createChannel } = useContext(communityContext);
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
      try {
        await createChannel(communityId, formData);
        onClose();
      } catch (e) {
        console.log("Error in creating channel", e);
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
            Create a channel!
            <p className="text-base text-gray-300">(ensure it's meaningful)</p>
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
              htmlFor="name"
              className="block mb-3 text-base font-extrabold text-navy"
            >
              Channel Name
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
                  fontWeight: "500",
                  borderRadius: 1,
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
              className="block mb-3 text-base font-extrabold text-navy"
            >
              Channel Description
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
                  fontWeight: "500",
                  borderRadius: 1,
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
            disabled={formData.name === "" || formData.description === ""}
            type="submit"
            className="px-8 py-2 text-base font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
          >
            Create Channel
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateChannel;
