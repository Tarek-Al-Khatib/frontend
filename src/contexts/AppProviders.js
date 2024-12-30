import AuthProvider from "./AuthContext/AuthContext";
import CommunityProvider from "./CommunityContext/CommunityContext";
import DashboardProvider from "./DashboardContext/DashboardContext";
import LearningProvider from "./LearningContext/LearningContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <LearningProvider>
      <CommunityProvider>
        <DashboardProvider>{children}</DashboardProvider>
      </CommunityProvider>
    </LearningProvider>
  </AuthProvider>
);

export default AppProviders;
