import React, { CSSProperties, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Client } from '../../models';
import { ClipLoader } from 'react-spinners';
import "./ClientCreate.css"
import { useCreateClient, useGetClient, useUpdateClient } from '../../hooks/useClient';
import CardForm from '@/componets/Cards/CardForm';
import { useProductContext } from '@/context';
import { PrivateRoutes } from '@/utils/routes';
import LoadMask from '@/componets/LoadMask/LoadMask';
import { FormInputText } from '@/componets';
import { toast } from 'react-toastify';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ClientCreate: React.FC = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>(); //Se captura el id de un producto
   const {clientState, editClient, clearClient} = useProductContext();
  

  const { control, handleSubmit, reset} = useForm<Client>({
    defaultValues: { id: 0, name: '', razon:'', address:'', email:'', phone:''},
  });


 // Llamar al hook aquí
 const { data, isLoading, isError } = id ? useGetClient(id) : { data: null, isLoading: false, isError: false };

 const createClientMutation = useCreateClient();
 const updateClientMutation = useUpdateClient();

 useEffect(() => {
  if (id && data) {
    editClient(data);
    return
  }

  clearClient()
 }, [data]);


  useEffect(() => {
    if (clientState.currentClient) {
      reset(clientState.currentClient);
      setSubtitulo("Editar")
    } else {
      reset({ id: 0, name: ''});
      setSubtitulo("Nuevo")
    }
  }, [clientState.currentClient, reset]);


  const onSubmit = async (data: Client) => {
    setLoading(true);
    try {
      if (clientState.currentClient) {
        await updateClientMutation.mutateAsync(data);
        toast.success("Cliente actualizado exitosamente");
      } else { 
        await createClientMutation.mutateAsync(data);
        toast.success("Cliente creado exitosamente");
      }
      navigate(`/private/${PrivateRoutes.CLIENT}`, {replace:true})
    } catch (error:any) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error desconocido.");
      }
    }
    finally {
      setLoading(false); // Desactiva el loader
    }
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
        titulo='Cliente'
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
              rules={{ required: 'Campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="name"
              control={control}
              label="Nombre comercial"
              rules={{ required: 'Campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="phone"
              control={control}
              label="Telefono"
              rules={{ required: 'Campo requerido' }}
            />
          </div>

          <div className='section'>
            <FormInputText
              name="address"
              control={control}
              label="Direccion entrega"
              rules={{ required: 'Campo requerido' }}
            />
          </div>


          <div className='section'>
            <FormInputText
              name="email"
              control={control}
              label="Correo electronico"
              rules={{ required: 'Campo requerido' }}
            />
          </div>

          <div className='container_button'>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{ mt: 2 }}
              color='error'
              onClick={() => navigate('/private/client')}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </CardForm>
    </div>
  );
};

export default ClientCreate;