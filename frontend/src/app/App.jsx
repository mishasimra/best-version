import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { LoadingState } from "../components/ui/UI";
import { useAuth } from "../context/AuthContext";
import {
  ForgotPasswordPage,
  GoogleAuthCallbackPage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
} from "../pages/auth/AuthPages";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { AdminPage } from "../pages/features/AdminPage";
import { AssessmentPage } from "../pages/features/AssessmentPage";
import { CareerPage } from "../pages/features/CareerPage";
import { CommunityPage } from "../pages/features/CommunityPage";
import { CompetitionsPage } from "../pages/features/CompetitionsPage";
import { CourseDetailPage } from "../pages/features/CourseDetailPage";
import { CoursesPage } from "../pages/features/CoursesPage";
import { EarnPage } from "../pages/features/EarnPage";
import { LeaderboardPage } from "../pages/features/LeaderboardPage";
import { MentorshipPage } from "../pages/features/MentorshipPage";
import { ProfilePage } from "../pages/features/ProfilePage";
import { ProjectsPage } from "../pages/features/ProjectsPage";
import { SettingsPage } from "../pages/features/SettingsPage";
import { StartupIdeasPage } from "../pages/features/StartupIdeasPage";
import { LandingPage } from "../pages/public/LandingPage";
import { Chatbot } from "../components/ui/Chatbot";
import { PrivacyPage, SupportPage, TermsPage } from "../pages/public/LegalPages";

function ProtectedRoute({ children }) {
  const { isAuthenticated, booting } = useAuth();
  if (booting) return <LoadingState label="Preparing your workspace..." />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { auth } = useAuth();
  return ["admin", "recruiter"].includes(auth.user?.role) ? children : <Navigate to="/dashboard" replace />;
}

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallbackPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/startups" element={<StartupIdeasPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </>
  );
}
