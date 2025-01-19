import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellStyled from "../../components/TableCell/TableCell";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../css/colors.css";
import ViewFeedback from "./Modal/ViewFeedback";
import { interviewContext } from "../../contexts/InterviewContext/InterviewContext";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import moment from "moment";
import { videoContext } from "../../contexts/VideoCallContext/VideoCallContext";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../config/url";
import AlertModal from "./Modal/AlertModal";
import GiveFeedback from "./Modal/GiveFeedbackModal";
import InterviewSetup from "./Modal/InterviewSetup";
const Interview = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { user } = useContext(authContext);
  const token = localStorage.getItem("token");
  const {
    userInterviews,
    interviewInvitations,
    updateStatus,
    fetchInterviews,
    fetchInvitations,
    updateInterview,
    isVideoCompleted,
    shareFeedback,
    setShareFeedback,
    handleCloseIsCompleted,
    setInterviewer,
  } = useContext(interviewContext);
  const { interview, setInterview } = useContext(videoContext);
  const [setupOpen, setSetupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchInterviews(token);
      fetchInvitations(token);
    }
  }, []);

  useEffect(() => {
    if (text.length > 0) setOpen(true);
  }, [text]);

  const handleClose = () => {
    setText("");
    setOpen(false);
  };

  const handleVideoStart = (interview) => {
    setInterview(interview);
    navigate("/meeting");
  };

  const handleFeedbackPageClose = () => {
    setShareFeedback(false);
    handleCloseIsCompleted();
  };

  const handleSetupOpen = () => {
    setSetupOpen(true);
  };

  const handleSetupClose = () => {
    setSetupOpen(false);
  };

  const onInterviewSelect = (interviewer) => {
    setInterviewer(interviewer);
    navigate("/meeting-ai");
  };
  return (
    <div>
      <Navbar />
      <ViewFeedback open={open} handleClose={handleClose} text={text} />
      <InterviewSetup
        isOpen={setupOpen}
        onClose={handleSetupClose}
        onInterviewSelect={onInterviewSelect}
      />
      {interview && interview.moderator.id === user.id && (
        <AlertModal
          open={isVideoCompleted}
          text={"Is the interview completed?"}
          yesButton={() => {
            setShareFeedback(true);
          }}
          noButton={() => {
            handleCloseIsCompleted();
          }}
        />
      )}
      {interview && interview.moderator.id === user.id && (
        <GiveFeedback
          isOpen={shareFeedback}
          onClose={handleFeedbackPageClose}
          updateInterview={updateInterview}
        />
      )}

      <div className="min-h-screen p-8">
        <h1 className="pb-5 text-2xl font-thin text-navy">My Interviews</h1>

        <div className="flex">
          <div className="bg-gradient-to-r from-[#b0e9ff] to-[#0594b4] rounded-l-lg w-full flex flex-col items-start justify-center p-6 pl-32 gap-4 max-2xl:rounded-lg max-2xl:pl-6 max-2xl:items-center">
            <h1 className="text-4xl font-extrabold text-navy">
              Practicing interviews?
            </h1>
            <p className="text-2xl font-normal text-navy">
              Try out our new advanced{" "}
              <span className="font-extrabold">AI feature!</span>
            </p>
            <p className="text-2xl font-normal text-navy">
              Start your mock interview with our{" "}
              <span className="font-extrabold">AI model.</span>
            </p>
            <p className="text-2xl font-normal text-navy">
              Just like a normal one!
              <span className="font-extrabold"> TRY IT NOW</span>
            </p>
            <div className="pl-16 max-sm:pl-0 max-sm:self-center">
              <button
                className="bg-[#1e25a5] text-white text-xl font-bold px-6 py-3 rounded-md"
                onClick={() => handleSetupOpen()}
              >
                Start Mock Interview
              </button>
            </div>
          </div>
          <img
            className="w-full h-auto rounded-r-lg max-h-[350px] object-cover max-2xl:hidden"
            src="https://miro.medium.com/v2/resize:fit:1000/1*ycwawTXjHk1-yuDuugyT5g.jpeg"
            alt="AI Recruitment"
          />
        </div>
        <div className="flex gap-20 py-20 max-lg:flex-col">
          <div className="w-1/2 max-lg:w-full">
            <h1 className="pb-5 text-2xl font-normal text-navy">
              Interview History
            </h1>
            <TableContainer className="p-3 pb-8 border border-gray-200 rounded-xl">
              <Table aria-label="leaderboard table">
                <TableHead>
                  <TableRow>
                    <TableCellStyled bold dark start={true}>
                      Interviewer
                    </TableCellStyled>
                    <TableCellStyled bold dark>
                      Feedback
                    </TableCellStyled>
                    <TableCellStyled bold dark>
                      Status
                    </TableCellStyled>
                    <TableCellStyled bold dark end={true}>
                      Points
                    </TableCellStyled>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInterviews &&
                    (userInterviews.length === 0 ? (
                      <TableRow>
                        <TableCellStyled
                          dark={true}
                          start={true}
                          bold={false}
                          colSpan={4}
                        >
                          No interviews available
                        </TableCellStyled>
                      </TableRow>
                    ) : (
                      userInterviews.map((interview) => (
                        <TableRow key={interview.id}>
                          <TableCellStyled
                            dark={true}
                            start={true}
                            bold={false}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <div className="rounded-full w-9 h-9">
                                  <img
                                    src={
                                      typeof interview.interviewer !== "object"
                                        ? `${serverUrl}/uploads/ai.jpg`
                                        : interview.interviewer.profile_pic
                                    }
                                    alt={`Interviewer profile pic`}
                                    className="object-cover w-full h-full rounded-full"
                                  />
                                </div>
                                {typeof interview.interviewer !== "object"
                                  ? "AI"
                                  : interview.interviewer.username}
                              </div>
                            </div>
                          </TableCellStyled>
                          <TableCellStyled dark={true} bold={false}>
                            <button
                              onClick={() => {
                                setText(interview.feedback);
                              }}
                              className="p-1 px-3 rounded-lg bg-cyan"
                            >
                              {interview.feedback
                                .substring(0, 15)
                                .concat("...")}
                            </button>
                          </TableCellStyled>
                          <TableCellStyled dark={true} bold={false}>
                            {interview.status}
                          </TableCellStyled>
                          <TableCellStyled dark={true} bold={false} end={true}>
                            {interview.points !== 0
                              ? interview.points
                              : "Pending"}
                          </TableCellStyled>
                        </TableRow>
                      ))
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <h1 className="pb-5 text-2xl font-normal text-navy">
              Interview Invitations
            </h1>
            <TableContainer className="p-3 pb-8 border border-gray-200 rounded-xl">
              <Table aria-label="leaderboard table">
                <TableHead>
                  <TableRow>
                    <TableCellStyled bold dark start={true}>
                      Requester
                    </TableCellStyled>
                    <TableCellStyled bold dark>
                      Date
                    </TableCellStyled>
                    <TableCellStyled bold dark end={true}>
                      Action
                    </TableCellStyled>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {interviewInvitations.map((invitation) =>
                    user && invitation.moderator.id === user.id ? (
                      <TableRow key={invitation.id}>
                        <TableCellStyled dark start={true}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div className="rounded-full w-9 h-9">
                                <img
                                  src={invitation.user.profile_pic}
                                  alt={`${invitation.user.profile_pic} profile pic`}
                                  className="object-cover w-full h-full rounded-full"
                                />
                              </div>
                              {invitation.user.username}
                            </div>
                          </div>
                        </TableCellStyled>
                        <TableCellStyled dark>
                          <div className="flex items-center justify-center gap-1">
                            <div className="flex flex-col">
                              <div className="text-xs">
                                {moment(invitation.date)
                                  .format("ddd")
                                  .toUpperCase()}
                                , {moment(invitation.date).format("MMM")}
                              </div>
                              <div className="text-2xl font-bold">
                                {moment(invitation.date).format("DD")}
                              </div>
                            </div>
                            {moment(invitation.date).format("hh:mm A")}
                          </div>
                        </TableCellStyled>
                        <TableCellStyled dark end>
                          {invitation.status === "PENDING" ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(invitation.id, "REJECTED")
                                }
                                className="px-6 py-2 text-base font-bold text-white transition bg-blue-300 hover:bg-blue-500 rounded-self"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(invitation.id, "ACCEPTED")
                                }
                                className="px-6 py-2 text-base font-bold text-white transition bg-blue-500 hover:bg-blue-600 rounded-self"
                              >
                                Accept
                              </button>
                            </div>
                          ) : invitation.status === "ACCEPTED" ? (
                            <button
                              onClick={() => handleVideoStart(invitation)}
                              className="w-full px-6 py-2 text-xl font-bold text-center text-white transition bg-navy hover:bg-blue-600 rounded-self"
                            >
                              Start Interview
                            </button>
                          ) : (
                            <div className="px-6 py-2 text-xl font-bold text-center text-white transition bg-blue-400 hover:bg-blue-600 rounded-self">
                              Rejected
                            </div>
                          )}
                        </TableCellStyled>
                      </TableRow>
                    ) : (
                      <TableRow key={invitation.id}>
                        <TableCellStyled dark start={true}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div className="rounded-full w-9 h-9">
                                <img
                                  src={invitation.moderator.profile_pic}
                                  alt={`${invitation.moderator.profile_pic} profile pic`}
                                  className="object-cover w-full h-full rounded-full"
                                />
                              </div>{" "}
                              {invitation.moderator.username}
                            </div>
                          </div>
                        </TableCellStyled>
                        <TableCellStyled dark>
                          <div className="flex items-center justify-center gap-1">
                            <div className="flex flex-col">
                              <div className="text-xs">
                                {moment(invitation.date)
                                  .format("ddd")
                                  .toUpperCase()}
                                , {moment(invitation.date).format("MMM")}
                              </div>
                              <div className="text-2xl font-bold">
                                {moment(invitation.date).format("DD")}
                              </div>
                            </div>
                            {moment(invitation.date).format("hh:mm A")}
                          </div>
                        </TableCellStyled>
                        <TableCellStyled dark end>
                          {invitation.status === "PENDING" ? (
                            <div className="px-6 py-2 text-base font-bold text-center text-blue-700 transition">
                              Pending
                            </div>
                          ) : invitation.status === "ACCEPTED" ? (
                            <button
                              onClick={() => handleVideoStart(invitation)}
                              className="w-full px-6 py-2 text-xl font-bold text-center text-white transition bg-navy hover:bg-blue-600 rounded-self"
                            >
                              Join
                            </button>
                          ) : (
                            <div className="px-6 py-2 text-xl font-bold text-center text-white transition bg-red-400 rounded-self">
                              Rejected
                            </div>
                          )}
                        </TableCellStyled>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Interview;
