import { ArrowRight, BookOpen, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../data/storeData.js';

function CartPage({ cart, cartItems, subtotal, shipping, total, updateCart }) {
  return (
    <main className="cart-page">
      <Link className="back-to-shop" to="/#books"><ArrowRight size={14} /> Continue shopping</Link>
      <div className="cart-page-heading"><div className="eyebrow"><span className="eyebrow-line" /> YOUR BOOK BAG</div><h1>Your next <em>chapter.</em></h1><p>{cartItems.length ? `${cartItems.length} ${cartItems.length === 1 ? 'title' : 'titles'} picked just for you.` : 'Your book bag is ready for a good story.'}</p></div>
      {cartItems.length ? <div className="cart-page-layout">
        <section className="cart-page-items" aria-label="Books in your bag">
          {cartItems.map((book) => <article className="cart-page-item" key={book.id}>
            <img src={imageUrl(book.cover, 280)} alt={`${book.title} cover`} />
            <div className="cart-page-item-info"><span className="eyebrow">{book.category}</span><h2>{book.title}</h2><p>by {book.author}</p><div className="cart-page-quantity"><button type="button" aria-label={`Remove one ${book.title}`} onClick={() => updateCart(book.id, -1)}><Minus size={14} /></button><span>{cart[book.id]}</span><button type="button" aria-label={`Add one ${book.title}`} onClick={() => updateCart(book.id, 1)}><Plus size={14} /></button></div></div>
            <strong className="cart-page-item-price">${(book.price * cart[book.id]).toFixed(2)}</strong>
          </article>)}
        </section>
        <aside className="cart-page-summary" aria-label="Order summary">
          <h2>Order summary</h2><div className="cart-page-summary-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div className="cart-page-shipping"><span className="shipping-meter"><span style={{ width: `${Math.min((subtotal / 45) * 100, 100)}%` }} /></span><p>{subtotal >= 45 ? 'You unlocked free shipping!' : `Add $${(45 - subtotal).toFixed(2)} for free shipping`}</p></div><div className="cart-page-summary-line"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong></div><div className="cart-page-summary-line total-line"><span>Estimated total</span><strong>${total.toFixed(2)}</strong></div><Link className="checkout-button" to="/checkout">Continue to checkout <ArrowRight size={17} /></Link><p className="cart-page-tax-note">Demo checkout. No payment will be collected.</p>
        </aside>
      </div> : <div className="cart-page-empty"><ShoppingBag size={27} /><h2>No books in your bag yet.</h2><p>Find a story you love and it’ll show up here.</p><Link className="primary-button" to="/#books">Browse the books <ArrowRight size={16} /></Link></div>}
    </main>
  );
}

export default CartPage;