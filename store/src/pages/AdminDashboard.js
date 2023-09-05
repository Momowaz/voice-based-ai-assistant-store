import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AdminProductForm from "./AdminProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const history = useHistory();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    // Fetch the list of products from your backend
    axios.get(`${BACKEND_URL}/api/adminDashboard/allProducts`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleProductSubmit = (values, { resetForm }) => {
    if (selectedProduct) {
      // Update an existing product
      axios
        .put(`${BACKEND_URL}/api/adminDashboard/${selectedProduct.id}`, values)
        .then((response) => {
          // Handle successful update
          const updatedProducts = products.map((product) =>
            product.id === selectedProduct.id ? response.data : product
          );
          setProducts(updatedProducts);
          setSelectedProduct(null);
        })
        .catch((error) => {
          // Handle update error
          console.error("Error updating product:", error);
        });
    } else {
      // Create a new product
      axios
        .post(`${BACKEND_URL}/api/adminDashboard/newProduct`, values)
        .then((response) => {
          // Handle successful creation
          setProducts([...products, response.data]);
          resetForm();
        })
        .catch((error) => {
          // Handle creation error
          console.error("Error creating product:", error);
        });
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`${BACKEND_URL}/api/adminDashboard/${productId}`)
      .then(() => {
        // Handle successful deletion
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => {
        // Handle deletion error
        console.error("Error deleting product:", error);
      });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/AdminLoginPage/logout`);

      if (response.status === 200) {
        // Logout was successful
        // history.push('/'); // Redirect to the login page or any other desired page
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during the logout process
    }
  };

  return (
    <Container>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
      <Typography variant="h4">Admin Product Management</Typography>
      <AdminProductForm
        initialValues={selectedProduct || {
          name: "",
          price: "",
          stock_quantity: "",
          description: "",
        }}
        onSubmit={handleProductSubmit}
      />
  
      <Typography variant="h5">Product List</Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditProduct(product)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
  
};
export default AdminDashboard;
