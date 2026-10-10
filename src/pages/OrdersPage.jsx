import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { imageUrl, orderFilters, orders } from '../data/storeData.js';

function OrdersPage() {
  const [orderFilter, setOrderFilter] = useState('All orders');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const visibleOrders = orders.filter((order) => orderFilter === 'All orders' || order.status === orderFilter);

  return (
    <main className="orders-page">
      <section className="orders-section" id="orders" aria-labelledby="orders-title">
        <div className="orders-inner">
          <div className="orders-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PAPERTRAIL</div><h1 id="orders-title">Good reads, <em>on their way.</em></h1><p>Review recent orders and check delivery progress.</p></div><span className="orders-demo-note">DEMO ORDER HISTORY</span></div>
          <div className="order-filters" role="tablist" aria-label="Filter orders">{orderFilters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={orderFilter === filter} className={`order-filter ${orderFilter === filter ? 'active' : ''}`} onClick={() => setOrderFilter(filter)}>{filter}<span>{filter === 'All orders' ? orders.length : orders.filter((order) => order.status === filter).length}</span></button>)}</div>
          <div className="order-list">{visibleOrders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            return <article className="order-entry" key={order.id}>
              <div className="order-row"><div className="order-reference"><strong>Order {order.id}</strong><time dateTime={order.placedAt}>Placed {order.placedLabel}</time></div><div className="order-products"><img src={imageUrl(order.cover, 160)} alt={`${order.titles[0]} thumbnail`} loading="lazy" /><div><h2>{order.titles.join(' · ')}</h2><p>{order.itemCount} {order.itemCount === 1 ? 'book' : 'books'} <span>·</span> ${order.total.toFixed(2)}</p></div></div><span className={`order-status ${order.status === 'Delivered' ? 'delivered' : 'in-transit'}`}><span />{order.status}</span><button type="button" className="order-action" aria-expanded={isExpanded} onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>{order.status === 'In transit' ? 'Track order' : 'View order'}<ArrowRight size={15} /></button></div>
              {isExpanded && <div className="order-detail" role="region" aria-label={`Details for order ${order.id}`}><div className="order-tracking-copy"><span>{order.delivery}</span><p>{order.update}</p><small>Tracking number: {order.tracking}</small></div><ol className="order-progress">{['Order placed', 'Shipped', 'Delivered'].map((step, index) => <li key={step} className={order.status === 'Delivered' || index < 2 ? 'complete' : ''}><span>{step}</span></li>)}</ol><div className="order-total"><span>Order total</span><strong>${order.total.toFixed(2)}</strong></div></div>}
            </article>;
          })}</div>
          <p className="orders-footnote">These sample orders are for display. Sign-in and live carrier tracking are not connected.</p>
        </div>
      </section>
    </main>
  );
}

export default OrdersPage;