// AdminProductPage.js
import React, { useState, useEffect } from "react";
import AdminProductForm from "./AdminProductForm";
import axios from "axios";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // useEffect(() => {
  //   // Fetch the list of products from your backend
  //   axios.get("/api/adminPage/allProducts").then((response) => {
  //     setProducts(response.data);
  //   });
  // }, []);

  const handleProductSubmit = (values, { resetForm }) => {
    if (selectedProduct) {
      // Update an existing product
      axios
        .put(`/api/adminPage/${selectedProduct.id}`, values)
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
        .post("/api/adminPage/newProduct", values)
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
      .delete(`/api/adminPage/${productId}`)
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

  return (
    <div>
      <h1>Admin Product Management</h1>
      <AdminProductForm
        initialValues={selectedProduct || { name: "", price: "", stock_quantity: "", description: "" }}
        onSubmit={handleProductSubmit}
      />

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
