import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import { books } from './data/storeData.js';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';

function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [lastOrder, setLastOrder] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItems = books.filter((book) => cart[book.id]).map((book) => ({ ...book, quantity: cart[book.id] }));
  const cartCount = Object.values(cart).reduce((sum, amount) => sum + amount, 0);
  const subtotal = cartItems.reduce((sum, book) => sum + book.price * cart[book.id], 0);
  const shipping = subtotal >= 45 || subtotal === 0 ? 0 : 4.95;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location.hash, location.pathname]);

  function updateCart(id, change) {
    setCart((current) => {
      const nextAmount = (current[id] || 0) + change;
      const next = { ...current };
      if (nextAmount <= 0) delete next[id];
      else next[id] = nextAmount;
      return next;
    });
  }

  function addBookToCart(id) {
    updateCart(id, 1);
    setLastOrder(null);
    navigate('/cart');
  }

  function placeOrder(customer) {
    if (!cartItems.length) return;

    setLastOrder({
      id: `PT-${Date.now().toString().slice(-6)}`,
      customer: {
        ...customer,
        deliveryAddress: [customer.address, customer.apartment, `${customer.city}, ${customer.region} ${customer.postalCode}`, customer.country].filter(Boolean).join(', '),
      },
      items: cartItems,
      subtotal,
      shipping,
      total,
    });
    setCart({});
    navigate('/order-confirmation');
  }

  function openSearch() {
    setSearchOpen((open) => !open);
    navigate('/#books');
  }

  return (
    <div className="site-shell app-shell">
      <SiteHeader cartCount={cartCount} onSearch={openSearch} />
      <Routes>
        <Route path="/" element={<HomePage onAddBook={addBookToCart} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />} />
        <Route path="/cart" element={<CartPage cart={cart} cartItems={cartItems} subtotal={subtotal} shipping={shipping} total={total} updateCart={updateCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} cartItems={cartItems} subtotal={subtotal} shipping={shipping} total={total} onPlaceOrder={placeOrder} />} />
        <Route path="/order-confirmation" element={lastOrder ? <OrderConfirmationPage order={lastOrder} /> : <Navigate to="/cart" replace />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

export default AppRouter;