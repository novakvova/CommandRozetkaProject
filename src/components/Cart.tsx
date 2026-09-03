import React from 'react';
import type { ICartItem } from '../types/product';
import './Product.css';

interface CartProps {
  cartItems: ICartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert('Замовлення успішно оформлено!');
    onClearCart();
  };

  return (
    <div className="product-container fade-in">
      <div className="cart-header">
        <h2>Кошик покупок</h2>
        {cartItems.length > 0 && (
          <button className="clear-btn" onClick={onClearCart}>
            Очистити кошик
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">Ваш кошик порожній</div>
      ) : (
        <div className="cart-content">
          <div className="cart-list">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <img src={product.imageUrl} alt={product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{product.name}</h3>
                  <p className="cart-item-price">{product.price.toLocaleString('uk-UA')} ₴</p>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => onUpdateQuantity(product.id, -1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => onUpdateQuantity(product.id, 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  {(product.price * quantity).toLocaleString('uk-UA')} ₴
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(product.id)}
                  title="Видалити"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Разом до сплати:</h3>
            <div className="total-amount">{totalPrice.toLocaleString('uk-UA')} ₴</div>
            <button className="submit-btn checkout-btn" onClick={handleCheckout}>
              Оформити замовлення
            </button>
          </div>
        </div>
      )}
    </div>
  );
};