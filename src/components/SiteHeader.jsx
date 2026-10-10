import { useState } from 'react';
import { BookOpen, BookmarkPlus, Heart, Menu, PackageCheck, Search, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function SiteHeader({ cartCount, onSearch }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function closeMenu() {
    setMobileNavOpen(false);
  }

  return (
    <>
      <div className="announcement"><span aria-hidden="true">✦</span> A little something for your next chapter: free shipping over $45 <span aria-hidden="true">→</span></div>
      <header className="topbar">
        <Link className="wordmark" to="/" aria-label="Papertrail home" onClick={closeMenu}>
          <span className="mark-icon"><BookOpen size={21} strokeWidth={2.2} /></span>
          papertrail<span className="wordmark-period">.</span>
        </Link>
        <nav id="main-navigation" className={`main-nav ${mobileNavOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <Link to="/#books" onClick={closeMenu}><BookOpen className="nav-link-icon" />Shop books</Link>
          <Link to="/orders" onClick={closeMenu}><PackageCheck className="nav-link-icon" />My orders</Link>
          <Link to="/#about" onClick={closeMenu}><Heart className="nav-link-icon" />Our story</Link>
          <Link to="/#newsletter" onClick={closeMenu}><BookmarkPlus className="nav-link-icon" />The reading list</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-trigger" type="button" aria-label="Search books" onClick={onSearch}><Search size={19} /></button>
          <Link className="bag-button" to="/cart" aria-label={`Open bag with ${cartCount} items`}>
            <ShoppingBag size={18} /><span>Bag</span><span className="bag-count">{cartCount}</span>
          </Link>
          <button className="icon-button mobile-menu" type="button" aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen} aria-controls="main-navigation" onClick={() => setMobileNavOpen((open) => !open)}>
            {mobileNavOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
    </>
  );
}

export default SiteHeader;