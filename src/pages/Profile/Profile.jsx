import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { LuInfo } from "react-icons/lu";
import "./Profile.css";
import LevelBg from "../../assets/level_bg.png";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel/CircularProgressWithLabel";
import TableCellStyled from "../../components/TableCell/TableCell";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../css/colors.css";
import { communityContext } from "../../contexts/CommunityContext/CommunityContext";
import { learningContext } from "../../contexts/LearningContext/LearningContext";
import { generalContext } from "../../contexts/GeneralContext/GeneralContext";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import { serverUrl } from "../../config/url";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const handleFileChange = (e) => {
    const { files } = e.target;
    setProfileImage(files[0]);
  };

  useEffect(() => {
    if (profileImage) {
      updateImage(profileImage);
    }
  }, [profileImage]);
  const { communities } = useContext(communityContext);
  const { learningPlans, calculateProgress } = useContext(learningContext);
  const { fetchUser } = useContext(authContext);
  const { leaderboardData, updateImage, fetchLeaderboard } =
    useContext(generalContext);
  const { user } = useContext(authContext);
  useEffect(() => {
    fetchUser();
    fetchLeaderboard();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-8 max-sm:px-0">
        <h1 className="self-start pb-5 text-2xl font-thin text-start text-navy">
          Profile
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-10 p-5 max-lg:flex-col">
            <div className="flex flex-col justify-between gap-8">
              <div class="flex gap-5 justify-between w-full border rounded-2xl border-gray-200 bg-white p-6 h-fit max-xl:items-center">
                <div class="w-32 h-32 rounded-full flex justify-center items-center max-xl:w-full ">
                  <div className="relative">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt={`${profileImage.name} profile pic`}
                        className="object-cover w-32 h-32 rounded-full"
                      />
                    ) : (
                      user &&
                      user.profile_pic && (
                        <img
                          src={user.profile_pic}
                          alt={`${user.profile_pic} profile pic`}
                          className="object-cover w-32 h-32 rounded-full"
                        />
                      )
                    )}

                    <label
                      htmlFor="image_input"
                      className="absolute top-0 w-32 h-32 rounded-full cursor-pointer"
                    ></label>
                    <input
                      id="image_input"
                      type="file"
                      name="image_input"
                      accept="image/*"
                      className="absolute hidden top-2/4 left-1/2"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div class="flex justify-between gap-5 max-xl:flex-col w-full">
                  <div className="flex flex-col justify-center w-1/3 gap-5 ">
                    <div class="flex justify-start gap-5">
                      <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                        Name:
                      </span>
                      <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                        {user && user.username}
                      </span>
                    </div>
                    <div class="flex justify-start gap-5">
                      <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                        Email:
                      </span>
                      <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                        {user && user.email}
                      </span>
                    </div>
                    <div class="flex justify-start gap-5">
                      <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                        Points:
                      </span>
                      <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                        {user && user.points}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-1/4 gap-5">
                    <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
                      Description:
                    </span>
                    <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
                      {user && user.desription
                        ? user.description
                        : "No description"}
                    </span>
                  </div>
                  <div class="flex flex-col items-center w-1/4 max-xl:w-full">
                    <span class="text-[#1e25a6] text-base font-extrabold font-['Open Sans Hebrew'] mb-4">
                      Badges
                    </span>
                    <div class="flex flex-wrap gap-3 justify-center">
                      <div
                        class={`relative w-9 h-9 background-level rounded-full flex justify-center items-center`}
                      >
                        <img
                          src={LevelBg}
                          alt="Level background"
                          className="absolute"
                        />
                        <span class="absolute top-0 text-yellow-600 text-base font-extrabold font-['Open Sans Hebrew']">
                          {user && user.level}
                        </span>
                      </div>
                      {user &&
                        user.user_badges &&
                        user.user_badges.map((b) => (
                          <Tooltip
                            title={`${b.badge.title}: ${
                              b.badge.description
                            } : ${new Date(b.earned_at).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}`}
                            sx={{ width: 9, height: 9 }}
                          >
                            <div class="w-9 h-9 rounded-full">
                              <img
                                className="w-9 h-9"
                                src={`${serverUrl}${b.badge.icon}`}
                                alt={`${b.title} badge icon`}
                              />
                            </div>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 max-sm:flex-col max-sm:items-center">
                <div className="w-full h-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl">
                  <div className="mb-3 text-base font-bold text-center text-navy">
                    My learning plans
                  </div>

                  <div className="bg-white h-[570px] pt-4">
                    <div className="space-y-4 h-[570px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal ">
                      {learningPlans &&
                        learningPlans.map((plan) => (
                          <div className="flex justify-between pr-3">
                            <div className="flex flex-col gap-2">
                              <p className="w-4/5 font-bold text-navy">
                                {plan.title}
                              </p>
                              <p className="w-4/5 font-normal text-navy">
                                {plan.description}
                              </p>
                            </div>
                            <div>
                              <CircularProgressWithLabel
                                value={calculateProgress(plan)}
                                size={60}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="border rounded-2xl border-gray-200 bg-white p-4 w-full max-w-sm h-[650px]">
                  <div className="mb-3 text-base font-bold text-center text-navy">
                    My Communities
                  </div>

                  <div className="p-4 bg-white h-[550px] w-full px-0">
                    <div className="flex flex-col gap-6 h-[550px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal ">
                      {communities &&
                        communities.map((community) => (
                          <div className="flex items-center gap-4 pr-2">
                            <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-navy">
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
                              <p className="w-4/5 font-normal text-navy">
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
            <div className="p-6 border border-gray-200 rounded-2xl max-sm:hidden">
              <div className="flex items-center gap-3 mb-4 ">
                <h1 className="text-xl font-bold text-navy">Leaderboard</h1>
                <Tooltip
                  placement="top-start"
                  title="This leaderboard shows user's rank based on their points and the number of interviews and plans the've done"
                >
                  <LuInfo color="navy" size={25} />
                </Tooltip>
              </div>
              <TableContainer className="p-3 pb-8 border border-gray-200 rounded-xl ">
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
                    {leaderboardData && leaderboardData.length > 0 ? (
                      leaderboardData.map((userData) => (
                        <TableRow
                          key={userData.id}
                          className={userData.id === user.id ? "bg-cyan" : ""}
                        >
                          <TableCellStyled start={true}>
                            <div className="flex items-center gap-3">
                              {userData.rank + 1} {". "}
                              <div className="flex items-center gap-1">
                                <div className="rounded-full w-9 h-9">
                                  {user && userData.profile_pic && (
                                    <img
                                      src={userData.profile_pic}
                                      alt={`${userData.profile_pic} profile pic`}
                                      className="object-cover w-full h-full rounded-full"
                                    />
                                  )}
                                </div>
                                {userData.username}
                              </div>
                            </div>
                          </TableCellStyled>
                          <TableCellStyled>
                            {userData.interviews}
                          </TableCellStyled>
                          <TableCellStyled>
                            {userData.learningPlans}
                          </TableCellStyled>
                          <TableCellStyled end={true}>
                            {userData.points}
                          </TableCellStyled>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCellStyled colSpan={4} align="center">
                          No data available
                        </TableCellStyled>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
