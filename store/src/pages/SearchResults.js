import React from 'react';
import { Card, CardContent, Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useParams, Link } from 'react-router-dom';
const SearchResults = ({ results, addToCart }) => {

  

    console.log('resilt...', results)
        if (!results || results.length === 0) {
          return <p>No results found.</p>;
        }

  return (
    <div>
      <h2>Search Results</h2>
      
      {results.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <div className="item-card">
              <div className="item-container">
                <div className="item__image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h4 className="item__name">
                  {product.name}
                </h4>
                <div className="item__price">
                  ${product.price}
                </div>
                <div className="item__quantity">
                  {product.stock_quantity} in stock
                </div>
                <div className="item__details">
                  <Link to={`/product/${product.id}`}>View Details</Link>
                </div>
              </div>
            </div>
          </Grid>
      ))}
    </div>
  );
};

export default SearchResults;
