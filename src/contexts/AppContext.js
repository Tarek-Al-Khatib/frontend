import AuthProvider from "./AuthContext/AuthContext";
import LearningProvider from "./LearningContext/LearningContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <LearningProvider>{children}</LearningProvider>
  </AuthProvider>
);

export default AppProviders;
