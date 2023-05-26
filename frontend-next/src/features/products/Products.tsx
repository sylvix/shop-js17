import React from 'react';
import Link from 'next/link';
import { Button, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProducts } from './productsSlice';
import { useEffect } from 'react';
import { fetchProducts } from './productsThunks';
import ProductItem from './components/ProductItem';
import { selectUser } from '@/features/users/usersSlice';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchProducts());
  });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          {user && user.role === 'admin' && (
            <Button color="primary" component={Link} href="/products/new">
              Add product
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            categoryTitle={product.category?.title}
            title={product.title}
            price={product.price}
            id={product._id}
            image={product.image}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;
