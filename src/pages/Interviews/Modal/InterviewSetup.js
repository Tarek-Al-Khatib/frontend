import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import "../../../css/colors.css";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const InterviewSetup = ({ isOpen, onClose, onInterviewSelect }) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState("");

  const interviewers = [
    {
      label: "The Jazzar",
      description: "Technical Interviewer with strict dialogue",
    },
    {
      label: "The Dev Lord",
      description: "Be careful, don't mess with him in coding!",
    },
    {
      label: "The Recruitment General",
      description: "A sharp HR interviewer who values precision.",
    },
    {
      label: "The Color Queen",
      description: "You can feel her flowery vibe.",
    },
    {
      label: "The Careerster",
      description: "Straight to the point questions? This one is for you.",
    },
    {
      label: "WorkWise Interviewer",
      description: "The default interviewer avatar and tonality.",
    },
  ];

  const interviewTypes = [
    "Software Developer at Murex",
    "Data Analyst Position at Google",
    "Digital Marketer at HubSpot",
    "Accountant at Deloitte",
    "AI Engineer at OpenAI",
    "Cybersecurity Officer at Cisco",
  ];

  const handleInterviewerClick = (interviewer) => {
    setSelectedInterviewer(interviewer.label);
  };

  const handleInterviewTypeChange = (e) => {
    setSelectedInterviewType(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedInterviewer && selectedInterviewType) {
      onInterviewSelect({
        interviewer: selectedInterviewer,
        type: selectedInterviewType,
      });
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setSelectedInterviewer("");
        setSelectedInterviewType("");
        onClose();
      }}
      maxWidth="md"
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
          Choose Your Interview Setup
        </DialogTitle>
        <Button
          onClick={() => {
            setSelectedInterviewer("");
            setSelectedInterviewType("");
            onClose();
          }}
          color="text-navy"
        >
          <IoCloseCircleOutline color="navy" size={40} />
        </Button>
      </div>

      <DialogContent className="flex flex-col gap-5">
        <div className="flex flex-wrap justify-center gap-3">
          {interviewers.map((interviewer, index) => (
            <Card
              key={index}
              onClick={() => handleInterviewerClick(interviewer)}
              sx={{
                width: "30%",
                cursor: "pointer",
                borderRadius: 3,
                padding: 2,
                boxShadow:
                  selectedInterviewer === interviewer.label
                    ? "0 0 10px #4449b5"
                    : "0 0 5px rgba(0,0,0,0.1)",
                border:
                  selectedInterviewer === interviewer.label
                    ? "2px solid #4449b5"
                    : "1px solid #ddd",
                transition: "0.3s",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Open Sans",
                    textAlign: "center",
                  }}
                >
                  {interviewer.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Open Sans",
                    textAlign: "center",
                  }}
                >
                  {interviewer.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <TextField
          select
          label="Select Interview Type"
          value={selectedInterviewType}
          onChange={handleInterviewTypeChange}
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontFamily: "Open Sans",
              fontWeight: "500",
              borderRadius: 1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E5E5",
            },
          }}
        >
          {interviewTypes.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <button
          onClick={handleSubmit}
          className="px-8 py-2 text-sm font-bold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
        >
          Confirm Selection
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default InterviewSetup;
