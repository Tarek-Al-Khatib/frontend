import React from "react";
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
const Interview = () => {
  const leaderboardData = [
    {
      rank: 1,
      interviewer: "Username1",
      feedback: "Hi this is the full feedback about the previous interview",
      points: 1200,
    },
    {
      rank: 2,
      interviewer: "Username2",
      feedback: "Hi this is the full feedback about the previous interview",
      points: 1100,
    },
    {
      rank: 3,
      interviewer: "Username3",
      feedback: "Hi this is the full feedback about the previous interview",
      points: 1000,
    },
    {
      rank: 4,
      interviewer: "Username4",
      feedback: "Hi this is the full feedback about the previous interview",
      points: 950,
    },
  ];

  return (
    <div>
      <Navbar />
      <div class="p-8 min-h-screen">
        <h1 className="pb-5 text-2xl font-thin text-navy">My interviewer</h1>

        <div className="flex">
          <div class="bg-gradient-to-r from-[#b0e9ff] to-[#0594b4] rounded-l-lg w-full flex flex-col items-start justify-center p-6 pl-32 gap-4">
            <h1 class="text-navy text-4xl font-extrabold">
              Practicing interviewer?
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
                    <TableCellStyled start={true}>Interviewer</TableCellStyled>
                    <TableCellStyled>Feedback</TableCellStyled>
                    <TableCellStyled>Status</TableCellStyled>
                    <TableCellStyled end={true}>Points</TableCellStyled>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCellStyled dark={true} start={true} bold={false}>
                        <div className="flex items-center gap-3">
                          {user.rank} {". "}
                          <div className="flex items-center gap-1">
                            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>{" "}
                            {user.interviewer}
                          </div>
                        </div>
                      </TableCellStyled>
                      <TableCellStyled dark={true} bold={false}>
                        hi
                      </TableCellStyled>
                      <TableCellStyled dark={true} bold={false}>
                        <button className="p-1 px-3 rounded-lg bg-cyan">
                          {user.feedback.substring(0, 15).concat("...")}
                        </button>
                      </TableCellStyled>
                      <TableCellStyled dark={true} bold={false} end={true}>
                        +{user.points}
                      </TableCellStyled>
                    </TableRow>
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
                    <TableCellStyled start={true}>Interviewer</TableCellStyled>
                    <TableCellStyled>Feedback</TableCellStyled>
                    <TableCellStyled>Status</TableCellStyled>
                    <TableCellStyled end={true}>Points</TableCellStyled>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCellStyled start={true}>
                        <div className="flex items-center gap-3">
                          {user.rank} {". "}
                          <div className="flex items-center gap-1">
                            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>{" "}
                            {user.interviewer}
                          </div>
                        </div>
                      </TableCellStyled>
                      <TableCellStyled>hi</TableCellStyled>
                      <TableCellStyled>{user.learningPlans}</TableCellStyled>
                      <TableCellStyled end={true}>
                        +{user.points}
                      </TableCellStyled>
                    </TableRow>
                  ))}
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
