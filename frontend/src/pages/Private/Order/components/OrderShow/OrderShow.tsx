import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useGetOrder } from "../../hooks/useCOrder";
import { useProductContext } from "@/context";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Loading from "@/componets/Loading";
import { useGetOrder, useUpdateOrder } from "../../hooks/useOrder";
import CardForm from "@/componets/Cards/CardForm";
import LoadMask from "@/componets/LoadMask/LoadMask";
import { useForm } from "react-hook-form";
import { Order } from "../../models";
import { PrivateRoutes } from "@/utils/routes";

const OrderShow: React.FC = () => {
  const {id} = useParams<{id: string}>(); //Se captura el id 
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

 const { data, isLoading, isError } = id ? useGetOrder(id) : { data: null, isLoading: false, isError: false };
 const {showCOrder, clearCOrder} = useProductContext();

 const { control, handleSubmit, reset, getValues, setValue} = useForm<Order>({
  defaultValues: { id: 0, status: 0, detail:[]},
});

const updateOrderMutation = useUpdateOrder();

 

const formatDateToSpanish = (date: Date): string => {
  const dateObject = new Date(date);
  console.log(date, "---")
  if (isNaN(dateObject.getTime())) {
    // Si la fecha no es válida, devuelve un valor por defecto
    return "Fecha no válida";
  }

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatter.format(dateObject);
};

  useEffect(() => {
    if (id && data) {
      console.log(data, "----data obtenida")
      showCOrder(data);
      return
    }
    clearCOrder()
   }, [data]);
   
  if (isLoading) {
    return <Loading loading={isLoading} />;
  }


  const onSubmit = async (data: Order) => {
    data.status = 4;
    data.id = Number(id);
  
  
    setLoading(true);
    try {      
      await updateOrderMutation.mutateAsync(data);

      navigate(`/private/${PrivateRoutes.SALE}`, {replace:true})
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false); // Desactiva el loader
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'photo_url',
      headerName: 'Imagen',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
            {
                

                <Box
                sx={{
                  height: '60px',  // Puedes ajustar la altura
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  srcSet={`${params.value}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${params.value}?w=248&fit=crop&auto=format`}
                  alt={params.row.name}
                  loading="lazy"
                  style={{
                    objectFit: 'cover',  // Ajuste para que no se distorsione
                    // width: '100%',  // Asegura que ocupe todo el ancho
                    height: '100%', // Asegura que ocupe toda la altura del contenedor
                  }}
                />
              </Box>
            }
        </>
        )
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'amount',
      headerName: 'Cantidad',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'price',
      headerName: 'precio',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{`Q ${params.value}`}</>
    },
    {
        field: 'subtotal',
        headerName: 'total',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => <>{`Q ${params.value}`}</>
      }
  ];


    return (
      <div>
        {loading && (
        <Loading loading/>
      )}

      <CardForm
        titulo='Compra'
        subtitulo={subtitulo}
      >
        <LoadMask/>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >

          <div className="" style={{marginBottom:"10px", marginTop:"10px", marginRight: "20px"}}>
            {/* <Header />   */}
            <div style={{display: 'flex', gap:'20px', flexDirection:'column' }}>
              <Typography>Nombre: <span style={{fontWeight:'bold'}}>{data?.name}</span></Typography>
              <Typography>Direccion entrega: <span style={{fontWeight:'bold'}}>{data?.address}</span></Typography>
              <Typography>fecha entrega: <span style={{fontWeight:'bold'}}>{formatDateToSpanish(data.deliveryDate)}</span></Typography>
              <Typography>Monto total: <span style={{fontWeight:'bold'}}>Q {data?.totalOrder}</span></Typography>
            </div>
          </div>

          <DataGrid
            rows={data?.detail}
            rowCount={data?.detail?.length}
            columns={columns}
            disableColumnSelector
            disableRowSelectionOnClick
            getRowId={(row: any) => row.id}
            paginationMode="server"
          />

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
              onClick={() => navigate('/private/client/order')}
            >
              Regresar
            </Button>
          </div>
        </Box>
        </CardForm>

      </div>
      
    );
};

export default OrderShow;