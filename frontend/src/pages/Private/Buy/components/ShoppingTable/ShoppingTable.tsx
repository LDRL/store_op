// import { removeFavorite } from '@/redux/states';
// import { AppStore } from '@/redux/store';
import { useProductContext } from '@/context';
import { Delete } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

export interface FavoriteTableInterface {}

interface ProductCard {
    id: number;
    name: string;
    price: number;
    stock: number;
    photo_url: string;
    cantidad: number;
    subtotal: number;
}

const ShoppingTable: React.FC<FavoriteTableInterface> = () => {
  const pageSize = 5;
 
//   const stateFavorites = useSelector((store: AppStore) => store.favorites);
const {cartProducts} = useProductContext();

  const handleClick = (person: ProductCard) => {
    // dispatch(removeFavorite(person));
    console.log(person)
  };

  const columns: GridColDef[] = [
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   sortable: false,
    //   headerName: '',
    //   width: 50,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <>
    //       {
    //         <IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row)}>
    //           <Delete />
    //         </IconButton>
    //       }
    //     </>
    //   )
    // },
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
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
        field: 'subtotal',
        headerName: 'total',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => <>{params.value}</>
      }
  ];
  return (
    <DataGrid
    rows={cartProducts}
    rowCount={cartProducts.length}
    columns={columns}
    disableColumnSelector
    disableRowSelectionOnClick
    autoHeight
    
    getRowId={(row: any) => row.id}
    paginationMode="server"
    />

    
  );
};

export default ShoppingTable;