import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useProductContext } from '@/context';
import { fetchProductCreate, fetchProductUpdate, productUrl } from '../../services/product';
import { Product } from '../../models';
import { dialogCloseSubject$ } from '@/componets/CustomDialog';
import { FormInputDropdown, FormInputText } from '@/componets';


const ProductModal: React.FC = () => {
  const {productState, clearProduct} = useProductContext();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: { id: 0, name: '', price: 0 },
  });


  const options = [
    {
      label: "Dropdown Option 1",
      value: 1,
    },
    {
      label: "Dropdown Option 2",
      value: 2,
    },
  ];

  useEffect(() => {
    if (productState.currentProduct) {
      reset(productState.currentProduct);
    } else {
      reset({ id: 0, name: '', price: 0 });
    }
  }, [productState.currentProduct, reset]);

  const onSubmit = async (data: Product) => {
    if (productState.currentProduct) {
      // Update the product

      const [err, responseData] = await fetchProductUpdate(productUrl, data);
    } else {
      // Create a new product
      const [err, responseData] = await fetchProductCreate(productUrl, data);
    }
    clearProduct();
    dialogCloseSubject$.setSubject = true;
  };

  const handleClose = () => {
    clearProduct();
    dialogCloseSubject$.setSubject = true;
  };

  return (
    <>
      <DialogTitle>{productState.currentProduct ? 'Editar producto' : 'Crear producto'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {productState.currentProduct ? 'Update the product details below.' : 'Para crear un producto ingrese todos los campos.'}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="name"
            control={control}
            label="Product Name"
            rules={{ required: 'Product name is required' }}
          />
          <Controller
            name="price"
            control={control}
            rules={{ required: 'Product price is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                margin="dense"
                id="price"
                label="Product Price"
                type="number"
                fullWidth
                variant="standard"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
              />
            )}
          />

          <FormInputDropdown
            name="drop"
            control={control}
            label='Seleccionar opciones'
            rules={{ required: 'Product name is required' }}
            options={options}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{productState.currentProduct ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default ProductModal;
