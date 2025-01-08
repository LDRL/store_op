import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import debounce from 'just-debounce-it';

import { useNavigate } from 'react-router-dom';

import "./Header.css"
import { useProductContext } from '@/context/ProductProvider';
import { FormInputText } from '@/componets';
import { Order } from '../../models';

const CreateProduct: React.FC = () => {
  const {setSearchCategory} = useProductContext();
  const navigate = useNavigate()

  const debouncedGetCategories = useCallback(debounce((search: string) =>{
    setSearchCategory(search);
  },300 ),[])

  const handleClick = () => {
    navigate("create")
  };

  const { control } = useForm<Order>({
    defaultValues: { id: 0, name: ''},
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    debouncedGetCategories(event.target.value)
  };

  return (
    <div className='header'>
      <div style={{ alignItems: "right" }}>
        <FormInputText
          name="search"
          control={control}
          label="Buscar"
          externalOnChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
