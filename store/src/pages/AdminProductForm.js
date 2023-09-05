import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  TextareaAutosize,
  Grid,
  Typography,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  stock_quantity: Yup.number().required("Stock quantity is required").integer("Stock quantity must be an integer"),
  description: Yup.string().required("Description is required"),
});

const AdminProductForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Product Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              id="name"
              name="name"
            />
            <ErrorMessage name="name" component="div" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              id="price"
              name="price"
              type="number"
            />
            <ErrorMessage name="price" component="div" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Stock Quantity"
              variant="outlined"
              id="stock_quantity"
              name="stock_quantity"
              type="number"
            />
            <ErrorMessage name="stock_quantity" component="div" />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              fullWidth
              minRows={4}
              maxRows={8}
              placeholder="Description"
              variant="outlined"
              id="description"
              name="description"
            />
            <ErrorMessage name="description" component="div" />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default AdminProductForm;
