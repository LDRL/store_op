export interface ProductTableInterface {
    // open:boolean;
    // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

import React from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Product } from '../../models';


import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProductOption';
import Loading from '@/componets/Loading';
import { useProductContext } from '@/context';

const ListOfProducts: React.FC = () => {
    const {editProduct} = useProductContext();
    const navigate = useNavigate();
    const {
        products,
        totalProduct,
        isLoading,
        paginationModel,
        handlePaginationModelChange,
    } = useProducts();

    const handleEditProduct = (product: Product) => {
        editProduct(product);
        navigate(`${product.id}/editar`)
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            sortable:false,
            flex: 1,
            minWidth: 150,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'code',
            headerName: 'Codigo',
            sortable:false,
            flex: 1,
            minWidth: 150,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'name',
            headerName: 'Producto',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'price',
            headerName: 'Precio',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value }</>,
        },
        {
            field: 'brand',
            headerName: 'Marca',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'category',
            headerName: 'Categoria',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
        },
        {
            field: 'actions',
            type: 'actions',
            sortable: false,
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEditProduct(params.row as Product)}
                >
                    Editar
                </Button>
            ),
        },
    ];


    if (isLoading) {
        return <Loading loading={isLoading}/>;
    }

    return (
        <DataGrid
            rows={products}
            rowCount={totalProduct}
            columns={columns}
            disableColumnSelector
            disableRowSelectionOnClick
            autoHeight
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: paginationModel.pageSize,
                        page: paginationModel.page,
                    },
                },
            }}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[paginationModel.pageSize]}
            getRowId={(row: any) => row.id}
            paginationMode="server"
        />
    );
};

export default ListOfProducts;


/*
const NoProductsResults: React.FC = () => {
    return(
        <p>No se encontraron productos para esta busqueda</p>
    )
}


const ProductTable: React.FC = ({products}) => {
    const hasProducts = products?.length > 0

    return(
        hasProducts 
            ? <ListOfProducts />
            : <NoProductsResults/>    
        )
}
*/

