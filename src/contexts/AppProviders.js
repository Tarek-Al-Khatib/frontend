import AuthProvider from "./AuthContext/AuthContext";
import ChatProvider from "./ChatContext/ChatContext";
import CommunityProvider from "./CommunityContext/CommunityContext";
import DashboardProvider from "./DashboardContext/DashboardContext";
import GeneralProvider from "./GeneralContext/GeneralContext";
import InterviewProvider from "./InterviewContext/InterviewContext";
import LearningProvider from "./LearningContext/LearningContext";
import VideoProvider from "./VideoCallContext/VideoCallContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <GeneralProvider>
      <ChatProvider>
        <InterviewProvider>
          <VideoProvider>
            <LearningProvider>
              <CommunityProvider>
                <DashboardProvider>{children}</DashboardProvider>
              </CommunityProvider>
            </LearningProvider>
          </VideoProvider>
        </InterviewProvider>
      </ChatProvider>
    </GeneralProvider>
  </AuthProvider>
);

export default AppProviders;
