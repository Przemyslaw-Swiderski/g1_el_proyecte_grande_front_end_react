import React, { useState, useEffect } from "react";
import { login, refreshAccessToken } from "../RegistrationAndLogin/authService"; // Import your auth service

function ProductsPage() {

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);





  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!accessToken) {
        return;
      }

      try {
        const decodedToken = decodeAccessToken(accessToken);

        // Check if the token is about to expire (e.g., within the next 5 minutes)
        const expirationThreshold = 5 * 60; // 5 minutes in seconds
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp - currentTime < expirationThreshold) {
          // Token is about to expire, refresh it
          refreshTokenIfNeeded();
        }
      } catch (error) {
        console.error("Error decoding access token:", error);
      }
    };

    checkTokenExpiration();
  }, [accessToken]);

  const decodeAccessToken = (token) => {
    // Implement JWT decoding logic using 'jsonwebtoken' library
    // Example: const decodedToken = jwt_decode(token);
    // Return the decoded token
  };

  const refreshTokenIfNeeded = async () => {
    if (!refreshToken) {
      return;
    }

    try {
      setLoading(true);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshAccessToken(
        refreshToken
      );

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error refreshing access token. Please log in again.");
      clearTokens();
    }
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };



  // Function to handle user login
  const handleLogin = async () => {
    try {
      setLoading(true);

      const { accessToken, refreshToken } = await login(username, password);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Invalid username or password.");
    }
  };

  // Render the login form if the user is not authenticated
  if (!accessToken) {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    );
  }



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
