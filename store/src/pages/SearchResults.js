import React from 'react';
import {
    Card,
    CardContent,
    Typography
  } from '@mui/material';
const SearchResults = ({ results }) => {

    
        if (!results || results.length === 0) {
          return <p>No results found.</p>;
        }

  return (
    <div>
      <h2>Search Results</h2>
      
      {results.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          
          <Card style={{ height: '10%' }}>
        <CardContent>
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle1">Category ID: {product.category_id}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Stock Quantity: {product.stock_quantity}</Typography>
          <Typography variant="body2">Description: {product.description}</Typography>
          </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
