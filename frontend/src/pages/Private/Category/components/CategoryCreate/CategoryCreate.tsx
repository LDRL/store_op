import { useCreateCategory, useGetCategory, useUpdateCategory } from '../../hooks/useCategory';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import "./CategoryCreate.css"
import { useProductContext } from '@/context';
import { PrivateRoutes } from '@/utils/routes';
import { Category } from '../../models';
import { FormInputText } from '@/componets';
import LoadMask from '@/componets/LoadMask/LoadMask';
import CardForm from '@/componets/Cards/CardForm';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CreateCategory: React.FC = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>(); //Se captura el id de un producto
  // const dispatch = useDispatch();
  // const { currentCategory } = useSelector((state: RootState) => state.category);

  const { control, handleSubmit, reset} = useForm<Category>({
    defaultValues: { id: 0, name: ''},
  });


 // Llamar al hook aquí
 const { data, isLoading, isError } = id ? useGetCategory(id) : { data: null, isLoading: false, isError: false };
 const {categoryState, editCategory, clearCategory} = useProductContext();
 const createCategoryMutation = useCreateCategory();
 const updateCategoryMutation = useUpdateCategory();

 useEffect(() => {
  if (id && data) {
    console.log(data, "---data")
    editCategory(data);
    return
  }
  clearCategory()
 }, [data]); 


  useEffect(() => {
    if (categoryState.currentCategory) {
      reset(categoryState.currentCategory);
      setSubtitulo("Editar")
    } else {
      reset({ id: 0, name: ''});
      setSubtitulo("Nuevo")
    }
  }, [categoryState.currentCategory, reset]);


  const onSubmit = async (data: Category) => {
    setLoading(true);
    try {
      if (categoryState.currentCategory) {
        await updateCategoryMutation.mutateAsync(data);
      } else { // Create a new Category
        await createCategoryMutation.mutateAsync(data);
      }
      navigate(`/private/${PrivateRoutes.CATEGORY}`, {replace:true})
    } catch (error) {
      console.log(error)
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
        titulo='Categoría'
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
              label="Nombre categoría"
              rules={{ required: 'Product name is required' }}
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
              onClick={() => navigate('/private/category')}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </CardForm>
    </div>
  );
};

export default CreateCategory;