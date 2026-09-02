import React, { useState } from 'react';
import type { IProduct } from '../types/product';
import './Product.css';

interface ProductListProps {
  products?: IProduct[];
}


const initialProducts: IProduct[] = [
  {
    id: 1,
    name: 'Ноутбук Apple MacBook Air 13 M2',
    price: 45999,
    description: 'Потужний та легкий ноутбук для роботи та навчання.',
    category: 'Laptops',
    imageUrl: 'https://via.placeholder.com/250x180/1a1a2e/ffffff?text=MacBook+Air',
  },
  {
    id: 2,
    name: 'Смартфон Samsung Galaxy S23',
    price: 32999,
    description: 'Флагманський смартфон із чудовою камерою.',
    category: 'Smartphones',
    imageUrl: 'https://via.placeholder.com/250x180/1a1a2e/ffffff?text=Galaxy+S23',
  },
];

export const ProductList: React.FC<ProductListProps> = ({ products = initialProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-container fade-in">
      <h2>Список товарів</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Пошук товарів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-image">
              <img src={product.imageUrl} alt={product.name} />
              <span className="category-badge">{product.category}</span>
            </div>
            <div className="card-content">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="card-footer">
                <span className="price">{product.price.toLocaleString('uk-UA')} ₴</span>
                <button className="buy-btn">Купити</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">Товарів не знайдено</div>
      )}
    </div>
  );
};