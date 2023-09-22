import React, { Component } from "react";
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

class ProductsPageListingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      selectedCategories: [],
      cart: [],
    };
  }

  componentDidMount() {
    // Fetch categories
    fetch("http://localhost:8081/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch products
    fetch("http://localhost:8081/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  addToCart = (product) => {
    // Implement your logic to add a product to the cart.
    // Example: Update the cart state with the selected product.
    // this.setState((prevState) => ({ cart: [...prevState.cart, product] }));
  };

  removeFromCart = (product) => {
    // Implement your logic to remove a product from the cart.
    // Example: Remove the product from the cart state based on its ID.
    // this.setState((prevState) => ({
    //   cart: prevState.cart.filter((item) => item.id !== product.id),
    // }));
  };

  handleCategoryChange = (event) => {
    const categoryId = event.target.value;

console.log("linia 92: " + categoryId)
console.log("linia 93: " + this.state.selectedCategories)


  // this.setState({selectedCategories: this.state.selectedCategories.push(categoryId)})
  
    if (event.target.checked) {
      this.setState((prevState) => ({
        selectedCategories: [...prevState.selectedCategories, categoryId],
        // selectedCategories: this.state.selectedCategories.push(categoryId)
      }));

    } else {
      this.setState((prevState) => ({
        selectedCategories: prevState.selectedCategories.filter(
          (id) => id !== categoryId
        ),
      }));
    }


    console.log("linia 112: " + this.state.selectedCategories)

    // Call the filterProductsByCategories function to send the request
    this.filterProductsByCategories();
  };

  filterProductsByCategories = () => {
    const requestData = {
      "categoryIds": this.state.selectedCategories.map(Number),
    };

    console.log("linia 124: " + this.state.selectedCategories)  // categoryIds: this.state.selectedCategories.map(Number), // Ensure IDs are numbers

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

        this.setState({ products: data });
        console.log("linia 137: " + this.state.products)
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  render() {
    const { categories, selectedCategories, products } = this.state;

    // Filter products based on selected categories
    const filteredProducts = products.filter((product) => {
      if (selectedCategories.length === 0) {
        return true; // Show all products if no categories are selected.
      }
      return selectedCategories.includes(product.categoryId?.toString() || "");
    });

    return (
      <RootContainer>
        <Container maxWidth="false">
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <CategoryContainer>
                <Typography variant="h6">Kategorie</Typography>
                {categories.map((category) => (
                  <div key={category.id}>
                    <Checkbox
                      value={category.id}
                      onChange={this.handleCategoryChange}
                      checked={this.state.selectedCategories.includes(category.id)}
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
                        onClick={() => this.addToCart(product)}
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
}

export default ProductsPageListingComponent;
