import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../models';

import { useProductContext } from '@/context';
import { FormInputText } from '@/componets';
import debounce from 'just-debounce-it';

import "./Header.css"


const Header: React.FC = () => {
  const navigate = useNavigate()
  const {setSearchClient} = useProductContext();
  const debouncedGetClients = useCallback(debounce((search: string) =>{
    setSearchClient(search);
  },300 ),[])

  const handleClick = () => {
    navigate("create")
  };

  const { control } = useForm<Client>({
    defaultValues: { id: 0, name: ''},
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    debouncedGetClients(event.target.value)
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

      <div>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Crear Cliente
        </Button>
      </div>
    </div>
  );
};

export default Header;
