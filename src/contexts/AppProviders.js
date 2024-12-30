import AuthProvider from "./AuthContext/AuthContext";
import CommunityProvider from "./CommunityContext/CommunityContext";
import LearningProvider from "./LearningContext/LearningContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <LearningProvider>
      <CommunityProvider>{children}</CommunityProvider>
    </LearningProvider>
  </AuthProvider>
);

export default AppProviders;
