import { useState } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { ProductList } from './components/ProductList';
import type { IProduct, ICreateProductDto } from './types/product';
import './App.css';

// Початкові товари
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

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  // Спільний стан для списку товарів
  const [products, setProducts] = useState<IProduct[]>(initialProducts);

  // Функція додавання нового товару
  const handleProductCreated = (newProductDto: ICreateProductDto) => {
    const newProduct: IProduct = {
      ...newProductDto,
      id: Date.now(), // Генеруємо тимчасовий ID
    };
    
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setActiveTab('list'); // Одразу переключаємо на вкладку списку
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Command Rozetka</h1>
        <nav className="nav-buttons">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Створити товар
          </button>
          <button
            className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Список товарів ({products.length})
          </button>
        </nav>
      </header>

      <main className="app-content">
        {activeTab === 'create' && (
          <CreateProduct onProductCreated={handleProductCreated} />
        )}
        {activeTab === 'list' && (
          <ProductList products={products} />
        )}
      </main>
    </div>
  );
}

export default App;