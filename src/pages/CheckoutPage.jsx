import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../data/storeData.js';

function CheckoutPage({ cartItems, subtotal, shipping, total, onPlaceOrder }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onPlaceOrder({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      apartment: formData.get('apartment'),
      city: formData.get('city'),
      region: formData.get('region'),
      postalCode: formData.get('postalCode'),
      country: formData.get('country'),
    });
  }

  if (!cartItems.length) {
    return <main className="checkout-page"><div className="cart-page-empty"><ShoppingBag size={27} /><h1>Your bag is empty.</h1><p>Add a book before starting checkout.</p><Link className="primary-button" to="/#books">Browse the books <ArrowRight size={16} /></Link></div></main>;
  }

  return (
    <main className="checkout-page">
      <Link className="back-to-shop" to="/cart"><ArrowLeft size={14} /> Back to your bag</Link>
      <div className="checkout-page-heading"><div className="eyebrow"><span className="eyebrow-line" /> CHECKOUT</div><h1>One last <em>thing.</em></h1><p>Where should we send your books?</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-form-section">
            <div className="checkout-section-heading"><span>01</span><div><h2>Contact details</h2><p>For your order confirmation</p></div></div>
            <div className="checkout-fields">
              <label className="checkout-field field-wide">Full name<input name="fullName" type="text" autoComplete="name" required /></label>
              <label className="checkout-field">Email address<input name="email" type="email" autoComplete="email" required /></label>
              <label className="checkout-field">Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
            </div>
          </section>
          <section className="checkout-form-section">
            <div className="checkout-section-heading"><span>02</span><div><h2>Delivery address</h2><p>Books are better when they arrive</p></div></div>
            <div className="checkout-fields">
              <label className="checkout-field field-wide">Street address<input name="address" type="text" autoComplete="address-line1" required /></label>
              <label className="checkout-field field-wide">Apartment, suite, etc. <span>(optional)</span><input name="apartment" type="text" autoComplete="address-line2" /></label>
              <label className="checkout-field">City<input name="city" type="text" autoComplete="address-level2" required /></label>
              <label className="checkout-field">State / region<input name="region" type="text" autoComplete="address-level1" required /></label>
              <label className="checkout-field">Postal code<input name="postalCode" type="text" autoComplete="postal-code" required /></label>
              <label className="checkout-field">Country<select name="country" autoComplete="country-name" defaultValue="United States" required><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select></label>
            </div>
          </section>
          <section className="checkout-form-section">
            <div className="checkout-section-heading"><span>03</span><div><h2>Payment</h2><p>Choose how you would pay</p></div></div>
            <label className="payment-method"><input type="radio" name="paymentMethod" value="Pay on delivery" defaultChecked /><span><strong>Pay on delivery</strong><small>Demo option only. No payment is collected.</small></span><Check size={16} /></label>
            <p className="checkout-demo-note"><LockKeyhole size={14} /> This is a demo checkout. Your details stay in this browser session; no payment or shipment is processed.</p>
          </section>
          <button className="checkout-button place-order-button" type="submit">Place demo order <ArrowRight size={17} /></button>
        </form>
        <aside className="cart-page-summary checkout-summary" aria-label="Order summary">
          <h2>Your books</h2>
          <div className="checkout-summary-items">{cartItems.map((book) => <div className="checkout-summary-item" key={book.id}><img src={imageUrl(book.cover, 120)} alt="" /><div><strong>{book.title}</strong><span>Qty {book.quantity || 1}</span></div><b>${(book.price * (book.quantity || 1)).toFixed(2)}</b></div>)}</div>
          <div className="cart-page-summary-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="cart-page-summary-line checkout-shipping-line"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong></div>
          <div className="cart-page-summary-line total-line"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        </aside>
      </div>
    </main>
  );
}

export default CheckoutPage;