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
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [selectedInterviewType, setSelectedInterviewType] = useState("");

  const interviewers = [
    {
      label: "The Jazzar",
      description: "Technical Interviewer with strict dialogue",
      characteristics:
        "You sometimes make fun of the candidate, and you are strict with your answers.",
      voiceId: "29vD33N1CtxCmqQRPOHJ",
    },
    {
      label: "The Dev Lord",
      description: "Be careful, don't mess with him in coding!",
      characteristics:
        "You do not accept false answers to coding question. Other then that act like a normal HR interviewer. You are so calm and strict with answers ",
      voiceId: "iP95p4xoKVk53GoZ742B",
    },
    {
      label: "The Recruitment General",
      description: "A sharp HR interviewer who values precision.",
      characteristics:
        "You pay full attention to details, and you are strict. You are not fun and you are picky",
      voiceId: "ThT5KcBeYPX3keUQqHPh",
    },
    {
      label: "The Color Queen",
      description: "You can feel her flowery vibe.",
      characteristics: "Very fun, a cool and lovely HR",
      voiceId: "AZnzlk1XvdvUeBnXmlld",
    },
    {
      label: "The Careerster",
      description: "Straight to the point questions? This one is for you.",
      characteristics:
        "You are energetic in a calm way, but you are also straight to the point",
      voiceId: "oWAxZDx7w5VEj9dCyTzz",
    },
    {
      label: "WorkWise Interviewer",
      description: "The default interviewer avatar and tonality.",
      characteristics: "Default HR interviewer personality",
      voiceId: "jsCqWAovK2LkecY7zXl4",
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
    setSelectedInterviewer(interviewer);
  };

  const handleInterviewTypeChange = (e) => {
    setSelectedInterviewType(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedInterviewer && selectedInterviewType) {
      onInterviewSelect(selectedInterviewer);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setSelectedInterviewer(null);
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
            setSelectedInterviewer(null);
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
                  selectedInterviewer &&
                  selectedInterviewer.label === interviewer.label
                    ? "0 0 10px #4449b5"
                    : "0 0 5px rgba(0,0,0,0.1)",
                border:
                  selectedInterviewer &&
                  selectedInterviewer.label === interviewer.label
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
