import { useState } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import type { IProduct, ICreateProductDto, ICartItem } from './types/product';
import './App.css';

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
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'cart'>('list');
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  // Хендлер додавання товару в кошик
  const handleAddToCart = (product: IProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Зміна кількості товару в кошику
  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as ICartItem[]
    );
  };

  // Видалення товару з кошика
  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Очищення кошика
  const handleClearCart = () => setCartItems([]);

  // Створення нового товару
  const handleProductCreated = (newProductDto: ICreateProductDto) => {
    const newProduct: IProduct = {
      ...newProductDto,
      id: Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    setActiveTab('list');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
          <button
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Кошик {totalCartCount > 0 && `(${totalCartCount})`}
          </button>
        </nav>
      </header>

      <main className="app-content">
        {activeTab === 'create' && (
          <CreateProduct onProductCreated={handleProductCreated} />
        )}
        {activeTab === 'list' && (
          <ProductList products={products} onAddToCart={handleAddToCart} />
        )}
        {activeTab === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </main>
    </div>
  );
}

export default App;