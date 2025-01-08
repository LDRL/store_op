import React, { CSSProperties, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, TextField} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../models';
import { ClipLoader } from 'react-spinners';
import "./UserCreate.css"
import { useCreateUser, useGetUser, useUpdateUser } from '../../hooks/useUser';
import CardForm from '@/componets/Cards/CardForm';
import { useProductContext } from '@/context';
import { PrivateRoutes } from '@/utils/routes';
import LoadMask from '@/componets/LoadMask/LoadMask';
import { FormDate, FormDropdown, FormInputNumber, FormInputText } from '@/componets';
import { toast } from 'react-toastify';
import { useFetchRolOptions } from '@/pages/Private/Product/hooks/useFetchOptions';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const UserCreate: React.FC = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>(); //Se captura el id de un producto
  const {userState, editUser, clearUser} = useProductContext();
  

  const { control, handleSubmit, reset, formState: { errors }} = useForm<User>({
    defaultValues: { id: 0, name: '', idRol:0, email:'', phone:''},
  });


 // Llamar al hook aquí
 const { data, isLoading, isError } = id ? useGetUser(id) : { data: null, isLoading: false, isError: false };
 const {data: options, isLoading: isRoleLoading, isError: isRoleError} = useFetchRolOptions();

 const createUserMutation = useCreateUser();
 const updateUserMutation = useUpdateUser();

 useEffect(() => {
  if (id && data) {
    editUser(data);
    return
  }

  clearUser()
 }, [data]);


  useEffect(() => {
    if (userState.currentUser) {
      reset(userState.currentUser);
      setSubtitulo("Editar")
    } else {
      reset({ id: 0, name: ''});
      setSubtitulo("Nuevo")
    }
  }, [userState.currentUser, reset]);


  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      if (userState.currentUser) {
        await updateUserMutation.mutateAsync(data);
        toast.success("Usuario actualizado exitosamente");
      } else { 
        await createUserMutation.mutateAsync(data);
        toast.success("Usuario creado exitosamente");
      }
      navigate(`/private/${PrivateRoutes.USER}`, {replace:true})
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



  if (isRoleLoading){
    return <p>Cargando opciones ....</p>
  }
  if(isRoleError){
    return <p>Error al cargar las opciones</p>
  }

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
        titulo='Usuario'
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
              name="name"
              control={control}
              label="Nombre"
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
            <FormDate
              name="date"
              control={control}
              label='Fecha'
              rules={{required: 'Fecha es un campo requerido'}}
            />
          </div>

          <div className='container_selector'>
            <FormDropdown
              name="idRol"
              control={control}
              label="Rol"
              rules={{ required: 'campo requerido' }}
              options={options || []}
            />
          </div>
          <div className='section'>

            <FormInputNumber
                name="idClient"
                control={control}
                label="Codigo cliente"
            />
          </div>
          <div className='section'>
            <FormControl>
              <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'El correo electrónico no es válido',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo electrónico"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                />
              )}
            />
            </FormControl>
          </div>

          <div className='section'>
            <FormControl>
              {/* <FormLabel htmlFor="password">Password</FormLabel> */}
              <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                />
              )}
            />
            </FormControl>
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
              onClick={() => navigate('/private/user')}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </CardForm>
    </div>
  );
};

export default UserCreate;