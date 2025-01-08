import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useCOrder";
import { useProductContext } from "@/context";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import Loading from "@/componets/Loading";

const CreateCategory: React.FC = () => {
  const {id} = useParams<{id: string}>(); //Se captura el id 
  const [loading , setLoading] = useState<boolean>(false);
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [color] = useState("#ffffff")
  const navigate = useNavigate();

 const { data, isLoading, isError } = id ? useGetOrder(id) : { data: null, isLoading: false, isError: false };
 const {showCOrder, clearCOrder} = useProductContext();


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

  if(data){
    return (
      <Box>
        <div className="" style={{marginBottom:"10px", marginTop:"10px", marginRight: "20px"}}>
          {/* <Header />   */}
          <div style={{display: 'flex', gap:'20px', }}>
            <Typography>Monto total: Q {data.totalOrder}</Typography>
          </div>
        </div>

        <DataGrid
          rows={data.detail}
          rowCount={data.detail?.length}
          columns={columns}
          disableColumnSelector
          disableRowSelectionOnClick
          getRowId={(row: any) => row.id}
          paginationMode="server"
        />

        <div className='container_button'>
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
    );
  } 
};

export default CreateCategory;