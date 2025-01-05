import AuthProvider from "./AuthContext/AuthContext";
import CommunityProvider from "./CommunityContext/CommunityContext";
import DashboardProvider from "./DashboardContext/DashboardContext";
import GeneralProvider from "./GeneralContext/GeneralContext";
import LearningProvider from "./LearningContext/LearningContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <GeneralProvider>
      <LearningProvider>
        <CommunityProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </CommunityProvider>
      </LearningProvider>
    </GeneralProvider>
  </AuthProvider>
);

export default AppProviders;
