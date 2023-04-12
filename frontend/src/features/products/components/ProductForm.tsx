import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { ProductMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../categories/categoriesSlice';
import { fetchCategories } from '../../categories/categoriesThunks';

interface Props {
  onSubmit: (mutation: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            label="Category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>
              Please select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField id="title" label="Title" value={state.title} onChange={inputChangeHandler} name="title" required />
        </Grid>

        <Grid item xs>
          <TextField id="price" label="Price" value={state.price} onChange={inputChangeHandler} name="price" required />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*" />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
