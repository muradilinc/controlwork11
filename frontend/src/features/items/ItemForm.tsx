import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { ItemMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../categories/categoriesSlice';
import { getCategories } from '../categories/categoriesThunk';
import { createItem } from './itemsThunk';
import { selectItemError } from './itemsSlice';

const ItemForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [state, setState] = useState<ItemMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });
  const error = useAppSelector(selectItemError);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createItem(state));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    }
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="category"
            label="Category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
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
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price"
            label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
          />
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
          <input
            style={{ display: 'none' }}
            type="file"
            name="image"
            onChange={fileInputChangeHandler}
            ref={inputRef}
          />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                disabled
                label="Image"
                value={filename}
                onClick={activateInput}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: '#22ca46' }}
                onClick={activateInput}
              >
                Browse
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            sx={{ background: '#22ca46' }}
            variant="contained"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
