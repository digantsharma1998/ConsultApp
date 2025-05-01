import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthPage from './pages/Auth/AuthPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ResumeBuilderPage from './pages/Resume/ResumeBuilderPage';
import ResumeReviewPage from './pages/Review/ResumeReviewPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import NavBar from './components/common/NavBar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/resume" element={
            <ProtectedRoute>
              <ResumeBuilderPage />
            </ProtectedRoute>
          } />
          <Route path="/review" element={
            <ProtectedRoute>
              <ResumeReviewPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;