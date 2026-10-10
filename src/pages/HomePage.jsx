import { useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowRight, BookOpen, ChevronDown, Heart, Plus, Search, Sparkles, X } from 'lucide-react';
import { books, categories, imageUrl } from '../data/storeData.js';

function HomePage({ onAddBook, searchOpen, setSearchOpen }) {
  const [category, setCategory] = useState('Everything');
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [favorites, setFavorites] = useState([]);

  const visibleBooks = useMemo(() => {
    const filtered = books.filter((book) => {
      const matchesCategory = category === 'Everything' || book.category === category;
      const searchText = `${book.title} ${book.author} ${book.category}`.toLowerCase();
      return matchesCategory && searchText.includes(query.trim().toLowerCase());
    });
    if (sortOrder === 'price-low') return [...filtered].sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-high') return [...filtered].sort((a, b) => b.price - a.price);
    if (sortOrder === 'title') return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [category, query, sortOrder]);

  function browseBooks() {
    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR INDEPENDENT BOOKSHOP</div>
          <h1 id="hero-title">Stories worth<br />staying <em>up for.</em></h1>
          <p>Good books have a way of finding you. Let’s find your next one.</p>
          <button className="primary-button" type="button" onClick={browseBooks}>Find your next read <ArrowRight size={17} /></button>
          <div className="hero-note"><div className="reader-avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><span>Loved by readers in 38 countries</span></div>
          <span className="hero-scribble" aria-hidden="true">read a little more</span>
        </div>
        <div className="hero-visual">
          <img className="hero-image" src={imageUrl('photo-1507842217343-583bb7270b66', 1200)} alt="A sunlit independent bookshop lined with shelves" />
          <div className="hero-image-shade" />
          <div className="hero-caption"><span className="caption-dot" /> THE GOOD KIND OF GETTING LOST <span>01 / 04</span></div>
          <div className="hero-sticker"><span>TURN<br />THE<br />PAGE</span><ArrowRight size={16} /></div>
        </div>
        <div className="hero-side-note">INDEPENDENTLY CURATED · ALWAYS HUMAN</div>
      </section>

      <section className="promise-strip" aria-label="Our promises">
        <div><span className="promise-number">01</span><span>Chosen by real readers</span></div>
        <div><span className="promise-number">02</span><span>Wrapped with a little care</span></div>
        <div><span className="promise-number">03</span><span>Books that stay with you</span></div>
      </section>

      <section className="catalog" id="books">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> THE PAPERTRAIL EDIT</div><h2>Find your <em>next.</em></h2></div>
          <p>Well-loved stories, unexpected discoveries,<br className="desktop-break" /> and the ones you’ll press into a friend’s hands.</p>
        </div>
        <div className="catalog-tools">
          <div className="category-list" role="tablist" aria-label="Book categories">
            {categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={`category-tab ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className={`search-field ${searchOpen ? 'search-visible' : ''}`}>
            <Search size={16} />
            <input aria-label="Search by title, author, or category" placeholder="Title, author, or mood..." value={query} onChange={(event) => setQuery(event.target.value)} />
            <button type="button" className="mobile-search-close" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={16} /></button>
          </div>
          <label className="sort-select"><ArrowDownWideNarrow size={15} /><span className="sort-label">Sort:</span><select aria-label="Sort books" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="title">Title A–Z</option></select><ChevronDown size={14} /></label>
        </div>

        {visibleBooks.length ? <div className="book-grid">
          {visibleBooks.map((book, index) => <article className="book-card" key={book.id} style={{ '--card-index': index }}>
            <div className={`book-cover ${book.tone}`}>
              <img src={imageUrl(book.cover, 620)} alt={`A book from the ${book.category.toLowerCase()} collection`} loading="lazy" />
              {book.badge && <span className="book-badge">{book.badge}</span>}
              <button type="button" className={`favorite-button ${favorites.includes(book.id) ? 'is-favorite' : ''}`} aria-label={favorites.includes(book.id) ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`} onClick={() => toggleFavorite(book.id)}><Heart size={17} fill={favorites.includes(book.id) ? 'currentColor' : 'none'} /></button>
              <button type="button" className="quick-add" onClick={() => onAddBook(book.id)}><Plus size={15} /> Add to bag</button>
            </div>
            <div className="book-meta">
              <div className="book-category">{book.category}<span className="rating"><span>★</span> {book.rating}</span></div>
              <h3>{book.title}</h3><p className="book-author">by {book.author}</p>
              <div className="book-buy"><span className="book-price">${book.price.toFixed(2)} {book.oldPrice && <del>${book.oldPrice.toFixed(2)}</del>}</span><button type="button" className="add-icon" aria-label={`Add ${book.title} to bag`} onClick={() => onAddBook(book.id)}><Plus size={17} /></button></div>
            </div>
          </article>)}
        </div> : <div className="empty-results"><BookOpen size={24} /><h3>No pages found.</h3><p>Try another title, author, or category.</p><button type="button" onClick={() => { setQuery(''); setCategory('Everything'); }}>Clear filters</button></div>}
        <div className="catalog-footer"><span>Showing {visibleBooks.length} of {books.length} reader favorites</span><button type="button" onClick={() => { setCategory('Everything'); setQuery(''); }}>Explore all books <ArrowRight size={15} /></button></div>
      </section>

      <section className="quote-band" id="about"><div className="quote-mark">“</div><blockquote>A book is a dream you hold<br />in your hands.</blockquote><div className="quote-credit"><span /> NEIL GAIMAN <span className="quote-credit-line" /></div><div className="quote-side">A GOOD BOOK<br />IS NEVER JUST<br />A BOOK.</div></section>
      <section className="newsletter" id="newsletter"><div className="newsletter-icon"><BookOpen size={23} /></div><div className="newsletter-copy"><div className="eyebrow"><span className="eyebrow-line" /> A NOTE FROM THE BOOKSHOP</div><h2>Good things <em>read</em> here.</h2><p>New finds, reader favorites, and the occasional love letter to a book. No noise, just good words.</p></div><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe to the reading list"><ArrowRight size={18} /></button><span>One thoughtful email, every other Sunday.</span></form></section>
    </main>
  );
}

export default HomePage;