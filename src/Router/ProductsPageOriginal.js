import React, { useState, useEffect } from "react";

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch categories and products from the server
  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:8081/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch products
    fetch("http://localhost:8081/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Implement your logic to add a product to the cart.
    // Example: Update the cart state with the selected product.
    // setCart([...cart, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    // Implement your logic to remove a product from the cart.
    // Example: Remove the product from the cart state based on its ID.
    // setCart(cart.filter((item) => item.id !== product.id));
  };

  // Function to update the selected categories
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  // Filter products based on selected categories
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) {
      return true; // Show all products if no categories are selected.
    }
    return selectedCategories.includes(product.categoryId.toString());
  });

  return (
    <div>
      <div>
        <h6>Kategorie</h6>
        <div>
          {categories.map((category) => (
            <div key={category.id}>
              <input
                type="checkbox"
                value={category.id}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category.id)}
              />
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h6>{product.name}</h6>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <p>Cena: {product.price.toFixed(2)} zł</p>
            <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
