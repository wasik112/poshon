import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSiteData } from './hooks/useSiteData.js';
import { AuthProvider } from './auth/AuthProvider.jsx';
import Layout from './components/Layout.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import BoothsPage from './pages/BoothsPage.jsx';
import PrototypesPage from './pages/PrototypesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import VolunteersPage from './pages/VolunteersPage.jsx';
import VolunteerApplyPage from './pages/VolunteerApplyPage.jsx';
import VolunteerDetailPage from './pages/VolunteerDetailPage.jsx';
import ActivistsPage from './pages/ActivistsPage.jsx';
import ActivistDetailPage from './pages/ActivistDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import WritePostPage from './pages/WritePostPage.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import MemberDashboard from './member/MemberDashboard.jsx';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="not-found">
      <div className="container">
        <span className="eyebrow">{t('notFound.code')}</span>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.intro')}</p>
        <Link className="btn btn-primary" to="/">
          <i className="fas fa-arrow-left" /> {t('notFound.back')}
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  const { site, locations, status, error, reload, setSite, setLocations } = useSiteData();

  if (status !== 'ready') {
    return <LoadingScreen error={status === 'error' ? error : null} onRetry={reload} />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout site={site} locations={locations} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/booths" element={<BoothsPage />} />
            <Route path="/project" element={<PrototypesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/new" element={<WritePostPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/volunteers/apply" element={<VolunteerApplyPage />} />
            <Route path="/volunteers/:id" element={<VolunteerDetailPage />} />
            <Route path="/activists" element={<ActivistsPage />} />
            <Route path="/activists/:id" element={<ActivistDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/prototypes" element={<Navigate to="/project" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/member/*" element={<MemberDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
