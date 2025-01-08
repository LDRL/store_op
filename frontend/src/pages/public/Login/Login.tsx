
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils/localStorage.utility";
import { PrivateRoutes, PublicRoutes } from "../../../utils/routes";
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, FormLabel, Link, styled, TextField, Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "./models";
import { useCreateLogin } from "./hooks/useLogin";

import { toast } from "react-toastify";


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
 
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(4),
 
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat'
  },
}));




export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const inSing = useCreateLogin();


  // const login = () => {
  //   const user = {id:1, name:"Luis", email:"ffff"};
  //   console.log("Login succesful")
  //   // dispatch(createSidebar({state: false}))
  //   createUser(user);

  //   // dispatch(createUser({id:1, name:"Luis", email:"ffff"}))
  //   navigate(`/${PrivateRoutes.PRIVATE}`, {replace:true});
  // }
  
  {/* <button onClick={login}>Login</button> */}

  const onSubmit = async (data: ILogin) => {
    setLoading(true)
    console.log(data, " formulario data")
    
    try {
      await inSing.mutateAsync(data);
      navigate(`/${PrivateRoutes.PRIVATE}`, {replace:true});
    } catch (error:any) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error desconocido.");
      }
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <>
    <CssBaseline enableColorScheme />
    {/* <ColorMode */}
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card >
        <Typography
          component="h1"
          variant="h4"
          sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
        >
          Inicio sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Box
            sx={{display: 'flex', flexDirection: 'column', gap: 2}}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>

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
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
            >
              Iniciar sesión
            </Button>
          

          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>o</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Card>

    </SignUpContainer>

    </>

  )
}


