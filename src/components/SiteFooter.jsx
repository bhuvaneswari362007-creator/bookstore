import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark footer-wordmark" to="/">
        <span className="mark-icon"><BookOpen size={19} /></span>
        papertrail<span className="wordmark-period">.</span>
      </Link>
      <span>Independent by nature. Bookish by choice.</span>
      <div><Link to="/#books">Shop</Link><Link to="/orders">Orders</Link><Link to="/#newsletter">Contact</Link></div>
      <span className="copyright">© 2026 PAPERTRAIL BOOKS</span>
    </footer>
  );
}

export default SiteFooter;