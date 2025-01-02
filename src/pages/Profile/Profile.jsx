import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel/CircularProgressWithLabel";

const Profile = () => {
  const leaderboardData = [
    {
      rank: 1,
      username: "Username1",
      interviews: 0,
      learningPlans: 0,
      points: 1200,
    },
    {
      rank: 2,
      username: "Username2",
      interviews: 0,
      learningPlans: 0,
      points: 1100,
    },
    {
      rank: 3,
      username: "Username3",
      interviews: 0,
      learningPlans: 0,
      points: 1000,
    },
    {
      rank: 4,
      username: "Username4",
      interviews: 0,
      learningPlans: 0,
      points: 950,
    },
    {
      rank: 5,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
  ];
  return (
    <div className="flex">
      <div>
        <div class="flex gap-5 justify-between w-[650px] bg-white rounded-[15px] p-6 h-fit">
          <div class="w-32 h-32 bg-[#1e25a6] rounded-full flex justify-center items-center">
            <span class="text-white text-sm font-bold font-['Open Sans Hebrew']">
              user img
            </span>
          </div>

          <div class="flex justify-center gap-10">
            <div className="flex flex-col justify-center w-1/3 gap-5">
              <div class="flex justify-start gap-5">
                <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                  Name:
                </span>
                <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                  Username
                </span>
              </div>
              <div class="flex justify-start gap-5">
                <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                  Email:
                </span>
                <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                  Email
                </span>
              </div>
              <div class="flex justify-start gap-5">
                <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                  Points:
                </span>
                <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                  1200
                </span>
              </div>
            </div>
            <div class="flex flex-col items-center w-1/3">
              <span class="text-[#1e25a6] text-base font-extrabold font-['Open Sans Hebrew'] mb-4">
                Badges
              </span>
              <div class="flex flex-wrap gap-3 justify-center">
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full flex justify-center items-center">
                  <span class="text-black text-base font-extrabold font-['Open Sans Hebrew']">
                    13
                  </span>
                </div>
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
                <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-2xl border-gray-200 bg-white p-4 w-full max-w-sm h-[650px]">
          <div className="mb-3 text-base font-bold text-center text-navy">
            My learning plans
          </div>

          <div className="p-4 bg-white h-[650px]">
            <div className="space-y-4 h-[550px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal">
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>

              <div className="flex justify-between px-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-navy">Learning plan</p>
                  <p className="font-normal text-navy">description</p>
                </div>
                <div>
                  <CircularProgressWithLabel value={67} size={60} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography
          variant="h6"
          sx={{ color: "#1e25a6", fontWeight: "bold", mb: 2 }}
        >
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="leaderboard table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#4a80f1",
                    fontWeight: "bold",
                    fontFamily: "Open sans",
                    width: 300,
                    textAlign: "start",
                  }}
                  align="right"
                >
                  Changemakers
                </TableCell>
                <TableCell
                  sx={{
                    color: "#4a80f1",
                    fontWeight: "bold",
                    fontFamily: "Open sans",
                  }}
                  align="right"
                >
                  Interviews
                </TableCell>
                <TableCell
                  sx={{
                    color: "#4a80f1",
                    fontWeight: "bold",
                    fontFamily: "Open sans",
                  }}
                  align="right"
                >
                  Learning Plans
                </TableCell>
                <TableCell
                  sx={{
                    color: "#4a80f1",
                    fontWeight: "bold",
                    fontFamily: "Open sans",
                    textAlign: "end",
                  }}
                  align="right"
                >
                  Points
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell align="right" sx={{ textAlign: "start" }}>
                    {user.rank} {". "} {user.username}
                  </TableCell>
                  <TableCell align="right">{user.interviews}</TableCell>
                  <TableCell align="right">{user.learningPlans}</TableCell>
                  <TableCell align="right">{user.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Profile;
