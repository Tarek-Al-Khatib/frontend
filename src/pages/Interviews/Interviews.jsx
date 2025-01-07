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
const Interview = () => {
  const [text, setText] = useState("");
  const { user } = useContext(authContext);
  const { userInterviews, interviewInvitations } = useContext(interviewContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (text.length > 0) setOpen(true);
  }, [text]);

  const handleClose = () => {
    setText("");
    setOpen(false);
  };
  return (
    <div>
      <Navbar />
      <ViewFeedback open={open} handleClose={handleClose} text={text} />
      <div class="p-8 min-h-screen">
        <h1 className="pb-5 text-2xl font-thin text-navy">My Interviews</h1>

        <div className="flex">
          <div class="bg-gradient-to-r from-[#b0e9ff] to-[#0594b4] rounded-l-lg w-full flex flex-col items-start justify-center p-6 pl-32 gap-4">
            <h1 class="text-navy text-4xl font-extrabold">
              Practicing interviews?
            </h1>
            <p class="text-navy text-2xl font-normal">
              Try out our new advanced{" "}
              <span className="font-extrabold">AI feature!</span>
            </p>
            <p class="text-navy text-2xl font-normal">
              Start your mock interview with our{" "}
              <span className="font-extrabold">AI model.</span>
            </p>
            <p class="text-navy text-2xl font-normal">
              Just like a normal one!
              <span className="font-extrabold"> TRY IT NOW</span>
            </p>
            <div className="pl-16">
              <button class="bg-[#1e25a5] text-white text-xl font-bold px-6 py-3 rounded-md">
                Start Mock Interview
              </button>
            </div>
          </div>
          <img
            class="w-full h-auto rounded-r-lg max-h-[350px] object-cover"
            src="https://miro.medium.com/v2/resize:fit:1000/1*ycwawTXjHk1-yuDuugyT5g.jpeg"
            alt="AI Recruitment"
          />
        </div>
        <div className="flex gap-20 py-20">
          <div className="w-1/2">
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
                                    src={interview.interviewer.profile_pic}
                                    alt={`${interview.interviewer.profile_pic} profile pic`}
                                    className="object-cover w-full h-full rounded-full"
                                  />
                                </div>
                                {interview.interviewer.username}
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
          <div className="w-1/2">
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
                      <TableRow key={invitation.user.id}>
                        <TableCellStyled dark start={true}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div class="w-9 h-9 rounded-full">
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
                          <div className="flex items-center justify-center gap-4">
                            <button className="px-6 py-2 text-base font-bold text-white transition bg-red-400 hover:bg-red-600 rounded-self">
                              Reject
                            </button>
                            <button className="px-6 py-2 text-base font-bold text-white transition bg-green-400 hover:bg-green-600 rounded-self">
                              Accept
                            </button>
                          </div>
                        </TableCellStyled>
                      </TableRow>
                    ) : (
                      <TableRow key={invitation.rank}>
                        <TableCellStyled dark start={true}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <div class="w-9 h-9 rounded-full">
                                <img
                                  src={invitation.user.profile_pic}
                                  alt={`${invitation.user.profile_pic} profile pic`}
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
                          {invitation.status}
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
