import { useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./Shop.css";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  quantity?: number;
}

  

// Set app element for accessibility
Modal.setAppElement('#root');

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cart } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get("https://api.freeapi.app/api/v1/public/randomproducts")
      .then(response => setProducts(response.data.data.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#112240',
      borderRadius: '20px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 242, 254, 0.1)',
      color: '#e6f1ff',
      maxWidth: '600px',
      width: '90%'
    },
    overlay: {
      backgroundColor: 'rgba(10, 25, 47, 0.75)',
      backdropFilter: 'blur(5px)'
    }
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop</h2>
      
      <div className="cart-info" onClick={() => setModalIsOpen(true)}>
        🛒 Cart Items: <strong>{cart.length}</strong>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Cart Modal"
      >
        <div className="modal-header">
          <h2>Your Cart</h2>
          <button onClick={() => setModalIsOpen(false)} className="close-button">×</button>
        </div>
        
        <div className="cart-items">
        {cart.map((item: Product) => (
          <div key={item.id} className="cart-item">
            <img src={item.images[0]} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="item-price">${item.price}</p>
              <div className="quantity-badge">×{item.quantity}</div>
            </div>
            <div className="item-total">
              ${(item.price * (item.quantity || 1)).toFixed(2)}
            </div>
          </div>
        ))}
        
        {cart.length > 0 && (
          <div className="cart-total">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        )}
      </div>

        {cart.length === 0 && (
          <p className="empty-cart-message">Your cart is empty</p>
        )}

        <div className="modal-footer">
          <button onClick={() => setModalIsOpen(false)}>Continue Shopping</button>
          {cart.length > 0 && <button className="checkout-button">Checkout</button>}
        </div>
      </Modal>
      
      {/* ... rest of your shop content ... */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <button className="product-button" onClick={() => addToCart(product)}>
                Add to Cart 🛍️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;