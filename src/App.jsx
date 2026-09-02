import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
//import { ShortlistProvider } from './context/ShortlistContext';
import { CandidateStatusProvider } from './context/CandidateStatusContext';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import CandidatePoolPage from './pages/CandidatePoolPage';
import TeamPage from './pages/TeamPage';
import NotFoundPage from './pages/NotFoundPage';
import JobDescriptionsPage from './pages/JobDescriptionsPage';

function App() {
  return (
    <UserProvider>
      <CandidateStatusProvider>
        <SearchHistoryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/job-descriptions"
                element={
                  <ProtectedRoute>
                    <JobDescriptionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <ResultsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates"
                element={
                  <ProtectedRoute>
                    <CandidatePoolPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <ProtectedRoute>
                    <TeamPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SearchHistoryProvider>
      </CandidateStatusProvider>
    </UserProvider>
  );
}

export default App;
