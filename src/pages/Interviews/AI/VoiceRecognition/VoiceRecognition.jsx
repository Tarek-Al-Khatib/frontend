import React, { useContext, useState } from "react";
import { ChatContext } from "../../../../contexts/ChatContext/ChatContext";

const VoiceRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { setUserInput } = useContext(ChatContext);
  const handleStart = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
      console.log("Voice recognition started");
    };

    recognition.onend = () => {
      setIsRecording(false);
      console.log("Voice recognition ended");
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      setUserInput(speechToText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "aborted") {
        alert("Speech recognition was aborted. Please try again.");
      } else if (event.error === "no-speech") {
        alert("No speech detected. Please try again.");
      } else if (event.error === "audio-capture") {
        alert("Audio capture error. Please check your microphone.");
      } else {
        alert(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={handleStart}>
        {isRecording ? "Listening..." : "Start Voice Recognition"}
      </button>
      <p>Recognized text: {transcript}</p>
    </div>
  );
};

export default VoiceRecognition;
