import { ArrowRight, Check, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function OrderConfirmationPage({ order }) {
  return (
    <main className="confirmation-page">
      <div className="confirmation-mark"><Check size={29} /></div>
      <div className="eyebrow"><span className="eyebrow-line" /> ORDER CONFIRMED</div>
      <h1>Your next chapter<br /><em>is on its way.</em></h1>
      <p className="confirmation-thanks">Thanks, {order.customer.fullName.split(' ')[0]}. Your demo order has been placed.</p>
      <section className="confirmation-card" aria-label="Order confirmation details">
        <div className="confirmation-reference"><div><span>ORDER NUMBER</span><strong>{order.id}</strong></div><PackageCheck size={23} /></div>
        <div className="confirmation-items">{order.items.map((book) => <div key={book.id}><span>{book.title} <small>× {book.quantity}</small></span><strong>${(book.price * book.quantity).toFixed(2)}</strong></div>)}</div>
        <div className="confirmation-total"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>
        <div className="confirmation-delivery"><span>DELIVERING TO</span><strong>{order.customer.fullName}</strong><p>{order.customer.deliveryAddress}</p></div>
        <p className="confirmation-email">A confirmation for this demo order is shown here. No email was sent.</p>
      </section>
      <Link className="primary-button" to="/#books">Back to the bookshop <ArrowRight size={16} /></Link>
    </main>
  );
}

export default OrderConfirmationPage;