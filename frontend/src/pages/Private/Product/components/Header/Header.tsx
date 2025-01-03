import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Product } from '../../models';

import debounce from 'just-debounce-it';

import { Navigate, useNavigate } from 'react-router-dom';
import { FormInputText } from '@/componets';
import { useProductContext } from '@/context';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate()

    const {setSearchProduct} = useProductContext();
  

  const {} = useProductContext();
  const debouncedGetProducts= useCallback(debounce((search: string) =>{
    setSearchProduct(search);
  },300 ),[])


  const handleClick = () => {
    navigate("create")

  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: { id: 0, name: '', price: 0},
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    debouncedGetProducts(event.target.value)
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ alignItems: "right" }}>
        <FormInputText
          name="search"
          control={control}
          label="Buscar"
          externalOnChange={handleSearchChange}
        />
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Crear Producto
        </Button>
      </div>
    </div>
  );
};

export default CreateProduct;
