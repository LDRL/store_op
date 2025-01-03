import React, { CSSProperties, useEffect, useState } from 'react';
import { Box, Button} from '@mui/material';

import { useForm } from 'react-hook-form';
import { Product } from '../../models';


import { fetchProductCreate, fetchProductUpdate, fetchProduct, productUrl } from '../../services/product';
import { useFetchMarcaOptions, useFetchOptions, useFetchPresentacionOptions } from '../../hooks/useFetchOptions';

import "./ProductCreate.css"
import { ClipLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '@/context';
import { PrivateRoutes } from '@/utils/routes';
import CardForm from '@/componets/Cards/CardForm';
import LoadMask from '@/componets/LoadMask/LoadMask';
import { FormDropdown, FormInputText, FormTextArea } from '@/componets';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CreateProduct: React.FC = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>(); //Se captura el id de un producto
  const { productState, editProduct } = useProductContext();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: { id: 0, name: '', price: 0 },
  });

  const {data: options, isLoading, isError} = useFetchOptions();
  const {data: marcaOptions, isLoading: isMarcaLoading, isError: isMarcaError} = useFetchMarcaOptions();
  const {data: presentacionOptions, isLoading: isPresentacionLoading, isError: isPresentacionError} = useFetchPresentacionOptions();
  
  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          // Si hay un ID, carga el producto
          const productId = productUrl + id
          const [err, responseData] = await fetchProduct(productId);
          if (err) {
            // Manejo de errores si es necesario
            console.error("Error fetching product:", err);
            return;
          }

          // Abre el modal con los datos del producto
          if (responseData) {
            editProduct(responseData);
          } else {
            console.log("No product data found.");
          }
        } catch (error) {
          console.log("Error occurred:", error);
        }
      }
    };

    fetchProductData();
  }, [ id]);

  useEffect(() => {
    if ( productState.currentProduct) {
      reset(productState.currentProduct);
      setSubtitulo("Editar")
    } else {
      reset({ id: 0, name: '', price: 0});
      setSubtitulo("Nuevo")
    }
  }, [productState.currentProduct, reset]);


  const onSubmit = async (data: Product) => {
    setLoading(true);
    try {
      // let responseData;
      if (productState.currentProduct) {
        // Update the product
        const [err, responseData] = await fetchProductUpdate(productUrl, data);

        if (err) throw new Error(err.message);
      } else {
        // Create a new product
        const [err, responseData] = await fetchProductCreate(productUrl, data);
      }
      navigate(`/private/${PrivateRoutes.PRODUCT}`, {replace:true})
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false); // Desactiva el loader
    }
  };

  if (isLoading){
    return <p>Cargando opciones ....</p>
  }
  if(isError){
    return <p>Error al cargar las opciones, {isError}</p>
  }

  if (isMarcaLoading){
    return <p>Cargando opciones ....</p>
  }
  if(isMarcaError){
    return <p>Error al cargar las opciones</p>
  }

  if (isPresentacionLoading){
    return <p>Cargando opciones ....</p>
  }
  if(isPresentacionError){
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
        titulo='Producto'
        subtitulo={subtitulo}
      >
        <LoadMask
        />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className='section'>
            <FormInputText
                name="name"
                control={control}
                label="Nombre producto"
                rules={{ required: 'Product name is required' }}
              />
          </div>

          <div className='container_selector'>
              <FormDropdown
                name="idCategory"
                control={control}
                label="categoria......"
                rules={{ required: 'categorie name is required' }}
                options={options || []}
              />
            
              <FormDropdown
                name="idBrand"
                control={control}
                label="marca"
                rules={{ required: 'marca name is required' }}
                options={marcaOptions || []}
              />         

              <FormDropdown
                name="idPresentation"
                control={control}
                label="presentacion"
                rules={{ required: 'presentación es un campo requerido' }}
                options={presentacionOptions || []}
              /> 
          </div>

          <div className='section'>
            <FormTextArea
              name="description"
              control={control}
              label="Descripción"
              rules={{required: 'Descripción es un campo requerido'}}
              rows={6}
              placeholder="Escribe algo aquí..."
              helperText="Máximo 500 caracteres"
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
              >
                Cancelar
              </Button>
            </div>
        </Box>
      </CardForm>
    </div>
  );
};

export default CreateProduct;
