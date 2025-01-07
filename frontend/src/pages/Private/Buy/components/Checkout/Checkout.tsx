import React, { CSSProperties, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Client } from '../../models';
import { useForm } from 'react-hook-form';
import { useGetCategory } from '@/pages/Private/Category/hooks/useCategory';
import { ClipLoader } from 'react-spinners';
import CardForm from '@/componets/Cards/CardForm';
import LoadMask from '@/componets/LoadMask/LoadMask';
import { Box, Button } from '@mui/material';
import { FormInputText } from '@/componets';
import { useGetClient } from '../../hooks/useClient';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Checkout: React.FC = () => {
  
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>(); 
  

  const { control, handleSubmit, reset} = useForm<Client>({
    defaultValues: { id: 0, name: '', razon:''},
  });


 // Llamar al hook aquí
 const { data, isLoading, isError } = useGetClient();

console.log(data) 

 useEffect(() => {
  if (data) {
    reset({
      id: data.id,   // Asumiendo que 'data' tiene un 'id'
      name: data.name, // Asumiendo que 'data' tiene un 'name'
      razon: data.razon,
      address: data.address,
      phone: data.phone,
      email: data.email
    });
    return
  }

  // clearBrand()
 }, [data]);


 


  const onSubmit = async (data: Client) => {
    setLoading(true);
    
  };

  return (    
    <div className='container'>
      {loading && (
        <div className="sweet-loading">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <CardForm
        titulo='Datos personales'
        subtitulo={subtitulo}
      >
        <LoadMask/>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className='section'>
            <FormInputText
              name="razon"
              control={control}
              label="razon social"
              rules={{ required: 'campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="name"
              control={control}
              label="nombre comercial"
              rules={{ required: 'campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="address"
              control={control}
              label="dirección de entrega"
              rules={{ required: 'campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="phone"
              control={control}
              label="Telefono"
              rules={{ required: 'campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="email"
              control={control}
              label="correo electronico"
              rules={{ required: 'campo requerido' }}
            />
          </div>

          <div className='container_button'>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
            >
              Confirmar compra
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{ mt: 2 }}
              color='error'
              onClick={() => navigate('/private/brand')}
            >
              Cancelar compra
            </Button>
          </div>
        </Box>
      </CardForm>
    </div>
  );
};


export default Checkout;







