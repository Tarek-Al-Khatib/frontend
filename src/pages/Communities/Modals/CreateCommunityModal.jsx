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

const CreateCommunity = ({ isOpen, onClose }) => {
  const { createCommunity } = useContext(communityContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    community_logo: null,
    community_banner: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  const handleSubmit = async () => {
    if (formData.title !== "" && formData.description !== "null") {
      try {
        await createCommunity(formData);
      } catch (e) {
        console.log("Error in creating community", e);
      }
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
          New Community? Let's go!
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
              htmlFor="title"
              className="block mb-3 text-xs font-extrabold text-navy"
            >
              Community Name
            </label>
            <TextField
              id="title"
              name="title"
              variant="outlined"
              placeholder="ex: The Fellowship of NodeJesters"
              onChange={handleInputChange}
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
                  fontWeight: "500",
                  borderRadius: 5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
          <div className="flex justify-between gap-4 px-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center overflow-hidden rounded-full w-36 h-36 bg-navy bg-blue-10">
                {formData.community_logo ? (
                  <img
                    src={URL.createObjectURL(formData.community_logo)}
                    alt="Selected Logo"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-white">No Image</span>
                )}
              </div>

              <label
                htmlFor="community_logo"
                className="flex items-center justify-center text-xs font-extrabold cursor-pointer text-navy"
              >
                Community Logo
              </label>

              <input
                id="community_logo"
                type="file"
                name="community_logo"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center w-64 overflow-hidden rounded-lg h-36 bg-navy">
                {formData.community_banner ? (
                  <img
                    src={URL.createObjectURL(formData.community_banner)}
                    alt="Selected Banner"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-white">No Banner</span>
                )}
              </div>

              <label
                htmlFor="community_banner"
                className="flex items-center justify-center text-xs font-extrabold cursor-pointer text-navy"
              >
                Community Banner
              </label>

              <input
                id="community_banner"
                type="file"
                name="community_banner"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
          >
            Create Community
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommunity;
