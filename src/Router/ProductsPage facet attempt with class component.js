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



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          categories: [],
          products: [],
          selectedCategories: [],
          cart: []
    };
  }


  // Fetch categories and products from the server
  // Fetch categories
  function fetchFirstSetOfData () {
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
        this.products: data
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

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


// Function to update the selected categories and filter products
const handleCategoryChange = (event) => {
  const categoryId = event.target.value;

  this.settselectedCategories: categoryId;

  // setSelectedCategories((prevSelectedCategories) => {
  //   if (event.target.checked) {
  //     return [...prevSelectedCategories, categoryId];
  //   } else {
  //     return prevSelectedCategories.filter((id) => id !== categoryId);
  //   }
  // });
  console.log("console log w 107 linii: " + selectedCategories)
  // Call the filterProductsByCategories function to send the request
  filterProductsByCategories();
};
console.log("console log w 111 linii: " + selectedCategories)
// console.log("console log w 110 linii: " + selectedCategories)

// Function to send a POST request to filter products based on selected categories
// const filterProductsByCategories = () => {
const filterProductsByCategories = (selectedCategories) => {
  console.log("console log w 117 linii: " + selectedCategories)
  const requestData = {
    categoryIds: selectedCategories.map(Number), // Ensure IDs are numbers

  };
  console.log("console log w 122 linii: " + requestData)
  console.log(requestData)

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

      console.log(data)

      setProducts(data);

    })
    .catch((error) => {
      console.error("Error sending request:", error);
    });
};


// Filter products based on selected categories
const filteredProducts = products.filter((product) => {
  if (selectedCategories.length === 0) {
    return true; // Show all products if no categories are selected.
  }
  return selectedCategories.includes(product.categoryId?.toString() || "");
});





  // // Filter products based on selected categories
  // const filteredProducts = products.filter((product) => {
  //   if (selectedCategories.length === 0) {
  //     return true; // Show all products if no categories are selected.
  //   }
  //   return selectedCategories.includes(product.categoryId.toString());
  // });

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
                    onChange={(event) => handleCategoryChange(event)}
                    // checked={selectedCategories.includes(category.id)}
                    // console.log(selectedCategories.includes(category.id))
                  />
                  {category.name}
                </div>
              ))}
            </CategoryContainer>
          </Grid>
          <Grid item xs={10}>
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
