import { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css"; 

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://api.freeapi.app/api/v1/public/randomproducts")
      .then((response) => {
        if (response.data?.data?.data) {
          setProducts(response.data.data.data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.images.length > 0 && (
              <img src={product.images[0]} alt={product.title} className="product-image" />
            )}
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <button className="product-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
