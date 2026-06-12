import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import { usePosts } from '../hooks/usePosts.js';

export default function MemberOverview() {
  const { user, profile, role } = useAuth();
  const { posts } = usePosts();
  const mine = posts.filter((p) => p.authorId === user.uid);

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Welcome, {profile?.name || user.email}</h2></div>

      <div className="dash-statrow">
        <div className="ov-stat ov-stat-a">
          <span className="ov-stat-icon"><i className="fas fa-newspaper" /></span>
          <small>My Posts</small>
          <strong>{mine.length}</strong>
          <span className="ov-stat-tag"><i className="fas fa-circle" /> Published</span>
        </div>
        <div className="ov-stat ov-stat-b">
          <span className="ov-stat-icon"><i className="fas fa-id-badge" /></span>
          <small>Role</small>
          <strong style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>{role}</strong>
          <span className="ov-stat-tag"><i className="fas fa-circle-check" /> Approved</span>
        </div>
        <Link to="/member/write" className="ov-stat ov-stat-c">
          <span className="ov-stat-icon"><i className="fas fa-pen-nib" /></span>
          <small>Quick action</small>
          <strong style={{ fontSize: '1.2rem' }}>Write a post</strong>
          <span className="ov-stat-tag"><i className="fas fa-arrow-right" /> Start writing</span>
        </Link>
      </div>

      <p className="dash-hint">
        <i className="fas fa-circle-info" /> Write blog posts from here — they go live on the public
        blog immediately. Manage them under <strong>&nbsp;My Blog Posts</strong>.
      </p>
    </div>
  );
}
