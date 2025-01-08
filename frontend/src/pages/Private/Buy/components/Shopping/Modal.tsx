import React from 'react';
import { Box, Button,DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Product } from '@/pages/Private/Product';
import { dialogCloseSubject$ } from '@/componets/CustomDialog';
import { useProductContext } from '@/context';
import ShoppingTable from '../ShoppingTable/ShoppingTable';
import { useNavigate } from 'react-router-dom';

const Modal: React.FC = () => {
    const {count, total} = useProductContext();
    const navigate = useNavigate();




//   const onSubmit = async (data: Product) => {

//     dialogCloseSubject$.setSubject = true;
//   };

  const handleClose = () => {
    dialogCloseSubject$.setSubject = true;
  };

  return (
    <>
      <DialogTitle>{'Carrito de compras'}</DialogTitle>
      <hr />
      <DialogContent>
        {
            count === 0 ? 
             (
                <DialogContentText
                    sx={{display:'flex', 
                        alignItems:"center", 
                        justifyContent:'center', 
                        flexDirection:"column", gap:2
                    }}
                >
                    <Typography >
                    Tu carrito esta vacio
                    </Typography>

                    <Button variant='contained'
                    sx={{
                        color:'blue',
                        borderRadius:'8px'
                    }}
                    onClick={handleClose}
                    >
                        <Typography sx={{color: 'white'}}>
                            Seguir comprando
                        </Typography>
                    </Button>
                </DialogContentText>
             ): (
                <DialogContentText>
               <ShoppingTable />
               <h3>Total: Q {total.toFixed(2)}</h3>
               <Box sx={{display: 'flex', flexDirection:"row", justifyContent:'space-between'}}>
               <Button
                        variant="contained"
                        type="button"
                        sx={{ mt: 2 }}
                        color='info'
                        onClick={handleClose}
                    >continuar comprando</Button>
                <Button
                        variant="contained"
                        type="button"
                        sx={{ mt: 2 }}
                        color='success'
                        onClick={() => navigate('/private/buy/checkout')}
                    >Continuar</Button>
               </Box>
              </DialogContentText>
             )
        }
       
        {/* <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit">{ 'Create'}</Button>
          </DialogActions>
        </form> */}
      </DialogContent>
    </>
  );
};

export default Modal;
