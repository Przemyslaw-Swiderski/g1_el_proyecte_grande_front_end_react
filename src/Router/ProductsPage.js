import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled("div")({
  marginTop: "2rem",
});

const CategoryContainer = styled(Paper)({
  padding: "2rem",
  borderRight: "1px solid #ddd",
  height: "100vh",
  overflowY: "scroll",
});

const ProductContainer = styled("div")({
  padding: "2rem",
});

const ProductCard = styled(Paper)({
  marginBottom: "2rem",
  padding: "1rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
});

const AddToCartButton = styled(Button)({
  marginTop: "1rem",
});

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
    <RootContainer>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <CategoryContainer>
              <Typography variant="h6">Kategorie</Typography>
              {categories.map((category) => (
                <div key={category.id}>
                  <Checkbox
                    value={category.id}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(category.id)}
                  />
                  {category.name}
                </div>
              ))}
            </CategoryContainer>
          </Grid>
          <Grid item xs={8}>
            <ProductContainer>
              {filteredProducts.map((product) => (
                <Fade in key={product.id}>
                  <ProductCard>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <img src={product.image} alt={product.name} />
                    <Typography>Cena: {product.price.toFixed(2)} zł</Typography>
                    <AddToCartButton
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(product)}
                    >
                      Dodaj do koszyka
                    </AddToCartButton>
                  </ProductCard>
                </Fade>
              ))}
            </ProductContainer>
          </Grid>
        </Grid>
      </Container>
    </RootContainer>
  );
}

export default ProductsPage;
