import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LuInfo } from "react-icons/lu";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel/CircularProgressWithLabel";
import TableCellStyled from "../../components/TableCell/TableCell";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { communityContext } from "../../contexts/CommunityContext/CommunityContext";

const Profile = () => {
  const { communities } = useContext(communityContext);
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
    {
      rank: 6,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
    {
      rank: 7,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
    {
      rank: 8,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
    {
      rank: 9,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
    {
      rank: 10,
      username: "Username5",
      interviews: 0,
      learningPlans: 0,
      points: 900,
    },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="p-5">
            <h1 className="self-start pb-5 text-2xl font-thin text-start text-navy">
              Dashboard
            </h1>

            <div className="flex gap-10 p-5">
              <div className="flex flex-col justify-between gap-8">
                <div class="flex gap-5 justify-between w-[650px] border rounded-2xl border-gray-200 bg-white p-6 h-fit">
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
                <div className="flex gap-8">
                  <div className="w-full h-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl">
                    <div className="mb-3 text-base font-bold text-center text-navy">
                      My learning plans
                    </div>

                    <div className="bg-white h-[570px] pt-4">
                      <div className="space-y-4 h-[570px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal">
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>

                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>
                        <div className="flex justify-between pr-3">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-navy">Learning plan</p>
                            <p className="font-normal text-navy">description</p>
                          </div>
                          <div>
                            <CircularProgressWithLabel value={67} size={60} />
                          </div>
                        </div>

                        <div className="flex justify-between pr-3">
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
                  <div className="border rounded-2xl border-gray-200 bg-white p-4 w-full max-w-sm h-[650px]">
                    <div className="mb-3 text-base font-bold text-center text-navy">
                      My Communities
                    </div>

                    <div className="p-4 bg-white h-[550px] px-0">
                      <div className="flex flex-col gap-6 h-[550px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal">
                        {communities.map((community) => (
                          <div className="flex items-center gap-4 pr-2">
                            <div className="flex items-center justify-center w-12 h-12 mb-5 overflow-hidden rounded-full bg-navy">
                              {community.community_logo ? (
                                <img
                                  src={community.community_logo}
                                  alt={`${community.title} logo`}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <span className="text-sm text-center text-white">
                                  No Logo
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="font-bold text-navy">
                                {community.title}
                              </p>
                              <p className="font-normal text-navy">
                                {community.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 ">
                  <h1 className="text-xl font-bold text-navy">Leaderboard</h1>
                  <LuInfo color="navy" size={25} />
                </div>
                <TableContainer className="p-3 pb-8 border border-gray-200 rounded-xl">
                  <Table aria-label="leaderboard table">
                    <TableHead>
                      <TableRow>
                        <TableCellStyled start={true}>
                          Changemakers
                        </TableCellStyled>
                        <TableCellStyled>Interviews</TableCellStyled>
                        <TableCellStyled>Learning Plans</TableCellStyled>
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
                                {user.username}
                              </div>
                            </div>
                          </TableCellStyled>
                          <TableCellStyled>{user.interviews}</TableCellStyled>
                          <TableCellStyled>
                            {user.learningPlans}
                          </TableCellStyled>
                          <TableCellStyled end={true}>
                            {user.points}
                          </TableCellStyled>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
