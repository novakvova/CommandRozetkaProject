import React, { useState } from 'react';
import type { ICreateProductDto } from '../types/product';
import './Product.css';

interface CreateProductProps {
  onProductCreated?: (product: ICreateProductDto) => void;
}

export const CreateProduct: React.FC<CreateProductProps> = ({ onProductCreated }) => {
  const [formData, setFormData] = useState<ICreateProductDto>({
    name: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onProductCreated) {
      onProductCreated(formData);
    }
    alert('Товар успішно додано!');
    setFormData({ name: '', price: 0, description: '', category: '', imageUrl: '' });
  };

  return (
    <div className="product-container fade-in">
      <h2>Створення товару</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Назва товару</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть назву"
            required
          />
        </div>

        <div className="form-group">
          <label>Ціна (грн)</label>
          <input
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Категорія</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Оберіть категорію</option>
            <option value="Electronics">Електроніка</option>
            <option value="Laptops">Ноутбуки</option>
            <option value="Smartphones">Смартфони</option>
            <option value="Accessories">Аксесуари</option>
          </select>
        </div>

        <div className="form-group">
          <label>URL зображення</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label>Опис товару</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введіть детальний опис"
            rows={4}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Додати товар</button>
      </form>
    </div>
  );
};