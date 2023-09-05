// AdminProductForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <Field type="number" id="price" name="price" />
          <ErrorMessage name="price" component="div" />
        </div>

        <div>
          <label htmlFor="stock_quantity">Stock Quantity</label>
          <Field type="number" id="stock_quantity" name="stock_quantity" />
          <ErrorMessage name="stock_quantity" component="div" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AdminProductForm;
