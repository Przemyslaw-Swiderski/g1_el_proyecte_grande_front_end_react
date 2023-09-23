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

function ProductsPageDefault() {
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
    }, []);


    useEffect(() => {
    // Fetch products
    if (selectedCategories.length === 0) {

    fetch("http://localhost:8081/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);


      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    } else {

      const requestData = {
        "categoryIds": selectedCategories.map(Number), // Ensure IDs are numbers
    
      };
      // console.log("wchodzi TU 157: " + requestData)
    
      fetch("http://localhost:8081/api/v1/products/bycategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the product listing with filtered products
    
          setProducts(data);
    
        })
        .catch((error) => {
          console.error("Error sending request:", error);
        });

    }
    }, [selectedCategories]);
    
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

const handleCategoryChange  = (event) => {
  const categoryId = event.target.value;
  
  if (!selectedCategories.includes(categoryId)) {
    setSelectedCategories([...selectedCategories, categoryId])
  } else {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
  }
};

console.log("before return: " + selectedCategories)

  return (
    <RootContainer>
      <Container maxWidth="false" >
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <CategoryContainer>
              <Typography variant="h6">Kategorie</Typography>
              {categories.map((category) => (
                <div key={category.id}>
                  <Checkbox
                    value={category.id}
                    // checked={selectedCategories.includes(category.id)}
                    onClick={handleCategoryChange}
                  />
                  {category.name}
                </div>
              ))}
            </CategoryContainer>
          </Grid>
          <Grid item xs={10}>
            <ProductContainer>
              {products.map((product) => (
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

export default ProductsPageDefault;
